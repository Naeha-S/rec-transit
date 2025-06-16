
import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BusStop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  isActive?: boolean;
}

interface LightweightMapProps {
  stops: BusStop[];
  className?: string;
  searchQuery?: string;
}

export const LightweightMap: React.FC<LightweightMapProps> = ({
  stops,
  className,
  searchQuery
}) => {
  const [activeStop, setActiveStop] = useState<string | null>(null);
  const [animatedStops, setAnimatedStops] = useState<Set<string>>(new Set());

  // Animate stops based on search query
  useEffect(() => {
    if (searchQuery) {
      const matchingStops = stops
        .filter(stop => 
          stop.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map(stop => stop.id);
      
      setAnimatedStops(new Set(matchingStops));
      
      // Clear animation after 2 seconds
      const timer = setTimeout(() => {
        setAnimatedStops(new Set());
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [searchQuery, stops]);

  return (
    <div className={cn(
      'relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden border',
      'min-h-[300px] transition-all duration-300',
      className
    )}>
      {/* Mock map background with grid */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#000" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Bus stops */}
      <div className="absolute inset-0 p-4">
        {stops.map((stop, index) => {
          const isAnimated = animatedStops.has(stop.id);
          const isActive = activeStop === stop.id;
          
          return (
            <div
              key={stop.id}
              className={cn(
                'absolute cursor-pointer transition-all duration-300 transform group',
                isAnimated && 'animate-pulse scale-125',
                isActive && 'scale-110 z-10'
              )}
              style={{
                left: `${(index % 5) * 20 + 10}%`,
                top: `${Math.floor(index / 5) * 25 + 15}%`,
              }}
              onClick={() => setActiveStop(isActive ? null : stop.id)}
            >
              {/* Stop marker */}
              <div className={cn(
                'w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200',
                'shadow-md hover:shadow-lg hover:scale-110',
                stop.isActive 
                  ? 'bg-green-500 text-white animate-pulse' 
                  : 'bg-college-blue text-white',
                isAnimated && 'ring-4 ring-yellow-400 ring-opacity-50'
              )}>
                <MapPin size={14} />
              </div>

              {/* Stop label */}
              <div className={cn(
                'absolute top-8 left-1/2 transform -translate-x-1/2 transition-all duration-200',
                'bg-white rounded-md shadow-lg px-2 py-1 text-xs whitespace-nowrap',
                'opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0',
                isActive && 'opacity-100 translate-y-0'
              )}>
                {stop.name}
                {stop.isActive && (
                  <Zap className="inline w-3 h-3 ml-1 text-green-500" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation hint */}
      <div className="absolute bottom-4 right-4 bg-white/90 rounded-md px-3 py-2 text-xs text-muted-foreground flex items-center space-x-1 transition-all hover:bg-white hover:scale-105">
        <Navigation size={12} />
        <span>Click stops for details</span>
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white/90 rounded-md p-2 text-xs space-y-1">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-college-blue rounded-full"></div>
          <span>Bus Stop</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span>Active Route</span>
        </div>
      </div>
    </div>
  );
};
