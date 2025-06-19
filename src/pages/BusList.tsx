import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowLeft, Bus, Calendar as CalendarIcon } from "lucide-react";
import Header from '@/components/Header';
import MobileNav from '@/components/MobileNav';
import Sidebar from '@/components/Sidebar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useBusData, type BusRoute } from '@/hooks/use-bus-data';
import BusDetails from '@/components/BusDetails';
import BusGrid from '@/components/BusGrid';
import { useToast } from '@/hooks/use-toast';
import { useDebouncedSearch } from '@/hooks/use-debounced-search';
import { BusListSkeleton } from '@/components/ui/loading-skeleton';
import { FadeIn } from '@/components/ui/fade-in';

const BusList = () => {
  // Component state management
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('buses');
  const [date, setDate] = useState<Date>(new Date());
  
  // Navigation and context hooks
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguageContext();
  const { toast } = useToast();

  // Debounced search for better performance
  const debouncedSearchTerm = useDebouncedSearch(searchTerm, 300);

  // Parse search query and busId from URL if they exist
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('search');
    const busId = queryParams.get('busId');
    
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
    
    // If busId is provided, we'll select it after bus data loads
    if (busId) {
      console.log("Bus ID from URL:", busId);
    }
  }, [location.search]);

  // Use the debounced search term for bus data fetching
  const { busRoutes, loading, isSundaySelected, searchedBusId } = useBusData(date, debouncedSearchTerm, 'allBuses');

  // Select the searched bus if found, or the bus from URL parameter
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const urlBusId = queryParams.get('busId');
    
    if (busRoutes.length > 0) {
      // Priority: URL busId parameter first, then searchedBusId from hook
      const targetBusId = urlBusId || searchedBusId;
      
      if (targetBusId) {
        const matchingRoute = busRoutes.find(route => route.id === targetBusId);
        if (matchingRoute) {
          setSelectedRoute(matchingRoute);
          toast({
            title: t('busFound'),
            description: `${matchingRoute.routeNumber}: ${matchingRoute.origin} to College`,
          });
          
          // Clean up URL by removing busId parameter after selection
          if (urlBusId) {
            const newParams = new URLSearchParams(location.search);
            newParams.delete('busId');
            const newUrl = `${location.pathname}${newParams.toString() ? '?' + newParams.toString() : ''}`;
            window.history.replaceState({}, '', newUrl);
          }
        }
      }
    }
  }, [busRoutes, searchedBusId, location.search, toast, t]);

  // Status color configuration for bus cards
  const statusColors = {
    "on-time": "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400",
    "delayed": "text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400",
    "cancelled": "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400",
  };

  // Sidebar toggle handler
  const toggleNav = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Updated filtering logic with debounced search
  const filteredRoutes = busRoutes.filter((route) => {
    if (!debouncedSearchTerm) return true;
    
    const searchLower = debouncedSearchTerm.toLowerCase();
    
    // Check if search matches route number
    if (route.routeNumber.toLowerCase().includes(searchLower)) {
      return true;
    }
    
    // Check if search matches origin (route name)
    if (route.origin.toLowerCase().includes(searchLower)) {
      return true;
    }
    
    // Check if search matches any stop name
    const matchesStop = route.stops.some(stop => 
      stop.name.toLowerCase().includes(searchLower)
    );
    
    return matchesStop;
  });

  // Enhanced search handler with immediate UI feedback
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Update URL with search param
    const queryParams = new URLSearchParams(location.search);
    if (value) {
      queryParams.set('search', value);
    } else {
      queryParams.delete('search');
    }
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden" 
          onClick={toggleNav}
        ></div>
      )}
      
      {/* Sidebar navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={sidebarOpen} 
      />
      
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
        {/* Fixed header */}
        <Header onToggleNav={toggleNav} />
        
        {/* Main content area */}
        <main className="flex-1 p-3 sm:p-4 pt-20 pb-20 lg:pb-4 max-w-7xl mx-auto w-full">
          <FadeIn>
            {/* Page header section with centered heading */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => navigate('/')}
                    className="mr-2 hover:scale-105 transition-transform"
                  >
                    <ArrowLeft size={20} />
                  </Button>
                  <h1 className="text-xl sm:text-2xl font-bold text-center flex-1">{t('allBuses')}</h1>
                </div>
                
                {/* Date picker with enhanced styling */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[180px] justify-start text-left font-normal transition-all hover:scale-105",
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
              
              {/* Description section */}
              <div className="mb-4">
                <p className="text-muted-foreground text-sm">
                  Find your bus route by searching for destinations, bus numbers, or stop names.
                </p>
                <p className="text-muted-foreground text-xs mt-1">
                  All timings are subject to traffic conditions and may vary slightly.
                </p>
              </div>
            </div>
          </FadeIn>
          
          {/* Main content card */}
          <FadeIn delay={200}>
            <Card className="shadow-md">
              <CardHeader className="pb-2">
                {/* Enhanced search bar with loading indicator */}
                <div className="w-full flex items-center gap-2">
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
                    <Input
                      type="search"
                      placeholder="Search by route, destination or bus stop"
                      className="w-full pl-8 pr-4 transition-all focus:ring-2 focus:ring-college-blue"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                    {/* Show subtle loading indicator while typing */}
                    {searchTerm !== debouncedSearchTerm && (
                      <div className="absolute right-2.5 top-2.5">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-college-blue"></div>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Loading state with skeleton */}
                {loading ? (
                  <BusListSkeleton />
                ) : isSundaySelected ? (
                  // Sunday service message
                  <div className="text-center py-8">
                    <Bus className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-semibold">{t('noServiceOnSunday')}</h3>
                    <p className="text-sm text-muted-foreground">{t('collegeClosedOnSundays')}</p>
                  </div>
                ) : selectedRoute ? (
                  // Selected route details
                  <BusDetails 
                    route={selectedRoute}
                    onBack={() => setSelectedRoute(null)}
                    statusColors={statusColors}
                  />
                ) : (
                  // Bus grid with enhanced animations
                  <BusGrid 
                    routes={filteredRoutes}
                    statusColors={statusColors}
                    onSelectRoute={setSelectedRoute}
                  />
                )}
              </CardContent>
            </Card>
          </FadeIn>
        </main>
      </div>
      
      {/* Mobile navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default BusList;
