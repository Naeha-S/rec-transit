
import React, { useState, useEffect } from 'react';
import { MapSkeleton } from '@/components/ui/loading-skeleton';
import { LightweightMap } from '@/components/ui/lightweight-map';
import { ErrorBoundary } from '@/components/ui/error-boundary';

interface BusMapProps {
  searchQuery?: string;
}

const BusMap: React.FC<BusMapProps> = ({ searchQuery }) => {
  const [loading, setLoading] = useState(true);
  const [busStops, setBusStops] = useState([]);

  // Mock bus stops data
  useEffect(() => {
    const timer = setTimeout(() => {
      setBusStops([
        { id: '1', name: 'Main Gate', lat: 17.3850, lng: 78.4867, isActive: true },
        { id: '2', name: 'Library Block', lat: 17.3851, lng: 78.4868, isActive: false },
        { id: '3', name: 'Hostel Area', lat: 17.3852, lng: 78.4869, isActive: true },
        { id: '4', name: 'Sports Complex', lat: 17.3853, lng: 78.4870, isActive: false },
        { id: '5', name: 'Cafeteria', lat: 17.3854, lng: 78.4871, isActive: true },
        { id: '6', name: 'Auditorium', lat: 17.3855, lng: 78.4872, isActive: false },
        { id: '7', name: 'Parking Area', lat: 17.3856, lng: 78.4873, isActive: true },
        { id: '8', name: 'Admin Block', lat: 17.3857, lng: 78.4874, isActive: false },
      ]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <MapSkeleton />;
  }

  return (
    <ErrorBoundary>
      <div className="w-full">
        <LightweightMap 
          stops={busStops} 
          searchQuery={searchQuery}
          className="w-full h-64 transition-all duration-500 hover:shadow-lg"
        />
        <div className="mt-2 text-xs text-muted-foreground text-center animate-fade-in">
          Interactive campus map - Click on stops to view details
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default BusMap;
