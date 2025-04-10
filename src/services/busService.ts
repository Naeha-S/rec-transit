
import { supabase } from "@/integrations/supabase/client";

/**
 * Fetches bus data from Supabase
 * This is used as a centralized service for accessing bus data
 */
export const getBusData = async () => {
  try {
    console.log("Fetching bus data from Supabase...");
    
    // Using backticks for the table name with spaces
    const { data, error } = await supabase
      .from('REC Bus Data')
      .select('*');
    
    if (error) {
      console.error("Error fetching bus data:", error);
      throw error;
    }
    
    console.log("Supabase returned data:", data);
    
    if (!data || data.length === 0) {
      // If no data found, return mock data for development
      console.log("No data found in Supabase, returning mock data");
      return getMockBusData();
    }
    
    return data;
  } catch (error) {
    console.error("Error in getBusData:", error);
    console.log("Returning mock data due to error");
    return getMockBusData();
  }
};

/**
 * Provides mock bus data for development/fallback
 */
const getMockBusData = () => {
  return [
    {
      "S.No": 1,
      "Bus Number:": "1A",
      "BusRoute": "Main Route",
      "Bus Stop Name": "Gandhi Nagar",
      "Timing": "7:30 AM",
      "Location": "North Campus"
    },
    {
      "S.No": 2,
      "Bus Number:": "1A",
      "BusRoute": "Main Route",
      "Bus Stop Name": "Central Station",
      "Timing": "7:45 AM",
      "Location": "East Gate"
    },
    {
      "S.No": 3,
      "Bus Number:": "1A",
      "BusRoute": "Main Route",
      "Bus Stop Name": "College",
      "Timing": "8:15 AM",
      "Location": "Main Gate"
    },
    {
      "S.No": 4,
      "Bus Number:": "2B",
      "BusRoute": "Express Route",
      "Bus Stop Name": "City Center",
      "Timing": "7:15 AM",
      "Location": "Downtown"
    },
    {
      "S.No": 5,
      "Bus Number:": "2B",
      "BusRoute": "Express Route",
      "Bus Stop Name": "Tech Park",
      "Timing": "7:35 AM",
      "Location": "IT Hub"
    },
    {
      "S.No": 6,
      "Bus Number:": "2B",
      "BusRoute": "Express Route",
      "Bus Stop Name": "College",
      "Timing": "8:00 AM",
      "Location": "Main Gate"
    }
  ];
};
