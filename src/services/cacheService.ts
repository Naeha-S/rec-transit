
interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
  version: string;
}

interface CacheStats {
  hits: number;
  misses: number;
  size: number;
  lastCleared: number;
}

class CacheService {
  private cache = new Map<string, CacheItem<any>>();
  private maxSize = 100;
  private defaultTtl = 5 * 60 * 1000; // 5 minutes
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    size: 0,
    lastCleared: Date.now()
  };

  set<T>(key: string, data: T, ttl?: number, version = '1.0'): void {
    // Implement LRU eviction
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTtl,
      version
    });
    
    this.stats.size = this.cache.size;
  }

  get<T>(key: string, currentVersion = '1.0'): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      this.stats.misses++;
      return null;
    }

    // Check if expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      this.stats.misses++;
      this.stats.size = this.cache.size;
      return null;
    }

    // Check version compatibility
    if (item.version !== currentVersion) {
      this.cache.delete(key);
      this.stats.misses++;
      this.stats.size = this.cache.size;
      return null;
    }

    this.stats.hits++;
    return item.data;
  }

  invalidate(pattern: string): void {
    const keysToDelete: string[] = [];
    
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        keysToDelete.push(key);
      }
    }
    
    keysToDelete.forEach(key => this.cache.delete(key));
    this.stats.size = this.cache.size;
  }

  clear(): void {
    this.cache.clear();
    this.stats.size = 0;
    this.stats.lastCleared = Date.now();
  }

  getStats(): CacheStats {
    return { ...this.stats };
  }

  prefetch<T>(key: string, dataProvider: () => Promise<T>, ttl?: number): Promise<T> {
    return new Promise(async (resolve, reject) => {
      try {
        const cachedData = this.get<T>(key);
        if (cachedData) {
          resolve(cachedData);
          return;
        }

        const data = await dataProvider();
        this.set(key, data, ttl);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export const cacheService = new CacheService();
