
import { BusDetails } from '@/utils/busData';

// Mock notification data structure
export interface Notification {
  id: string;
  type: 'alert' | 'delay' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
  date?: Date;
}

export interface Announcement {
  id: number;
  title: string;
  message: string;
}

// Local storage keys
const NOTIFICATIONS_KEY = 'rec_transit_notifications';
const ANNOUNCEMENTS_KEY = 'rec_transit_announcements';
const BUS_DATA_KEY = 'rec_transit_bus_data';

// Helper functions to work with localStorage
const getStoredData = <T>(key: string, fallback: T): T => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : fallback;
  } catch (error) {
    console.error(`Error retrieving data from localStorage (${key}):`, error);
    return fallback;
  }
};

const setStoredData = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error storing data to localStorage (${key}):`, error);
  }
};

// Notification methods
export const getNotifications = (): Notification[] => {
  return getStoredData<Notification[]>(NOTIFICATIONS_KEY, [
    {
      id: '1',
      type: 'alert',
      title: 'Route Change for Bus 15A',
      message: 'Due to road construction, Bus 15A will take an alternate route via Mount-Poonamalle Road.',
      time: '10 min ago',
      read: false
    },
    {
      id: '2',
      type: 'delay',
      title: 'Bus 23B Delayed',
      message: 'Bus 23B from Tambaram is running 15 minutes late due to heavy traffic.',
      time: '25 min ago',
      read: false
    },
    {
      id: '3',
      type: 'info',
      title: 'New Bus Added',
      message: 'A new bus (35C) has been added from Velachery to college starting next week.',
      time: '2 hours ago',
      read: true
    }
  ]);
};

export const saveNotifications = (notifications: Notification[]): void => {
  setStoredData(NOTIFICATIONS_KEY, notifications);
};

export const addNotification = (notification: Omit<Notification, 'id' | 'time' | 'read'>): Notification => {
  const notifications = getNotifications();
  const newNotification = {
    ...notification,
    id: `notification-${Date.now()}`,
    time: 'just now',
    read: false,
  };
  
  const updatedNotifications = [newNotification, ...notifications];
  saveNotifications(updatedNotifications);
  return newNotification;
};

export const markNotificationAsRead = (id: string): void => {
  const notifications = getNotifications();
  const updatedNotifications = notifications.map(notification => 
    notification.id === id ? { ...notification, read: true } : notification
  );
  saveNotifications(updatedNotifications);
};

export const markAllNotificationsAsRead = (): void => {
  const notifications = getNotifications();
  const updatedNotifications = notifications.map(notification => ({ ...notification, read: true }));
  saveNotifications(updatedNotifications);
};

// Announcement methods
export const getAnnouncements = (): Announcement[] => {
  return getStoredData<Announcement[]>(ANNOUNCEMENTS_KEY, [
    { id: 1, title: 'Special Schedule', message: 'Exam time buses run at special times. Check the exam timings page for details.' }
  ]);
};

export const saveAnnouncements = (announcements: Announcement[]): void => {
  setStoredData(ANNOUNCEMENTS_KEY, announcements);
};

export const addAnnouncement = (announcement: Omit<Announcement, 'id'>): Announcement => {
  const announcements = getAnnouncements();
  const newAnnouncement = {
    ...announcement,
    id: Date.now(),
  };
  
  const updatedAnnouncements = [newAnnouncement, ...announcements];
  saveAnnouncements(updatedAnnouncements);
  return newAnnouncement;
};

export const deleteAnnouncement = (id: number): void => {
  const announcements = getAnnouncements();
  const updatedAnnouncements = announcements.filter(a => a.id !== id);
  saveAnnouncements(updatedAnnouncements);
};

// Bus data methods
export const storeBusData = (busData: BusDetails[]): void => {
  setStoredData(BUS_DATA_KEY, busData);
};

export const getStoredBusData = (): BusDetails[] | null => {
  return getStoredData<BusDetails[] | null>(BUS_DATA_KEY, null);
};

// Event subscription system (replaces Supabase real-time)
type EventType = 'notification' | 'announcement';
type EventCallback = (data: any) => void;

const eventSubscribers: Record<EventType, EventCallback[]> = {
  notification: [],
  announcement: []
};

export const subscribeToEvent = (eventType: EventType, callback: EventCallback): () => void => {
  eventSubscribers[eventType].push(callback);
  
  // Return unsubscribe function
  return () => {
    const index = eventSubscribers[eventType].indexOf(callback);
    if (index !== -1) {
      eventSubscribers[eventType].splice(index, 1);
    }
  };
};

export const publishEvent = (eventType: EventType, data: any): void => {
  eventSubscribers[eventType].forEach(callback => {
    try {
      callback(data);
    } catch (error) {
      console.error(`Error in event subscriber for ${eventType}:`, error);
    }
  });
};
