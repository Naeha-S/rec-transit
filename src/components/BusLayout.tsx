
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ZoomIn, ZoomOut } from 'lucide-react';
import { useState } from 'react';

const BusLayout = () => {
  const [scale, setScale] = useState(1);
  
  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 2));
  };
  
  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };
  
  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = "/lovable-uploads/e5bec02b-956d-41a0-9575-0a6928fe9e33.png";
    link.download = "REC_Campus_Map.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Campus Navigation Map</CardTitle>
          <CardDescription>Detailed view of the REC campus with all important locations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={zoomOut} className="touch-target">
                  <ZoomOut size={16} className="mr-1" />
                  <span className="hidden sm:inline">Zoom Out</span>
                </Button>
                <Button variant="outline" size="sm" onClick={zoomIn} className="touch-target">
                  <ZoomIn size={16} className="mr-1" />
                  <span className="hidden sm:inline">Zoom In</span>
                </Button>
              </div>
              <Button variant="outline" size="sm" onClick={downloadImage} className="touch-target">
                <Download size={16} className="mr-1" />
                <span className="hidden sm:inline">Save Map</span>
              </Button>
            </div>
            
            <div className="overflow-auto border rounded-md p-2" style={{ maxHeight: '70vh' }}>
              <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', transition: 'transform 0.2s ease' }}>
                <img 
                  src="/lovable-uploads/e5bec02b-956d-41a0-9575-0a6928fe9e33.png" 
                  alt="REC Campus Map" 
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground mt-2">
              <p>This interactive map shows all campus buildings, bus stops, parking locations, and key facilities at REC College.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusLayout;
