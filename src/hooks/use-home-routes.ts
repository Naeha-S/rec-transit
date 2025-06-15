
import { useState, useEffect } from 'react';
import { fetchHomeRoutesData, type HomeRouteData } from '@/services/homeRoutesService';

export interface HomeRoute {
  id: string;
  busNumber: string;
  routeName: string;
  firstStop: string;
  departureTime: string;
  driverName: string;
  contactNumber: string;
}

export const useHomeRoutes = () => {
  const [routes, setRoutes] = useState<HomeRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRoutes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const routesData = await fetchHomeRoutesData();
        
        // Transform the data to our internal format
        const transformedRoutes: HomeRoute[] = routesData.map((route, index) => ({
          id: `route-${route['Bus Number']}-${index}`,
          busNumber: route['Bus Number'],
          routeName: route['Route Name'],
          firstStop: route['First Stop'],
          departureTime: route['Departure Time'],
          driverName: route['Driver Name'],
          contactNumber: route['Contact Number']
        }));
        
        setRoutes(transformedRoutes);
      } catch (err) {
        console.error("Error loading home routes:", err);
        setError("Failed to load routes");
        
        // Set fallback data
        setRoutes([
          {
            id: 'route-1',
            busNumber: '1',
            routeName: 'Ennore to College',
            firstStop: 'Ennore',
            departureTime: '5:45 AM',
            driverName: 'Ramesh Kumar',
            contactNumber: '+91 98765 12345'
          },
          {
            id: 'route-1b',
            busNumber: '1B',
            routeName: 'Periyamedu to College',
            firstStop: 'Periyamedu',
            departureTime: '6:25 AM',
            driverName: 'Suresh Babu',
            contactNumber: '+91 98765 12346'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadRoutes();
  }, []);

  return { routes, loading, error };
};
