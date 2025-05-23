
import { useState, useEffect } from 'react';
import { fetchBusData, type BusDetails } from '@/utils/busData';

export interface BusStop {
  name: string;
  time: string;
}

export interface BusRoute {
  id: string;
  routeNumber: string;
  origin: string;
  destination: string;
  status: 'on-time' | 'delayed' | 'cancelled';
  delayMinutes?: number;
  departureTime: string;
  arrivalTime: string;
  driverName: string;
  contactNumber: string;
  stops: BusStop[];
}

export const useBusData = (date: Date, searchTerm: string = '') => {
  const [busRoutes, setBusRoutes] = useState<BusRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchedBusId, setSearchedBusId] = useState<string | null>(null);

  // Check if the selected date is a Sunday
  const isSundaySelected = date.getDay() === 0;

  useEffect(() => {
    const loadBusData = async () => {
      if (isSundaySelected) {
        setBusRoutes([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Fetch bus data using our utility
        const busData = await fetchBusData();
        
        // Transform BusDetails to BusRoute format
        const routes: BusRoute[] = busData.map(bus => ({
          id: bus.id,
          routeNumber: bus.busNumber,
          origin: bus.routeName.replace(' to College', ''),
          destination: 'College',
          status: Math.random() > 0.8 ? 'delayed' : 'on-time',
          delayMinutes: Math.random() > 0.8 ? Math.floor(Math.random() * 20) + 5 : undefined,
          departureTime: bus.stops[0]?.arrivalTime || '6:30 AM',
          arrivalTime: '7:40 AM',
          driverName: bus.driver,
          contactNumber: bus.contactNumber,
          stops: bus.stops.map(stop => ({
            name: stop.name,
            time: stop.arrivalTime
          }))
        }));
        
        setBusRoutes(routes);

        // Check if any bus matches the search term
        if (searchTerm) {
          const matchingBus = routes.find(route => 
            route.routeNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            route.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
            route.stops.some(stop => stop.name.toLowerCase().includes(searchTerm.toLowerCase()))
          );
          
          if (matchingBus) {
            setSearchedBusId(matchingBus.id);
          } else {
            setSearchedBusId(null);
          }
        } else {
          setSearchedBusId(null);
        }
      } catch (error) {
        console.error("Error loading bus data:", error);
        setBusRoutes([]);
      } finally {
        setLoading(false);
      }
    };

    loadBusData();
  }, [date, searchTerm, isSundaySelected]);

  return {
    busRoutes,
    loading,
    isSundaySelected,
    searchedBusId
  };
};
