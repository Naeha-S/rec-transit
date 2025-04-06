
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from 'lucide-react';

const BusLayout = () => {
  return (
    <div className="space-y-4">
      <Card className="shadow-md h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-base sm:text-lg">Bus Layout</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-6 space-y-4 bg-muted rounded-md min-h-[300px]">
            <AlertTriangle size={48} className="text-amber-500" />
            <p className="text-center text-muted-foreground">
              Bus layout image will be added here.
            </p>
            <div className="w-full max-w-sm bg-white rounded-md shadow-sm p-4">
              <div className="text-center font-semibold mb-4 border-b pb-2">Standard College Bus Layout</div>
              <div className="flex justify-between mb-3">
                <span className="text-sm font-medium">Seating Capacity</span>
                <span className="text-sm">52 Seats</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-sm font-medium">Layout Type</span>
                <span className="text-sm">2x2 Configuration</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-sm font-medium">Emergency Exits</span>
                <span className="text-sm">2 Exits</span>
              </div>
              <div className="text-xs text-muted-foreground mt-4">
                *All buses are equipped with GPS tracking and CCTV cameras for safety
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusLayout;
