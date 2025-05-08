import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Bus, Edit, Clock, Calendar, Megaphone, Bell, AlertTriangle } from "lucide-react";
import Header from '@/components/Header';
import MobileNav from '@/components/MobileNav';
import Sidebar from '@/components/Sidebar';
import PageHeader from '@/components/PageHeader';
import { useNavigate } from 'react-router-dom';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

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
  const [holidayActive, setHolidayActive] = useState(false);
  const [holidayReason, setHolidayReason] = useState('');
  const [holidayDate, setHolidayDate] = useState<Date | undefined>(new Date());
  
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
  
  const declareHoliday = () => {
    if (!holidayReason || !holidayDate) {
      toast({
        title: t('error'),
        description: t('fillAllFields'),
        variant: "destructive",
      });
      return;
    }
    
    // Set holiday status
    setHolidayActive(true);
    
    // Add announcement about holiday
    addAnnouncement({
      title: t('holidayAnnouncement'),
      message: `${format(holidayDate, 'PPPP')}: ${holidayReason}`
    });
    
    // Add notification about holiday
    addNotification({
      type: 'alert',
      title: t('holidayDeclared'),
      message: `${t('noServiceOn')} ${format(holidayDate, 'PPPP')}: ${holidayReason}`
    });
    
    toast({
      title: t('holidayDeclared'),
      description: t('holidayAnnouncedToUsers'),
    });
  };
  
  const cancelHoliday = () => {
    setHolidayActive(false);
    
    // Add notification about cancellation
    addNotification({
      type: 'info',
      title: t('holidayCancelled'),
      message: t('normalServiceResumed')
    });
    
    toast({
      title: t('holidayCancelled'),
      description: t('normalServiceResumed'),
    });
    
    setHolidayReason('');
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
            title="Admin Dashboard" 
            description="Manage College Transit System" 
          />
          
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="dashboard">{t('dashboard')}</TabsTrigger>
              <TabsTrigger value="buses">{t('buses')}</TabsTrigger>
              <TabsTrigger value="content">{t('content')}</TabsTrigger>
              <TabsTrigger value="holiday">{t('holidays')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Bus className="mr-2 h-5 w-5" />
                      {t('Manage Buses')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{t('Configure Buses')}</p>
                    <Button 
                      onClick={() => document.querySelector('[value="buses"]')?.dispatchEvent(new MouseEvent('click'))}
                      className="w-full"
                    >
                      {t('Configure Buses')}
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Edit className="mr-2 h-5 w-5" />
                      {t('Manage Content')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{t('Edit Page Content')}</p>
                    <Button 
                      onClick={() => document.querySelector('[value="content"]')?.dispatchEvent(new MouseEvent('click'))}
                      className="w-full"
                    >
                      {t('Edit Content')}
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <AlertTriangle className="mr-2 h-5 w-5" />
                      {t('Manage Holidays')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {holidayActive ? t('Holiday Mode Active') : t('Declare a Holiday')}
                    </p>
                    <Button 
                      onClick={() => document.querySelector('[value="holiday"]')?.dispatchEvent(new MouseEvent('click'))}
                      className={`w-full ${holidayActive ? 'bg-yellow-600 hover:bg-yellow-700' : ''}`}
                    >
                      {holidayActive ? t('Manage Holiday') : t('Declare Holiday')}
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Clock className="mr-2 h-5 w-5" />
                      {t('View Site')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{t('Preview Changes')}</p>
                    <Button onClick={navigateToHome} className="w-full">
                      {t('Go to Home Page')}
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
                    <CardTitle>{t('Regular Buses')}</CardTitle>
                    <CardDescription>{t('Displayed on Buses Page')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {['101', '102', '103', '104', '105', '106', '107', '108'].map((bus) => (
                        <div key={bus} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="bg-college-blue text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                              {bus}
                            </div>
                            <Label htmlFor={`regular-${bus}`}>{t('Route Number')} {bus}</Label>
                          </div>
                          <Switch
                            id={`regular-${bus}`}
                            checked={regularBuses.includes(bus)}
                            onCheckedChange={() => toggleRegularBus(bus)}
                            disabled={holidayActive}
                          />
                        </div>
                      ))}
                      
                      {holidayActive && (
                        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md text-center">
                          <p className="text-sm text-yellow-800 dark:text-yellow-200">
                            {t('busesDisabledDueToHoliday')}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Exam Buses */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t('Exam Buses')}</CardTitle>
                    <CardDescription>{t('Displayed on Exam Timings Page')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {['101', '102', '103', '104', '105'].map((bus) => (
                        <div key={bus} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="bg-college-orange text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                              {bus}
                            </div>
                            <Label htmlFor={`exam-${bus}`}>{t('Route Number')} {bus}</Label>
                          </div>
                          <Switch
                            id={`exam-${bus}`}
                            checked={examBuses.includes(bus)}
                            onCheckedChange={() => toggleExamBus(bus)}
                            disabled={holidayActive}
                          />
                        </div>
                      ))}
                      
                      {holidayActive && (
                        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md text-center">
                          <p className="text-sm text-yellow-800 dark:text-yellow-200">
                            {t('examBusesDisabledDueToHoliday')}
                          </p>
                        </div>
                      )}
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
                      {t('Announcements')}
                    </CardTitle>
                    <CardDescription>{t('Manage Home Page Announcements')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-4">
                        <div>
                          <Label htmlFor="title">{t('Title')}</Label>
                          <Input 
                            id="title" 
                            value={newAnnouncement.title} 
                            onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})} 
                            placeholder={t('Enter announcement title')}
                          />
                        </div>
                        <div>
                          <Label htmlFor="message">{t('Message')}</Label>
                          <Input 
                            id="message" 
                            value={newAnnouncement.message} 
                            onChange={(e) => setNewAnnouncement({...newAnnouncement, message: e.target.value})} 
                            placeholder={t('Enter announcement message')}
                          />
                        </div>
                        <Button onClick={handleAddAnnouncement}>{t('Add Announcement')}</Button>
                      </div>
                      
                      <div className="border-t pt-4">
                        <h3 className="mb-2 font-medium">{t('Current Announcements')}</h3>
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
                                  {t('Delete')}
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground text-sm">{t('No Announcements')}</p>
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
                      {t('Notifications')}
                    </CardTitle>
                    <CardDescription>{t('Send New Notifications')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-4">
                        <div>
                          <Label htmlFor="notification-title">{t('Title')}</Label>
                          <Input 
                            id="notification-title" 
                            value={newNotification.title} 
                            onChange={(e) => setNewNotification({...newNotification, title: e.target.value})} 
                            placeholder={t('Enter notification title')}
                          />
                        </div>
                        <div>
                          <Label htmlFor="notification-message">{t('Message')}</Label>
                          <Input 
                            id="notification-message" 
                            value={newNotification.message} 
                            onChange={(e) => setNewNotification({...newNotification, message: e.target.value})} 
                            placeholder={t('Enter notification message')}
                          />
                        </div>
                        <div>
                          <Label htmlFor="notification-type">{t('Type')}</Label>
                          <select
                            id="notification-type"
                            className="w-full px-3 py-2 bg-background border border-input rounded-md"
                            value={newNotification.type}
                            onChange={(e) => setNewNotification({
                              ...newNotification, 
                              type: e.target.value as 'alert' | 'delay' | 'info'
                            })}
                          >
                            <option value="info">{t('Information')}</option>
                            <option value="delay">{t('Delay')}</option>
                            <option value="alert">{t('Alert')}</option>
                          </select>
                        </div>
                        <Button onClick={handleAddNotification}>{t('Send Notification')}</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="holiday">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className={holidayActive ? "border-yellow-500" : ""}>
                  <CardHeader className={holidayActive ? "bg-yellow-50 dark:bg-yellow-900/20" : ""}>
                    <CardTitle className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5" />
                      {holidayActive ? t('Holiday Active') : t('Declare Holiday')}
                    </CardTitle>
                    <CardDescription>
                      {holidayActive 
                        ? t('A holiday is currently active. All bus services are suspended.')
                        : t('Declare a holiday to suspend all bus services')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    {!holidayActive ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="holiday-date">{t('Holiday Date')}</Label>
                          <div className="flex flex-col">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal mt-1"
                                >
                                  {holidayDate ? (
                                    format(holidayDate, "PPP")
                                  ) : (
                                    <span>{t('Pick a date')}</span>
                                  )}
                                  <Calendar className="ml-auto h-4 w-4" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <CalendarComponent
                                  mode="single"
                                  selected={holidayDate}
                                  onSelect={setHolidayDate}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="holiday-reason">{t('Holiday Reason')}</Label>
                          <Textarea 
                            id="holiday-reason" 
                            placeholder={t('Enter reason for holiday')}
                            value={holidayReason}
                            onChange={(e) => setHolidayReason(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <Button 
                          onClick={declareHoliday} 
                          className="w-full"
                        >
                          {t('Declare Holiday')}
                        </Button>
                        <p className="text-sm text-muted-foreground text-center">
                          {t('This will disable all bus services and notify all users')}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                          <h3 className="font-medium mb-1">{t('Holiday Information')}</h3>
                          <p className="text-sm"><strong>{t('Date')}:</strong> {holidayDate ? format(holidayDate, "PPP") : ''}</p>
                          <p className="text-sm"><strong>{t('Reason')}:</strong> {holidayReason}</p>
                        </div>
                        <Button 
                          onClick={cancelHoliday} 
                          variant="destructive"
                          className="w-full"
                        >
                          {t('Cancel Holiday')}
                        </Button>
                        <p className="text-sm text-muted-foreground text-center">
                          {t('This will resume all bus services and notify all users')}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>{t('Holiday Effects')}</CardTitle>
                    <CardDescription>{t('What happens when a holiday is declared')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc pl-5">
                      <li className="text-sm">{t('All regular bus services will be suspended')}</li>
                      <li className="text-sm">{t('Exam buses will not operate')}</li>
                      <li className="text-sm">{t('An announcement will be posted on the home page')}</li>
                      <li className="text-sm">{t('All users will receive a notification')}</li>
                      <li className="text-sm">{t('Bus tracking and schedules will be disabled')}</li>
                    </ul>
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
