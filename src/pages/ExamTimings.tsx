
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Info, PowerOff } from "lucide-react";
import Header from '@/components/Header';
import MobileNav from '@/components/MobileNav';
import Sidebar from '@/components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { useHolidayContext } from '@/contexts/HolidayContext';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { useBusVisibility } from '@/contexts/BusVisibilityContext';
import { fetchBusData, type BusDetails } from '@/utils/busData';
import { format } from "date-fns";
import { useToast } from '@/hooks/use-toast';

const ExamTimings: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('examTimings');
  const [busData, setBusData] = useState<BusDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useLanguageContext();
  const { isHolidayActive, holidayData } = useHolidayContext();
  const { examSchedule, isExamModeActive, getExamBusesByTime } = useAdminAuth();
  const { isBusVisible } = useBusVisibility();
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Exam Schedule",
      description: "Special buses are available during exam periods",
    });

    const loadBusData = async () => {
      try {
        setLoading(true);
        const data = await fetchBusData();
        setBusData(data);
        console.log("Loaded bus data for exam timings:", data.length, "buses");
        console.log("Exam schedule:", examSchedule);
        console.log("Exam mode active:", isExamModeActive);
      } catch (error) {
        console.error("Error loading bus data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBusData();
  }, [toast, examSchedule, isExamModeActive]);

  const toggleNav = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Get exam schedule data organized by time slots
  const getExamScheduleData = () => {
    if (!isExamModeActive) {
      console.log("Exam mode not active");
      return [];
    }
    
    const timeSlots = ['1', '3', '5'] as const;
    console.log("Processing exam schedule for time slots:", timeSlots);
    console.log("Available bus data:", busData.map(b => ({ id: b.id, number: b.busNumber })));
    console.log("Exam schedule entries:", Object.entries(examSchedule));
    
    return timeSlots.map(time => {
      // Get buses assigned to this time slot using the admin context method
      const busesForTime = getExamBusesByTime(time);
      
      console.log(`Buses scheduled for ${time}:00 PM:`, busesForTime);
      
      // If no buses are specifically scheduled for this time, show all visible buses
      let finalBusesForTime = busesForTime;
      if (busesForTime.length === 0) {
        // Show all buses that are visible for exam mode
        finalBusesForTime = busData
          .filter(bus => isBusVisible(bus.id, 'exam'))
          .map(bus => bus.id);
        console.log(`No specific schedule for ${time}:00 PM, showing all visible buses:`, finalBusesForTime);
      }
      
      const buses = finalBusesForTime
        .map(busId => {
          const bus = busData.find(bus => bus.id === busId);
          console.log(`Looking for bus ${busId}, found:`, bus ? `${bus.busNumber} - ${bus.routeName}` : 'not found');
          return bus;
        })
        .filter((bus): bus is BusDetails => {
          if (!bus) return false;
          const isVisible = isBusVisible(bus.id, 'exam');
          console.log(`Bus ${bus.busNumber} visibility for exam:`, isVisible);
          return isVisible;
        })
        .map(bus => ({
          number: bus.busNumber,
          route: bus.routeName.replace(' to College', ''),
          locations: bus.stops.slice(0, 3).map(stop => stop.name).join(', '),
          driver: bus.driver,
          contact: bus.contactNumber
        }));

      console.log(`Final buses for ${time}:00 PM:`, buses);

      return {
        category: `${time}:00 PM Departure`,
        buses
      };
    });
  };

  const examBusSchedules = loading ? [] : getExamScheduleData();

  // Handle bus click to navigate to bus list with search parameter
  const handleBusClick = (busNumber: string) => {
    navigate(`/buses?search=${encodeURIComponent(busNumber)}`);
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
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold">Exam Timings</h1>
            <p className="text-muted-foreground mt-2">
              Special bus schedules during examination periods
            </p>
          </div>
          
          {isHolidayActive ? (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Holiday Notice</AlertTitle>
              <AlertDescription>
                Exam buses are not available on {format(holidayData?.date || new Date(), "PP")} due to holiday.
                <br />
                Reason: {holidayData?.reason}
              </AlertDescription>
            </Alert>
          ) : !isExamModeActive ? (
            <Card>
              <CardContent className="text-center py-12">
                <PowerOff className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Currently No Exams in Progress</h2>
                <p className="text-muted-foreground">
                  Exam buses are not currently active. Please check back during exam periods or contact the transport office for more information.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card className="mb-6">
                <CardHeader className="bg-orange-100 dark:bg-orange-900/20">
                  <div className="flex items-start space-x-4">
                    <Info className="h-6 w-6 text-orange-600 dark:text-orange-400 mt-0.5" />
                    <div>
                      <CardTitle className="text-lg text-orange-800 dark:text-orange-300">
                        Exam Period Notice
                      </CardTitle>
                      <p className="text-orange-700/90 dark:text-orange-400/90 text-sm mt-1">
                        Special buses are arranged to depart at different times on exam days to accommodate different exam schedules. All buses are AC and will follow the same routes as morning buses.
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-college-blue mb-4"></div>
                  <p className="text-muted-foreground">Loading exam schedules...</p>
                </div>
              ) : examBusSchedules.length > 0 ? (
                examBusSchedules.map((schedule, index) => (
                  schedule.buses.length > 0 && (
                    <Card key={index} className="mb-6">
                      <CardHeader>
                        <CardTitle>{schedule.category}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[100px]">Bus Number</TableHead>
                              <TableHead>Route</TableHead>
                              <TableHead className="hidden md:table-cell">Key Locations</TableHead>
                              <TableHead className="hidden lg:table-cell">Driver</TableHead>
                              <TableHead className="hidden lg:table-cell">Contact</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {schedule.buses.map((bus, busIndex) => (
                              <TableRow 
                                key={busIndex}
                                className="cursor-pointer hover:bg-muted/50"
                                onClick={() => handleBusClick(bus.number)}
                              >
                                <TableCell className="font-medium">{bus.number}</TableCell>
                                <TableCell>{bus.route} from College</TableCell>
                                <TableCell className="hidden md:table-cell">{bus.locations}</TableCell>
                                <TableCell className="hidden lg:table-cell">{bus.driver}</TableCell>
                                <TableCell className="hidden lg:table-cell">{bus.contact}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  )
                ))
              ) : (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">
                      No exam bus schedules configured yet. Please visit the admin panel to configure exam schedules for different departure times (1 PM, 3 PM, 5 PM).
                    </p>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </main>
      </div>
      
      {/* Mobile Navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default ExamTimings;
