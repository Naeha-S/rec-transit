interface StoredBusData {
  id: string;
  busNumber: string;
  routeName: string;
  driver: string;
  contactNumber: string;
  stops: Array<{
    name: string;
    arrivalTime: string;
  }>;
}

const BUS_DATA_KEY = 'bus_routes_data';
const BUS_DATA_TIMESTAMP_KEY = 'bus_routes_timestamp';

// Cache duration: 1 hour (in milliseconds)
const CACHE_DURATION = 60 * 60 * 1000;

export const getStoredBusData = (): StoredBusData[] | null => {
  try {
    const timestamp = localStorage.getItem(BUS_DATA_TIMESTAMP_KEY);
    const data = localStorage.getItem(BUS_DATA_KEY);
    
    if (!data || !timestamp) {
      return null;
    }
    
    // Check if data is still fresh (within cache duration)
    const dataAge = Date.now() - parseInt(timestamp);
    if (dataAge > CACHE_DURATION) {
      console.log("Stored bus data has expired, will fetch fresh data");
      localStorage.removeItem(BUS_DATA_KEY);
      localStorage.removeItem(BUS_DATA_TIMESTAMP_KEY);
      return null;
    }
    
    return JSON.parse(data);
  } catch (error) {
    console.error("Error getting stored bus data:", error);
    return null;
  }
};

export const storeBusData = (data: StoredBusData[]): void => {
  try {
    localStorage.setItem(BUS_DATA_KEY, JSON.stringify(data));
    localStorage.setItem(BUS_DATA_TIMESTAMP_KEY, Date.now().toString());
    console.log("Bus data stored successfully:", data.length, "buses");
  } catch (error) {
    console.error("Error storing bus data:", error);
  }
};

// Clear stored data to force refresh from new Google Sheet
export const clearStoredBusData = (): void => {
  try {
    localStorage.removeItem(BUS_DATA_KEY);
    localStorage.removeItem(BUS_DATA_TIMESTAMP_KEY);
    console.log("Stored bus data cleared - will fetch fresh data from Google Sheets");
  } catch (error) {
    console.error("Error clearing stored bus data:", error);
  }
};

// Clear stored data immediately when this module loads to force fresh data fetch
clearStoredBusData();

// Notification and Announcement types and functionality
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'delay' | 'alert';
  time: string;
  date: Date;
  read: boolean;
}

export interface Announcement {
  id: number;
  title: string;
  message: string;
  date: Date;
}

// Notification storage keys
const NOTIFICATIONS_KEY = 'transit_notifications';
const ANNOUNCEMENTS_KEY = 'transit_announcements';

// Event subscription system
type EventType = 'notification' | 'announcement';
type EventCallback = (data: any) => void;
const eventSubscribers: { [key in EventType]: EventCallback[] } = {
  notification: [],
  announcement: []
};

// Notification functions
export const getNotifications = (): Notification[] => {
  try {
    const stored = localStorage.getItem(NOTIFICATIONS_KEY);
    if (!stored) return [];
    
    const notifications = JSON.parse(stored);
    return notifications.map((n: any) => ({
      ...n,
      date: new Date(n.date)
    }));
  } catch (error) {
    console.error("Error getting notifications:", error);
    return [];
  }
};

export const saveNotifications = (notifications: Notification[]): void => {
  try {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
  } catch (error) {
    console.error("Error saving notifications:", error);
  }
};

export const addNotification = (notification: Omit<Notification, 'id' | 'time' | 'read'>): Notification => {
  const newNotification: Notification = {
    ...notification,
    id: Date.now().toString(),
    time: new Date().toLocaleTimeString(),
    read: false
  };
  
  const notifications = getNotifications();
  notifications.unshift(newNotification);
  saveNotifications(notifications);
  
  // Notify subscribers
  eventSubscribers.notification.forEach(callback => {
    callback({ type: 'notification', data: newNotification });
  });
  
  return newNotification;
};

export const markNotificationAsRead = (id: string): void => {
  const notifications = getNotifications();
  const updated = notifications.map(n => 
    n.id === id ? { ...n, read: true } : n
  );
  saveNotifications(updated);
};

export const markAllNotificationsAsRead = (): void => {
  const notifications = getNotifications();
  const updated = notifications.map(n => ({ ...n, read: true }));
  saveNotifications(updated);
};

// Announcement functions
export const getAnnouncements = (): Announcement[] => {
  try {
    const stored = localStorage.getItem(ANNOUNCEMENTS_KEY);
    if (!stored) return [];
    
    const announcements = JSON.parse(stored);
    return announcements.map((a: any) => ({
      ...a,
      date: new Date(a.date)
    }));
  } catch (error) {
    console.error("Error getting announcements:", error);
    return [];
  }
};

export const saveAnnouncements = (announcements: Announcement[]): void => {
  try {
    localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(announcements));
  } catch (error) {
    console.error("Error saving announcements:", error);
  }
};

export const addAnnouncement = (announcement: Omit<Announcement, 'id'>): Announcement => {
  const newAnnouncement: Announcement = {
    ...announcement,
    id: Date.now()
  };
  
  const announcements = getAnnouncements();
  announcements.unshift(newAnnouncement);
  saveAnnouncements(announcements);
  
  // Notify subscribers
  eventSubscribers.announcement.forEach(callback => {
    callback({ type: 'announcement', data: newAnnouncement });
  });
  
  return newAnnouncement;
};

export const deleteAnnouncement = (id: number): void => {
  const announcements = getAnnouncements();
  const filtered = announcements.filter(a => a.id !== id);
  saveAnnouncements(filtered);
};

// Event subscription system
export const subscribeToEvent = (eventType: EventType, callback: EventCallback): (() => void) => {
  eventSubscribers[eventType].push(callback);
  
  // Return unsubscribe function
  return () => {
    const index = eventSubscribers[eventType].indexOf(callback);
    if (index > -1) {
      eventSubscribers[eventType].splice(index, 1);
    }
  };
};
