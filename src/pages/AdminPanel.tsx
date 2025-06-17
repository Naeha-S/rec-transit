
import React, { useState, useEffect, Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useLanguageContext } from '@/contexts/LanguageContext';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { useNavigate } from 'react-router-dom';
import { fetchBusData } from '@/utils/busData';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { ProgressiveLoader } from '@/components/ui/progressive-loader';

// Lazy load admin components for better performance
const AdminLayout = React.lazy(() => import('@/components/admin/AdminLayout'));
const NotificationTab = React.lazy(() => import('@/components/admin/NotificationTab'));
const HolidayTab = React.lazy(() => import('@/components/admin/HolidayTab'));
const BusScheduleTab = React.lazy(() => import('@/components/admin/BusScheduleTab'));
const AdminSettingsTab = React.lazy(() => import('@/components/admin/AdminSettingsTab'));

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

  // Progressive loading states
  const loadingStates = [
    {
      skeleton: (
        <div className="space-y-4">
          <div className="h-8 bg-muted rounded animate-pulse"></div>
          <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
          <div className="grid grid-cols-4 gap-4 mt-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-12 bg-muted rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      ),
      delay: 500
    }
  ];

  const adminContent = (
    <ErrorBoundary>
      <Suspense fallback={
        <ProgressiveLoader
          loadingStates={loadingStates}
          finalContent={<div>Loading admin panel...</div>}
          isLoading={true}
        />
      }>
        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
          {/* Page header section */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground mt-2">
              Manage notifications, holidays, bus schedules and other system settings
            </p>
          </div>
          
          {/* Main admin tabs interface */}
          <Tabs defaultValue="notifications" className="w-full">
            {/* Tab navigation header - now full width */}
            <TabsList className="grid grid-cols-4 w-full mb-8 h-14">
              <TabsTrigger value="notifications" className="text-base font-medium py-3">Notifications</TabsTrigger>
              <TabsTrigger value="holidays" className="text-base font-medium py-3">Holidays</TabsTrigger>
              <TabsTrigger value="buses" className="text-base font-medium py-3">Buses</TabsTrigger>
              <TabsTrigger value="settings" className="text-base font-medium py-3">Settings</TabsTrigger>
            </TabsList>
            
            {/* Notifications management tab */}
            <TabsContent value="notifications" className="space-y-4">
              <Suspense fallback={<div className="h-32 bg-muted rounded animate-pulse"></div>}>
                <NotificationTab />
              </Suspense>
            </TabsContent>
            
            {/* Holidays management tab */}
            <TabsContent value="holidays" className="space-y-4">
              <Suspense fallback={<div className="h-32 bg-muted rounded animate-pulse"></div>}>
                <HolidayTab />
              </Suspense>
            </TabsContent>
            
            {/* Bus schedules management tab */}
            <TabsContent value="buses" className="space-y-4">
              <Suspense fallback={<div className="h-32 bg-muted rounded animate-pulse"></div>}>
                <BusScheduleTab busData={busData} isLoading={isLoading} />
              </Suspense>
            </TabsContent>
            
            {/* System settings tab */}
            <TabsContent value="settings" className="space-y-4">
              <Suspense fallback={<div className="h-32 bg-muted rounded animate-pulse"></div>}>
                <AdminSettingsTab />
              </Suspense>
            </TabsContent>
          </Tabs>
        </AdminLayout>
      </Suspense>
    </ErrorBoundary>
  );

  return (
    <ProgressiveLoader
      loadingStates={loadingStates}
      finalContent={adminContent}
      isLoading={isLoading}
    />
  );
};

export default AdminPanel;
