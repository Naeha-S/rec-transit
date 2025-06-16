
import React from 'react';
import { Bus } from "lucide-react";
import { useLanguageContext } from '@/contexts/LanguageContext';
import { AnimatedButton } from '@/components/ui/animated-button';
import { FadeIn } from '@/components/ui/fade-in';
import type { BusRoute } from '@/hooks/use-bus-data';

interface BusGridProps {
  routes: BusRoute[];
  statusColors: Record<string, string>;
  onSelectRoute: (route: BusRoute) => void;
}

const BusGrid: React.FC<BusGridProps> = ({ routes, statusColors, onSelectRoute }) => {
  const { t } = useLanguageContext();

  // No routes found state
  if (routes.length === 0) {
    return (
      <FadeIn>
        <div className="text-center py-8">
          <Bus className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-lg font-semibold">{t('noRoutesFound')}</h3>
          <p className="text-sm text-muted-foreground">{t('tryDifferentSearch')}</p>
        </div>
      </FadeIn>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {routes.map((route, index) => (
        <FadeIn key={route.id} delay={index * 50}>
          <div 
            className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-all duration-300 text-center transform hover:scale-105 hover:shadow-lg"
            onClick={() => onSelectRoute(route)}
          >
            {/* Bus route header with enhanced styling */}
            <div className="flex flex-col items-center mb-3">
              <div className="bg-college-blue text-white font-bold h-10 w-10 rounded-full flex items-center justify-center mb-2 transition-transform duration-200 hover:scale-110 shadow-md">
                {route.routeNumber}
              </div>
              <div className="font-medium text-gray-900 hover:text-college-blue transition-colors">
                {route.origin} to College
              </div>
            </div>
            
            {/* Route timing information */}
            <div className="mb-2">
              <div className="text-sm text-muted-foreground">
                {route.departureTime} - {route.arrivalTime}
              </div>
            </div>
            
            {/* Enhanced view details button */}
            <AnimatedButton
              variant="outline" 
              size="sm" 
              className="w-full mt-2"
              animation="scale"
              onClick={(e) => {
                e.stopPropagation();
                onSelectRoute(route);
              }}
            >
              {t('viewDetails')}
            </AnimatedButton>
          </div>
        </FadeIn>
      ))}
    </div>
  );
};

export default BusGrid;
