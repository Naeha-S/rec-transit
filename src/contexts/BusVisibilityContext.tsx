
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface BusVisibilitySettings {
  [busId: string]: {
    morning: boolean;
    evening: boolean;
    exam: boolean;
    allBuses: boolean;
  };
}

interface BusVisibilityContextType {
  busVisibility: BusVisibilitySettings;
  updateBusVisibility: (busId: string, timeSlot: 'morning' | 'evening' | 'exam' | 'allBuses', visible: boolean) => void;
  isBusVisible: (busId: string, timeSlot: 'morning' | 'evening' | 'exam' | 'allBuses') => boolean;
}

const BusVisibilityContext = createContext<BusVisibilityContextType | undefined>(undefined);

export const BusVisibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [busVisibility, setBusVisibility] = useState<BusVisibilitySettings>({});

  // Load visibility settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('busVisibilitySettings');
    if (savedSettings) {
      setBusVisibility(JSON.parse(savedSettings));
    }
  }, []);

  // Save to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem('busVisibilitySettings', JSON.stringify(busVisibility));
  }, [busVisibility]);

  const updateBusVisibility = (busId: string, timeSlot: 'morning' | 'evening' | 'exam' | 'allBuses', visible: boolean) => {
    setBusVisibility(prev => ({
      ...prev,
      [busId]: {
        ...prev[busId],
        [timeSlot]: visible
      }
    }));
  };

  const isBusVisible = (busId: string, timeSlot: 'morning' | 'evening' | 'exam' | 'allBuses') => {
    return busVisibility[busId]?.[timeSlot] ?? true; // Default to visible if not set
  };

  return (
    <BusVisibilityContext.Provider value={{
      busVisibility,
      updateBusVisibility,
      isBusVisible
    }}>
      {children}
    </BusVisibilityContext.Provider>
  );
};

export const useBusVisibility = (): BusVisibilityContextType => {
  const context = useContext(BusVisibilityContext);
  if (context === undefined) {
    throw new Error('useBusVisibility must be used within a BusVisibilityProvider');
  }
  return context;
};
