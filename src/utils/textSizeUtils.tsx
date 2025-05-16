
import React, { ReactNode } from 'react';
import { useTextSize } from '@/contexts/TextSizeContext';

interface TextSizeWrapperProps {
  children: ReactNode;
  className?: string;
}

export const TextSizeWrapper: React.FC<TextSizeWrapperProps> = ({ children, className = '' }) => {
  const { textSize } = useTextSize();
  
  const getTextSizeClass = () => {
    switch(textSize) {
      case 0: return 'text-sm';
      case 2: return 'text-lg';
      default: return 'text-base';
    }
  };

  return (
    <div className={`${getTextSizeClass()} ${className}`}>
      {children}
    </div>
  );
};

export const getTextSizeClass = (textSize: number): string => {
  switch(textSize) {
    case 0: return 'text-sm';
    case 2: return 'text-lg';
    default: return 'text-base';
  }
};
