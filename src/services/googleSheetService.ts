
import Papa from 'papaparse';

// The Google Sheet ID from the provided URL
const SHEET_ID = '1gj0LdA2bbAnlw8ZlKKaMyZWAeVXAYqrH6Bzu3e9QgzE';
const SHEET_NAME = 'Sheet1'; // Default sheet name
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=1585165576`;

export interface BusSheetData {
  'Bus Number:': string;
  'Route Name:': string;
  'Stop Name': string;
  'Timing': string;
  'Driver_Name'?: string;
  'Contact_Number'?: string;
  
  // For our internal use:
  Bus_Number?: string;
  Route_Name?: string;
  Bus_Stop_Name?: string;
}

// Sample data for offline usage
const SAMPLE_CSV_DATA = `Bus Number:,Route Name:,Stop Name,Timing,Driver_Name,Contact_Number
1,Ennore to College,Ennore,5:45 AM,Ramesh Kumar,+91 98765 12345
1,Ennore to College,Parry's Corner,6:10 AM,Ramesh Kumar,+91 98765 12345
1,Ennore to College,Wimco Nagar,6:30 AM,Ramesh Kumar,+91 98765 12345
1,Ennore to College,Thiruvottiyur,6:50 AM,Ramesh Kumar,+91 98765 12345
1,Ennore to College,Tollgate,7:10 AM,Ramesh Kumar,+91 98765 12345
1,Ennore to College,Washermanpet,7:30 AM,Ramesh Kumar,+91 98765 12345
1B,Periyamedu to College,Periyamedu,6:25 AM,Suresh Babu,+91 98765 12346
1B,Periyamedu to College,Central Station,6:45 AM,Suresh Babu,+91 98765 12346
1B,Periyamedu to College,Egmore,7:05 AM,Suresh Babu,+91 98765 12346
1B,Periyamedu to College,Chetpet,7:25 AM,Suresh Babu,+91 98765 12346
1B,Periyamedu to College,Nungambakkam,7:45 AM,Suresh Babu,+91 98765 12346`;

export const fetchSheetData = async (): Promise<BusSheetData[]> => {
  try {
    let csvText;
    
    try {
      // Try to fetch from Google Sheets
      const response = await fetch(SHEET_CSV_URL);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch Google Sheet: ${response.statusText}`);
      }
      
      csvText = await response.text();
      
    } catch (fetchError) {
      console.warn("Could not fetch Google Sheet:", fetchError);
      console.log("Using sample data instead");
      
      // Use sample data if network fetch fails
      csvText = SAMPLE_CSV_DATA;
    }
    
    return new Promise<BusSheetData[]>((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          // Cast the parsed data to our type
          const rawData = results.data as any[];
          
          // Transform into our expected format
          const data = rawData.map(row => {
            const transformed: BusSheetData = {
              ...row,
              // Add our standardized keys with proper handling
              Bus_Number: row['Bus Number:'] || '',
              Route_Name: row['Route Name:'] || '',
              Bus_Stop_Name: row['Stop Name'] || ''
            };
            return transformed;
          }).filter(row => row.Bus_Number && row.Bus_Stop_Name); // Filter out rows without bus number or stop name
          
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
    console.error("Error in fetchSheetData:", error);
    throw error;
  }
};
