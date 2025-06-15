
interface StoredBusData {
  id: string;
  busNumber: string;
  routeName: string;
  driver: string;
  contactNumber: string;
  stops: Array<{
    name: string;
    arrivalTime: string;
  }>;
}

const BUS_DATA_KEY = 'bus_routes_data';
const BUS_DATA_TIMESTAMP_KEY = 'bus_routes_timestamp';

// Cache duration: 1 hour (in milliseconds)
const CACHE_DURATION = 60 * 60 * 1000;

export const getStoredBusData = (): StoredBusData[] | null => {
  try {
    const timestamp = localStorage.getItem(BUS_DATA_TIMESTAMP_KEY);
    const data = localStorage.getItem(BUS_DATA_KEY);
    
    if (!data || !timestamp) {
      return null;
    }
    
    // Check if data is still fresh (within cache duration)
    const dataAge = Date.now() - parseInt(timestamp);
    if (dataAge > CACHE_DURATION) {
      console.log("Stored bus data has expired, will fetch fresh data");
      localStorage.removeItem(BUS_DATA_KEY);
      localStorage.removeItem(BUS_DATA_TIMESTAMP_KEY);
      return null;
    }
    
    return JSON.parse(data);
  } catch (error) {
    console.error("Error getting stored bus data:", error);
    return null;
  }
};

export const storeBusData = (data: StoredBusData[]): void => {
  try {
    localStorage.setItem(BUS_DATA_KEY, JSON.stringify(data));
    localStorage.setItem(BUS_DATA_TIMESTAMP_KEY, Date.now().toString());
    console.log("Bus data stored successfully:", data.length, "buses");
  } catch (error) {
    console.error("Error storing bus data:", error);
  }
};

// Clear stored data to force refresh from new Google Sheet
export const clearStoredBusData = (): void => {
  try {
    localStorage.removeItem(BUS_DATA_KEY);
    localStorage.removeItem(BUS_DATA_TIMESTAMP_KEY);
    console.log("Stored bus data cleared - will fetch fresh data from Google Sheets");
  } catch (error) {
    console.error("Error clearing stored bus data:", error);
  }
};

// Clear stored data immediately when this module loads to force fresh data fetch
clearStoredBusData();
