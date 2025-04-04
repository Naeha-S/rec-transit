
import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SearchBar from '@/components/SearchBar';
import BusMap from '@/components/BusMap';
import Notifications from '@/components/Notifications';
import FeedbackForm from '@/components/FeedbackForm';
import MobileNav from '@/components/MobileNav';
import Settings from '@/components/Settings';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bus, Clock, MapPin, Info, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleNav = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveTab('map');
  };

  // Quick stats data for home page
  const quickStats = [
    { id: 1, icon: Bus, label: 'Total Buses', value: '131', color: 'bg-college-blue' },
    { id: 2, icon: Clock, label: 'Average Wait Time', value: '8 min', color: 'bg-college-orange' },
    { id: 3, icon: MapPin, label: 'Service Areas', value: '21+', color: 'bg-green-600' },
    { id: 4, icon: Info, label: 'Current Status', value: 'Active', color: 'bg-purple-600' },
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
              <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-college-blue mb-2">REC Transit System</h1>
                <p className="text-muted-foreground mb-6">Find and track college buses in real-time</p>
                
                <SearchBar onSearch={handleSearch} />
                
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold">Quick Stats</h2>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => navigate('/buses')}
                      className="text-sm"
                    >
                      View All Buses
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickStats.map(stat => (
                      <Card key={stat.id} className="border shadow-sm">
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
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="shadow-md h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Route Map</CardTitle>
                      <CardDescription>View bus locations and routes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <BusMap searchQuery={''} />
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="shadow-md h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Announcements</CardTitle>
                      <CardDescription>Recent updates and notices</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-md">
                          <AlertTriangle className="text-amber-500 mt-0.5 flex-shrink-0" size={18} />
                          <div>
                            <h4 className="font-medium text-sm">Special Schedule Next Week</h4>
                            <p className="text-sm text-muted-foreground">Due to exams, buses will follow a modified schedule</p>
                          </div>
                        </div>
                        <Notifications />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'map' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Route Map</h2>
                <SearchBar onSearch={handleSearch} />
                <div className="mt-6">
                  <BusMap searchQuery={searchQuery} />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                <Notifications />
              </div>
            </div>
          )}
          
          {activeTab === 'feedback' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Send Feedback</h2>
                <FeedbackForm />
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Settings</h2>
                <Settings />
              </div>
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
