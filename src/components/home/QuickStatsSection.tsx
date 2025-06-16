
import React from 'react';
import { Bus, Clock, MapPin, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { useAdminSettings } from '@/contexts/AdminSettingsContext';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

const QuickStatsSection: React.FC = () => {
  // Navigation and context hooks
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { t } = useLanguageContext();
  const { settings } = useAdminSettings();
  const { isExamModeActive } = useAdminAuth();

  // Quick stats data with navigation handlers
  const quickStats = [
    { 
      id: 1, 
      icon: Bus, 
      label: t('totalBuses'), 
      value: '131', 
      color: 'bg-college-blue',
      onClick: () => navigate('/buses')
    },
    { 
      id: 2, 
      icon: ArrowLeft, 
      label: 'Return after 5', 
      value: `${settings.busesReturningAfter5} Buses`, 
      color: 'bg-purple-600',
      onClick: () => navigate('/schedules')
    },
    { 
      id: 3, 
      icon: Clock, 
      label: 'Return after 3:15 pm', 
      value: `${settings.busesReturningAfter315} buses`, 
      color: 'bg-college-orange',
      // Navigate to exam timings if exam mode is active, otherwise to buses page
      onClick: () => {
        if (isExamModeActive) {
          navigate('/exam-timings');
        } else {
          navigate('/buses');
        }
      }
    },
    { 
      id: 4, 
      icon: MapPin, 
      label: t('boardingPoints'), 
      value: '900+ stops', 
      color: 'bg-green-600',
      onClick: () => {}
    },
  ];

  return (
    <div className="mt-4 sm:mt-6">
      {/* Section header with view all buses button */}
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
      
      {/* Quick stats grid layout */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {quickStats.map(stat => (
          <Card 
            key={stat.id} 
            className="border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={stat.onClick}
          >
            <CardContent className="p-2 sm:p-6 flex flex-col items-center justify-center text-center min-h-[100px] sm:min-h-[140px]">
              {/* Stat icon with colored background */}
              <div className={`w-8 h-8 sm:w-14 sm:h-14 rounded-full ${stat.color} flex items-center justify-center text-white mb-2 sm:mb-4`}>
                <stat.icon size={isMobile ? 16 : 28} />
              </div>
              {/* Stat label and value */}
              <div className="space-y-1">
                <p className="text-[10px] sm:text-sm text-muted-foreground font-medium leading-tight">{stat.label}</p>
                <p className="text-sm sm:text-2xl lg:text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuickStatsSection;
