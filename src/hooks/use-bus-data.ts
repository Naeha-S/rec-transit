
import { useState, useEffect } from 'react';
import { fetchBusData } from '@/utils/busData';
import { useHolidayContext } from '@/contexts/HolidayContext';

export interface BusRouteStop {
  name: string;
  arrivalTime: string;
}

export interface BusRoute {
  id: string;
  routeNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  status: "on-time" | "delayed" | "cancelled";
  busType: "AC" | "Non-AC";
  stops: BusRouteStop[];
}

export const useBusData = (date: Date, initialSearchTerm: string = '') => {
  const [busRoutes, setBusRoutes] = useState<BusRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSundaySelected, setIsSundaySelected] = useState(false);
  const { isHolidayActive } = useHolidayContext();
  const [searchedBusId, setSearchedBusId] = useState<string | null>(null);

  const loadBusData = async () => {
    try {
      setLoading(true);
      
      // Check if selected date is Sunday
      if (isSunday(date)) {
        console.log("Sunday selected, setting isSundaySelected to true");
        setIsSundaySelected(true);
        setBusRoutes([]);
        setLoading(false);
        return;
      } else {
        setIsSundaySelected(false);
      }
      
      // If today is a holiday, don't show any buses
      if (isHolidayActive) {
        console.log("Holiday active, not showing any buses");
        setBusRoutes([]);
        setLoading(false);
        return;
      }
      
      // Fetch data from Google Sheets via our utility function
      const busData = await fetchBusData();
      
      if (busData.length === 0) {
        console.error("No bus data returned from fetchBusData");
        setBusRoutes([]);
        setLoading(false);
        return;
      }
      
      console.log("Raw bus data received:", busData.length, "buses");
      
      const transformedData: BusRoute[] = busData.map(bus => ({
        id: bus.id,
        routeNumber: bus.busNumber,
        origin: bus.stops[0]?.name || '',
        destination: 'College',
        departureTime: bus.stops[0]?.arrivalTime || '',
        arrivalTime: '7:40 AM', // Fixed college arrival time
        status: Math.random() > 0.7 ? "delayed" : Math.random() > 0.9 ? "cancelled" : "on-time",
        busType: Math.random() > 0.5 ? "AC" : "Non-AC",
        stops: bus.stops.map(stop => ({
          name: stop.name,
          arrivalTime: stop.arrivalTime
        }))
      }));
      
      // If we have an initial search term, find the matching bus ID
      if (initialSearchTerm) {
        const matchingBus = transformedData.find(bus => 
          bus.routeNumber.toLowerCase() === initialSearchTerm.toLowerCase() ||
          bus.stops.some(stop => 
            stop.name.toLowerCase() === initialSearchTerm.toLowerCase()
          ) ||
          bus.id.toLowerCase() === initialSearchTerm.toLowerCase()
        );
        
        if (matchingBus) {
          setSearchedBusId(matchingBus.id);
        }
      }
      
      console.log("Transformed data:", transformedData.length, "bus routes");
      setBusRoutes(transformedData);
    } catch (error) {
      console.error("Failed to load bus data:", error);
      setBusRoutes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBusData();
  }, [date, isHolidayActive, initialSearchTerm]);

  return { busRoutes, loading, isSundaySelected, searchedBusId };
};

// Helper function to check if a date is Sunday
const isSunday = (date: Date): boolean => {
  return date.getDay() === 0;
};
