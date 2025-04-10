
import { supabase } from "@/integrations/supabase/client";

/**
 * Fetches bus data from Supabase
 * This is used as a centralized service for accessing bus data
 */
export const getBusData = async () => {
  const { data, error } = await supabase
    .from('REC Bus Data')
    .select('*')
    .order('S.No', { ascending: true });
  
  if (error) {
    console.error("Error fetching bus data:", error);
    throw error;
  }
  
  return data;
};
