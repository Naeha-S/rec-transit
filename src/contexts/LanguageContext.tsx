
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations, TranslationDictionary } from '@/translations';

type LanguageType = 'en' | 'ta' | 'hi';

interface LanguageContextType {
  language: LanguageType;
  changeLanguage: (lang: LanguageType) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageType>('en');

  const changeLanguage = (lang: LanguageType) => {
    setLanguage(lang);
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    // English translations for new UI strings that may not be in translations yet
    const extraTranslations: { [key: string]: string } = {
      // Header and notification strings
      'markAllAsRead': 'Mark All as Read',
      'noNewNotifications': 'No new notifications',
      'viewAllNotifications': 'View All Notifications',
      
      // Admin panel strings
      'sendNewNotifications': 'Send New Notifications',
      'notificationTitle': 'Enter notification title',
      'notificationMessage': 'Enter notification message',
      'sendNotification': 'Send Notification',
      'notificationAdded': 'Notification Added',
      'notificationAddedDesc': 'Your notification has been sent to all users',
      'announcementAdded': 'Announcement Added',
      'announcementAddedDesc': 'Your announcement has been published',
      'announcementDeleted': 'Announcement deleted',
      'information': 'Information',
      'delay': 'Delay',
      'alert': 'Alert',
      'type': 'Type',
      'fillAllFields': 'Please fill in all fields',
      
      // Notification component strings
      'recentUpdatesAndAlerts': 'Recent updates and alerts for your bus routes',
      'new': 'New',
      'noNotifications': 'No notifications at this time',
      
      // Bus related strings
      'boardingPoints': 'Boarding Points',
      'noRoutesFound': 'No routes found',
      'tryDifferentSearch': 'Try a different search term',
      'onTime': 'On time',
      'delayed': 'Delayed',
      'cancelled': 'Cancelled',
      'route': 'Route',
      'routeDetails': 'Route Details',
      'busType': 'Bus Type',
    };
    
    const currentTranslation = language !== 'en' ? translations[language]?.[key as keyof TranslationDictionary] : undefined;
    const englishTranslation = translations.en[key as keyof TranslationDictionary] || extraTranslations[key];
    
    return currentTranslation || englishTranslation || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
};
