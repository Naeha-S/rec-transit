
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Notification {
  id: number;
  type: 'alert' | 'delay' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface Announcement {
  id: number;
  title: string;
  message: string;
}

interface NotificationContextType {
  notifications: Notification[];
  announcements: Announcement[];
  unreadCount: number;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'time' | 'read'>) => void;
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => void;
  deleteAnnouncement: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'alert',
      title: 'Route Change for Bus 15A',
      message: 'Due to road construction, Bus 15A will take an alternate route via Mount-Poonamalle Road.',
      time: '10 min ago',
      read: false
    },
    {
      id: 2,
      type: 'delay',
      title: 'Bus 23B Delayed',
      message: 'Bus 23B from Tambaram is running 15 minutes late due to heavy traffic.',
      time: '25 min ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'New Bus Added',
      message: 'A new bus (35C) has been added from Velachery to college starting next week.',
      time: '2 hours ago',
      read: true
    }
  ]);

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    { id: 1, title: 'Special Schedule', message: 'Exam time buses run at special times. Check the exam timings page for details.' }
  ]);

  useEffect(() => {
    // This would typically fetch from a database
    // For now we use the initial state defined above
    
    // Setup listener for real-time updates if using Supabase Realtime
    // This is a placeholder for future implementation
    const channel = supabase
      .channel('public-notifications')
      .on('broadcast', { event: 'notification' }, (payload) => {
        if (payload.payload && payload.payload.type === 'notification') {
          const newNotification = payload.payload.data;
          setNotifications(prev => [newNotification, ...prev]);
        }
        
        if (payload.payload && payload.payload.type === 'announcement') {
          const newAnnouncement = payload.payload.data;
          setAnnouncements(prev => [newAnnouncement, ...prev]);
        }
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'time' | 'read'>) => {
    const newNotification = {
      ...notification,
      id: Date.now(),
      time: 'just now',
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
    
    // Broadcast to other clients using Supabase Realtime
    supabase.channel('public-notifications').send({
      type: 'broadcast',
      event: 'notification',
      payload: { 
        type: 'notification',
        data: newNotification
      }
    });
  };

  const addAnnouncement = (announcement: Omit<Announcement, 'id'>) => {
    const newAnnouncement = {
      ...announcement,
      id: Date.now(),
    };
    setAnnouncements(prev => [newAnnouncement, ...prev]);
    
    // Broadcast to other clients
    supabase.channel('public-notifications').send({
      type: 'broadcast',
      event: 'notification',
      payload: { 
        type: 'announcement',
        data: newAnnouncement
      }
    });
  };

  const deleteAnnouncement = (id: number) => {
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
