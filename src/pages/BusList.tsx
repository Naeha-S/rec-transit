
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowLeft, Bus } from "lucide-react";
import Header from '@/components/Header';
import MobileNav from '@/components/MobileNav';
import Sidebar from '@/components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useQuery } from '@tanstack/react-query';
import { getBusData } from "@/services/busService";

// Bus stop interface
interface BusRouteStop {
  name: string;
  arrivalTime: string;
}

// Bus route interface
interface BusRoute {
  id: string;
  routeNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  status: "on-time" | "delayed" | "cancelled";
  busType: "AC" | "Non-AC";
  stops: BusRouteStop[];
  routeName?: string; // Added routeName as optional
}

// Function to fetch bus data from Supabase using the service
const fetchBusDataFromSupabase = async (): Promise<BusRoute[]> => {
  try {
    const data = await getBusData();
    
    if (!data || data.length === 0) {
      console.warn("No bus data returned from Supabase");
      return [];
    }
    
    // Group bus data by bus number and route
    const busMap = new Map();

    // Process each bus stop entry from the table
    data.forEach(item => {
      const busNumber = item['Bus Number'] || '';
      const routeName = item['Route Name'] || '';
      const stopName = item['Bus Stop Name'] || '';
      const timing = item['Timing'] || '';
      
      const key = `${busNumber}-${routeName}`;
      
      if (!busMap.has(key)) {
        // Initialize a new bus entry
        busMap.set(key, {
          id: `bus-${busNumber}-${routeName}`.replace(/\s+/g, '-').toLowerCase(),
          routeNumber: busNumber,
          routeName: routeName,
          origin: '',
          destination: 'College',
          departureTime: '',
          arrivalTime: '8:30 AM',
          status: Math.random() > 0.7 ? "delayed" : Math.random() > 0.9 ? "cancelled" : "on-time", // Random status for demo
          busType: Math.random() > 0.5 ? "AC" : "Non-AC", // Random bus type for demo
          stops: []
        });
      }
      
      // Add this stop to the bus's stops array
      const bus = busMap.get(key);
      bus.stops.push({
        name: stopName,
        arrivalTime: timing
      });
    });
    
    // Sort stops and set origin and first departure time
    const busRoutes: BusRoute[] = [];
    
    busMap.forEach(bus => {
      if (bus.stops.length > 0) {
        // Set the first stop as origin
        bus.origin = bus.stops[0].name;
        bus.departureTime = bus.stops[0].arrivalTime;
        
        // Sort stops by timing when possible
        try {
          bus.stops.sort((a, b) => {
            const timeA = new Date(`2025-01-01 ${a.arrivalTime}`);
            const timeB = new Date(`2025-01-01 ${b.arrivalTime}`);
            return timeA.getTime() - timeB.getTime();
          });
        } catch (e) {
          console.warn("Couldn't sort stops by time:", e);
        }
        
        busRoutes.push(bus);
      }
    });
    
    return busRoutes;
  } catch (error) {
    console.error("Error in fetchBusDataFromSupabase:", error);
    throw error;
  }
};

const BusList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('buses');
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { t } = useLanguageContext();

  // Fetch data from Supabase using React Query
  const { data: busRoutes = [], isLoading, error } = useQuery({
    queryKey: ['busRoutes'],
    queryFn: fetchBusDataFromSupabase,
  });

  const toggleNav = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const filteredRoutes = busRoutes.filter(
    (route) =>
      route.routeNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (route.routeName && route.routeName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectRoute = (route: BusRoute) => {
    setSelectedRoute(route);
  };

  const clearSelection = () => {
    setSelectedRoute(null);
  };

  const statusColors = {
    "on-time": "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400",
    "delayed": "text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400",
    "cancelled": "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay for sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden" 
          onClick={toggleNav}
        ></div>
      )}
      
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={sidebarOpen} 
      />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
        <Header onToggleNav={toggleNav} />
        
        <main className="flex-1 p-3 sm:p-4 pt-20 pb-20 lg:pb-4 max-w-7xl mx-auto w-full">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/')}
                className="mr-2"
              >
                <ArrowLeft size={20} />
              </Button>
              <h1 className="text-xl sm:text-2xl font-bold">{t('allBuses')}</h1>
            </div>
          </div>
          
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <div className="w-full flex items-center gap-2">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder={t('searchByRouteOriginDestination')}
                    className="w-full pl-8"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">{t('loading')}...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-destructive">{t('errorLoadingData')}</p>
                  <p className="text-sm text-muted-foreground mt-2">Please try again later</p>
                </div>
              ) : selectedRoute ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearSelection}
                      >
                        <ArrowLeft size={16} className="mr-1" />
                        {t('back')}
                      </Button>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium mr-2">{t('route')}:</span>
                      <span className="font-bold">{selectedRoute.routeNumber}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{t('routeDetails')}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-y-2">
                            <div className="text-sm font-medium">{t('origin')}:</div>
                            <div className="text-sm">{selectedRoute.origin}</div>
                            
                            <div className="text-sm font-medium">{t('destination')}:</div>
                            <div className="text-sm">{selectedRoute.destination}</div>
                            
                            <div className="text-sm font-medium">{t('departure')}:</div>
                            <div className="text-sm">{selectedRoute.departureTime}</div>
                            
                            <div className="text-sm font-medium">{t('arrival')}:</div>
                            <div className="text-sm">{selectedRoute.arrivalTime}</div>
                            
                            <div className="text-sm font-medium">{t('busType')}:</div>
                            <div className="text-sm">{selectedRoute.busType}</div>
                            
                            <div className="text-sm font-medium">{t('status')}:</div>
                            <div className="text-sm">
                              <span className={`px-2 py-0.5 rounded text-xs ${statusColors[selectedRoute.status]}`}>
                                {selectedRoute.status === "on-time" ? t('onTime') : 
                                 selectedRoute.status === "delayed" ? t('delayed') : t('cancelled')}
                              </span>
                            </div>
                            
                            {selectedRoute.routeName && (
                              <>
                                <div className="text-sm font-medium">Route Name:</div>
                                <div className="text-sm">{selectedRoute.routeName}</div>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{t('stops')}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bus-details-scroll">
                          <ScrollArea className="h-[300px] rounded-md border">
                            <div className="p-4">
                              {selectedRoute.stops.map((stop, idx) => (
                                <div key={idx} className="mb-3 pb-3 border-b last:border-0">
                                  <div className="flex justify-between items-center">
                                    <div className="text-sm font-medium">{stop.name}</div>
                                    <div className="text-sm text-muted-foreground">{stop.arrivalTime}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredRoutes.length === 0 ? (
                    <div className="text-center py-8">
                      <Bus className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-2 text-lg font-semibold">{t('noRoutesFound')}</h3>
                      <p className="text-sm text-muted-foreground">{t('tryDifferentSearch')}</p>
                    </div>
                  ) : (
                    <div className="bus-details-scroll">
                      <div className="divide-y">
                        {filteredRoutes.map((route) => (
                          <div 
                            key={route.id} 
                            className="py-3 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-muted/50 cursor-pointer"
                            onClick={() => handleSelectRoute(route)}
                          >
                            <div className="flex items-center mb-2 sm:mb-0">
                              <div className="bg-college-blue text-white font-bold h-10 w-10 rounded-full flex items-center justify-center mr-3">
                                {route.routeNumber}
                              </div>
                              <div>
                                <div className="font-medium">
                                  {route.origin} → {route.destination}
                                  {route.routeName && <span className="ml-1 text-muted-foreground">({route.routeName})</span>}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {route.departureTime} - {route.arrivalTime}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center ml-13 sm:ml-0">
                              <span className={`px-2 py-0.5 rounded text-xs ${statusColors[route.status]}`}>
                                {route.status === "on-time" ? t('onTime') : 
                                 route.status === "delayed" ? t('delayed') : t('cancelled')}
                              </span>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="ml-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectRoute(route);
                                }}
                              >
                                {t('view')}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
      
      {/* Mobile Navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default BusList;
