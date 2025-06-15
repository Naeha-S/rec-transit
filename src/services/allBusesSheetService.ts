
import Papa from 'papaparse';

// Second Google Sheet ID for All Buses page
const ALL_BUSES_SHEET_ID = '1gj0LdA2bbAnlw8ZlKKaMyZWAeVXAYqrH6Bzu3e9QgzE';
const ALL_BUSES_GID = '1585165576';
const ALL_BUSES_CSV_URL = `https://docs.google.com/spreadsheets/d/${ALL_BUSES_SHEET_ID}/export?format=csv&gid=${ALL_BUSES_GID}`;

export interface AllBusesSheetData {
  'Bus Number'?: string;
  'Route'?: string;
  'Stop Name'?: string;
  'Timing'?: string;
  'Driver Name'?: string;
  'Contact Number'?: string;
  [key: string]: string | undefined;
}

export const fetchAllBusesSheetData = async (): Promise<AllBusesSheetData[]> => {
  try {
    console.log("Fetching data from All Buses Google Sheet:", ALL_BUSES_CSV_URL);
    const response = await fetch(ALL_BUSES_CSV_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch All Buses Google Sheet: ${response.statusText}`);
    }
    
    const csvText = await response.text();
    console.log("Successfully fetched data from All Buses Google Sheets");
    
    return new Promise<AllBusesSheetData[]>((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const rawData = results.data as AllBusesSheetData[];
          
          // Filter out rows without bus number or stop name
          const data = rawData.filter(row => 
            row['Bus Number']?.trim() && row['Stop Name']?.trim()
          );
          
          console.log("Successfully parsed All Buses sheet data:", data.length, "records");
          resolve(data);
        },
        error: (error) => {
          console.error("Error parsing All Buses CSV:", error);
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error("Error in fetchAllBusesSheetData:", error);
    throw error;
  }
};
