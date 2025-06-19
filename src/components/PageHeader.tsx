
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
  
  // Clean and professional heading styles
  const getSizeClass = () => {
    if (size === 'large') return 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight';
    if (size === 'xl') return 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight';
    return baseHeadingClass;
  };
  
  return (
    <div className={`mb-6 text-center ${className}`}>
      <h1 className={`text-college-blue ${getSizeClass()} animate-fade-in font-sans`}>
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
