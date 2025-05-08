
import Papa from 'papaparse';

// The Google Sheet ID from the provided URL
const SHEET_ID = '1gj0LdA2bbAnlw8ZlKKaMyZWAeVXAYqrH6Bzu3e9QgzE';
const SHEET_NAME = 'Sheet1'; // Default sheet name, adjust if needed

// The URL to fetch the CSV data from Google Sheets
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=1585165576`;

export interface BusSheetData {
  Bus_Number: string;
  Route_Name: string;
  Bus_Stop_Name: string;
  Timing: string;
  Driver_Name?: string;
  Contact_Number?: string;
}

export const fetchSheetData = async (): Promise<BusSheetData[]> => {
  try {
    const response = await fetch(SHEET_CSV_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Google Sheet: ${response.statusText}`);
    }
    
    const csvText = await response.text();
    
    return new Promise<BusSheetData[]>((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          // Cast the parsed data to our type
          const data = results.data as BusSheetData[];
          console.log("Successfully fetched sheet data:", data.length, "records");
          resolve(data);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error("Error fetching Google Sheet:", error);
    throw error;
  }
};
