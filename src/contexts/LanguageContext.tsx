
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
      
      // Feedback form strings
      'feedbackSubmitted': 'Feedback Submitted',
      'thanksForFeedback': 'Thank you for your feedback! We\'ll review it soon.',
      'errorSendingFeedback': 'There was an error sending your feedback. Please try again.',
      'sendFeedback': 'Send Feedback',
      'reportIssuesOrSuggest': 'Report issues or suggest improvements for our transit system',
      'name': 'Name',
      'yourName': 'Your name',
      'email': 'Email',
      'yourEmail': 'your.email@example.com',
      'busNumber': 'Bus Number',
      'exampleBusNumber': 'e.g. 15A',
      'feedbackType': 'Feedback Type',
      'selectType': 'Select type',
      'reportIssue': 'Report an Issue',
      'suggestion': 'Suggestion',
      'complaint': 'Complaint',
      'praise': 'Praise',
      'message': 'Message',
      'describeFeedback': 'Please describe your feedback in detail...',
      'submitting': 'Submitting...',
      'submitFeedback': 'Submit Feedback',
      
      // Holiday related strings
      'holidays': 'Holidays',
      'holidayMode': 'Holiday Mode',
      'declareHoliday': 'Declare Holiday',
      'holidayDate': 'Holiday Date',
      'holidayReason': 'Holiday Reason',
      'enterReasonForHoliday': 'Enter reason for holiday',
      'holidayAnnouncement': 'Holiday Announcement',
      'holidayDeclared': 'Holiday Declared',
      'holidayAnnouncedToUsers': 'Holiday has been announced to all users',
      'noServiceOn': 'No service on',
      'holidayCancelled': 'Holiday Cancelled',
      'normalServiceResumed': 'Normal service has resumed',
      'busesDisabledDueToHoliday': 'Buses are disabled due to holiday',
      'examBusesDisabledDueToHoliday': 'Exam buses are disabled due to holiday',
      'holidayActive': 'Holiday Active',
      'manageHoliday': 'Manage Holiday',
      'holidayInformation': 'Holiday Information',
      'date': 'Date',
      'reason': 'Reason',
      'cancelHoliday': 'Cancel Holiday',
      'holidayEffects': 'Holiday Effects',
      'whatHappensWhenHolidayDeclared': 'What happens when a holiday is declared',
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
