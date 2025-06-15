import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Notification, 
  Announcement, 
  getNotifications, 
  saveNotifications, 
  getAnnouncements, 
  addNotification as addLocalNotification,
  addAnnouncement as addLocalAnnouncement,
  deleteAnnouncement as deleteLocalAnnouncement,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  subscribeToEvent
} from '@/services/localDataService';

// Maximum number of notifications to keep in memory
const MAX_NOTIFICATIONS = 5;

// Type definitions for notification context
interface NotificationContextType {
  notifications: Notification[];
  announcements: Announcement[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'time' | 'read'>) => void;
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => void;
  deleteAnnouncement: (id: number) => void;
}

// Create notification context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Provider component for notification management
export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State for notifications and announcements
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  // Helper function to limit notifications to maximum count
  const limitNotifications = (notificationList: Notification[]) => {
    if (notificationList.length > MAX_NOTIFICATIONS) {
      const limitedNotifications = notificationList.slice(0, MAX_NOTIFICATIONS);
      saveNotifications(limitedNotifications);
      return limitedNotifications;
    }
    return notificationList;
  };

  // Initialize data from localStorage and set up event subscriptions
  useEffect(() => {
    // Load initial data from localStorage
    const initialNotifications = getNotifications();
    const limitedNotifications = limitNotifications(initialNotifications);
    setNotifications(limitedNotifications);
    setAnnouncements(getAnnouncements());
    
    // Subscribe to notification events from other components
    const notificationUnsub = subscribeToEvent('notification', (newNotification) => {
      if (newNotification && newNotification.type === 'notification') {
        setNotifications(prev => {
          const updated = [newNotification.data, ...prev];
          return limitNotifications(updated);
        });
      }
    });
    
    // Subscribe to announcement events from other components
    const announcementUnsub = subscribeToEvent('announcement', (newAnnouncement) => {
      if (newAnnouncement && newAnnouncement.type === 'announcement') {
        setAnnouncements(prev => [newAnnouncement.data, ...prev]);
      }
    });
    
    // Cleanup event subscriptions
    return () => {
      notificationUnsub();
      announcementUnsub();
    };
  }, []);

  // Calculate unread notification count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Mark single notification as read
  const markAsRead = (id: string) => {
    markNotificationAsRead(id);
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    markAllNotificationsAsRead();
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  // Add new notification with automatic limiting
  const addNotification = (notification: Omit<Notification, 'id' | 'time' | 'read'>) => {
    const newNotification = addLocalNotification(notification);
    setNotifications(prev => {
      const updated = [newNotification, ...prev];
      return limitNotifications(updated);
    });
  };

  // Add new announcement
  const addAnnouncement = (announcement: Omit<Announcement, 'id'>) => {
    const newAnnouncement = addLocalAnnouncement(announcement);
    setAnnouncements(prev => [newAnnouncement, ...prev]);
  };

  // Delete announcement by ID
  const deleteAnnouncement = (id: number) => {
    deleteLocalAnnouncement(id);
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  // Context provider with all notification functionality
  return (
    <NotificationContext.Provider value={{
      notifications,
      announcements,
      unreadCount,
      markAsRead,
      markAllAsRead,
      addNotification,
      addAnnouncement,
      deleteAnnouncement
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Hook to use notification context
export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
