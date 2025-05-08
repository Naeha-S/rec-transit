
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Info } from "lucide-react";
import Header from '@/components/Header';
import MobileNav from '@/components/MobileNav';
import Sidebar from '@/components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { useHolidayContext } from '@/contexts/HolidayContext';
import { format } from "date-fns";

const ExamTimings = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('examTimings');
  const navigate = useNavigate();
  const { t } = useLanguageContext();
  const { isHolidayActive, holidayData } = useHolidayContext();

  const toggleNav = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Mock data for exam time bus schedules
  const examBusSchedules = [
    { 
      category: '1:00 PM Departure', 
      buses: [
        { number: '1', route: 'Ennore', locations: 'Parry\'s Corner, Wimco Nagar, Thiruvottiyur' },
        { number: '2', route: 'Tondiarpet', locations: 'Old Washermanpet, Royapuram, Broadway' },
        { number: '5A', route: 'T.Nagar', locations: 'Nungambakkam, Mylapore, Adyar' },
        { number: '10B', route: 'Tambaram', locations: 'Chromepet, Pallavaram, Guindy' },
      ]
    },
    { 
      category: '3:00 PM Departure', 
      buses: [
        { number: '1B', route: 'Periyamedu', locations: 'Central Station, Egmore, Chetpet' },
        { number: '1C', route: 'Tollgate', locations: 'Manali, Madhavaram, Perambur' },
        { number: '2C', route: 'Ajax-Thiruvottiyur', locations: 'Korukkupet, Tondiarpet, Mint' },
        { number: '7', route: 'Avadi', locations: 'Ambattur, Anna Nagar, Aminjikarai' },
        { number: '11', route: 'Poonamallee', locations: 'Porur, Valasaravakkam, Vadapalani' },
        { number: '15', route: 'Sholinganallur', locations: 'Thoraipakkam, OMR, ECR' },
      ]
    }
  ];

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
            <h1 className="text-2xl sm:text-3xl font-bold">{t('examTimings')}</h1>
            <p className="text-muted-foreground mt-2">
              {t('specialBusSchedulesDuringExams')}
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
          ) : (
            <>
              <Card className="mb-6">
                <CardHeader className="bg-orange-100 dark:bg-orange-900/20">
                  <div className="flex items-start space-x-4">
                    <Info className="h-6 w-6 text-orange-600 dark:text-orange-400 mt-0.5" />
                    <div>
                      <CardTitle className="text-lg text-orange-800 dark:text-orange-300">
                        {t('examPeriodNotice')}
                      </CardTitle>
                      <p className="text-orange-700/90 dark:text-orange-400/90 text-sm mt-1">
                        {t('examBusScheduleInfo')}
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              
              {examBusSchedules.map((schedule, index) => (
                <Card key={index} className="mb-6">
                  <CardHeader>
                    <CardTitle>{schedule.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">{t('busNumber')}</TableHead>
                          <TableHead>{t('route')}</TableHead>
                          <TableHead className="hidden md:table-cell">{t('keyLocations')}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {schedule.buses.map((bus, busIndex) => (
                          <TableRow key={busIndex}>
                            <TableCell className="font-medium">{bus.number}</TableCell>
                            <TableCell>{bus.route}</TableCell>
                            <TableCell className="hidden md:table-cell">{bus.locations}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ))}
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
