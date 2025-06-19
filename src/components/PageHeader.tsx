
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
  
  // Enhanced size classes for better typography
  const getSizeClass = () => {
    if (size === 'large') return 'text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight';
    if (size === 'xl') return 'text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight';
    return baseHeadingClass;
  };
  
  return (
    <div className={`mb-6 text-center ${className}`}>
      <h1 className={`bg-gradient-to-r from-college-blue via-blue-600 to-college-blue bg-clip-text text-transparent ${getSizeClass()} animate-fade-in drop-shadow-sm`}>
        {t(title)}
      </h1>
      {description && (
        <p className={`text-gray-600 dark:text-gray-300 mt-3 ${subtextClass} animate-fade-in max-w-2xl mx-auto leading-relaxed`}>
          {t(description)}
        </p>
      )}
    </div>
  );
};

export default PageHeader;
