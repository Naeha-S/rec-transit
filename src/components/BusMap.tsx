
import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Bus, Clock } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface BusMapProps {
  searchQuery: string;
}

// Simulated bus routes data
const busRoutes = [
  {
    id: 1,
    number: "15A",
    from: "Poonamallee",
    to: "College",
    stops: ["Poonamallee", "Kumananchavadi", "Saveetha Dental Hospital", "Porur", "College"],
    position: { lat: 13.0426, lng: 80.1759 }, // Simulated coordinates
    eta: "5 min"
  },
  {
    id: 2,
    number: "23B",
    from: "Tambaram",
    to: "College",
    stops: ["Tambaram", "Chromepet", "Pallavaram", "Guindy", "Vadapalani", "College"],
    position: { lat: 13.0555, lng: 80.1969 }, // Simulated coordinates
    eta: "12 min"
  },
  {
    id: 3,
    number: "7C",
    from: "Anna Nagar",
    to: "College",
    stops: ["Anna Nagar", "Koyambedu", "Valasaravakkam", "Porur", "College"],
    position: { lat: 13.0321, lng: 80.1859 }, // Simulated coordinates
    eta: "8 min"
  }
];

const BusMap: React.FC<BusMapProps> = ({ searchQuery }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);
  
  // Filter routes based on search query
  const filteredRoutes = searchQuery 
    ? busRoutes.filter(route => 
        route.stops.some(stop => 
          stop.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : busRoutes;

  useEffect(() => {
    // In a real implementation, this would initialize a map library like Google Maps or Leaflet
    // For now, we're just simulating a map with CSS
    if (mapRef.current) {
      const mapElement = mapRef.current;
      mapElement.innerHTML = '';

      // Create simulated map content
      const mapSimulation = document.createElement('div');
      mapSimulation.className = 'relative w-full h-full bg-accent/30';
      
      // Add text to indicate this is a map simulation
      const mapLabel = document.createElement('div');
      mapLabel.className = 'absolute inset-0 flex items-center justify-center text-muted-foreground font-medium';
      mapLabel.textContent = 'Interactive Map Visualization';
      
      // Add some simulated roads
      const roads = ['h-0.5 bg-gray-400 absolute top-1/4 left-0 right-0',
                    'h-0.5 bg-gray-400 absolute top-2/4 left-0 right-0',
                    'h-0.5 bg-gray-400 absolute top-3/4 left-0 right-0',
                    'w-0.5 bg-gray-400 absolute left-1/4 top-0 bottom-0',
                    'w-0.5 bg-gray-400 absolute left-2/4 top-0 bottom-0',
                    'w-0.5 bg-gray-400 absolute left-3/4 top-0 bottom-0'];
      
      roads.forEach(roadClass => {
        const road = document.createElement('div');
        road.className = roadClass;
        mapSimulation.appendChild(road);
      });
      
      // Add bus markers
      filteredRoutes.forEach(route => {
        const busMarker = document.createElement('div');
        busMarker.className = 'bus-marker absolute';
        busMarker.textContent = route.number;
        
        // Position bus marker
        // In a real app, these would be actual coordinates
        const left = 30 + (route.id * 20) + '%';
        const top = 20 + (route.id * 15) + '%';
        busMarker.style.left = left;
        busMarker.style.top = top;
        
        // Highlight selected route
        if (selectedRoute === route.id) {
          busMarker.style.backgroundColor = '#ED8936';
          busMarker.style.color = 'white';
          busMarker.style.borderColor = '#FBD38D';
        }
        
        busMarker.addEventListener('click', () => {
          setSelectedRoute(route.id);
        });
        
        mapSimulation.appendChild(busMarker);
      });
      
      mapSimulation.appendChild(mapLabel);
      mapElement.appendChild(mapSimulation);
    }
  }, [filteredRoutes, selectedRoute]);

  return (
    <div className="w-full space-y-4">
      <div className="rounded-lg overflow-hidden border border-border bg-card shadow-sm" style={{ height: '300px' }}>
        <div ref={mapRef} className="map-container"></div>
      </div>
      
      <div className="space-y-3">
        <h3 className="font-medium text-lg">Available Routes</h3>
        {filteredRoutes.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredRoutes.map(route => (
              <Card 
                key={route.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${selectedRoute === route.id ? 'ring-2 ring-college-orange' : ''}`}
                onClick={() => setSelectedRoute(route.id)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <Badge className="bg-college-blue hover:bg-college-blue/90">Bus {route.number}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock size={14} className="mr-1" />
                      <span>ETA: {route.eta}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <MapPin size={16} className="text-college-orange mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">{route.from}</div>
                        <div className="text-sm text-muted-foreground">to</div>
                        <div className="text-sm font-medium">{route.to}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Bus size={16} className="text-college-blue flex-shrink-0" />
                      <div className="text-sm text-muted-foreground truncate">
                        {route.stops.join(" → ")}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
