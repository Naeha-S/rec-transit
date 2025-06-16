
import React from 'react';
import { AnimatedCard } from '@/components/ui/animated-card';
import { useLanguageContext } from '@/contexts/LanguageContext';
import SearchBar from '@/components/SearchBar';
import BusMap from '@/components/BusMap';
import PageHeader from '@/components/PageHeader';
import QuickStatsSection from './QuickStatsSection';
import NotificationsSection from './NotificationsSection';
import { ErrorBoundary } from '@/components/ui/error-boundary';

interface HomeContentProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const HomeContent: React.FC<HomeContentProps> = ({ onSearch, searchQuery }) => {
  const { t } = useLanguageContext();

  return (
    <ErrorBoundary>
      <div className="space-y-4 sm:space-y-6">
        <AnimatedCard className="bg-white dark:bg-gray-800 shadow-md p-4 sm:p-6" hover={false}>
          <PageHeader 
            title="REC Transit System" 
          />
          
          <div className="text-center mb-4 sm:mb-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Your comprehensive bus transportation system connecting students across the campus. 
              Search for routes, view real-time schedules, and plan your journey with ease. 
              Stay updated with the latest bus timings and route information.
            </p>
          </div>
          
          <div className="flex justify-center w-full animate-fade-in" style={{ animationDelay: '400ms' }}>
            <SearchBar onSearch={onSearch} />
          </div>
          
          <QuickStatsSection />
        </AnimatedCard>
        
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          <AnimatedCard 
            title={t('interactiveMap')}
            className="shadow-md"
            delay={600}
          >
            <p className="text-sm text-muted-foreground mb-4 animate-fade-in" style={{ animationDelay: '700ms' }}>
              {t('viewBusLocations')}
            </p>
            <BusMap searchQuery={searchQuery} />
          </AnimatedCard>

          <div className="animate-fade-in" style={{ animationDelay: '800ms' }}>
            <NotificationsSection />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default HomeContent;
