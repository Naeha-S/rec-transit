
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLanguageContext } from '@/contexts/LanguageContext';
import { 
  Upload, 
  UserCheck, 
  Bus, 
  BarChart3, 
  Route, 
  Clock, 
  BookOpen,
  Users,
  MapPin,
  AlertCircle
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguageContext();
  const [busData, setBusData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBus, setSelectedBus] = useState<any | null>(null);
  const [editedBusData, setEditedBusData] = useState({
    "Bus Number:": "",
    "Bus Stop Name": "",
    BusRoute: "",
    Timing: "",
    Location: ""
  });

  // Stats data
  const stats = [
    { id: 1, name: t('totalBuses'), value: '131', icon: Bus, color: 'bg-blue-500' },
    { id: 2, name: t('activeUsers'), value: '3.2K', icon: Users, color: 'bg-green-500' },
    { id: 3, name: t('totalRoutes'), value: '42', icon: Route, color: 'bg-purple-500' },
    { id: 4, name: t('busStops'), value: '130+', icon: MapPin, color: 'bg-orange-500' },
  ];

  // Mock website usage stats
  const siteStats = [
    { day: 'Mon', visits: 120 },
    { day: 'Tue', visits: 150 },
    { day: 'Wed', visits: 180 },
    { day: 'Thu', visits: 135 },
    { day: 'Fri', visits: 190 },
    { day: 'Sat', visits: 90 },
    { day: 'Sun', visits: 70 },
  ];

  useEffect(() => {
    // Check if user is admin
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      toast({
        title: t('unauthorizedAccess'),
        description: t('adminOnlyPage'),
        variant: 'destructive',
      });
      navigate('/');
      return;
    }

    fetchBusData();
  }, [navigate, toast, t]);

  const fetchBusData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('REC Bus Data')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      setBusData(data || []);
    } catch (error) {
      console.error('Error fetching bus data:', error);
      toast({
        title: t('errorFetchingData'),
        description: (error as Error).message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditBus = (bus: any) => {
    setSelectedBus(bus);
    setEditedBusData({
      "Bus Number:": bus["Bus Number:"] || "",
      "Bus Stop Name": bus["Bus Stop Name"] || "",
      BusRoute: bus.BusRoute || "",
      Timing: bus.Timing || "",
      Location: bus.Location || ""
    });
  };

  const handleSaveChanges = async () => {
    try {
      const { error } = await supabase
        .from('REC Bus Data')
        .update(editedBusData)
        .eq('S.No', selectedBus["S.No"]);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: t('updateSuccessful'),
        description: t('busDataUpdated'),
      });
      
      setSelectedBus(null);
      fetchBusData();
    } catch (error) {
      console.error('Error updating bus data:', error);
      toast({
        title: t('errorUpdatingData'),
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  };

  const handleCancelEdit = () => {
    setSelectedBus(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedBusData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Here you would parse the CSV/Excel file
      // For demonstration, we'll just show a success message
      toast({
        title: t('fileUploaded'),
        description: t('processingFile'),
      });

      // In a real implementation, you would parse the file and update the database
      setTimeout(() => {
        toast({
          title: t('uploadComplete'),
          description: t('dataUpdatedSuccessfully'),
        });
      }, 2000);
    } catch (error) {
      toast({
        title: t('errorProcessingFile'),
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
    toast({
      title: t('loggedOut'),
      description: t('adminSessionEnded'),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onToggleNav={() => {}} />
      
      <main className="container mx-auto px-4 py-8 pt-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{t('adminDashboard')}</h1>
          <Button variant="destructive" onClick={handleLogout}>
            {t('logout')}
          </Button>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
            <TabsTrigger value="manage-buses">{t('manageBuses')}</TabsTrigger>
            <TabsTrigger value="upload">{t('upload')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map(stat => (
                <Card key={stat.id}>
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center text-white`}>
                      <stat.icon size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.name}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Website Traffic Chart */}
            <Card>
              <CardHeader>
                <CardTitle>{t('websiteTraffic')}</CardTitle>
                <CardDescription>{t('last7Days')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-end gap-2">
                  {siteStats.map((stat, i) => (
                    <div key={i} className="relative group flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-primary rounded-sm" 
                        style={{ height: `${(stat.visits / 200) * 180}px` }}
                      ></div>
                      <span className="mt-2 text-xs font-medium">{stat.day}</span>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {stat.visits} {t('visits')}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>{t('recentActivity')}</CardTitle>
                <CardDescription>{t('latestSystemActivities')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                    <UserCheck className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Admin Login</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                    <Bus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Bus #42 Updated</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-full">
                    <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">System Notification</p>
                    <p className="text-xs text-muted-foreground">3 hours ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="manage-buses">
            <Card>
              <CardHeader>
                <CardTitle>{t('manageBuses')}</CardTitle>
                <CardDescription>{t('editBusInformation')}</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-center py-4">{t('loading')}...</p>
                ) : selectedBus ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="busNumber">{t('busNumber')}</Label>
                        <Input 
                          id="busNumber"
                          name="Bus Number:"
                          value={editedBusData["Bus Number:"]}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="busStopName">{t('busStopName')}</Label>
                        <Input 
                          id="busStopName"
                          name="Bus Stop Name"
                          value={editedBusData["Bus Stop Name"]}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="busRoute">{t('busRoute')}</Label>
                        <Input 
                          id="busRoute"
                          name="BusRoute"
                          value={editedBusData.BusRoute}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="timing">{t('timing')}</Label>
                        <Input 
                          id="timing"
                          name="Timing"
                          value={editedBusData.Timing}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="location">{t('location')}</Label>
                        <Textarea 
                          id="location"
                          name="Location"
                          value={editedBusData.Location}
                          onChange={handleInputChange}
                          rows={3}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={handleCancelEdit}>
                        {t('cancel')}
                      </Button>
                      <Button onClick={handleSaveChanges}>
                        {t('saveChanges')}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t('busNumber')}</TableHead>
                          <TableHead>{t('busRoute')}</TableHead>
                          <TableHead>{t('busStopName')}</TableHead>
                          <TableHead>{t('timing')}</TableHead>
                          <TableHead className="text-right">{t('actions')}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {busData.map((bus, index) => (
                          <TableRow key={index}>
                            <TableCell>{bus["Bus Number:"]}</TableCell>
                            <TableCell>{bus.BusRoute}</TableCell>
                            <TableCell>{bus["Bus Stop Name"]}</TableCell>
                            <TableCell>{bus.Timing}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm" onClick={() => handleEditBus(bus)}>
                                {t('edit')}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>{t('uploadBusData')}</CardTitle>
                <CardDescription>{t('bulkUpdateBusInformation')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">{t('dragAndDropFiles')}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('supportedFormats')}: CSV, Excel
                  </p>
                  
                  <div>
                    <label htmlFor="file-upload">
                      <Button variant="outline" className="mr-2" as="span">
                        {t('browseFiles')}
                      </Button>
                    </label>
                    <input 
                      id="file-upload" 
                      type="file" 
                      accept=".csv,.xlsx,.xls" 
                      onChange={handleFileUpload} 
                      className="hidden"
                    />
                  </div>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium flex items-center gap-2 mb-2">
                    <BookOpen className="h-4 w-4" />
                    {t('instructions')}
                  </h4>
                  <ul className="text-sm space-y-2">
                    <li>• {t('uploadInstructions1')}</li>
                    <li>• {t('uploadInstructions2')}</li>
                    <li>• {t('uploadInstructions3')}</li>
                    <li>• {t('uploadInstructions4')}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
