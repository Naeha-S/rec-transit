
import React from 'react';
import SearchBar from '@/components/SearchBar';
import QuickStatsSection from './QuickStatsSection';
import NotificationsSection from './NotificationsSection';
import { useLanguageContext } from '@/contexts/LanguageContext';

interface HomeContentProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const HomeContent: React.FC<HomeContentProps> = ({ onSearch, searchQuery }) => {
  const { t } = useLanguageContext();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="text-center py-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {t('welcomeToREC')}
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8">
          {t('yourCompleteTransportGuide')}
        </p>
        
        <div className="max-w-2xl mx-auto">
          <SearchBar onSearch={onSearch} />
        </div>
      </div>

      {/* Quick Stats Section */}
      <QuickStatsSection />
      
      {/* Notifications Section */}
      <NotificationsSection />
    </div>
  );
};

export default HomeContent;
