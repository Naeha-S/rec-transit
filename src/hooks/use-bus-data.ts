
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BusDetails, fetchBusData } from '@/utils/busData';

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

export const useBusData = (date: Date) => {
  const [busRoutes, setBusRoutes] = useState<BusRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSundaySelected, setIsSundaySelected] = useState(false);

  const fetchBusDataFromSupabase = async () => {
    try {
      console.log("Fetching bus data from Supabase");
      
      const { data, error } = await supabase
        .from('REC_Bus_Data')
        .select('*');
        
      if (error) {
        console.error("Supabase query error:", error);
        throw error;
      }
      
      if (!data || data.length === 0) {
        console.log("No data returned from Supabase");
        return null;
      }
      
      console.log("Supabase returned data:", data);
      
      const busGroups = data.reduce((acc, item) => {
        const busNumber = item.Bus_Number || "";
        if (!acc[busNumber]) {
          acc[busNumber] = [];
        }
        acc[busNumber].push(item);
        return acc;
      }, {} as Record<string, any[]>);
      
      const transformedData: BusRoute[] = Object.entries(busGroups).map(([busNumber, stops], index) => {
        stops.sort((a, b) => {
          const timeA = a.Timing || "";
          const timeB = b.Timing || "";
          return timeA.localeCompare(timeB);
        });
        
        const firstStop = stops[0];
        const lastStop = stops[stops.length - 1];
        
        return {
          id: `bus-${index}`,
          routeNumber: busNumber,
          origin: firstStop["bus _stop_name"] || "",
          destination: lastStop["bus _stop_name"] || "",
          departureTime: firstStop.Timing || "",
          arrivalTime: lastStop.Timing || "",
          status: Math.random() > 0.7 ? "delayed" : Math.random() > 0.9 ? "cancelled" : "on-time",
          busType: Math.random() > 0.5 ? "AC" : "Non-AC",
          stops: stops.map(stop => ({
            name: stop["bus _stop_name"] || "",
            arrivalTime: stop.Timing || ""
          }))
        };
      });
      
      return transformedData;
    } catch (error) {
      console.error("Error in fetchBusDataFromSupabase:", error);
      return null;
    }
  };

  const loadBusData = async () => {
    try {
      setLoading(true);
      const supabaseData = await fetchBusDataFromSupabase();
      
      if (supabaseData && supabaseData.length > 0) {
        console.log("Using Supabase data");
        setBusRoutes(supabaseData);
      } else {
        console.log("Falling back to local data");
        const data = await fetchBusData();
        const transformedData: BusRoute[] = data.map(bus => ({
          id: bus.id,
          routeNumber: bus.busNumber,
          origin: bus.stops[0]?.name || '',
          destination: bus.stops[bus.stops.length - 1]?.name || '',
          departureTime: bus.stops[0]?.arrivalTime || '',
          arrivalTime: bus.stops[bus.stops.length - 1]?.arrivalTime || '',
          status: Math.random() > 0.7 ? "delayed" : Math.random() > 0.9 ? "cancelled" : "on-time",
          busType: Math.random() > 0.5 ? "AC" : "Non-AC",
          stops: bus.stops.map(stop => ({
            name: stop.name,
            arrivalTime: stop.arrivalTime
          }))
        }));
        setBusRoutes(transformedData);
      }
    } catch (error) {
      console.error("Failed to load bus data:", error);
      const fallbackData = await fetchBusData();
      const transformedData: BusRoute[] = fallbackData.map(bus => ({
        id: bus.id,
        routeNumber: bus.busNumber,
        origin: bus.stops[0]?.name || '',
        destination: bus.stops[bus.stops.length - 1]?.name || '',
        departureTime: bus.stops[0]?.arrivalTime || '',
        arrivalTime: bus.stops[bus.stops.length - 1]?.arrivalTime || '',
        status: "on-time",
        busType: "Non-AC",
        stops: bus.stops.map(stop => ({
          name: stop.name,
          arrivalTime: stop.arrivalTime
        }))
      }));
      setBusRoutes(transformedData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (date && isSunday(date)) {
      setIsSundaySelected(true);
      setBusRoutes([]);
      setLoading(false);
    } else {
      setIsSundaySelected(false);
      loadBusData();
    }
  }, [date]);

  return { busRoutes, loading, isSundaySelected };
};

