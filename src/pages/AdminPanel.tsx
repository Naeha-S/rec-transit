
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNotifications } from "@/contexts/NotificationContext";
import { useHolidayContext } from "@/contexts/HolidayContext";
import { useLanguageContext } from "@/contexts/LanguageContext";
import Header from '@/components/Header';
import MobileNav from '@/components/MobileNav';
import Sidebar from '@/components/Sidebar';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

const AdminPanel = () => {
  // State for notification management
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('information');
  
  // State for holiday management
  const [holidayDate, setHolidayDate] = useState<Date | undefined>(undefined);
  const [holidayReason, setHolidayReason] = useState('');
  
  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('admin');
  
  // Hooks
  const { toast } = useToast();
  const { addNotification } = useNotifications();
  const { isHolidayActive, holidayData, declareHoliday, cancelHoliday } = useHolidayContext();
  const { t } = useLanguageContext();
  
  const toggleNav = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSendNotification = () => {
    if (!notificationTitle || !notificationMessage || !notificationType) {
      toast({
        title: t('error'),
        description: t('fillAllFields'),
        variant: "destructive",
      });
      return;
    }

    addNotification({
      id: `notification-${Date.now()}`,
      title: notificationTitle,
      message: notificationMessage,
      type: notificationType as any,
      date: new Date(),
      read: false
    });

    toast({
      title: t('notificationAdded'),
      description: t('notificationAddedDesc'),
    });
    
    // Reset form
    setNotificationTitle('');
    setNotificationMessage('');
    setNotificationType('information');
  };

  const handleDeclareHoliday = () => {
    if (!holidayDate || !holidayReason) {
      toast({
        title: t('error'),
        description: t('fillAllFields'),
        variant: "destructive",
      });
      return;
    }
    
    // Declare holiday
    declareHoliday(holidayDate, holidayReason);
    
    // Add a notification about the holiday
    addNotification({
      id: `holiday-${Date.now()}`,
      title: t('holidayAnnouncement'),
      message: `${t('noServiceOn')} ${format(holidayDate, 'PP')}. ${t('reason')}: ${holidayReason}`,
      type: 'alert',
      date: new Date(),
      read: false
    });
    
    toast({
      title: t('holidayDeclared'),
      description: t('holidayAnnouncedToUsers'),
    });
    
    // Reset form
    setHolidayReason('');
  };
  
  const handleCancelHoliday = () => {
    cancelHoliday();
    
    // Add a notification about the cancellation
    addNotification({
      id: `holiday-cancel-${Date.now()}`,
      title: t('holidayCancelled'),
      message: t('normalServiceResumed'),
      type: 'information',
      date: new Date(),
      read: false
    });
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
            <h1 className="text-2xl sm:text-3xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground mt-2">
              Manage notifications, holidays, and other system settings
            </p>
          </div>
          
          <Tabs defaultValue="notifications" className="w-full">
            <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="holidays">Holidays</TabsTrigger>
            </TabsList>
            
            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t('sendNewNotifications')}</CardTitle>
                  <CardDescription>
                    Send notifications to all users of the transit system
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">{t('notificationTitle')}</Label>
                    <Input 
                      id="title" 
                      placeholder={t('notificationTitle')}
                      value={notificationTitle}
                      onChange={(e) => setNotificationTitle(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="type">{t('type')}</Label>
                    <Select 
                      value={notificationType}
                      onValueChange={setNotificationType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectType')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="information">{t('information')}</SelectItem>
                        <SelectItem value="delay">{t('delay')}</SelectItem>
                        <SelectItem value="alert">{t('alert')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">{t('notificationMessage')}</Label>
                    <Textarea 
                      id="message" 
                      placeholder={t('notificationMessage')}
                      value={notificationMessage}
                      onChange={(e) => setNotificationMessage(e.target.value)}
                      rows={4}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSendNotification}>{t('sendNotification')}</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="holidays" className="space-y-4">
              {isHolidayActive ? (
                <Card className="border-amber-500 dark:border-amber-400">
                  <CardHeader className="bg-amber-50 dark:bg-amber-900/20">
                    <CardTitle className="text-amber-600 dark:text-amber-400">{t('holidayActive')}</CardTitle>
                    <CardDescription className="text-amber-700 dark:text-amber-300">
                      {t('busesDisabledDueToHoliday')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">{t('holidayInformation')}</h3>
                        <div className="grid grid-cols-2 gap-y-2">
                          <div className="text-sm font-medium">{t('date')}:</div>
                          <div className="text-sm">{holidayData?.date.toDateString()}</div>
                          
                          <div className="text-sm font-medium">{t('reason')}:</div>
                          <div className="text-sm">{holidayData?.reason}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={handleCancelHoliday}
                    >
                      {t('cancelHoliday')}
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>{t('declareHoliday')}</CardTitle>
                    <CardDescription>
                      Declare holidays when bus services will not be available
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="holiday-date">{t('holidayDate')}</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="holiday-date"
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !holidayDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {holidayDate ? format(holidayDate, "PP") : <span>{t('pickDate')}</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={holidayDate}
                            onSelect={setHolidayDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="holiday-reason">{t('holidayReason')}</Label>
                      <Textarea 
                        id="holiday-reason" 
                        placeholder={t('enterReasonForHoliday')}
                        value={holidayReason}
                        onChange={(e) => setHolidayReason(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleDeclareHoliday}>{t('declareHoliday')}</Button>
                  </CardFooter>
                </Card>
              )}
              
              <Card>
                <CardHeader>
                  <CardTitle>{t('holidayEffects')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>All bus routes will be disabled on the holiday date</li>
                    <li>A system-wide notification will be sent to all users</li>
                    <li>Exam bus schedules will also be disabled during holidays</li>
                    <li>The holiday can be cancelled at any time to resume normal service</li>
                  </ul>
                </CardContent>
              </Card>
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
