
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Holiday {
  date: Date;
  reason: string;
  isActive: boolean;
}

interface HolidayContextType {
  isHolidayActive: boolean;
  holidayData: Holiday | null;
  declareHoliday: (date: Date, reason: string) => void;
  cancelHoliday: () => void;
}

const HolidayContext = createContext<HolidayContextType | undefined>(undefined);

export const HolidayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [holidayData, setHolidayData] = useState<Holiday | null>(null);
  const [isHolidayActive, setIsHolidayActive] = useState<boolean>(false);
  const { toast } = useToast();
  
  // Load holiday data from localStorage on component mount
  useEffect(() => {
    const savedHoliday = localStorage.getItem('holidayData');
    if (savedHoliday) {
      try {
        const parsed = JSON.parse(savedHoliday);
        const holidayDate = new Date(parsed.date);
        
        setHolidayData({
          date: holidayDate,
          reason: parsed.reason,
          isActive: parsed.isActive
        });
        
        setIsHolidayActive(parsed.isActive);
      } catch (error) {
        console.error('Error parsing holiday data from localStorage', error);
      }
    }
  }, []);
  
  const declareHoliday = (date: Date, reason: string) => {
    const newHoliday = {
      date,
      reason,
      isActive: true
    };
    
    setHolidayData(newHoliday);
    setIsHolidayActive(true);
    
    // Save to localStorage
    localStorage.setItem('holidayData', JSON.stringify(newHoliday));
    
    toast({
      title: "Holiday Declared",
      description: `${date.toDateString()} has been declared as a holiday. Reason: ${reason}`,
    });
  };
  
  const cancelHoliday = () => {
    if (holidayData) {
      const canceledHoliday = {
        ...holidayData,
        isActive: false
      };
      
      setHolidayData(canceledHoliday);
      setIsHolidayActive(false);
      
      // Update localStorage
      localStorage.setItem('holidayData', JSON.stringify(canceledHoliday));
      
      toast({
        title: "Holiday Cancelled",
        description: "Normal bus service has been resumed.",
      });
    }
  };
  
  return (
    <HolidayContext.Provider value={{ isHolidayActive, holidayData, declareHoliday, cancelHoliday }}>
      {children}
    </HolidayContext.Provider>
  );
};

export const useHolidayContext = (): HolidayContextType => {
  const context = useContext(HolidayContext);
  if (context === undefined) {
    throw new Error('useHolidayContext must be used within a HolidayProvider');
  }
  return context;
};
