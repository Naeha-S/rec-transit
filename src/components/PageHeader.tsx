
import React from 'react';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { useTextSize } from '@/contexts/TextSizeContext';
import { getHeadingTextSizeClass, getSubtextSizeClass } from '@/utils/textSizeUtils';

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, className = '' }) => {
  const { t } = useLanguageContext();
  const { textSize } = useTextSize();
  
  const headingClass = getHeadingTextSizeClass(textSize);
  const subtextClass = getSubtextSizeClass(textSize);
  
  return (
    <div className={`mb-6 text-center ${className}`}>
      <h1 className={`font-bold text-college-blue ${headingClass}`}>{t(title)}</h1>
      {description && (
        <p className={`text-gray-600 dark:text-gray-300 mt-1 ${subtextClass}`}>
          {t(description)}
        </p>
      )}
    </div>
  );
};

export default PageHeader;
