
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Bus, Edit, Clock, Calendar, Megaphone } from "lucide-react";
import Header from '@/components/Header';
import MobileNav from '@/components/MobileNav';
import Sidebar from '@/components/Sidebar';
import PageHeader from '@/components/PageHeader';
import { useNavigate } from 'react-router-dom';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { useNotifications } from '@/contexts/NotificationContext';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [regularBuses, setRegularBuses] = useState<string[]>(['101', '102', '103', '104', '105']);
  const [examBuses, setExamBuses] = useState<string[]>(['101', '103']);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', message: '' });
  const [newNotification, setNewNotification] = useState({ 
    title: '', 
    message: '', 
    type: 'info' as 'alert' | 'delay' | 'info' 
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useLanguageContext();
  const { announcements, addAnnouncement, deleteAnnouncement, addNotification } = useNotifications();
  
  const toggleNav = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const toggleRegularBus = (busNumber: string) => {
    if (regularBuses.includes(busNumber)) {
      setRegularBuses(regularBuses.filter(bus => bus !== busNumber));
    } else {
      setRegularBuses([...regularBuses, busNumber]);
    }
    
    toast({
      description: `Bus ${busNumber} ${regularBuses.includes(busNumber) ? 'removed from' : 'added to'} regular buses`,
    });

    // Add a notification about the bus change
    addNotification({
      type: 'info',
      title: `Bus Route ${busNumber} Updated`,
      message: `Bus ${busNumber} has been ${regularBuses.includes(busNumber) ? 'removed from' : 'added to'} regular service.`
    });
  };
  
  const toggleExamBus = (busNumber: string) => {
    if (examBuses.includes(busNumber)) {
      setExamBuses(examBuses.filter(bus => bus !== busNumber));
    } else {
      setExamBuses([...examBuses, busNumber]);
    }
    
    toast({
      description: `Bus ${busNumber} ${examBuses.includes(busNumber) ? 'removed from' : 'added to'} exam buses`,
    });
    
    // Add a notification about the exam bus change
    addNotification({
      type: 'info',
      title: `Exam Bus ${busNumber} Updated`,
      message: `Bus ${busNumber} has been ${examBuses.includes(busNumber) ? 'removed from' : 'added to'} exam service.`
    });
  };
  
  const handleAddAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.message) {
      addAnnouncement(newAnnouncement);
      setNewAnnouncement({ title: '', message: '' });
      
      toast({
        title: t('announcementAdded'),
        description: t('announcementAddedDesc'),
      });
    } else {
      toast({
        title: t('error'),
        description: t('fillAllFields'),
        variant: "destructive",
      });
    }
  };
  
  const handleAddNotification = () => {
    if (newNotification.title && newNotification.message) {
      addNotification({
        title: newNotification.title,
        message: newNotification.message,
        type: newNotification.type
      });
      
      setNewNotification({ 
        title: '', 
        message: '', 
        type: 'info' 
      });
      
      toast({
        title: t('notificationAdded'),
        description: t('notificationAddedDesc'),
      });
    } else {
      toast({
        title: t('error'),
        description: t('fillAllFields'),
        variant: "destructive",
      });
    }
  };
  
  const handleDeleteAnnouncement = (id: number) => {
    deleteAnnouncement(id);
    toast({
      description: t('announcementDeleted'),
    });
  };
  
  const navigateToHome = () => {
    navigate('/');
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
        activeTab="admin" 
        setActiveTab={setActiveTab} 
        isOpen={sidebarOpen} 
      />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
        <Header onToggleNav={toggleNav} />
        
        <main className="flex-1 p-3 sm:p-4 pt-20 pb-20 lg:pb-4 max-w-7xl mx-auto w-full">
          <PageHeader 
            title="adminDashboard" 
            description="manageCollege" 
          />
          
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="dashboard">{t('dashboard')}</TabsTrigger>
              <TabsTrigger value="buses">{t('buses')}</TabsTrigger>
              <TabsTrigger value="content">{t('content')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Bus className="mr-2 h-5 w-5" />
                      {t('manageBuses')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{t('configureBuses')}</p>
                    <Button 
                      onClick={() => document.querySelector('[value="buses"]')?.dispatchEvent(new MouseEvent('click'))}
                      className="w-full"
                    >
                      {t('configureBuses')}
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Edit className="mr-2 h-5 w-5" />
                      {t('manageContent')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{t('editPageContent')}</p>
                    <Button 
                      onClick={() => document.querySelector('[value="content"]')?.dispatchEvent(new MouseEvent('click'))}
                      className="w-full"
                    >
                      {t('editContent')}
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Clock className="mr-2 h-5 w-5" />
                      {t('viewSite')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{t('previewChanges')}</p>
                    <Button onClick={navigateToHome} className="w-full">
                      {t('goToHomePage')}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="buses">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Regular Buses */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t('regularBuses')}</CardTitle>
                    <CardDescription>{t('displayedOnBusesPage')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {['101', '102', '103', '104', '105', '106', '107', '108'].map((bus) => (
                        <div key={bus} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="bg-college-blue text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                              {bus}
                            </div>
                            <Label htmlFor={`regular-${bus}`}>{t('routeNumber')} {bus}</Label>
                          </div>
                          <Switch
                            id={`regular-${bus}`}
                            checked={regularBuses.includes(bus)}
                            onCheckedChange={() => toggleRegularBus(bus)}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Exam Buses */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t('examBuses')}</CardTitle>
                    <CardDescription>{t('displayedOnExamTimingsPage')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {['101', '102', '103', '104', '105'].map((bus) => (
                        <div key={bus} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="bg-college-orange text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                              {bus}
                            </div>
                            <Label htmlFor={`exam-${bus}`}>{t('routeNumber')} {bus}</Label>
                          </div>
                          <Switch
                            id={`exam-${bus}`}
                            checked={examBuses.includes(bus)}
                            onCheckedChange={() => toggleExamBus(bus)}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Announcements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Megaphone className="mr-2 h-5 w-5" />
                      {t('announcements')}
                    </CardTitle>
                    <CardDescription>{t('manageHomePageAnnouncements')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-4">
                        <div>
                          <Label htmlFor="title">{t('title')}</Label>
                          <Input 
                            id="title" 
                            value={newAnnouncement.title} 
                            onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})} 
                            placeholder={t('announcementTitle')}
                          />
                        </div>
                        <div>
                          <Label htmlFor="message">{t('message')}</Label>
                          <Input 
                            id="message" 
                            value={newAnnouncement.message} 
                            onChange={(e) => setNewAnnouncement({...newAnnouncement, message: e.target.value})} 
                            placeholder={t('announcementMessage')}
                          />
                        </div>
                        <Button onClick={handleAddAnnouncement}>{t('addAnnouncement')}</Button>
                      </div>
                      
                      <div className="border-t pt-4">
                        <h3 className="mb-2 font-medium">{t('currentAnnouncements')}</h3>
                        {announcements.length > 0 ? (
                          <div className="space-y-3">
                            {announcements.map((announcement) => (
                              <div key={announcement.id} className="flex justify-between items-center p-3 border rounded-md">
                                <div>
                                  <p className="font-medium">{announcement.title}</p>
                                  <p className="text-sm text-muted-foreground">{announcement.message}</p>
                                </div>
                                <Button 
                                  variant="destructive" 
                                  size="sm" 
                                  onClick={() => handleDeleteAnnouncement(announcement.id)}
                                >
                                  {t('delete')}
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground text-sm">{t('noAnnouncements')}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Notifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="mr-2 h-5 w-5" />
                      {t('notifications')}
                    </CardTitle>
                    <CardDescription>{t('sendNewNotifications')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-4">
                        <div>
                          <Label htmlFor="notification-title">{t('title')}</Label>
                          <Input 
                            id="notification-title" 
                            value={newNotification.title} 
                            onChange={(e) => setNewNotification({...newNotification, title: e.target.value})} 
                            placeholder={t('notificationTitle')}
                          />
                        </div>
                        <div>
                          <Label htmlFor="notification-message">{t('message')}</Label>
                          <Input 
                            id="notification-message" 
                            value={newNotification.message} 
                            onChange={(e) => setNewNotification({...newNotification, message: e.target.value})} 
                            placeholder={t('notificationMessage')}
                          />
                        </div>
                        <div>
                          <Label htmlFor="notification-type">{t('type')}</Label>
                          <select
                            id="notification-type"
                            className="w-full px-3 py-2 bg-background border border-input rounded-md"
                            value={newNotification.type}
                            onChange={(e) => setNewNotification({
                              ...newNotification, 
                              type: e.target.value as 'alert' | 'delay' | 'info'
                            })}
                          >
                            <option value="info">{t('information')}</option>
                            <option value="delay">{t('delay')}</option>
                            <option value="alert">{t('alert')}</option>
                          </select>
                        </div>
                        <Button onClick={handleAddNotification}>{t('sendNotification')}</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      
      {/* Mobile Navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default AdminPanel;
