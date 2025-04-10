
import React, { useState } from 'react';
import { MapPin, Bus, Clock, AlertTriangle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { fetchBusData } from '@/utils/busData';
import { useQuery } from '@tanstack/react-query';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetDescription,
  SheetClose,
  SheetFooter
} from "@/components/ui/sheet";
import { useIsMobile } from '@/hooks/use-mobile';

interface BusMapProps {
  searchQuery: string;
}

const BusMap: React.FC<BusMapProps> = ({ searchQuery }) => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const { toast } = useToast();
  const [mapError, setMapError] = useState(false);
  const isMobile = useIsMobile();
  
  const { data: allBuses = [], isLoading } = useQuery({
    queryKey: ['buses'],
    queryFn: fetchBusData,
  });
  
  // Filter buses based on search query
  const filteredBuses = searchQuery 
    ? allBuses.filter(bus => 
        bus.routeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bus.stops.some(stop => stop.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        bus.busNumber.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allBuses.slice(0, 5); // Show first 5 buses when no search query

  // Function to handle errors that might occur with the iframe
  const handleIframeError = () => {
    setMapError(true);
    toast({
      title: "Error loading map",
      description: "Please check your internet connection and try again",
      variant: "destructive",
    });
  };

  if (isLoading) {
    return (
      <div className="w-full space-y-4">
        <div className="rounded-lg overflow-hidden border border-border bg-card shadow-sm flex items-center justify-center" style={{ height: '300px' }}>
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
            <h3 className="text-lg font-medium">Unable to load map</h3>
            <p className="text-muted-foreground mb-4">We encountered an error while loading the map</p>
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
    <div className="w-full space-y-4">
      <div className="rounded-lg overflow-hidden border border-border bg-card shadow-sm" style={{ height: '400px' }}>
        <iframe 
          src="https://www.google.com/maps/d/embed?mid=1vt2BOJ0s6tzEcC5yreazQYUHSO5fNdk&ehbc=2E312F&noprof=1" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onError={handleIframeError}
          title="REC Bus Routes"
        ></iframe>
      </div>
      
      <div className="space-y-3">
        <h3 className="font-medium text-lg">Available Routes</h3>
        {filteredBuses.length > 0 ? (
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBuses.map(bus => (
              <Sheet key={bus.id}>
                <SheetTrigger asChild>
                  <Card 
                    className={`cursor-pointer transition-all hover:shadow-md ${selectedRoute === bus.id ? 'ring-2 ring-college-orange' : ''}`}
                    onClick={() => setSelectedRoute(selectedRoute === bus.id ? null : bus.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <Badge className="bg-college-blue hover:bg-college-blue/90">Bus {bus.busNumber}</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock size={14} className="mr-1" />
                          <span>First pickup: {bus.stops[0]?.arrivalTime}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-start space-x-2">
                          <MapPin size={16} className="text-college-orange mt-0.5" />
                          <div>
                            <div className="text-sm font-medium">{bus.routeName}</div>
                            <div className="text-sm text-muted-foreground">to</div>
                            <div className="text-sm font-medium">College</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Bus size={16} className="text-college-blue flex-shrink-0" />
                          <div className="text-sm text-muted-foreground truncate">
                            Driver: {bus.driver}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </SheetTrigger>
                <SheetContent side={isMobile ? "bottom" : "right"} className={`${isMobile ? 'h-[80vh]' : 'max-w-md'}`}>
                  <SheetHeader>
                    <SheetTitle className="flex items-center">
                      <Badge className="mr-2 bg-college-blue hover:bg-college-blue/90">Bus {bus.busNumber}</Badge>
                      {bus.routeName} Route
                    </SheetTitle>
                    <SheetDescription>
                      Complete route details and stops information
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">Driver</div>
                      <div className="font-medium">{bus.driver}</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">Contact</div>
                      <div className="font-medium">{bus.contactNumber}</div>
                    </div>
                    <div className="border-t pt-4 mt-4">
                      <h4 className="text-sm font-semibold mb-3">All Stops:</h4>
                      <div className="space-y-3">
                        {bus.stops.map((stop, index) => (
                          <div key={index} className="flex items-start">
                            <div className="relative mr-3 flex flex-col items-center">
                              <div className={`w-3 h-3 rounded-full mt-1 ${
                                index === 0 
                                  ? 'bg-college-orange' 
                                  : index === bus.stops.length - 1 
                                    ? 'bg-college-blue' 
                                    : 'bg-gray-300'
                              }`}></div>
                              {index < bus.stops.length - 1 && (
                                <div className="w-0.5 bg-gray-200 h-full absolute top-4"></div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className={`font-medium text-sm ${
                                index === 0 
                                  ? 'text-college-orange' 
                                  : index === bus.stops.length - 1 
                                    ? 'text-college-blue'
                                    : ''
                              }`}>
                                {stop.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {stop.arrivalTime}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <SheetFooter className="mt-6">
                    <SheetClose asChild>
                      <Button className="w-full" variant="outline">Close</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-muted rounded-lg">
            <p className="text-muted-foreground">No routes found for "{searchQuery}"</p>
            <p className="text-sm mt-1">Try searching for another boarding point</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusMap;
