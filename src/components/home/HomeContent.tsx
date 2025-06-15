
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguageContext } from '@/contexts/LanguageContext';
import SearchBar from '@/components/SearchBar';
import BusMap from '@/components/BusMap';
import PageHeader from '@/components/PageHeader';
import QuickStatsSection from './QuickStatsSection';
import NotificationsSection from './NotificationsSection';

interface HomeContentProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const HomeContent: React.FC<HomeContentProps> = ({ onSearch, searchQuery }) => {
  const { t } = useLanguageContext();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
        <PageHeader 
          title="REC Transit System" 
        />
        
        <div className="text-center mb-4 sm:mb-6">
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Your comprehensive bus transportation system connecting students across the campus. 
            Search for routes, view real-time schedules, and plan your journey with ease. 
            Stay updated with the latest bus timings and route information.
          </p>
        </div>
        
        <div className="flex justify-center w-full">
          <SearchBar onSearch={onSearch} />
        </div>
        
        <QuickStatsSection />
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base sm:text-lg">{t('interactiveMap')}</CardTitle>
            <CardDescription>{t('viewBusLocations')}</CardDescription>
          </CardHeader>
          <CardContent>
            <BusMap searchQuery={searchQuery} />
          </CardContent>
        </Card>

        <NotificationsSection />
      </div>
    </div>
  );
};

export default HomeContent;
