
import { supabase } from "@/integrations/supabase/client";

/**
 * Fetches bus data from Supabase
 * This is used as a centralized service for accessing bus data
 */
export const getBusData = async () => {
  try {
    // Using backticks for the table name with spaces
    const { data, error } = await supabase
      .from('REC Bus Data')
      .select('*');
    
    if (error) {
      console.error("Error fetching bus data:", error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error("Error in getBusData:", error);
    throw error;
  }
};
