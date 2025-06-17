
interface CachedData {
  data: any;
  timestamp: number;
  expiresAt: number;
  version: string;
}

interface SyncQueueItem {
  id: string;
  action: 'create' | 'update' | 'delete';
  data: any;
  timestamp: number;
  retryCount: number;
}

class OfflineDataManager {
  private dbName = 'RecTransitDB';
  private dbVersion = 1;
  private db: IDBDatabase | null = null;
  private syncQueue: SyncQueueItem[] = [];
  private maxRetries = 3;

  constructor() {
    this.initializeDB();
    this.initializeSyncQueue();
  }

  private async initializeDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object stores
        if (!db.objectStoreNames.contains('busRoutes')) {
          const routeStore = db.createObjectStore('busRoutes', { keyPath: 'id' });
          routeStore.createIndex('routeName', 'routeName', { unique: false });
        }

        if (!db.objectStoreNames.contains('busSchedules')) {
          const scheduleStore = db.createObjectStore('busSchedules', { keyPath: 'id' });
          scheduleStore.createIndex('busNumber', 'busNumber', { unique: false });
        }

        if (!db.objectStoreNames.contains('notifications')) {
          db.createObjectStore('notifications', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('cachedData')) {
          db.createObjectStore('cachedData', { keyPath: 'key' });
        }

        if (!db.objectStoreNames.contains('syncQueue')) {
          db.createObjectStore('syncQueue', { keyPath: 'id' });
        }
      };
    });
  }

  private async initializeSyncQueue(): Promise<void> {
    if (!this.db) await this.initializeDB();
    
    try {
      const transaction = this.db!.transaction(['syncQueue'], 'readonly');
      const store = transaction.objectStore('syncQueue');
      const request = store.getAll();

      request.onsuccess = () => {
        this.syncQueue = request.result || [];
        this.processSyncQueue();
      };
    } catch (error) {
      console.error('Error initializing sync queue:', error);
    }
  }

  // Cache management
  public async cacheData(key: string, data: any, ttlMinutes: number = 60): Promise<boolean> {
    if (!this.db) await this.initializeDB();

    try {
      const cachedItem: CachedData = {
        data,
        timestamp: Date.now(),
        expiresAt: Date.now() + (ttlMinutes * 60 * 1000),
        version: '1.0'
      };

      const transaction = this.db!.transaction(['cachedData'], 'readwrite');
      const store = transaction.objectStore('cachedData');
      await this.promisifyRequest(store.put({ key, ...cachedItem }));
      
      return true;
    } catch (error) {
      console.error('Error caching data:', error);
      return false;
    }
  }

  public async getCachedData<T>(key: string): Promise<T | null> {
    if (!this.db) await this.initializeDB();

    try {
      const transaction = this.db!.transaction(['cachedData'], 'readonly');
      const store = transaction.objectStore('cachedData');
      const result = await this.promisifyRequest(store.get(key));

      if (!result) return null;

      const cachedItem = result as CachedData;
      
      // Check if data has expired
      if (Date.now() > cachedItem.expiresAt) {
        this.removeCachedData(key); // Clean up expired data
        return null;
      }

      return cachedItem.data as T;
    } catch (error) {
      console.error('Error getting cached data:', error);
      return null;
    }
  }

  public async removeCachedData(key: string): Promise<boolean> {
    if (!this.db) await this.initializeDB();

    try {
      const transaction = this.db!.transaction(['cachedData'], 'readwrite');
      const store = transaction.objectStore('cachedData');
      await this.promisifyRequest(store.delete(key));
      return true;
    } catch (error) {
      console.error('Error removing cached data:', error);
      return false;
    }
  }

  // Bus routes offline management
  public async storeBusRoutes(routes: any[]): Promise<boolean> {
    if (!this.db) await this.initializeDB();

    try {
      const transaction = this.db!.transaction(['busRoutes'], 'readwrite');
      const store = transaction.objectStore('busRoutes');
      
      // Clear existing routes
      await this.promisifyRequest(store.clear());
      
      // Store new routes
      for (const route of routes) {
        await this.promisifyRequest(store.add(route));
      }
      
      return true;
    } catch (error) {
      console.error('Error storing bus routes:', error);
      return false;
    }
  }

  public async getBusRoutes(): Promise<any[]> {
    if (!this.db) await this.initializeDB();

    try {
      const transaction = this.db!.transaction(['busRoutes'], 'readonly');
      const store = transaction.objectStore('busRoutes');
      const routes = await this.promisifyRequest(store.getAll());
      return routes || [];
    } catch (error) {
      console.error('Error getting bus routes:', error);
      return [];
    }
  }

  // Sync queue management
  public async addToSyncQueue(action: 'create' | 'update' | 'delete', data: any): Promise<void> {
    const queueItem: SyncQueueItem = {
      id: `${Date.now()}-${Math.random()}`,
      action,
      data,
      timestamp: Date.now(),
      retryCount: 0
    };

    this.syncQueue.push(queueItem);

    if (this.db) {
      try {
        const transaction = this.db.transaction(['syncQueue'], 'readwrite');
        const store = transaction.objectStore('syncQueue');
        await this.promisifyRequest(store.add(queueItem));
      } catch (error) {
        console.error('Error adding to sync queue:', error);
      }
    }

    // Try to sync immediately if online
    if (navigator.onLine) {
      this.processSyncQueue();
    }
  }

  private async processSyncQueue(): Promise<void> {
    if (!navigator.onLine || this.syncQueue.length === 0) return;

    const itemsToProcess = [...this.syncQueue];
    
    for (const item of itemsToProcess) {
      try {
        await this.syncItem(item);
        await this.removeSyncQueueItem(item.id);
      } catch (error) {
        console.error('Error syncing item:', error);
        await this.incrementRetryCount(item);
      }
    }
  }

  private async syncItem(item: SyncQueueItem): Promise<void> {
    // This would normally make API calls to sync with the server
    // For now, we'll just simulate a successful sync
    console.log(`Syncing ${item.action} operation:`, item.data);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // In a real implementation, you would make actual API calls here
  }

  private async removeSyncQueueItem(itemId: string): Promise<void> {
    this.syncQueue = this.syncQueue.filter(item => item.id !== itemId);

    if (this.db) {
      try {
        const transaction = this.db.transaction(['syncQueue'], 'readwrite');
        const store = transaction.objectStore('syncQueue');
        await this.promisifyRequest(store.delete(itemId));
      } catch (error) {
        console.error('Error removing sync queue item:', error);
      }
    }
  }

  private async incrementRetryCount(item: SyncQueueItem): Promise<void> {
    item.retryCount++;
    
    if (item.retryCount >= this.maxRetries) {
      console.error('Max retries reached for sync item:', item);
      await this.removeSyncQueueItem(item.id);
      return;
    }

    if (this.db) {
      try {
        const transaction = this.db.transaction(['syncQueue'], 'readwrite');
        const store = transaction.objectStore('syncQueue');
        await this.promisifyRequest(store.put(item));
      } catch (error) {
        console.error('Error updating sync queue item:', error);
      }
    }
  }

  // Utility method to promisify IndexedDB requests
  private promisifyRequest<T>(request: IDBRequest<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Clean up expired cache entries
  public async cleanupExpiredCache(): Promise<void> {
    if (!this.db) await this.initializeDB();

    try {
      const transaction = this.db!.transaction(['cachedData'], 'readwrite');
      const store = transaction.objectStore('cachedData');
      const allEntries = await this.promisifyRequest(store.getAll());

      const now = Date.now();
      for (const entry of allEntries) {
        if (entry.expiresAt < now) {
          await this.promisifyRequest(store.delete(entry.key));
        }
      }
    } catch (error) {
      console.error('Error cleaning up expired cache:', error);
    }
  }

  // Get storage usage statistics
  public async getStorageStats(): Promise<{ used: number; available: number }> {
    try {
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        const estimate = await navigator.storage.estimate();
        return {
          used: estimate.usage || 0,
          available: estimate.quota || 0
        };
      }
    } catch (error) {
      console.error('Error getting storage stats:', error);
    }
    
    return { used: 0, available: 0 };
  }
}

export const offlineDataManager = new OfflineDataManager();
