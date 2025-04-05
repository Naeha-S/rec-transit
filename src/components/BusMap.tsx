
import React, { useEffect, useRef, useState } from 'react';
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
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const { toast } = useToast();
  const [mapError, setMapError] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
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

  useEffect(() => {
    if (!mapRef.current) return;
    
    // Reset map error state at the beginning of each render attempt
    setMapError(false);

    try {
      // In a real implementation, this would initialize a map library like Google Maps or Leaflet
      // For now, we're creating a more attractive simulation
      const mapElement = mapRef.current;
      mapElement.innerHTML = '';

      // Create simulated map content
      const mapSimulation = document.createElement('div');
      mapSimulation.className = 'relative w-full h-full bg-accent/30 rounded-lg overflow-hidden';
      
      // Add label for map simulation
      const mapLabel = document.createElement('div');
      mapLabel.className = 'absolute inset-0 flex flex-col items-center justify-center text-muted-foreground font-medium';
      
      const mapIcon = document.createElement('div');
      mapIcon.className = 'flex items-center justify-center text-college-blue mb-2';
      mapIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>';
      
      mapLabel.appendChild(mapIcon);
      
      const mapText = document.createElement('div');
      mapText.textContent = 'Interactive Map Coming Soon';
      mapLabel.appendChild(mapText);
      
      const mapSubtext = document.createElement('div');
      mapSubtext.className = 'text-sm mt-1 text-muted-foreground/80';
      mapSubtext.textContent = 'Real-time bus locations will be displayed here';
      mapLabel.appendChild(mapSubtext);
      
      // Add some simulated roads
      const roads = [
        'h-1 bg-gray-400/50 absolute top-1/4 left-0 right-0',
        'h-1 bg-gray-400/50 absolute top-2/4 left-0 right-0',
        'h-1 bg-gray-400/50 absolute top-3/4 left-0 right-0',
        'w-1 bg-gray-400/50 absolute left-1/4 top-0 bottom-0',
        'w-1 bg-gray-400/50 absolute left-2/4 top-0 bottom-0',
        'w-1 bg-gray-400/50 absolute left-3/4 top-0 bottom-0'
      ];
      
      roads.forEach(roadClass => {
        const road = document.createElement('div');
        road.className = roadClass;
        mapSimulation.appendChild(road);
      });
      
      // Add college marker
      const collegeMarker = document.createElement('div');
      collegeMarker.className = 'absolute p-2 bg-college-blue text-white rounded-full flex items-center justify-center';
      collegeMarker.style.left = '50%';
      collegeMarker.style.top = '50%';
      collegeMarker.style.transform = 'translate(-50%, -50%)';
      collegeMarker.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z"/><path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7"/><path d="M14.5 17.5 4.5 15"/></svg>';
      mapSimulation.appendChild(collegeMarker);
      
      // Add legend for college marker
      const collegeLegend = document.createElement('div');
      collegeLegend.className = 'absolute bg-white px-2 py-1 text-xs rounded shadow-sm';
      collegeLegend.style.left = '50%';
      collegeLegend.style.top = 'calc(50% + 24px)';
      collegeLegend.style.transform = 'translateX(-50%)';
      collegeLegend.textContent = 'REC Campus';
      mapSimulation.appendChild(collegeLegend);
      
      // Add bus markers
      filteredBuses.forEach((bus, index) => {
        if (index < 8) { // Show more buses at once
          const angle = (index / 8) * Math.PI * 2;
          const radius = 130; // Increased distance from center
          
          // Calculate position in a circle around the college
          const left = 50 + Math.cos(angle) * radius / 3;
          const top = 50 + Math.sin(angle) * radius / 3;
          
          const busMarker = document.createElement('div');
          busMarker.className = `absolute p-1.5 rounded-full flex items-center justify-center transition-all cursor-pointer ${selectedRoute === bus.id ? 'bg-college-orange text-white scale-125' : 'bg-college-blue text-white'}`;
          busMarker.style.left = `${left}%`;
          busMarker.style.top = `${top}%`;
          busMarker.style.transform = 'translate(-50%, -50%)';
          busMarker.style.zIndex = '10';
          busMarker.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4c-1.1 0-2.1.8-2.4 1.8L.2 13c-.1.4-.2.8-.2 1.2 0 .4.1.8.2 1.2.3 1.1.8 2.8.8 2.8h3"/><path d="M9 18h6"/><path d="M5 18a2 2 0 1 0 4 0H5z"/><path d="M15 18a2 2 0 1 0 4 0h-4z"/></svg>';
          
          busMarker.addEventListener('click', () => {
            setSelectedRoute(selectedRoute === bus.id ? null : bus.id);
          });
          
          mapSimulation.appendChild(busMarker);
          
          // Add bus number label
          const busLabel = document.createElement('div');
          busLabel.className = `absolute bg-white px-1.5 py-0.5 text-xs rounded shadow-sm ${selectedRoute === bus.id ? 'border border-college-orange' : ''}`;
          busLabel.style.left = `${left}%`;
          busLabel.style.top = `${top + 5}%`;
          busLabel.style.transform = 'translateX(-50%)';
          busLabel.textContent = bus.busNumber;
          mapSimulation.appendChild(busLabel);
          
          // Draw route line if selected
          if (selectedRoute === bus.id) {
            const routeLine = document.createElement('div');
            routeLine.className = 'absolute bg-college-orange/50 h-0.5 z-5';
            routeLine.style.left = '50%';
            routeLine.style.top = '50%';
            routeLine.style.width = `${Math.hypot(left - 50, top - 50)}px`;
            routeLine.style.transformOrigin = '0 0';
            const angle = Math.atan2(top - 50, left - 50) * 180 / Math.PI;
            routeLine.style.transform = `rotate(${angle}deg)`;
            mapSimulation.appendChild(routeLine);
          }
        }
      });
      
      mapSimulation.appendChild(mapLabel);
      mapElement.appendChild(mapSimulation);
    } catch (error) {
      console.error("Error rendering map:", error);
      setMapError(true);
      toast({
        title: "Error rendering map",
        description: "Please try refreshing the page",
        variant: "destructive",
      });
    }
  }, [filteredBuses, selectedRoute, toast, searchQuery]);

  // Function to handle bus selection for details
  const handleBusSelect = (bus) => {
    setSelectedBus(bus);
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
      <div className="rounded-lg overflow-hidden border border-border bg-card shadow-sm" style={{ height: '300px' }}>
        <div ref={mapRef} className="map-container h-full w-full"></div>
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
