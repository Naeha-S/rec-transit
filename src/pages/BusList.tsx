
import React, { useState, useEffect } from 'react';
import { BusDetails, fetchBusData } from '@/utils/busData';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowLeft, Bus, Calendar as CalendarIcon } from "lucide-react";
import Header from '@/components/Header';
import MobileNav from '@/components/MobileNav';
import Sidebar from '@/components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, isSunday } from "date-fns";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

interface BusRouteStop {
  name: string;
  arrivalTime: string;
}

// Re-map the data structure to match what the component expects
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
}

const BusList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('buses');
  const [busRoutes, setBusRoutes] = useState<BusRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Date>(new Date());
  const [isSundaySelected, setIsSundaySelected] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { t } = useLanguageContext();

  useEffect(() => {
    // Check if selected date is Sunday
    if (date && isSunday(date)) {
      setIsSundaySelected(true);
      setBusRoutes([]);
      setLoading(false);
    } else {
      setIsSundaySelected(false);
      loadBusData();
    }
  }, [date]);

  const fetchBusDataFromSupabase = async () => {
    try {
      console.log("Fetching bus data from Supabase");
      
      // Fix: Use the correct column names from REC_Bus_Data table
      const { data, error } = await supabase
        .from('REC_Bus_Data')
        .select('*');
        
      if (error) {
        console.error("Supabase query error:", error);
        throw error;
      }
      
      if (!data || data.length === 0) {
        console.log("No data returned from Supabase");
        return null;
      }
      
      console.log("Supabase returned data:", data);
      
      // Transform the data to match our component's expected format
      // Group by Bus Number to create routes
      const busGroups = data.reduce((acc, item) => {
        const busNumber = item.Bus_Number || "";
        if (!acc[busNumber]) {
          acc[busNumber] = [];
        }
        acc[busNumber].push(item);
        return acc;
      }, {} as Record<string, any[]>);
      
      // Convert grouped data to BusRoute format
      const transformedData: BusRoute[] = Object.entries(busGroups).map(([busNumber, stops], index) => {
        // Sort stops by timing
        stops.sort((a, b) => {
          const timeA = a.Timing || "";
          const timeB = b.Timing || "";
          return timeA.localeCompare(timeB);
        });
        
        const firstStop = stops[0];
        const lastStop = stops[stops.length - 1];
        
        return {
          id: `bus-${index}`,
          routeNumber: busNumber,
          origin: firstStop["bus _stop_name"] || "",
          destination: lastStop["bus _stop_name"] || "",
          departureTime: firstStop.Timing || "",
          arrivalTime: lastStop.Timing || "",
          status: Math.random() > 0.7 ? "delayed" : Math.random() > 0.9 ? "cancelled" : "on-time",
          busType: Math.random() > 0.5 ? "AC" : "Non-AC",
          stops: stops.map(stop => ({
            name: stop["bus _stop_name"] || "",
            arrivalTime: stop.Timing || ""
          }))
        };
      });
      
      console.log("Transformed data:", transformedData);
      return transformedData;
    } catch (error) {
      console.error("Error in fetchBusDataFromSupabase:", error);
      return null;
    }
  };

  const loadBusData = async () => {
    try {
      setLoading(true);
      
      // First try to get data from Supabase
      const supabaseData = await fetchBusDataFromSupabase();
      
      if (supabaseData && supabaseData.length > 0) {
        console.log("Using Supabase data");
        setBusRoutes(supabaseData);
      } else {
        // Fallback to local data if Supabase fails
        console.log("Falling back to local data");
        const data = await fetchBusData();
        const transformedData: BusRoute[] = data.map(bus => ({
          id: bus.id,
          routeNumber: bus.busNumber,
          origin: bus.stops[0]?.name || '',
          destination: bus.stops[bus.stops.length - 1]?.name || '',
          departureTime: bus.stops[0]?.arrivalTime || '',
          arrivalTime: bus.stops[bus.stops.length - 1]?.arrivalTime || '',
          status: Math.random() > 0.7 ? "delayed" : Math.random() > 0.9 ? "cancelled" : "on-time", // Random status for demo
          busType: Math.random() > 0.5 ? "AC" : "Non-AC", // Random bus type for demo
          stops: bus.stops.map(stop => ({
            name: stop.name,
            arrivalTime: stop.arrivalTime
          }))
        }));
        setBusRoutes(transformedData);
      }
    } catch (error) {
      console.error("Failed to load bus data:", error);
      // Still show some data even if we failed
      const fallbackData = await fetchBusData();
      const transformedData: BusRoute[] = fallbackData.map(bus => ({
        id: bus.id,
        routeNumber: bus.busNumber,
        origin: bus.stops[0]?.name || '',
        destination: bus.stops[bus.stops.length - 1]?.name || '',
        departureTime: bus.stops[0]?.arrivalTime || '',
        arrivalTime: bus.stops[bus.stops.length - 1]?.arrivalTime || '',
        status: "on-time",
        busType: "Non-AC",
        stops: bus.stops.map(stop => ({
          name: stop.name,
          arrivalTime: stop.arrivalTime
        }))
      }));
      setBusRoutes(transformedData);
    } finally {
      setLoading(false);
    }
  };

  const toggleNav = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const filteredRoutes = busRoutes.filter(
    (route) =>
      route.routeNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.destination.toLowerCase().includes(searchTerm.toLowerCase())
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
            
            {/* Date Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[180px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>{t('pickDate')}</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => setDate(newDate || new Date())}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
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
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">{t('loading')}...</p>
                </div>
              ) : isSundaySelected ? (
                <div className="text-center py-8">
                  <Bus className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-semibold">{t('noServiceOnSunday')}</h3>
                  <p className="text-sm text-muted-foreground">{t('collegeClosedOnSundays')}</p>
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredRoutes.map((route) => (
                          <div 
                            key={route.id} 
                            className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                            onClick={() => handleSelectRoute(route)}
                          >
                            <div className="flex items-center mb-2">
                              <div className="bg-college-blue text-white font-bold h-10 w-10 rounded-full flex items-center justify-center mr-3">
                                {route.routeNumber}
                              </div>
                              <div>
                                <span className={`px-2 py-0.5 rounded text-xs ${statusColors[route.status]}`}>
                                  {route.status === "on-time" ? t('onTime') : 
                                   route.status === "delayed" ? t('delayed') : t('cancelled')}
                                </span>
                              </div>
                            </div>
                            <div className="mb-2">
                              <div className="font-medium">{route.origin} → {route.destination}</div>
                              <div className="text-sm text-muted-foreground">
                                {route.departureTime} - {route.arrivalTime}
                              </div>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full mt-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectRoute(route);
                              }}
                            >
                              {t('viewDetails')}
                            </Button>
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
