
import React from 'react';
import { useLanguageContext } from '@/contexts/LanguageContext';

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  const { t } = useLanguageContext();
  
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-college-blue visible">{t(title)}</h1>
      {description && <p className="text-gray-600 mt-1 visible">{t(description)}</p>}
    </div>
  );
};

export default PageHeader;
