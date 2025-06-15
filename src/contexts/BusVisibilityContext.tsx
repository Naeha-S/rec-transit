
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface BusVisibilitySettings {
  [busId: string]: {
    allBuses: boolean;
    tenAm: boolean;
    fivePm: boolean;
    exam: boolean;
  };
}

interface BusVisibilityContextType {
  busVisibility: BusVisibilitySettings;
  updateBusVisibility: (busId: string, timeSlot: 'allBuses' | 'tenAm' | 'fivePm' | 'exam', visible: boolean) => void;
  isBusVisible: (busId: string, timeSlot: 'allBuses' | 'tenAm' | 'fivePm' | 'exam') => boolean;
  saveSettings: () => void;
}

const BusVisibilityContext = createContext<BusVisibilityContextType | undefined>(undefined);

export const BusVisibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [busVisibility, setBusVisibility] = useState<BusVisibilitySettings>({});

  // Load visibility settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('busVisibilitySettings');
    if (savedSettings) {
      try {
        setBusVisibility(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Error parsing saved bus visibility settings:', error);
      }
    }
  }, []);

  const updateBusVisibility = (busId: string, timeSlot: 'allBuses' | 'tenAm' | 'fivePm' | 'exam', visible: boolean) => {
    setBusVisibility(prev => ({
      ...prev,
      [busId]: {
        allBuses: prev[busId]?.allBuses ?? true,
        tenAm: prev[busId]?.tenAm ?? true,
        fivePm: prev[busId]?.fivePm ?? true,
        exam: prev[busId]?.exam ?? true,
        ...prev[busId],
        [timeSlot]: visible
      }
    }));
  };

  const isBusVisible = (busId: string, timeSlot: 'allBuses' | 'tenAm' | 'fivePm' | 'exam') => {
    return busVisibility[busId]?.[timeSlot] ?? true; // Default to visible if not set
  };

  const saveSettings = () => {
    localStorage.setItem('busVisibilitySettings', JSON.stringify(busVisibility));
  };

  // Auto-save on changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('busVisibilitySettings', JSON.stringify(busVisibility));
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [busVisibility]);

  return (
    <BusVisibilityContext.Provider value={{
      busVisibility,
      updateBusVisibility,
      isBusVisible,
      saveSettings
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
