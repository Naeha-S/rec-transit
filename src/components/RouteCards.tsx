
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Bus, Clock, User, Phone } from 'lucide-react';
import { useHomeRoutes } from '@/hooks/use-home-routes';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';

const RouteCards = () => {
  const { routes, loading, error } = useHomeRoutes();
  const { t } = useLanguageContext();
  const isMobile = useIsMobile();

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="border shadow-sm animate-pulse">
            <CardContent className="p-3 sm:p-4">
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
      {routes.map((route) => (
        <Card key={route.id} className="border shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-college-blue text-white font-bold h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center text-sm sm:text-base">
                {route.busNumber}
              </div>
              <Bus className="text-college-blue" size={isMobile ? 16 : 20} />
            </div>
            
            <div className="space-y-1">
              <h3 className="font-medium text-xs sm:text-sm line-clamp-2">
                {route.routeName}
              </h3>
              
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock size={12} />
                <span>{route.departureTime}</span>
              </div>
              
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <User size={12} />
                <span className="truncate">{route.driverName}</span>
              </div>
              
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Phone size={12} />
                <span className="truncate">{route.contactNumber}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RouteCards;
