
import React from 'react';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { useTextSize } from '@/contexts/TextSizeContext';
import { getHeadingTextSizeClass, getSubtextSizeClass } from '@/utils/textSizeUtils';

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  size?: 'default' | 'large' | 'xl';
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, className = '', size = 'default' }) => {
  const { t } = useLanguageContext();
  const { textSize } = useTextSize();
  
  const baseHeadingClass = getHeadingTextSizeClass(textSize);
  const subtextClass = getSubtextSizeClass(textSize);
  
  // Custom size overrides for the main title
  const getSizeClass = () => {
    if (size === 'large') return 'text-3xl sm:text-4xl lg:text-5xl';
    if (size === 'xl') return 'text-4xl sm:text-5xl lg:text-6xl';
    return baseHeadingClass;
  };
  
  return (
    <div className={`mb-6 text-center ${className}`}>
      <h1 className={`font-bold text-college-blue ${getSizeClass()} animate-fade-in`}>
        {t(title)}
      </h1>
      {description && (
        <p className={`text-gray-600 dark:text-gray-300 mt-2 ${subtextClass} animate-fade-in`}>
          {t(description)}
        </p>
      )}
    </div>
  );
};

export default PageHeader;
