
import Papa from 'papaparse';

// The Google Sheet ID from the provided URL for home page routes
const HOME_ROUTES_SHEET_ID = '1G9THQ56NIWP-50yk0YJ6m5qYbT0a7BxFiXmAGOhDf9U';
const HOME_ROUTES_CSV_URL = `https://docs.google.com/spreadsheets/d/${HOME_ROUTES_SHEET_ID}/export?format=csv&gid=0`;

export interface HomeRouteData {
  'Bus Number': string;
  'Route Name': string;
  'First Stop': string;
  'Departure Time': string;
  'Driver Name': string;
  'Contact Number': string;
}

// Sample data for offline usage
const SAMPLE_HOME_ROUTES_CSV = `Bus Number,Route Name,First Stop,Departure Time,Driver Name,Contact Number
1,Ennore to College,Ennore,5:45 AM,Ramesh Kumar,+91 98765 12345
1B,Periyamedu to College,Periyamedu,6:25 AM,Suresh Babu,+91 98765 12346
1C,Tollgate to College,Tollgate,6:05 AM,Kumar Raj,+91 98765 12347
2,Tondiarpet to College,Tondiarpet,6:10 AM,Ravi Kumar,+91 98765 12348
2C,Ajax-Thiruvottiyur to College,Ajax-Thiruvottiyur,5:50 AM,Manoj Singh,+91 98765 12349
3,Koyambedu to College,Koyambedu,5:30 AM,Vinod Kumar,+91 98765 12350`;

export const fetchHomeRoutesData = async (): Promise<HomeRouteData[]> => {
  try {
    let csvText;
    
    try {
      // Try to fetch from Google Sheets
      const response = await fetch(HOME_ROUTES_CSV_URL);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch Home Routes Google Sheet: ${response.statusText}`);
      }
      
      csvText = await response.text();
      
    } catch (fetchError) {
      console.warn("Could not fetch Home Routes Google Sheet:", fetchError);
      console.log("Using sample home routes data instead");
      
      // Use sample data if network fetch fails
      csvText = SAMPLE_HOME_ROUTES_CSV;
    }
    
    return new Promise<HomeRouteData[]>((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data as HomeRouteData[];
          
          // Filter out rows without bus number
          const filteredData = data.filter(row => row['Bus Number'] && row['Route Name']);
          
          console.log("Successfully fetched home routes data:", filteredData.length, "routes");
          resolve(filteredData);
        },
        error: (error) => {
          console.error("Error parsing Home Routes CSV:", error);
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error("Error in fetchHomeRoutesData:", error);
    throw error;
  }
};
