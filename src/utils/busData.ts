
import { BusSheetData, fetchSheetData } from '@/services/googleSheetService';

interface BusStop {
  name: string;
  arrivalTime: string;
}

export interface BusDetails {
  id: string;
  busNumber: string;
  routeName: string;
  driver: string;
  contactNumber: string;
  stops: BusStop[];
}

// This function will fetch bus data from Google Sheets
export const fetchBusData = async (): Promise<BusDetails[]> => {
  try {
    // Get the raw data from Google Sheets
    const sheetData = await fetchSheetData();
    
    console.log("Sheet data fetched:", sheetData.length, "rows");
    
    if (!sheetData || sheetData.length === 0) {
      console.warn("No data returned from Google Sheets, using fallback data");
      return getFallbackBusData();
    }
    
    // Group bus data by bus number and route name
    const busesByNumber: Record<string, BusSheetData[]> = {};
    
    sheetData.forEach(row => {
      if (row.Bus_Number && row.Bus_Stop_Name) {
        const busKey = `${row.Bus_Number.trim()}-${row.Route_Name?.trim() || 'Unknown'}`;
        if (!busesByNumber[busKey]) {
          busesByNumber[busKey] = [];
        }
        busesByNumber[busKey].push(row);
      }
    });
    
    // Transform grouped data into our BusDetails format
    const busData: BusDetails[] = Object.entries(busesByNumber).map(([busKey, stops], index) => {
      const parts = busKey.split('-');
      const busNumber = parts[0];
      
      // Sort stops by timing
      stops.sort((a, b) => {
        return (a.Timing || "").localeCompare(b.Timing || "");
      });
      
      // Get the first driver name and contact from the sheet data if available
      const driverName = stops[0]?.Driver_Name || `Driver ${index + 1}`;
      const contactNumber = stops[0]?.Contact_Number || generateRandomPhoneNumber();
      
      return {
        id: `bus-${index + 1}`,
        busNumber,
        routeName: stops[0]?.Route_Name || stops[0]?.Bus_Stop_Name || "Unknown Route",
        driver: driverName,
        contactNumber,
        stops: stops.map(stop => ({
          name: stop.Bus_Stop_Name || "",
          arrivalTime: stop.Timing || ""
        }))
      };
    });
    
    // Sort buses numerically by bus number
    busData.sort((a, b) => {
      // Extract numeric parts of bus numbers
      const aNum = parseInt(a.busNumber.replace(/[^0-9]/g, '')) || 0;
      const bNum = parseInt(b.busNumber.replace(/[^0-9]/g, '')) || 0;
      
      if (aNum === bNum) {
        // If numeric parts are equal, sort by suffix (A, B, C, etc.)
        return a.busNumber.localeCompare(b.busNumber);
      }
      return aNum - bNum;
    });
    
    console.log(`Transformed ${busData.length} buses from Google Sheets data`);
    return busData;
  } catch (error) {
    console.error("Error fetching bus data from Google Sheets:", error);
    console.log("Falling back to local data");
    return getFallbackBusData();
  }
};

// Helper function to generate a random phone number
function generateRandomPhoneNumber(): string {
  return `+91 ${Math.floor(90000 + Math.random() * 9999)} ${Math.floor(10000 + Math.random() * 89999)}`;
}

// Fallback data to use when sheet fetch fails
function getFallbackBusData(): BusDetails[] {
  // Define some common stops
  const commonStops = [
    "Koyambedu", "Anna Nagar", "Aminjikarai", "Poonamallee", "Ambattur", 
    "Avadi", "Porur", "Vadapalani", "Guindy", "Adyar", "Tambaram", 
    "Chromepet", "Thoraipakkam", "Sholinganallur", "OMR", "ECR", 
    "T. Nagar", "Nungambakkam", "Mylapore", "Velachery", "Pallavaram"
  ];
  
  const busData: BusDetails[] = [
    {
      id: "bus-1",
      busNumber: "1",
      routeName: "Ennore",
      driver: "Ramesh Kumar",
      contactNumber: "+91 98765 12345",
      stops: [
        { name: "Ennore", arrivalTime: "5:45 AM" },
        { name: "Parry's Corner", arrivalTime: "6:10 AM" },
        { name: "Wimco Nagar", arrivalTime: "6:30 AM" },
        { name: "Thiruvottiyur", arrivalTime: "6:50 AM" },
        { name: "Tollgate", arrivalTime: "7:10 AM" },
        { name: "Washermanpet", arrivalTime: "7:30 AM" },
        { name: "Broadway", arrivalTime: "7:50 AM" },
        { name: "College", arrivalTime: "8:30 AM" }
      ]
    },
    {
      id: "bus-2",
      busNumber: "1B",
      routeName: "Periyamedu",
      driver: "Suresh Babu",
      contactNumber: "+91 98765 12346",
      stops: [
        { name: "Periyamedu", arrivalTime: "6:25 AM" },
        { name: "Central Station", arrivalTime: "6:45 AM" },
        { name: "Egmore", arrivalTime: "7:05 AM" },
        { name: "Chetpet", arrivalTime: "7:25 AM" },
        { name: "Nungambakkam", arrivalTime: "7:45 AM" },
        { name: "College", arrivalTime: "8:30 AM" }
      ]
    },
    {
      id: "bus-3",
      busNumber: "1C",
      routeName: "Tollgate",
      driver: "Driver 3",
      contactNumber: "+91 98765 12347",
      stops: [
        { name: "Tollgate", arrivalTime: "6:05 AM" },
        { name: "Manali", arrivalTime: "6:25 AM" },
        { name: "Madhavaram", arrivalTime: "6:45 AM" },
        { name: "Perambur", arrivalTime: "7:10 AM" },
        { name: "Vyasarpadi", arrivalTime: "7:30 AM" },
        { name: "College", arrivalTime: "8:30 AM" }
      ]
    },
    {
      id: "bus-4",
      busNumber: "2",
      routeName: "Tondiarpet",
      driver: "Driver 4",
      contactNumber: "+91 98765 12348",
      stops: [
        { name: "Tondiarpet", arrivalTime: "6:10 AM" },
        { name: "Old Washermanpet", arrivalTime: "6:30 AM" },
        { name: "Royapuram", arrivalTime: "6:50 AM" },
        { name: "Broadway", arrivalTime: "7:10 AM" },
        { name: "Park Town", arrivalTime: "7:30 AM" },
        { name: "College", arrivalTime: "8:30 AM" }
      ]
    },
    {
      id: "bus-5",
      busNumber: "2C",
      routeName: "Ajax-Thiruvottiyur",
      driver: "Driver 5",
      contactNumber: "+91 98765 12349",
      stops: [
        { name: "Ajax-Thiruvottiyur", arrivalTime: "5:50 AM" },
        { name: "Korukkupet", arrivalTime: "6:10 AM" },
        { name: "Tondiarpet", arrivalTime: "6:30 AM" },
        { name: "Mint", arrivalTime: "6:50 AM" },
        { name: "Central", arrivalTime: "7:10 AM" },
        { name: "College", arrivalTime: "8:30 AM" }
      ]
    }
  ];
  
  // Create additional fallback buses
  for (let i = 3; i <= 10; i++) {
    const baseNumber = Math.ceil(i / 3);
    let busNumber;
    
    if (i % 3 === 0) {
      busNumber = `${baseNumber}B`;
    } else if (i % 3 === 1) {
      busNumber = `${baseNumber}`;
    } else {
      busNumber = `${baseNumber}A`;
    }
    
    const routeNameIndex = (i - 3) % commonStops.length;
    const routeName = commonStops[routeNameIndex];
    
    const hour = 5 + Math.floor((i % 3) / 2);
    const minute = ((i * 5) % 60).toString().padStart(2, '0');
    const startTime = `${hour}:${minute} AM`;
    
    const numberOfStops = Math.floor(Math.random() * 5) + 3;
    const stops: BusStop[] = [];
    
    stops.push({ name: routeName, arrivalTime: startTime });
    
    for (let j = 1; j < numberOfStops; j++) {
      let stopIndex = (routeNameIndex + j) % commonStops.length;
      const previousStopTime = stops[j-1].arrivalTime;
      const [prevHour, prevMinute, prevAmPm] = previousStopTime.match(/(\d+):(\d+)\s*(AM|PM)/).slice(1);
      
      let newHour = parseInt(prevHour);
      let newMinute = parseInt(prevMinute) + 15 + Math.floor(Math.random() * 10);
      let newAmPm = prevAmPm;
      
      if (newMinute >= 60) {
        newHour += 1;
        newMinute -= 60;
      }
      
      if (newHour === 12 && prevAmPm === "AM") {
        newAmPm = "PM";
      } else if (newHour > 12) {
        newHour -= 12;
        newAmPm = "PM";
      }
      
      const newTime = `${newHour}:${newMinute.toString().padStart(2, '0')} ${newAmPm}`;
      
      stops.push({ name: commonStops[stopIndex], arrivalTime: newTime });
    }
    
    stops.push({ name: "College", arrivalTime: "8:30 AM" });
    
    busData.push({
      id: `bus-${i}`,
      busNumber: busNumber,
      routeName: routeName,
      driver: `Driver ${i}`,
      contactNumber: `+91 ${Math.floor(90000 + Math.random() * 9999)} ${Math.floor(10000 + Math.random() * 89999)}`,
      stops: stops
    });
  }
  
  return busData;
}
