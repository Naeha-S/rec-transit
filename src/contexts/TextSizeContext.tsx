
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type TextSizeContextType = {
  textSize: number;
  setTextSize: (size: number) => void;
};

const TextSizeContext = createContext<TextSizeContextType | undefined>(undefined);

// localStorage key for persisting the text size preference
const TEXT_SIZE_STORAGE_KEY = 'rec-transit-text-size';

export const TextSizeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize from localStorage if available, otherwise use medium (1)
  const [textSize, setTextSize] = useState(() => {
    const savedSize = localStorage.getItem(TEXT_SIZE_STORAGE_KEY);
    return savedSize ? parseInt(savedSize, 10) : 1; // Default: Medium (0=Small, 1=Medium, 2=Large)
  });

  // Update localStorage when text size changes
  useEffect(() => {
    localStorage.setItem(TEXT_SIZE_STORAGE_KEY, textSize.toString());
  }, [textSize]);

  return (
    <TextSizeContext.Provider value={{ textSize, setTextSize }}>
      {children}
    </TextSizeContext.Provider>
  );
};

export const useTextSize = () => {
  const context = useContext(TextSizeContext);
  if (context === undefined) {
    throw new Error('useTextSize must be used within a TextSizeProvider');
  }
  return context;
};
