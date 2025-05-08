
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguageContext } from '@/contexts/LanguageContext';
import type { BusRoute } from '@/hooks/use-bus-data';

interface BusDetailsProps {
  route: BusRoute;
  onBack: () => void;
  statusColors: Record<string, string>;
}

const BusDetails: React.FC<BusDetailsProps> = ({ route, onBack, statusColors }) => {
  const { t } = useLanguageContext();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft size={16} className="mr-1" />
            {t('back')}
          </Button>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-medium mr-2">{t('route')}:</span>
          <span className="font-bold">{route.routeNumber}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{t('routeDetails')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-y-2">
                <div className="text-sm font-medium">{t('route')}:</div>
                <div className="text-sm">{route.origin} to College</div>
                
                <div className="text-sm font-medium">{t('firstStop')}:</div>
                <div className="text-sm">{route.stops[0]?.name || route.origin}</div>
                
                <div className="text-sm font-medium">{t('departure')}:</div>
                <div className="text-sm">{route.departureTime}</div>
                
                <div className="text-sm font-medium">{t('collegeArrival')}:</div>
                <div className="text-sm">{route.arrivalTime}</div>
                
                <div className="text-sm font-medium">{t('busType')}:</div>
                <div className="text-sm">{route.busType}</div>
                
                <div className="text-sm font-medium">{t('status')}:</div>
                <div className="text-sm">
                  <span className={`px-2 py-0.5 rounded text-xs ${statusColors[route.status]}`}>
                    {route.status === "on-time" ? t('onTime') : 
                     route.status === "delayed" ? t('delayed') : t('cancelled')}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{t('stops')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bus-details-scroll">
              <ScrollArea className="h-[300px] rounded-md border">
                <div className="p-4">
                  {route.stops.map((stop, idx) => (
                    <div key={idx} className="mb-3 pb-3 border-b last:border-0">
                      <div className="flex justify-between items-center">
                        <div className="text-sm font-medium">
                          {stop.name} 
                          {stop.name === "College" && <span className="text-xs text-green-600 ml-1">(Destination)</span>}
                        </div>
                        <div className="text-sm text-muted-foreground">{stop.arrivalTime}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusDetails;
