
import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useHomeRoutes } from '@/hooks/use-home-routes';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTextSize } from '@/contexts/TextSizeContext';
import { getTextSizeClass } from '@/utils/textSizeUtils';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import RouteCard from '@/components/bus-map/RouteCard';
import RouteDetailsSheet from '@/components/bus-map/RouteDetailsSheet';

interface BusMapProps {
  searchQuery: string;
}

const BusMap: React.FC<BusMapProps> = ({ searchQuery }) => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const { toast } = useToast();
  const [mapError, setMapError] = useState(false);
  const isMobile = useIsMobile();
  const { textSize } = useTextSize();
  
  const textSizeClass = getTextSizeClass(textSize);
  
  const { routes: allRoutes = [], isLoading } = useHomeRoutes();
  
  // Filter routes based on search query
  const filteredRoutes = searchQuery 
    ? allRoutes.filter(route => 
        route.routeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.stops.some(stop => stop.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        route.busNumber.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allRoutes.slice(0, 6); // Show first 6 routes when no search query

  if (isLoading) {
    return (
      <div className="w-full space-y-4">
        <div className="rounded-lg overflow-hidden border border-border bg-card shadow-sm flex items-center justify-center" style={{ height: isMobile ? '450px' : '500px' }}>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-college-blue"></div>
        </div>
      </div>
    );
  }

  if (mapError) {
    return (
      <div className="w-full space-y-4">
        <Card className="p-4 text-center">
          <CardContent className="pt-6 flex flex-col items-center">
            <AlertTriangle className="text-destructive h-12 w-12 mb-3" />
            <h3 className={`text-lg font-medium ${textSizeClass}`}>Unable to load map</h3>
            <p className={`text-muted-foreground mb-4 ${textSizeClass}`}>We encountered an error while loading the map</p>
            <Button 
              onClick={() => window.location.reload()}
              variant="outline"
            >
              Refresh Page
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="w-full space-y-4">
        {/* Google Maps embed with restored height */}
        <div 
          className="rounded-lg overflow-hidden border border-border bg-card shadow-sm" 
          style={{ height: isMobile ? '450px' : '500px' }}
        >
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1vt2BOJ0s6tzEcC5yreazQYUHSO5fNdk&hl=en&ll=13.023234342232842%2C79.80576119292505&z=9"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="REC Bus Routes Map"
          />
        </div>
        
        <div className="space-y-4 sm:space-y-6">
          <h3 className={`font-medium text-lg text-center ${textSizeClass}`}>Available Routes</h3>
          {filteredRoutes.length > 0 ? (
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredRoutes.map(route => (
                <RouteDetailsSheet key={route.id} route={route} isMobile={isMobile}>
                  <RouteCard
                    route={route}
                    isSelected={selectedRoute === route.id}
                    onSelect={() => setSelectedRoute(selectedRoute === route.id ? null : route.id)}
                  />
                </RouteDetailsSheet>
              ))}
            </div>
          ) : (
            <div className="text-center p-6 sm:p-8 bg-muted rounded-lg">
              <p className={`text-muted-foreground ${textSizeClass}`}>No routes found for "{searchQuery}"</p>
              <p className={`mt-1 ${textSize === 0 ? 'text-xs' : textSize === 2 ? 'text-base' : 'text-sm'}`}>Try searching for another boarding point</p>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default BusMap;
