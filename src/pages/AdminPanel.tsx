import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useLanguageContext } from '@/contexts/LanguageContext';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { useNavigate } from 'react-router-dom';
import { fetchBusData } from '@/utils/busData';
import { EnhancedLoading } from '@/components/ui/enhanced-loading';
import { ErrorBoundary } from '@/components/ui/error-boundary';

// Lazy load admin components for better performance
import AdminLayout from '@/components/admin/AdminLayout';
const NotificationTab = lazy(() => import('@/components/admin/NotificationTab'));
const HolidayTab = lazy(() => import('@/components/admin/HolidayTab'));
const BusScheduleTab = lazy(() => import('@/components/admin/BusScheduleTab'));
const AdminSettingsTab = lazy(() => import('@/components/admin/AdminSettingsTab'));

const AdminPanel = () => {
  // Bus data state management
  const [busData, setBusData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // UI state for active tab
  const [activeTab, setActiveTab] = useState('admin');
  
  // Context hooks
  const { toast } = useToast();
  const { t } = useLanguageContext();
  const { isAdminAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  
  // Authentication check - redirects if not authenticated
  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAdminAuthenticated, navigate]);
  
  // Bus data fetching on component mount
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

  // Don't render if not authenticated
  if (!isAdminAuthenticated) {
    return null;
  }

  return (
    <ErrorBoundary>
      {/* Admin layout wrapper with sidebar and header */}
      <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
        {/* Page header section with enhanced animations */}
        <div className="mb-6 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground mt-2">
            Manage notifications, holidays, bus schedules and other system settings
          </p>
        </div>
        
        {/* Main admin tabs interface with enhanced styling */}
        <Tabs defaultValue="notifications" className="w-full">
          {/* Tab navigation header with micro-animations */}
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mb-8 h-14 transition-all duration-300 hover:shadow-md">
            <TabsTrigger 
              value="notifications" 
              className="text-base font-medium py-3 transition-all hover:scale-105"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger 
              value="holidays" 
              className="text-base font-medium py-3 transition-all hover:scale-105"
            >
              Holidays
            </TabsTrigger>
            <TabsTrigger 
              value="buses" 
              className="text-base font-medium py-3 transition-all hover:scale-105"
            >
              Buses
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="text-base font-medium py-3 transition-all hover:scale-105"
            >
              Settings
            </TabsTrigger>
          </TabsList>
          
          {/* Notifications management tab with lazy loading */}
          <TabsContent value="notifications" className="space-y-4 animate-fade-in">
            <Suspense fallback={<EnhancedLoading variant="dots" text="Loading notifications..." />}>
              <NotificationTab />
            </Suspense>
          </TabsContent>
          
          {/* Holidays management tab with lazy loading */}
          <TabsContent value="holidays" className="space-y-4 animate-fade-in">
            <Suspense fallback={<EnhancedLoading variant="dots" text="Loading holidays..." />}>
              <HolidayTab />
            </Suspense>
          </TabsContent>
          
          {/* Bus schedules management tab with lazy loading */}
          <TabsContent value="buses" className="space-y-4 animate-fade-in">
            <Suspense fallback={<EnhancedLoading variant="dots" text="Loading bus schedules..." />}>
              <BusScheduleTab busData={busData} isLoading={isLoading} />
            </Suspense>
          </TabsContent>
          
          {/* System settings tab with lazy loading */}
          <TabsContent value="settings" className="space-y-4 animate-fade-in">
            <Suspense fallback={<EnhancedLoading variant="dots" text="Loading settings..." />}>
              <AdminSettingsTab />
            </Suspense>
          </TabsContent>
        </Tabs>
      </AdminLayout>
    </ErrorBoundary>
  );
};

export default AdminPanel;
