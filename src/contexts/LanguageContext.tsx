
import React, { createContext, useContext, useState, ReactNode } from 'react';
import translations, { TranslationDictionary } from '@/translations';

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
    const currentTranslation = translations[language]?.[key as keyof TranslationDictionary];
    const englishFallback = translations.en[key as keyof TranslationDictionary];
    
    return currentTranslation || englishFallback || key;
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
