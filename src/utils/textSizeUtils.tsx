
import React, { ReactNode } from 'react';
import { useTextSize } from '@/contexts/TextSizeContext';

interface TextSizeWrapperProps {
  children: ReactNode;
  className?: string;
}

export const TextSizeWrapper: React.FC<TextSizeWrapperProps> = ({ children, className = '' }) => {
  const { textSize } = useTextSize();
  
  const textSizeClass = getTextSizeClass(textSize);

  return (
    <div className={`${textSizeClass} ${className}`}>
      {children}
    </div>
  );
};

export const getTextSizeClass = (textSize: number): string => {
  switch(textSize) {
    case 0: return 'text-xs sm:text-sm lg:text-base'; // Small
    case 2: return 'text-base sm:text-lg md:text-xl lg:text-2xl'; // Large
    default: return 'text-sm sm:text-base lg:text-lg'; // Medium (Default)
  }
};

export const getHeadingTextSizeClass = (textSize: number): string => {
  switch(textSize) {
    case 0: return 'text-base sm:text-lg lg:text-xl'; // Small
    case 2: return 'text-xl sm:text-2xl md:text-3xl lg:text-4xl'; // Large
    default: return 'text-lg sm:text-xl lg:text-2xl'; // Medium (Default)
  }
};

export const getSubtextSizeClass = (textSize: number): string => {
  switch(textSize) {
    case 0: return 'text-xs lg:text-sm'; // Small
    case 2: return 'text-sm sm:text-base lg:text-lg'; // Large
    default: return 'text-xs sm:text-sm lg:text-base'; // Medium (Default)
  }
};
