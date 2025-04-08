
import React, { useState } from 'react';
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

const BusSchedules = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('schedules');
  const [expandedBus, setExpandedBus] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const { t } = useLanguageContext();

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

  // Mock data for different schedule time slots
  const morningSchedules = [
    { id: "1", busNumber: "15A", origin: "Anna Nagar", destination: "REC Campus", departureTime: "6:30 AM", arrivalTime: "8:15 AM", stops: [
      { name: "Anna Nagar", time: "6:30 AM" },
      { name: "Aminjikarai", time: "6:45 AM" },
      { name: "Chetpet", time: "7:10 AM" },
      { name: "Nungambakkam", time: "7:30 AM" },
      { name: "Kodambakkam", time: "7:50 AM" },
      { name: "REC Campus", time: "8:15 AM" }
    ]},
    { id: "2", busNumber: "23B", origin: "Tambaram", destination: "REC Campus", departureTime: "6:15 AM", arrivalTime: "8:00 AM", stops: [
      { name: "Tambaram", time: "6:15 AM" },
      { name: "Pallavaram", time: "6:30 AM" },
      { name: "St. Thomas Mount", time: "6:45 AM" },
      { name: "Guindy", time: "7:00 AM" },
      { name: "Saidapet", time: "7:30 AM" },
      { name: "REC Campus", time: "8:00 AM" }
    ]},
    { id: "3", busNumber: "35C", origin: "T.Nagar", destination: "REC Campus", departureTime: "6:45 AM", arrivalTime: "8:20 AM", stops: [
      { name: "T.Nagar", time: "6:45 AM" },
      { name: "Vadapalani", time: "7:00 AM" },
      { name: "Koyambedu", time: "7:20 AM" },
      { name: "Anna Nagar West", time: "7:40 AM" },
      { name: "Mogappair", time: "8:00 AM" },
      { name: "REC Campus", time: "8:20 AM" }
    ]},
    { id: "4", busNumber: "42D", origin: "Velachery", destination: "REC Campus", departureTime: "6:00 AM", arrivalTime: "7:45 AM", stops: [
      { name: "Velachery", time: "6:00 AM" },
      { name: "Adyar", time: "6:20 AM" },
      { name: "RA Puram", time: "6:40 AM" },
      { name: "Alwarpet", time: "7:00 AM" },
      { name: "Mylapore", time: "7:20 AM" },
      { name: "REC Campus", time: "7:45 AM" }
    ]},
    { id: "5", busNumber: "51E", origin: "Porur", destination: "REC Campus", departureTime: "7:00 AM", arrivalTime: "8:00 AM", stops: [
      { name: "Porur", time: "7:00 AM" },
      { name: "Valasaravakkam", time: "7:15 AM" },
      { name: "Virugambakkam", time: "7:30 AM" },
      { name: "Vadapalani", time: "7:45 AM" },
      { name: "REC Campus", time: "8:00 AM" }
    ]},
  ];
  
  const afternoonSchedules = [
    { id: "6", busNumber: "15A", origin: "REC Campus", destination: "Anna Nagar", departureTime: "5:15 PM", arrivalTime: "7:00 PM", stops: [
      { name: "REC Campus", time: "5:15 PM" },
      { name: "Kodambakkam", time: "5:40 PM" },
      { name: "Nungambakkam", time: "6:00 PM" },
      { name: "Chetpet", time: "6:20 PM" },
      { name: "Aminjikarai", time: "6:40 PM" },
      { name: "Anna Nagar", time: "7:00 PM" }
    ]},
    { id: "7", busNumber: "23B", origin: "REC Campus", destination: "Tambaram", departureTime: "5:00 PM", arrivalTime: "6:45 PM", stops: [
      { name: "REC Campus", time: "5:00 PM" },
      { name: "Saidapet", time: "5:30 PM" },
      { name: "Guindy", time: "5:45 PM" },
      { name: "St. Thomas Mount", time: "6:15 PM" },
      { name: "Pallavaram", time: "6:30 PM" },
      { name: "Tambaram", time: "6:45 PM" }
    ]},
    { id: "8", busNumber: "35C", origin: "REC Campus", destination: "T.Nagar", departureTime: "5:30 PM", arrivalTime: "7:15 PM", stops: [
      { name: "REC Campus", time: "5:30 PM" },
      { name: "Mogappair", time: "5:50 PM" },
      { name: "Anna Nagar West", time: "6:10 PM" },
      { name: "Koyambedu", time: "6:30 PM" },
      { name: "Vadapalani", time: "6:50 PM" },
      { name: "T.Nagar", time: "7:15 PM" }
    ]},
  ];
  
  const eveningSchedules = [
    { id: "9", busNumber: "42D", origin: "REC Campus", destination: "Velachery", departureTime: "7:30 PM", arrivalTime: "9:15 PM", stops: [
      { name: "REC Campus", time: "7:30 PM" },
      { name: "Mylapore", time: "7:55 PM" },
      { name: "Alwarpet", time: "8:15 PM" },
      { name: "RA Puram", time: "8:35 PM" },
      { name: "Adyar", time: "8:55 PM" },
      { name: "Velachery", time: "9:15 PM" }
    ]},
    { id: "10", busNumber: "51E", origin: "REC Campus", destination: "Porur", departureTime: "7:45 PM", arrivalTime: "8:45 PM", stops: [
      { name: "REC Campus", time: "7:45 PM" },
      { name: "Vadapalani", time: "8:00 PM" },
      { name: "Virugambakkam", time: "8:15 PM" },
      { name: "Valasaravakkam", time: "8:30 PM" },
      { name: "Porur", time: "8:45 PM" }
    ]},
  ];

  // Filter schedules based on search term
  const filterSchedules = (schedules) => {
    if (!searchTerm) return schedules;
    
    return schedules.filter(
      schedule =>
        schedule.busNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        schedule.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        schedule.destination.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Filtered schedules
  const filteredMorningSchedules = filterSchedules(morningSchedules);
  const filteredAfternoonSchedules = filterSchedules(afternoonSchedules);
  const filteredEveningSchedules = filterSchedules(eveningSchedules);

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
                <span className="text-muted-foreground">{stop.time}</span>
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
              
              <Tabs defaultValue="morning" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="morning" className="flex gap-1 items-center">
                    <Clock size={16} />
                    <span className="hidden sm:inline">Morning</span>
                    <span className="sm:hidden">AM</span>
                  </TabsTrigger>
                  <TabsTrigger value="afternoon" className="flex gap-1 items-center">
                    <Bus size={16} />
                    <span className="hidden sm:inline">Afternoon</span>
                    <span className="sm:hidden">5 PM</span>
                  </TabsTrigger>
                  <TabsTrigger value="evening" className="flex gap-1 items-center">
                    <CalendarClock size={16} />
                    <span className="hidden sm:inline">Evening</span>
                    <span className="sm:hidden">7 PM</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="morning" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Morning to College</CardTitle>
                      <CardDescription>Buses departing from various locations to REC Campus (6:00 AM - 7:00 AM)</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[400px] rounded-md border">
                        <div className="p-4 space-y-4">
                          {filteredMorningSchedules.length > 0 ? (
                            filteredMorningSchedules.map((schedule, index) => renderBusSchedule(schedule, index))
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
                      <CardTitle className="text-lg">Return after 5:00 PM</CardTitle>
                      <CardDescription>Buses departing from REC Campus to various locations (5:00 PM - 5:30 PM)</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[400px] rounded-md border">
                        <div className="p-4 space-y-4">
                          {filteredAfternoonSchedules.length > 0 ? (
                            filteredAfternoonSchedules.map((schedule, index) => renderBusSchedule(schedule, index))
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
                      <CardTitle className="text-lg">Return after 7:20 PM</CardTitle>
                      <CardDescription>Buses departing from REC Campus to various locations (7:30 PM - 8:00 PM)</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[400px] rounded-md border">
                        <div className="p-4 space-y-4">
                          {filteredEveningSchedules.length > 0 ? (
                            filteredEveningSchedules.map((schedule, index) => renderBusSchedule(schedule, index))
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
