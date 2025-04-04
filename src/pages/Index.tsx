
import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SearchBar from '@/components/SearchBar';
import BusMap from '@/components/BusMap';
import Notifications from '@/components/Notifications';
import FeedbackForm from '@/components/FeedbackForm';
import MobileNav from '@/components/MobileNav';
import Settings from '@/components/Settings';
import { Card, CardContent } from "@/components/ui/card";
import { Bus, Clock } from 'lucide-react';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleNav = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveTab('map');
  };

  // Quick stats data for home page
  const quickStats = [
    { id: 1, icon: Bus, label: 'Active Buses', value: '35', color: 'bg-college-blue' },
    { id: 2, icon: Clock, label: 'Average Wait Time', value: '8 min', color: 'bg-college-orange' },
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
        
        <main className="flex-1 p-4 pt-20 pb-20 lg:pb-4 max-w-7xl mx-auto w-full">
          {activeTab === 'home' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-college-blue">REC Transit System</h1>
              <p className="text-muted-foreground">Find and track college buses in real-time</p>
              
              <SearchBar onSearch={handleSearch} />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickStats.map(stat => (
                  <Card key={stat.id}>
                    <CardContent className="p-4 flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center text-white`}>
                        <stat.icon size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-semibold">{stat.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <BusMap searchQuery={''} />
                </div>
                <div>
                  <Notifications />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'map' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Route Map</h2>
              <SearchBar onSearch={handleSearch} />
              <BusMap searchQuery={searchQuery} />
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Notifications</h2>
              <Notifications />
            </div>
          )}
          
          {activeTab === 'feedback' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Send Feedback</h2>
              <FeedbackForm />
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Settings</h2>
              <Settings />
            </div>
          )}
        </main>
      </div>
      
      {/* Mobile Navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Index;
