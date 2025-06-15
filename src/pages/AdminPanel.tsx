
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useLanguageContext } from '@/contexts/LanguageContext';
import { fetchBusData } from '@/utils/busData';

// Admin components
import AdminLayout from '@/components/admin/AdminLayout';
import NotificationTab from '@/components/admin/NotificationTab';
import HolidayTab from '@/components/admin/HolidayTab';
import BusScheduleTab from '@/components/admin/BusScheduleTab';
import AdminSettingsTab from '@/components/admin/AdminSettingsTab';

const AdminPanel = () => {
  // State for bus data
  const [busData, setBusData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // UI state
  const [activeTab, setActiveTab] = useState('admin');
  
  // Hooks
  const { toast } = useToast();
  const { t } = useLanguageContext();
  
  // Fetch bus data on component mount
  useEffect(() => {
    const loadBusData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchBusData();
        setBusData(data);
      } catch (error) {
        console.error("Failed to load bus data:", error);
        toast({
          title: "Error",
          description: "Failed to load bus data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadBusData();
  }, [toast]);

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Admin Panel</h1>
        <p className="text-muted-foreground mt-2">
          Manage notifications, holidays, bus schedules and other system settings
        </p>
      </div>
      
      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl mb-8 h-14">
          <TabsTrigger value="notifications" className="text-base font-medium py-3">Notifications</TabsTrigger>
          <TabsTrigger value="holidays" className="text-base font-medium py-3">Holidays</TabsTrigger>
          <TabsTrigger value="buses" className="text-base font-medium py-3">Buses</TabsTrigger>
          <TabsTrigger value="settings" className="text-base font-medium py-3">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="notifications" className="space-y-4">
          <NotificationTab />
        </TabsContent>
        
        <TabsContent value="holidays" className="space-y-4">
          <HolidayTab />
        </TabsContent>
        
        <TabsContent value="buses" className="space-y-4">
          <BusScheduleTab busData={busData} isLoading={isLoading} />
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <AdminSettingsTab />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminPanel;
