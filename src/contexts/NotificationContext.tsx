
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

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    // Initialize with data from local storage
    setNotifications(getNotifications());
    setAnnouncements(getAnnouncements());
    
    // Subscribe to notification events
    const notificationUnsub = subscribeToEvent('notification', (newNotification) => {
      if (newNotification && newNotification.type === 'notification') {
        setNotifications(prev => [newNotification.data, ...prev]);
      }
    });
    
    // Subscribe to announcement events
    const announcementUnsub = subscribeToEvent('announcement', (newAnnouncement) => {
      if (newAnnouncement && newAnnouncement.type === 'announcement') {
        setAnnouncements(prev => [newAnnouncement.data, ...prev]);
      }
    });
    
    return () => {
      notificationUnsub();
      announcementUnsub();
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    markNotificationAsRead(id);
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    markAllNotificationsAsRead();
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'time' | 'read'>) => {
    const newNotification = addLocalNotification(notification);
    setNotifications(prev => [newNotification, ...prev]);
  };

  const addAnnouncement = (announcement: Omit<Announcement, 'id'>) => {
    const newAnnouncement = addLocalAnnouncement(announcement);
    setAnnouncements(prev => [newAnnouncement, ...prev]);
  };

  const deleteAnnouncement = (id: number) => {
    deleteLocalAnnouncement(id);
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

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

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
