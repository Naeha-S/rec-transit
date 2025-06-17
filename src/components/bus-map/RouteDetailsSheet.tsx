
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetClose,
  SheetFooter,
  SheetTrigger
} from "@/components/ui/sheet";
import { useTextSize } from '@/contexts/TextSizeContext';
import { getTextSizeClass } from '@/utils/textSizeUtils';

interface RouteDetailsSheetProps {
  route: any;
  children: React.ReactNode;
  isMobile: boolean;
}

const RouteDetailsSheet: React.FC<RouteDetailsSheetProps> = ({ route, children, isMobile }) => {
  const { textSize } = useTextSize();
  const textSizeClass = getTextSizeClass(textSize);

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      
      <SheetContent side={isMobile ? "bottom" : "right"} className={`${isMobile ? 'h-[80vh]' : 'max-w-md'}`}>
        <SheetHeader>
          <SheetTitle className={`flex items-center flex-wrap gap-2 ${textSizeClass}`}>
            <Badge className="bg-college-blue hover:bg-college-blue/90">Bus {route.busNumber}</Badge>
            <span className="break-words">{route.routeName} Route</span>
          </SheetTitle>
          <SheetDescription className={textSize === 0 ? 'text-xs' : textSize === 2 ? 'text-base' : 'text-sm'}>
            Complete route details and stops information
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="mt-6 h-[calc(100vh-200px)]">
          <div className="space-y-4 pr-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex justify-between items-center">
                <div className={`text-muted-foreground ${textSize === 0 ? 'text-xs' : textSize === 2 ? 'text-base' : 'text-sm'}`}>Driver</div>
                <div className={`font-medium text-right ${textSizeClass}`}>{route.driver}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className={`text-muted-foreground ${textSize === 0 ? 'text-xs' : textSize === 2 ? 'text-base' : 'text-sm'}`}>Contact</div>
                <div className={`font-medium text-right ${textSizeClass}`}>{route.contactNumber}</div>
              </div>
            </div>
            <div className="border-t pt-4 mt-4">
              <h4 className={`font-semibold mb-3 ${textSizeClass}`}>All Stops:</h4>
              <div className="space-y-3">
                {route.stops.map((stop: any, index: number) => (
                  <div key={index} className="flex items-start">
                    <div className="relative mr-3 flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full mt-1 ${
                        index === 0 
                          ? 'bg-college-orange' 
                          : index === route.stops.length - 1 
                            ? 'bg-college-blue' 
                            : 'bg-gray-300'
                      }`}></div>
                      {index < route.stops.length - 1 && (
                        <div className="w-0.5 bg-gray-200 h-8 absolute top-4"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium break-words ${textSize === 0 ? 'text-xs' : textSize === 2 ? 'text-base' : 'text-sm'} ${
                        index === 0 
                          ? 'text-college-orange' 
                          : index === route.stops.length - 1 
                            ? 'text-college-blue'
                            : ''
                      }`}>
                        {stop.name}
                      </div>
                      <div className={`${textSize === 0 ? 'text-[10px]' : textSize === 2 ? 'text-sm' : 'text-xs'} text-muted-foreground`}>
                        {stop.arrivalTime}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
        <SheetFooter className="mt-6">
          <SheetClose asChild>
            <Button className="w-full" variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default RouteDetailsSheet;
