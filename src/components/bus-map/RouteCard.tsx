
import React from 'react';
import { MapPin, Bus, Clock } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useTextSize } from '@/contexts/TextSizeContext';
import { getTextSizeClass } from '@/utils/textSizeUtils';

interface RouteCardProps {
  route: any;
  isSelected: boolean;
  onSelect: () => void;
}

const RouteCard: React.FC<RouteCardProps> = ({ route, isSelected, onSelect }) => {
  const { textSize } = useTextSize();
  const textSizeClass = getTextSizeClass(textSize);

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${isSelected ? 'ring-2 ring-college-orange' : ''}`}
      onClick={onSelect}
    >
      <CardContent className="p-3 sm:p-4">
        <div className="flex justify-between items-center mb-2 sm:mb-3">
          <Badge className="bg-college-blue hover:bg-college-blue/90 text-xs sm:text-sm">
            Bus {route.busNumber}
          </Badge>
          <div className={`flex items-center text-muted-foreground ${textSize === 0 ? 'text-[10px]' : textSize === 2 ? 'text-sm' : 'text-xs'}`}>
            <Clock size={textSize === 0 ? 10 : textSize === 2 ? 14 : 12} className="mr-1" />
            <span className="hidden sm:inline">First pickup: </span>
            <span className="sm:hidden">Start: </span>
            <span>{route.stops[0]?.arrivalTime}</span>
          </div>
        </div>
        
        <div className="space-y-1 sm:space-y-2">
          <div className="flex items-start space-x-2">
            <MapPin size={textSize === 0 ? 12 : textSize === 2 ? 16 : 14} className="text-college-orange mt-0.5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <div className={`font-medium truncate ${textSize === 0 ? 'text-xs' : textSize === 2 ? 'text-base' : 'text-sm'}`}>
                {route.routeName}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Bus size={textSize === 0 ? 12 : textSize === 2 ? 16 : 14} className="text-college-blue flex-shrink-0" />
            <div className={`text-muted-foreground truncate ${textSize === 0 ? 'text-[10px]' : textSize === 2 ? 'text-sm' : 'text-xs'}`}>
              <span className="hidden sm:inline">Driver: </span>
              {route.driver}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteCard;
