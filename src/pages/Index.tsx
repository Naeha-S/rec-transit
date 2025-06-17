
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import BusMap from '@/components/BusMap';
import FeedbackForm from '@/components/FeedbackForm';
import MobileNav from '@/components/MobileNav';
import Settings from '@/components/Settings';
import BusLayout from '@/components/BusLayout';
import HomeContent from '@/components/home/HomeContent';
import WelcomeToast from '@/components/WelcomeToast';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguageContext } from '@/contexts/LanguageContext';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { t } = useLanguageContext();

  const toggleNav = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      // Navigate to buses page with search query
      navigate(`/buses?search=${encodeURIComponent(query)}`);
    } else {
      setSearchQuery(query);
      setActiveTab('map');
    }
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

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Only show welcome toast on home page */}
      {activeTab === 'home' && <WelcomeToast />}
      
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
        
        <main className="flex-1 p-3 sm:p-4 lg:p-6 pt-20 pb-20 lg:pb-6 max-w-7xl mx-auto w-full">
          {activeTab === 'home' && (
            <div className="space-y-4 sm:space-y-6">
              <HomeContent onSearch={handleSearch} searchQuery={searchQuery} />
            </div>
          )}
          
          {activeTab === 'map' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-background border border-border rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 text-foreground">{t('Interactive Map')}</h2>
                <div className="mt-4 sm:mt-6">
                  <BusMap searchQuery={searchQuery} />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'feedback' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-background border border-border rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 text-foreground">{t('Send Feedback')}</h2>
                <FeedbackForm />
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-background border border-border rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 text-foreground">{t('Settings')}</h2>
                <Settings />
              </div>
            </div>
          )}
          
          {activeTab === 'buslayout' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-background border border-border rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 text-foreground">{t('Bus Layout')}</h2>
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
