import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SearchBar from '@/components/SearchBar';
import BusMap from '@/components/BusMap';
import Notifications from '@/components/Notifications';
import FeedbackForm from '@/components/FeedbackForm';
import MobileNav from '@/components/MobileNav';
import Settings from '@/components/Settings';
import BusLayout from '@/components/BusLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bus, Info, AlertTriangle, Clock, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from "@/hooks/use-toast";
import { useLanguageContext } from '@/contexts/LanguageContext';
import { ScrollArea } from '@/components/ui/scroll-area';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const { t } = useLanguageContext();

  const toggleNav = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveTab('map');
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const quickStats = [
    { id: 1, icon: Bus, label: t('totalBuses'), value: '131', color: 'bg-college-blue' },
    { id: 2, icon: Info, label: t('currentStatus'), value: t('active'), color: 'bg-purple-600' },
    { id: 3, icon: Clock, label: t('firstPickup'), value: '5:30 AM', color: 'bg-college-orange' },
    { id: 4, icon: MapPin, label: t('boardingPoints'), value: '130+ buses', color: 'bg-green-600' },
  ];

  useEffect(() => {
    toast({
      title: t('welcomeToast'),
      description: t('welcomeToastDesc'),
    });
  }, [toast, t]);

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
          {activeTab === 'home' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
                <h1 className="text-xl sm:text-2xl font-bold text-college-blue dark:text-college-orange mb-2">{t('recTransitSystem')}</h1>
                <p className="text-muted-foreground mb-4 sm:mb-6">{t('findTrackBuses')}</p>
                
                <SearchBar onSearch={handleSearch} />
                
                <div className="mt-4 sm:mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-base sm:text-lg font-semibold">{t('quickStats')}</h2>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => navigate('/buses')}
                      className="text-xs sm:text-sm"
                    >
                      {t('viewAllBuses')}
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                    {quickStats.map(stat => (
                      <Card key={stat.id} className="border shadow-sm">
                        <CardContent className="p-3 sm:p-4 flex items-center space-x-3 sm:space-x-4">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${stat.color} flex items-center justify-center text-white`}>
                            <stat.icon size={isMobile ? 20 : 24} />
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                            <p className="text-lg sm:text-2xl font-semibold">{stat.value}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                <Card className="shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base sm:text-lg">{t('interactiveMap')}</CardTitle>
                    <CardDescription>{t('viewBusLocations')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BusMap searchQuery={searchQuery} />
                  </CardContent>
                </Card>

                <div id="notifications-section" className="grid grid-cols-1 gap-4 sm:gap-6">
                  <Card className="shadow-md">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base sm:text-lg">{t('notifications')}</CardTitle>
                      <CardDescription>{t('latestNotifications')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Notifications />
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-md">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base sm:text-lg">{t('announcements')}</CardTitle>
                      <CardDescription>{t('recentUpdates')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md">
                          <AlertTriangle className="text-amber-500 mt-0.5 flex-shrink-0" size={isMobile ? 16 : 18} />
                          <div>
                            <h4 className="font-medium text-sm">{t('specialSchedule')}</h4>
                            <p className="text-xs sm:text-sm text-muted-foreground">{t('specialScheduleDesc')}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'map' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">{t('interactiveMap')}</h2>
                <SearchBar onSearch={handleSearch} />
                <div className="mt-4 sm:mt-6">
                  <BusMap searchQuery={searchQuery} />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'feedback' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">{t('sendFeedback')}</h2>
                <FeedbackForm />
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">{t('settings')}</h2>
                <Settings />
              </div>
            </div>
          )}
          
          {activeTab === 'buslayout' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">{t('busLayout')}</h2>
                <BusLayout />
              </div>
            </div>
          )}
        </main>
      </div>
      
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Index;
