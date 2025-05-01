
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
      console.log("Fetching bus data from Supabase for date:", date);
      
      // Check if the selected date is Sunday
      if (isSunday(date)) {
        console.log("Sunday selected, no bus service");
        return null;
      }
      
      // Use any type to bypass TypeScript checking since types are out of sync
      const { data, error } = await supabase
        .from('REC_Bus_Data')
        .select('*') as { data: any[], error: any };
        
      if (error) {
        console.error("Supabase query error:", error);
        throw error;
      }
      
      if (!data || data.length === 0) {
        console.log("No data returned from Supabase");
        return null;
      }
      
      console.log("Supabase returned data count:", data.length);
      
      // Group by Bus_Number to create unique routes
      const busGroups = data.reduce((acc: Record<string, any[]>, item: any) => {
        // Make sure to trim whitespace and handle null values
        const busNumber = (item.Bus_Number || "").trim();
        if (!acc[busNumber]) {
          acc[busNumber] = [];
        }
        acc[busNumber].push(item);
        return acc;
      }, {} as Record<string, any[]>);
      
      console.log("Unique bus routes found:", Object.keys(busGroups).length);
      
      // Transform the grouped data into BusRoute objects
      const transformedData: BusRoute[] = Object.entries(busGroups).map(([busNumber, stops], index) => {
        // Sort stops by timing to get proper sequence
        stops.sort((a: any, b: any) => {
          const timeA = a.Timing || "";
          const timeB = b.Timing || "";
          return timeA.localeCompare(timeB);
        });
        
        const firstStop = stops[0];
        const lastStop = stops[stops.length - 1];
        
        // Fix column name references and ensure we're using the right property names
        return {
          id: `bus-${index}`,
          routeNumber: busNumber,
          origin: firstStop.bus_stop_name || "",
          destination: lastStop.bus_stop_name || "",
          departureTime: firstStop.Timing || "",
          arrivalTime: lastStop.Timing || "",
          status: Math.random() > 0.7 ? "delayed" : Math.random() > 0.9 ? "cancelled" : "on-time",
          busType: Math.random() > 0.5 ? "AC" : "Non-AC",
          stops: stops.map((stop: any) => ({
            name: stop.bus_stop_name || "",
            arrivalTime: stop.Timing || ""
          }))
        };
      });
      
      console.log("Transformed data count:", transformedData.length);
      return transformedData;
    } catch (error) {
      console.error("Error in fetchBusDataFromSupabase:", error);
      return null;
    }
  };

  const loadBusData = async () => {
    try {
      setLoading(true);
      
      if (isSunday(date)) {
        console.log("Sunday selected, setting isSundaySelected to true");
        setIsSundaySelected(true);
        setBusRoutes([]);
        setLoading(false);
        return;
      }
      
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
    setIsSundaySelected(isSunday(date));
    loadBusData();
  }, [date]);

  return { busRoutes, loading, isSundaySelected };
};

// Helper function to check if a date is Sunday
const isSunday = (date: Date): boolean => {
  return date.getDay() === 0;
};
