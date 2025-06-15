
import { useQuery } from '@tanstack/react-query';
import { fetchHomeRoutesData, type HomeRouteData } from '@/services/homeRoutesService';

export interface HomeRoute {
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

const transformHomeRoutesData = (data: HomeRouteData[]): HomeRoute[] => {
  // Group by bus number and route
  const routeGroups: Record<string, HomeRouteData[]> = {};
  
  data.forEach(row => {
    const busNumber = row['Bus Number:']?.trim();
    const routeName = row['Route Name:']?.trim();
    
    if (busNumber && routeName) {
      const key = `${busNumber}-${routeName}`;
      if (!routeGroups[key]) {
        routeGroups[key] = [];
      }
      routeGroups[key].push(row);
    }
  });
  
  // Transform grouped data into HomeRoute format
  const routes: HomeRoute[] = Object.entries(routeGroups).map(([key, stops], index) => {
    const [busNumber, routeName] = key.split('-');
    
    // Sort stops by timing
    const sortedStops = stops.sort((a, b) => {
      const timeA = a.Timing || '';
      const timeB = b.Timing || '';
      return timeA.localeCompare(timeB);
    });
    
    const formattedStops = sortedStops.map(stop => ({
      name: stop['Stop Name'] || '',
      arrivalTime: stop.Timing || ''
    }));
    
    // Add College as final destination if not already present
    const hasCollege = formattedStops.some(stop => 
      stop.name.toLowerCase().includes('college')
    );
    
    if (!hasCollege) {
      formattedStops.push({
        name: 'College',
        arrivalTime: '7:40 AM'
      });
    }
    
    return {
      id: `home-route-${busNumber}-${index}`,
      busNumber,
      routeName: `${routeName} to College`,
      driver: stops[0]?.Driver_Name || `Driver ${index + 1}`,
      contactNumber: stops[0]?.Contact_Number || `+91 98765 ${10000 + index}`,
      stops: formattedStops
    };
  });
  
  // Sort by bus number
  routes.sort((a, b) => {
    const aNum = parseInt(a.busNumber.replace(/[^0-9]/g, '')) || 0;
    const bNum = parseInt(b.busNumber.replace(/[^0-9]/g, '')) || 0;
    
    if (aNum === bNum) {
      return a.busNumber.localeCompare(b.busNumber);
    }
    return aNum - bNum;
  });
  
  return routes;
};

export const useHomeRoutes = () => {
  const { data: rawData = [], isLoading, error } = useQuery({
    queryKey: ['homeRoutes'],
    queryFn: fetchHomeRoutesData,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes to get updates
    staleTime: 2 * 60 * 1000, // Consider data stale after 2 minutes
  });
  
  const routes = transformHomeRoutesData(rawData);
  
  return {
    routes,
    isLoading,
    error
  };
};
