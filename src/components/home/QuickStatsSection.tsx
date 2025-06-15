
import React from 'react';
import { Bus, Clock, MapPin, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { useAdminSettings } from '@/contexts/AdminSettingsContext';

const QuickStatsSection: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { t } = useLanguageContext();
  const { settings } = useAdminSettings();

  const quickStats = [
    { id: 1, icon: Bus, label: t('totalBuses'), value: '131', color: 'bg-college-blue' },
    { id: 2, icon: ArrowLeft, label: 'Return after 5', value: settings.busesReturningAfter5.toString(), color: 'bg-purple-600' },
    { id: 3, icon: Clock, label: 'First Pickup', value: '5:30 AM', color: 'bg-college-orange' },
    { id: 4, icon: MapPin, label: t('boardingPoints'), value: '900+ stops', color: 'bg-green-600' },
  ];

  return (
    <div className="mt-4 sm:mt-6">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{t('quickStats')}</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate('/buses')}
          className="text-xs sm:text-sm px-3 py-2"
        >
          View All Buses
        </Button>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {quickStats.map(stat => (
          <Card key={stat.id} className="border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6 flex flex-col items-center justify-center text-center min-h-[120px] sm:min-h-[140px]">
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${stat.color} flex items-center justify-center text-white mb-3 sm:mb-4`}>
                <stat.icon size={isMobile ? 24 : 28} />
              </div>
              <div className="space-y-1">
                <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-tight">{stat.label}</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuickStatsSection;
