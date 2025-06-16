
import React, { useState, useCallback } from 'react';
import { MapPin, Bus, Navigation, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MapLocation {
  id: string;
  name: string;
  type: 'campus' | 'bus' | 'stop';
  position: { x: number; y: number };
  info?: string;
}

interface LightweightMapProps {
  locations?: MapLocation[];
  onLocationClick?: (location: MapLocation) => void;
  className?: string;
}

export const LightweightMap: React.FC<LightweightMapProps> = ({
  locations = [],
  onLocationClick,
  className = ''
}) => {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [mapError, setMapError] = useState(false);

  // Default locations for demonstration
  const defaultLocations: MapLocation[] = [
    { id: '1', name: 'REC Campus', type: 'campus', position: { x: 50, y: 50 }, info: 'Main Campus' },
    { id: '2', name: 'Bus A1', type: 'bus', position: { x: 30, y: 40 }, info: 'Route: North Gate' },
    { id: '3', name: 'Bus B2', type: 'bus', position: { x: 70, y: 60 }, info: 'Route: South Gate' },
    { id: '4', name: 'Stop 1', type: 'stop', position: { x: 25, y: 35 }, info: 'North Gate Stop' },
    { id: '5', name: 'Stop 2', type: 'stop', position: { x: 75, y: 65 }, info: 'South Gate Stop' },
  ];

  const mapLocations = locations.length > 0 ? locations : defaultLocations;

  const handleLocationClick = useCallback((location: MapLocation) => {
    setSelectedLocation(location);
    onLocationClick?.(location);
  }, [onLocationClick]);

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'campus': return <Navigation size={16} className="text-blue-600" />;
      case 'bus': return <Bus size={16} className="text-orange-600" />;
      case 'stop': return <MapPin size={16} className="text-green-600" />;
      default: return <MapPin size={16} />;
    }
  };

  const getLocationColor = (type: string) => {
    switch (type) {
      case 'campus': return 'bg-blue-500 border-blue-600';
      case 'bus': return 'bg-orange-500 border-orange-600';
      case 'stop': return 'bg-green-500 border-green-600';
      default: return 'bg-gray-500 border-gray-600';
    }
  };

  if (mapError) {
    return (
      <Card className={`${className}`}>
        <CardContent className="p-6 text-center">
          <AlertTriangle className="text-destructive h-12 w-12 mb-3 mx-auto" />
          <h3 className="text-lg font-medium">Map Error</h3>
          <p className="text-muted-foreground mb-4">Unable to load map data</p>
          <Button onClick={() => setMapError(false)} variant="outline">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${className}`}>
      <CardContent className="p-4">
        <div className="relative w-full h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 grid-rows-8 h-full">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="border border-gray-300" />
              ))}
            </div>
          </div>

          {/* Locations */}
          {mapLocations.map((location) => (
            <button
              key={location.id}
              className={`absolute w-6 h-6 rounded-full border-2 ${getLocationColor(location.type)} 
                         transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform
                         flex items-center justify-center shadow-md`}
              style={{
                left: `${location.position.x}%`,
                top: `${location.position.y}%`,
              }}
              onClick={() => handleLocationClick(location)}
              title={location.name}
            >
              {getLocationIcon(location.type)}
            </button>
          ))}

          {/* Selected location popup */}
          {selectedLocation && (
            <div
              className="absolute bg-white rounded-lg shadow-lg p-3 border z-10 min-w-32"
              style={{
                left: `${Math.min(selectedLocation.position.x + 5, 80)}%`,
                top: `${Math.max(selectedLocation.position.y - 10, 5)}%`,
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                {getLocationIcon(selectedLocation.type)}
                <span className="font-medium text-sm">{selectedLocation.name}</span>
              </div>
              {selectedLocation.info && (
                <p className="text-xs text-muted-foreground">{selectedLocation.info}</p>
              )}
              <Badge variant="outline" className="mt-1 text-xs">
                {selectedLocation.type}
              </Badge>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-4 mt-3 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Campus</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>Buses</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Stops</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
