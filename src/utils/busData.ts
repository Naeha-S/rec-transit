
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

// This function will fetch bus data from the external API
// For now, we'll return mock data based on the screenshot
export const fetchBusData = async (): Promise<BusDetails[]> => {
  // In a real implementation, you would fetch data from an API
  // const response = await fetch('https://www.rectransport.com/api/busdata');
  // const data = await response.json();
  
  // Hardcoded data based on rectransport.com information
  const busData: BusDetails[] = [
    {
      id: "bus-1",
      busNumber: "1",
      routeName: "Ennore",
      driver: "Driver 1",
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
      driver: "Driver 2",
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
  
  // Generate additional buses with more detailed stop information
  const commonStops = [
    "Koyambedu", "Anna Nagar", "Aminjikarai", "Poonamallee", "Ambattur", 
    "Avadi", "Porur", "Vadapalani", "Guindy", "Adyar", "Tambaram", 
    "Chromepet", "Thoraipakkam", "Sholinganallur", "OMR", "ECR", 
    "T. Nagar", "Nungambakkam", "Mylapore", "Velachery", "Pallavaram"
  ];
  
  // Create 130+ buses in total
  for (let i = 6; i <= 131; i++) {
    // Generate realistic bus number patterns (1, 1A, 1B, 2, 2A, etc.)
    const baseNumber = Math.ceil(i / 3);
    let busNumber;
    
    if (i % 3 === 0) {
      busNumber = `${baseNumber}B`;
    } else if (i % 3 === 1) {
      busNumber = `${baseNumber}`;
    } else {
      busNumber = `${baseNumber}A`;
    }
    
    // Generate a route name from our list of locations
    const routeNameIndex = (i - 6) % commonStops.length;
    const routeName = commonStops[routeNameIndex];
    
    // Generate a realistic starting time between 5:30 AM and 7:00 AM
    const hour = 5 + Math.floor((i % 3) / 2);
    const minute = ((i * 5) % 60).toString().padStart(2, '0');
    const startTime = `${hour}:${minute} AM`;
    
    // Generate 3-7 stops for each route
    const numberOfStops = Math.floor(Math.random() * 5) + 3;
    const stops: BusStop[] = [];
    
    // First stop is the route name location
    stops.push({ name: routeName, arrivalTime: startTime });
    
    // Add intermediate stops
    for (let j = 1; j < numberOfStops; j++) {
      let stopIndex = (routeNameIndex + j) % commonStops.length;
      // Calculate a time 15-25 minutes after the previous stop
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
    
    // Last stop is always the college
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
  
  // Sort buses by bus number for better presentation
  busData.sort((a, b) => {
    // Extract numeric parts of bus numbers
    const aNum = parseInt(a.busNumber.replace(/[^0-9]/g, ''));
    const bNum = parseInt(b.busNumber.replace(/[^0-9]/g, ''));
    
    if (aNum === bNum) {
      // If numeric parts are equal, sort by suffix (A, B, C, etc.)
      return a.busNumber.localeCompare(b.busNumber);
    }
    return aNum - bNum;
  });
  
  return busData;
};
