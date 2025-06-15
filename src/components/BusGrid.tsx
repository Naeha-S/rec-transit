
import React from 'react';
import { Button } from "@/components/ui/button";
import { Bus } from "lucide-react";
import { useLanguageContext } from '@/contexts/LanguageContext';
import type { BusRoute } from '@/hooks/use-bus-data';

interface BusGridProps {
  routes: BusRoute[];
  statusColors: Record<string, string>;
  onSelectRoute: (route: BusRoute) => void;
}

const BusGrid: React.FC<BusGridProps> = ({ routes, statusColors, onSelectRoute }) => {
  const { t } = useLanguageContext();

  // Debug logging to see what routes are being passed
  console.log("BusGrid received routes:", routes.length, routes);

  if (routes.length === 0) {
    return (
      <div className="text-center py-8">
        <Bus className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-2 text-lg font-semibold">{t('noRoutesFound')}</h3>
        <p className="text-sm text-muted-foreground">{t('tryDifferentSearch')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {routes.map((route, index) => {
        // Add index to key to ensure uniqueness even if IDs are duplicated
        const uniqueKey = `${route.id}-${index}`;
        console.log("Rendering route:", route.routeNumber, route.origin, "Key:", uniqueKey);
        
        return (
          <div 
            key={uniqueKey} 
            className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors"
            onClick={() => onSelectRoute(route)}
          >
            <div className="flex items-center mb-2">
              <div className="bg-college-blue text-white font-bold h-10 w-10 rounded-full flex items-center justify-center mr-3">
                {route.routeNumber}
              </div>
              <div>
                <span className={`px-2 py-0.5 rounded text-xs ${statusColors[route.status]}`}>
                  {route.status === "on-time" ? t('onTime') : 
                   route.status === "delayed" ? t('delayed') : t('cancelled')}
                </span>
              </div>
            </div>
            <div className="mb-2">
              <div className="font-medium">{route.origin} to College</div>
              <div className="text-sm text-muted-foreground">
                {route.departureTime} - {route.arrivalTime}
              </div>
              {/* Show matching stops for debugging */}
              <div className="text-xs text-muted-foreground mt-1">
                Stops: {route.stops.slice(0, 3).map(stop => stop.name).join(', ')}
                {route.stops.length > 3 && '...'}
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-2"
              onClick={(e) => {
                e.stopPropagation();
                onSelectRoute(route);
              }}
            >
              {t('viewDetails')}
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default BusGrid;
