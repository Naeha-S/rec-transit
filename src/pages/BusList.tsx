
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowLeft, Bus, Calendar as CalendarIcon } from "lucide-react";
import Header from '@/components/Header';
import MobileNav from '@/components/MobileNav';
import Sidebar from '@/components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, isSunday } from "date-fns";
import { cn } from "@/lib/utils";
import { useBusData, type BusRoute } from '@/hooks/use-bus-data';
import BusDetails from '@/components/BusDetails';
import BusGrid from '@/components/BusGrid';

const BusList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('buses');
  const [date, setDate] = useState<Date>(new Date());
  const navigate = useNavigate();
  const { t } = useLanguageContext();
  const { busRoutes, loading, isSundaySelected } = useBusData(date);

  const statusColors = {
    "on-time": "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400",
    "delayed": "text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400",
    "cancelled": "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400",
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

  return (
    <div className="min-h-screen bg-background flex">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden" 
          onClick={toggleNav}
        ></div>
      )}
      
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={sidebarOpen} 
      />
      
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
                <BusDetails 
                  route={selectedRoute}
                  onBack={() => setSelectedRoute(null)}
                  statusColors={statusColors}
                />
              ) : (
                <BusGrid 
                  routes={filteredRoutes}
                  statusColors={statusColors}
                  onSelectRoute={setSelectedRoute}
                />
              )}
            </CardContent>
          </Card>
        </main>
      </div>
      
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default BusList;

