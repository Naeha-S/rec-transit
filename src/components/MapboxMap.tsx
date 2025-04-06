
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const MapboxMap = ({ searchQuery = '' }) => {
  const mapRef = useRef(null);
  const [mapboxToken, setMapboxToken] = useState(localStorage.getItem('mapbox_token') || '');
  const [isTokenSubmitted, setIsTokenSubmitted] = useState(!!localStorage.getItem('mapbox_token'));
  const { toast } = useToast();
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    if (!mapRef.current || !isTokenSubmitted || !mapboxToken) return;

    // Clean up on component unmount
    return () => {
      if (window.map) {
        window.map.remove();
      }
    };
  }, [mapboxToken, isTokenSubmitted]);

  useEffect(() => {
    if (!mapRef.current || !isTokenSubmitted || !mapboxToken) return;
    
    try {
      const loadMapbox = async () => {
        try {
          // Dynamically import mapbox-gl
          const mapboxgl = await import('mapbox-gl');
          await import('mapbox-gl/dist/mapbox-gl.css');
          
          // Set access token
          mapboxgl.default.accessToken = mapboxToken;
          
          // Initialize map
          const map = new mapboxgl.default.Map({
            container: mapRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [80.0467, 13.0827], // Chennai coordinates
            zoom: 11
          });
          
          // Add navigation controls
          map.addControl(new mapboxgl.default.NavigationControl(), 'top-right');
          
          // Add campus marker
          map.on('load', () => {
            // Add campus marker
            new mapboxgl.default.Marker({ color: '#0066cc' })
              .setLngLat([80.0467, 13.0827])
              .setPopup(new mapboxgl.default.Popup().setHTML('<h3>REC Campus</h3>'))
              .addTo(map);
            
            // Add bus markers (simulated)
            const busLocations = [
              { lng: 80.0367, lat: 13.0927, id: 'BUS-001', route: 'North Route' },
              { lng: 80.0567, lat: 13.0727, id: 'BUS-002', route: 'South Route' },
              { lng: 80.0367, lat: 13.0727, id: 'BUS-003', route: 'East Route' },
              { lng: 80.0667, lat: 13.0927, id: 'BUS-004', route: 'West Route' },
            ];
            
            busLocations.forEach(bus => {
              new mapboxgl.default.Marker({ color: '#ff9900' })
                .setLngLat([bus.lng, bus.lat])
                .setPopup(new mapboxgl.default.Popup().setHTML(`
                  <div>
                    <h4 style="font-weight: bold;">${bus.id}</h4>
                    <p>${bus.route}</p>
                  </div>
                `))
                .addTo(map);
            });
          });
          
          // Set window.map for cleanup
          window.map = map;
          
          // Show success toast
          toast({
            title: "Map loaded successfully",
            description: "You can now view bus locations in real-time",
          });
        } catch (error) {
          console.error('Error loading Mapbox:', error);
          setMapError(true);
          toast({
            title: "Could not load map",
            description: "Please check your API token and try again",
            variant: "destructive",
          });
        }
      };
      
      loadMapbox();
    } catch (error) {
      console.error('Error in map initialization:', error);
      setMapError(true);
    }
  }, [mapboxToken, isTokenSubmitted, toast, searchQuery]);

  const handleTokenSubmit = (e) => {
    e.preventDefault();
    if (mapboxToken.trim()) {
      localStorage.setItem('mapbox_token', mapboxToken);
      setIsTokenSubmitted(true);
      toast({
        title: "API Token saved",
        description: "Your Mapbox API token has been saved",
      });
    } else {
      toast({
        title: "API Token required",
        description: "Please enter a valid Mapbox API token",
        variant: "destructive",
      });
    }
  };

  const handleTokenChange = (e) => {
    setMapboxToken(e.target.value);
  };

  const renderTokenForm = () => (
    <div className="p-6 bg-muted rounded-md min-h-[300px] flex flex-col items-center justify-center space-y-4">
      <div className="text-center max-w-md">
        <h3 className="text-lg font-medium mb-2">Mapbox API Token Required</h3>
        <p className="text-sm text-muted-foreground mb-4">
          To display the interactive map, please enter your Mapbox public token. 
          You can find this in your Mapbox account dashboard.
        </p>
        <form onSubmit={handleTokenSubmit} className="space-y-3">
          <input
            type="text"
            value={mapboxToken}
            onChange={handleTokenChange}
            placeholder="Enter Mapbox public token"
            className="w-full px-3 py-2 border border-input rounded-md"
          />
          <Button type="submit" className="w-full">
            Submit Token
          </Button>
        </form>
        <p className="text-xs mt-4 text-muted-foreground">
          Visit <a href="https://www.mapbox.com/" target="_blank" rel="noopener noreferrer" className="underline">mapbox.com</a> to create an account and get your token.
        </p>
      </div>
    </div>
  );

  const renderMap = () => (
    <div className="h-[400px] rounded-md overflow-hidden relative">
      <div ref={mapRef} className="h-full w-full" />
    </div>
  );

  const renderErrorState = () => (
    <div className="p-6 bg-muted rounded-md min-h-[300px] flex flex-col items-center justify-center space-y-4">
      <AlertTriangle size={48} className="text-destructive" />
      <div className="text-center">
        <h3 className="text-lg font-medium">Failed to load the map</h3>
        <p className="text-sm text-muted-foreground mt-2">
          There was an error loading the map. Please check your API token and try again.
        </p>
      </div>
      <Button 
        onClick={() => {
          localStorage.removeItem('mapbox_token');
          setIsTokenSubmitted(false);
          setMapError(false);
        }}
      >
        Reset API Token
      </Button>
    </div>
  );

  return (
    <Card className="shadow-md h-full">
      <CardContent className="p-4">
        {mapError ? renderErrorState() : isTokenSubmitted ? renderMap() : renderTokenForm()}
      </CardContent>
    </Card>
  );
};

// Add window.map for cleanup purposes
declare global {
  interface Window {
    map: any;
  }
}

export default MapboxMap;
