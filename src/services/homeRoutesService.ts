
import Papa from 'papaparse';

// The Google Sheet ID for home page routes
const HOME_ROUTES_SHEET_ID = '1G9THQ56NIWP-50yk0YJ6m5qYbT0a7BxFiXmAGOhDf9U';
const HOME_ROUTES_CSV_URL = `https://docs.google.com/spreadsheets/d/${HOME_ROUTES_SHEET_ID}/export?format=csv&gid=0`;

export interface HomeRouteData {
  'Bus Number:'?: string;
  'Route Name:'?: string;
  'Stop Name'?: string;
  'Timing'?: string;
  'Driver_Name'?: string;
  'Contact_Number'?: string;
}

export const fetchHomeRoutesData = async (): Promise<HomeRouteData[]> => {
  try {
    console.log("Fetching home routes data from Google Sheet");
    
    const response = await fetch(HOME_ROUTES_CSV_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch home routes: ${response.statusText}`);
    }
    
    const csvText = await response.text();
    
    return new Promise<HomeRouteData[]>((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data as HomeRouteData[];
          
          // Filter out rows without bus number or stop name
          const filteredData = data.filter(row => 
            row['Bus Number:'] && row['Stop Name'] && 
            row['Bus Number:'].trim() !== '' && row['Stop Name'].trim() !== ''
          );
          
          console.log("Successfully fetched home routes data:", filteredData.length, "routes");
          resolve(filteredData);
        },
        error: (error) => {
          console.error("Error parsing home routes CSV:", error);
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error("Error in fetchHomeRoutesData:", error);
    throw error;
  }
};
