
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
  
  // For now, we'll use the data from the screenshot as a starting point
  const busData: BusDetails[] = [
    {
      id: "bus-1",
      busNumber: "1",
      routeName: "Ennore",
      driver: "Driver 1",
      contactNumber: "+91 98765 12345",
      stops: [
        { name: "Ennore", arrivalTime: "5.45 am" },
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
        { name: "Periyamedu", arrivalTime: "6.25 am" },
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
        { name: "Tollgate", arrivalTime: "6.05 am" },
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
        { name: "Tondiarpet", arrivalTime: "6.10 am" },
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
        { name: "Ajax-Thiruvottiyur", arrivalTime: "5.50 am" },
        { name: "College", arrivalTime: "8:30 AM" }
      ]
    },
    {
      id: "bus-6",
      busNumber: "3",
      routeName: "Choolai",
      driver: "Driver 6",
      contactNumber: "+91 98765 12350",
      stops: [
        { name: "Choolai", arrivalTime: "6.15 am" },
        { name: "College", arrivalTime: "8:30 AM" }
      ]
    },
    {
      id: "bus-7",
      busNumber: "3C",
      routeName: "Doveton Bridge",
      driver: "Driver 7",
      contactNumber: "+91 98765 12351",
      stops: [
        { name: "Doveton Bridge", arrivalTime: "6.20 am" },
        { name: "College", arrivalTime: "8:30 AM" }
      ]
    },
    {
      id: "bus-8",
      busNumber: "4",
      routeName: "Chintadripet",
      driver: "Driver 8",
      contactNumber: "+91 98765 12352",
      stops: [
        { name: "Chintadripet", arrivalTime: "6.15 am" },
        { name: "College", arrivalTime: "8:30 AM" }
      ]
    },
    {
      id: "bus-9",
      busNumber: "4C",
      routeName: "Loyola College",
      driver: "Driver 9",
      contactNumber: "+91 98765 12353",
      stops: [
        { name: "Loyola College", arrivalTime: "6.35 am" },
        { name: "College", arrivalTime: "8:30 AM" }
      ]
    },
    {
      id: "bus-10",
      busNumber: "5",
      routeName: "Chintamani",
      driver: "Driver 10",
      contactNumber: "+91 98765 12354",
      stops: [
        { name: "Chintamani", arrivalTime: "6.30 am" },
        { name: "College", arrivalTime: "8:30 AM" }
      ]
    },
    {
      id: "bus-11",
      busNumber: "5A",
      routeName: "Arumbakkam",
      driver: "Driver 11",
      contactNumber: "+91 98765 12355",
      stops: [
        { name: "Arumbakkam", arrivalTime: "6.40 am" },
        { name: "College", arrivalTime: "8:30 AM" }
      ]
    },
    {
      id: "bus-12",
      busNumber: "5B",
      routeName: "Maduravoyel Erikarai",
      driver: "Driver 12",
      contactNumber: "+91 98765 12356",
      stops: [
        { name: "Maduravoyel Erikarai", arrivalTime: "6.50 am" },
        { name: "College", arrivalTime: "8:30 AM" }
      ]
    },
    {
      id: "bus-13",
      busNumber: "5C",
      routeName: "Thirunagar (Ambica Empire Hotel)",
      driver: "Driver 13",
      contactNumber: "+91 98765 12357",
      stops: [
        { name: "Thirunagar (Ambica Empire Hotel)", arrivalTime: "6.40 am" },
        { name: "College", arrivalTime: "8:30 AM" }
      ]
    },
    {
      id: "bus-14",
      busNumber: "6",
      routeName: "New Avadi Road Water Tank",
      driver: "Driver 14",
      contactNumber: "+91 98765 12358",
      stops: [
        { name: "New Avadi Road Water Tank", arrivalTime: "6.25 am" },
        { name: "College", arrivalTime: "8:30 AM" }
      ]
    },
    {
      id: "bus-15",
      busNumber: "7",
      routeName: "Anna Nagar East",
      driver: "Driver 15",
      contactNumber: "+91 98765 12359",
      stops: [
        { name: "Anna Nagar East", arrivalTime: "6.35 am" },
        { name: "College", arrivalTime: "8:30 AM" }
      ]
    },
    {
      id: "bus-16",
      busNumber: "7A",
      routeName: "Collector Nagar",
      driver: "Driver 16",
      contactNumber: "+91 98765 12360",
      stops: [
        { name: "Collector Nagar", arrivalTime: "6.45 am" },
        { name: "College", arrivalTime: "8:30 AM" }
      ]
    },
    {
      id: "bus-17",
      busNumber: "7C",
      routeName: "Wavin",
      driver: "Driver 17",
      contactNumber: "+91 98765 12361",
      stops: [
        { name: "Wavin", arrivalTime: "6.40 am" },
        { name: "College", arrivalTime: "8:30 AM" }
      ]
    },
    {
      id: "bus-18",
      busNumber: "8",
      routeName: "SIDCO Villivakkam",
      driver: "Driver 18",
      contactNumber: "+91 98765 12362",
      stops: [
        { name: "SIDCO Villivakkam", arrivalTime: "6.40 am" },
        { name: "College", arrivalTime: "8:30 AM" }
      ]
    },
    {
      id: "bus-19",
      busNumber: "8C",
      routeName: "Waves",
      driver: "Driver 19",
      contactNumber: "+91 98765 12363",
      stops: [
        { name: "Waves", arrivalTime: "6.40 am" },
        { name: "College", arrivalTime: "8:30 AM" }
      ]
    },
    {
      id: "bus-20",
      busNumber: "9",
      routeName: "Mogappair East",
      driver: "Driver 20",
      contactNumber: "+91 98765 12364",
      stops: [
        { name: "Mogappair East", arrivalTime: "6.40 am" },
        { name: "College", arrivalTime: "8:30 AM" }
      ]
    },
    {
      id: "bus-21",
      busNumber: "9A",
      routeName: "Mogappair (Golden Flat)",
      driver: "Driver 21",
      contactNumber: "+91 98765 12365",
      stops: [
        { name: "Mogappair (Golden Flat)", arrivalTime: "6.45 am" },
        { name: "College", arrivalTime: "8:30 AM" }
      ]
    }
  ];
  
  // Add more buses to reach approximately 100
  for (let i = 22; i <= 100; i++) {
    busData.push({
      id: `bus-${i}`,
      busNumber: `${Math.floor(i/3) + 10}${i % 3 === 0 ? '' : i % 3 === 1 ? 'A' : 'B'}`,
      routeName: `Route ${i}`,
      driver: `Driver ${i}`,
      contactNumber: `+91 98765 ${10000 + i}`.substring(0, 14),
      stops: [
        { name: `Stop ${i}`, arrivalTime: `${6 + (i % 2)}.${(i * 5) % 60} am` },
        { name: "College", arrivalTime: "8:30 AM" }
      ]
    });
  }
  
  return busData;
};
