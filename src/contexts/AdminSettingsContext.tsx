
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminSettings {
  busesReturningAfter5: number;
}

interface AdminSettingsContextType {
  settings: AdminSettings;
  updateBusesReturningAfter5: (count: number) => void;
}

const AdminSettingsContext = createContext<AdminSettingsContextType | undefined>(undefined);

export const AdminSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AdminSettings>({
    busesReturningAfter5: 10, // Default value
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
      } catch (error) {
        console.error('Failed to parse admin settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('adminSettings', JSON.stringify(settings));
  }, [settings]);

  const updateBusesReturningAfter5 = (count: number) => {
    setSettings(prev => ({
      ...prev,
      busesReturningAfter5: count,
    }));
  };

  return (
    <AdminSettingsContext.Provider value={{
      settings,
      updateBusesReturningAfter5,
    }}>
      {children}
    </AdminSettingsContext.Provider>
  );
};

export const useAdminSettings = () => {
  const context = useContext(AdminSettingsContext);
  if (context === undefined) {
    throw new Error('useAdminSettings must be used within an AdminSettingsProvider');
  }
  return context;
};
