
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Bus, Clock, CalendarClock, ChevronDown, ChevronRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { fetchBusData, type BusDetails } from '@/utils/busData';
import { useBusVisibility } from '@/contexts/BusVisibilityContext';

const BusSchedules = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('schedules');
  const [expandedBus, setExpandedBus] = useState<string | null>(null);
  const [busData, setBusData] = useState<BusDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();
  const { t } = useLanguageContext();
  const { isBusVisible } = useBusVisibility();

  useEffect(() => {
    const loadBusData = async () => {
      try {
        setLoading(true);
        const data = await fetchBusData();
        setBusData(data);
      } catch (error) {
        console.error("Error loading bus data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBusData();
  }, []);

  const toggleNav = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleBusExpand = (busId: string) => {
    if (expandedBus === busId) {
      setExpandedBus(null);
    } else {
      setExpandedBus(busId);
    }
  };

  // Filter buses based on visibility settings and search term
  const getFilteredBuses = (timeSlot: 'tenAm' | 'fivePm' | 'exam') => {
    return busData.filter(bus => {
      // Check visibility setting
      if (!isBusVisible(bus.id, timeSlot)) {
        return false;
      }

      // Check search term
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          bus.busNumber.toLowerCase().includes(searchLower) ||
          bus.routeName.toLowerCase().includes(searchLower) ||
          bus.stops.some(stop => stop.name.toLowerCase().includes(searchLower))
        );
      }

      return true;
    });
  };

  // Convert bus data to schedule format for different time slots
  const createScheduleData = (buses: BusDetails[], departureTime: string, isToCollege: boolean = true) => {
    return buses.map(bus => ({
      id: bus.id,
      busNumber: bus.busNumber,
      origin: isToCollege ? bus.routeName.replace(' to College', '') : 'REC Campus',
      destination: isToCollege ? 'REC Campus' : bus.routeName.replace(' to College', ''),
      departureTime: departureTime,
      arrivalTime: isToCollege ? '10:40 AM' : getArrivalTime(departureTime),
      stops: isToCollege ? bus.stops : [...bus.stops].reverse().map(stop => ({
        ...stop,
        time: getReturnStopTime(stop.time, departureTime)
      }))
    }));
  };

  const getArrivalTime = (departureTime: string) => {
    const [time, period] = departureTime.split(' ');
    const [hour, minute] = time.split(':').map(Number);
    
    let newHour = hour + 1;
    let newPeriod = period;
    
    if (newHour === 12 && period === 'AM') {
      newPeriod = 'PM';
    } else if (newHour > 12) {
      newHour -= 12;
      newPeriod = 'PM';
    }
    
    return `${newHour}:${minute.toString().padStart(2, '0')} ${newPeriod}`;
  };

  const getReturnStopTime = (originalTime: string, departureTime: string) => {
    // Simple time calculation for return journey
    const [time, period] = departureTime.split(' ');
    const [hour, minute] = time.split(':').map(Number);
    
    let newHour = hour + Math.floor(Math.random() * 2);
    let newPeriod = period;
    
    if (newHour === 12 && period === 'AM') {
      newPeriod = 'PM';
    } else if (newHour > 12) {
      newHour -= 12;
      newPeriod = 'PM';
    }
    
    return `${newHour}:${(minute + Math.floor(Math.random() * 30)).toString().padStart(2, '0')} ${newPeriod}`;
  };

  // Get schedules for different time slots
  const morningSchedules = createScheduleData(getFilteredBuses('tenAm'), '10:00 AM', true);
  const afternoonSchedules = createScheduleData(getFilteredBuses('fivePm'), '1:00 PM', false);
  const eveningSchedules = createScheduleData(getFilteredBuses('fivePm'), '5:00 PM', false);

  const renderBusSchedule = (schedule, index) => (
    <div key={schedule.id} className="mb-2">
      <div 
        className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-3 cursor-pointer"
        onClick={() => toggleBusExpand(schedule.id)}
      >
        <div className="mb-2 sm:mb-0">
          <div className="flex items-center gap-2">
            <div className="bg-college-blue text-white font-semibold px-2 py-1 rounded text-xs">
              {schedule.busNumber}
            </div>
            <span className="text-sm font-medium">{schedule.origin} → {schedule.destination}</span>
            {expandedBus === schedule.id ? (
              <ChevronDown size={16} className="text-muted-foreground" />
            ) : (
              <ChevronRight size={16} className="text-muted-foreground" />
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs text-muted-foreground">
            <div className="font-medium text-foreground">{schedule.departureTime}</div>
            <div>Departure</div>
          </div>
          <div className="text-xs text-muted-foreground">
            <div className="font-medium text-foreground">{schedule.arrivalTime}</div>
            <div>Arrival</div>
          </div>
        </div>
      </div>
      
      {expandedBus === schedule.id && (
        <div className="mt-2 ml-4 pl-2 border-l-2 border-college-blue animate-fade-in">
          <h4 className="text-sm font-medium mb-2">Bus Stops:</h4>
          <div className="space-y-2">
            {schedule.stops.map((stop, idx) => (
              <div key={idx} className="flex justify-between text-xs">
                <span className={`${idx === 0 || idx === schedule.stops.length - 1 ? 'font-medium' : ''}`}>
                  {stop.name}
                </span>
                <span className="text-muted-foreground">{stop.time || stop.arrivalTime}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

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
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
              <h1 className="text-xl sm:text-2xl font-bold text-college-blue dark:text-college-orange mb-4">Other Buses</h1>
              
              <div className="flex items-center gap-2 mb-6">
                <div className="relative w-full">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search bus routes or destinations..."
                    className="w-full pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-college-blue mb-4"></div>
                  <p className="text-muted-foreground">Loading bus schedules...</p>
                </div>
              ) : (
                <Tabs defaultValue="morning" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="morning" className="flex gap-1 items-center">
                      <Clock size={16} />
                      <span className="hidden sm:inline">10 AM</span>
                      <span className="sm:hidden">10 AM</span>
                    </TabsTrigger>
                    <TabsTrigger value="afternoon" className="flex gap-1 items-center">
                      <Bus size={16} />
                      <span className="hidden sm:inline">1 PM</span>
                      <span className="sm:hidden">1 PM</span>
                    </TabsTrigger>
                    <TabsTrigger value="evening" className="flex gap-1 items-center">
                      <CalendarClock size={16} />
                      <span className="hidden sm:inline">5 PM</span>
                      <span className="sm:hidden">5 PM</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="morning" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">10 AM to College</CardTitle>
                        <CardDescription>Buses departing from various locations to REC Campus at 10:00 AM</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-[400px] rounded-md border">
                          <div className="p-4 space-y-4">
                            {morningSchedules.length > 0 ? (
                              morningSchedules.map((schedule, index) => renderBusSchedule(schedule, index))
                            ) : (
                              <div className="text-center py-8">
                                <p className="text-muted-foreground">No schedules found</p>
                              </div>
                            )}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="afternoon" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Return at 1:00 PM</CardTitle>
                        <CardDescription>Buses departing from REC Campus to various locations at 1:00 PM</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-[400px] rounded-md border">
                          <div className="p-4 space-y-4">
                            {afternoonSchedules.length > 0 ? (
                              afternoonSchedules.map((schedule, index) => renderBusSchedule(schedule, index))
                            ) : (
                              <div className="text-center py-8">
                                <p className="text-muted-foreground">No schedules found</p>
                              </div>
                            )}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="evening" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Return at 5:00 PM</CardTitle>
                        <CardDescription>Buses departing from REC Campus to various locations at 5:00 PM</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-[400px] rounded-md border">
                          <div className="p-4 space-y-4">
                            {eveningSchedules.length > 0 ? (
                              eveningSchedules.map((schedule, index) => renderBusSchedule(schedule, index))
                            ) : (
                              <div className="text-center py-8">
                                <p className="text-muted-foreground">No schedules found</p>
                              </div>
                            )}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              )}
            </div>
          </div>
        </main>
      </div>
      
      {/* Mobile Navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default BusSchedules;
