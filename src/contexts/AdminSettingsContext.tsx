
import React, { createContext, useContext, useState, useEffect } from 'react';

// Type definitions for admin settings
interface AdminSettings {
  busesReturningAfter5: number;
  busesReturningAfter315: number; // New setting for 3:15 PM return buses
}

interface AdminSettingsContextType {
  settings: AdminSettings;
  updateBusesReturningAfter5: (count: number) => void;
  updateBusesReturningAfter315: (count: number) => void; // New update function
}

// Create context with undefined default
const AdminSettingsContext = createContext<AdminSettingsContextType | undefined>(undefined);

// Provider component for admin settings context
export const AdminSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Settings state with default values
  const [settings, setSettings] = useState<AdminSettings>({
    busesReturningAfter5: 10, // Default value for 5 PM return buses
    busesReturningAfter315: 65, // Default value for 3:15 PM return buses
  });

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prevSettings => ({
          ...prevSettings,
          ...parsed
        }));
      } catch (error) {
        console.error('Failed to parse admin settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('adminSettings', JSON.stringify(settings));
  }, [settings]);

  // Update function for buses returning after 5 PM
  const updateBusesReturningAfter5 = (count: number) => {
    setSettings(prev => ({
      ...prev,
      busesReturningAfter5: count,
    }));
  };

  // Update function for buses returning after 3:15 PM
  const updateBusesReturningAfter315 = (count: number) => {
    setSettings(prev => ({
      ...prev,
      busesReturningAfter315: count,
    }));
  };

  // Context provider with settings and update functions
  return (
    <AdminSettingsContext.Provider value={{
      settings,
      updateBusesReturningAfter5,
      updateBusesReturningAfter315,
    }}>
      {children}
    </AdminSettingsContext.Provider>
  );
};

// Hook to use admin settings context
export const useAdminSettings = () => {
  const context = useContext(AdminSettingsContext);
  if (context === undefined) {
    throw new Error('useAdminSettings must be used within an AdminSettingsProvider');
  }
  return context;
};
