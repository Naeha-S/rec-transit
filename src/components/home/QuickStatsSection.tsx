
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
    { id: 2, icon: ArrowLeft, label: 'Buses Returning After 5', value: settings.busesReturningAfter5.toString(), color: 'bg-purple-600' },
    { id: 3, icon: Clock, label: 'First Pickup', value: '5:30 AM', color: 'bg-college-orange' },
    { id: 4, icon: MapPin, label: t('boardingPoints'), value: '900+ stops', color: 'bg-green-600' },
  ];

  return (
    <div className="mt-4 sm:mt-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-base sm:text-lg font-semibold">{t('quickStats')}</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate('/buses')}
          className="text-xs sm:text-sm"
        >
          View All Buses
        </Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {quickStats.map(stat => (
          <Card key={stat.id} className="border shadow-sm">
            <CardContent className="p-3 sm:p-4 flex flex-col items-center justify-center text-center">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${stat.color} flex items-center justify-center text-white mb-2`}>
                <stat.icon size={isMobile ? 20 : 24} />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-lg sm:text-2xl font-semibold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuickStatsSection;
