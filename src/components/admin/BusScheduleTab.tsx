
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bus, Save, Power, PowerOff } from "lucide-react";
import { BusDetails } from '@/utils/busData';
import { useBusVisibility } from '@/contexts/BusVisibilityContext';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BusScheduleTabProps {
  busData: BusDetails[];
  isLoading: boolean;
}

const BusScheduleTab: React.FC<BusScheduleTabProps> = ({ busData, isLoading }) => {
  const { updateBusVisibility, isBusVisible, saveSettings } = useBusVisibility();
  const { examSchedule, updateExamSchedule, getExamBusesByTime, isExamModeActive, toggleExamMode } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleVisibilityToggle = (busId: string, timeSlot: 'allBuses' | 'tenAm' | 'fivePm' | 'exam', checked: boolean) => {
    updateBusVisibility(busId, timeSlot, checked);
  };

  const handleExamTimeChange = (busId: string, time: '1' | '3' | '5') => {
    updateExamSchedule(busId, time);
  };

  const handleSaveUpdates = () => {
    saveSettings();
    toast({
      title: "Settings Saved",
      description: "Bus visibility and exam schedule settings have been updated successfully.",
    });
    navigate('/');
  };

  const handleExamModeToggle = () => {
    toggleExamMode();
    toast({
      title: isExamModeActive ? "Exam Mode Disabled" : "Exam Mode Enabled",
      description: isExamModeActive ? "All exam buses are now hidden" : "Exam buses are now available",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bus className="h-5 w-5" />
              Bus Schedules
            </CardTitle>
            <CardDescription>
              Manage and view all bus routes and schedules. Toggle switches to control visibility on public pages.
            </CardDescription>
          </div>
          <Button onClick={handleSaveUpdates} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Updates
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="py-8 text-center">Loading bus data...</div>
        ) : (
          <div className="space-y-6">
            <Tabs defaultValue="allBuses" className="w-full">
              <TabsList className="grid grid-cols-4 mb-4 h-16">
                <TabsTrigger value="allBuses" className="text-sm font-medium py-4">All Buses</TabsTrigger>
                <TabsTrigger value="tenAm" className="text-sm font-medium py-4">10 AM Buses</TabsTrigger>
                <TabsTrigger value="fivePm" className="text-sm font-medium py-4">5 PM Buses</TabsTrigger>
                <TabsTrigger value="exam" className="text-sm font-medium py-4">Exam Buses</TabsTrigger>
              </TabsList>
              
              <TabsContent value="allBuses">
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>All Buses Page Visibility Control</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Visible</TableHead>
                        <TableHead>Bus No.</TableHead>
                        <TableHead>Route</TableHead>
                        <TableHead>Driver</TableHead>
                        <TableHead className="text-right">Contact</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {busData.map((bus) => (
                        <TableRow key={bus.id + "-allbuses"}>
                          <TableCell>
                            <Switch
                              checked={isBusVisible(bus.id, 'allBuses')}
                              onCheckedChange={(checked) => handleVisibilityToggle(bus.id, 'allBuses', checked)}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{bus.busNumber}</TableCell>
                          <TableCell>{bus.routeName}</TableCell>
                          <TableCell>{bus.driver}</TableCell>
                          <TableCell className="text-right">{bus.contactNumber}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="tenAm">
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>10 AM Bus Schedule (Morning College Arrival)</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Visible</TableHead>
                        <TableHead>Bus No.</TableHead>
                        <TableHead>Route</TableHead>
                        <TableHead>Driver</TableHead>
                        <TableHead className="text-right">Contact</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {busData.map((bus) => (
                        <TableRow key={bus.id + "-tenam"}>
                          <TableCell>
                            <Switch
                              checked={isBusVisible(bus.id, 'tenAm')}
                              onCheckedChange={(checked) => handleVisibilityToggle(bus.id, 'tenAm', checked)}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{bus.busNumber}</TableCell>
                          <TableCell>{bus.routeName}</TableCell>
                          <TableCell>{bus.driver}</TableCell>
                          <TableCell className="text-right">{bus.contactNumber}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="fivePm">
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>5 PM Bus Schedule (Evening College Departure)</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Visible</TableHead>
                        <TableHead>Bus No.</TableHead>
                        <TableHead>Route</TableHead>
                        <TableHead>Departure</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {busData.map((bus) => (
                        <TableRow key={bus.id + "-fivepm"}>
                          <TableCell>
                            <Switch
                              checked={isBusVisible(bus.id, 'fivePm')}
                              onCheckedChange={(checked) => handleVisibilityToggle(bus.id, 'fivePm', checked)}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{bus.busNumber}</TableCell>
                          <TableCell>{bus.routeName.replace('to College', 'from College')}</TableCell>
                          <TableCell>5:00 PM</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="exam">
                <div className="space-y-6">
                  <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      {isExamModeActive ? (
                        <Power className="h-5 w-5 text-green-600" />
                      ) : (
                        <PowerOff className="h-5 w-5 text-red-600" />
                      )}
                      <div>
                        <h3 className="font-medium">Exam Mode</h3>
                        <p className="text-sm text-muted-foreground">
                          {isExamModeActive ? "Exam buses are currently active" : "Exam buses are currently disabled"}
                        </p>
                      </div>
                    </div>
                    <Button 
                      onClick={handleExamModeToggle}
                      variant={isExamModeActive ? "destructive" : "default"}
                      className="flex items-center gap-2"
                    >
                      {isExamModeActive ? (
                        <>
                          <PowerOff className="h-4 w-4" />
                          Disable Exam Mode
                        </>
                      ) : (
                        <>
                          <Power className="h-4 w-4" />
                          Enable Exam Mode
                        </>
                      )}
                    </Button>
                  </div>

                  {isExamModeActive ? (
                    <>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableCaption>Exam Bus Schedule Management - Select departure time for each bus</TableCaption>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Visible</TableHead>
                              <TableHead>Bus No.</TableHead>
                              <TableHead>Route</TableHead>
                              <TableHead>Departure Time</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {busData.map((bus) => (
                              <TableRow key={`${bus.id}-exam`}>
                                <TableCell>
                                  <Switch
                                    checked={isBusVisible(bus.id, 'exam')}
                                    onCheckedChange={(checked) => handleVisibilityToggle(bus.id, 'exam', checked)}
                                  />
                                </TableCell>
                                <TableCell className="font-medium">{bus.busNumber}</TableCell>
                                <TableCell>{bus.routeName.replace('to College', 'from College')}</TableCell>
                                <TableCell>
                                  <Select 
                                    value={examSchedule[bus.id] || '1'} 
                                    onValueChange={(value: '1' | '3' | '5') => handleExamTimeChange(bus.id, value)}
                                  >
                                    <SelectTrigger className="w-32">
                                      <SelectValue placeholder="Select time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="1">1:00 PM</SelectItem>
                                      <SelectItem value="3">3:00 PM</SelectItem>
                                      <SelectItem value="5">5:00 PM</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      
                      {/* Summary by time slots */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {(['1', '3', '5'] as const).map(time => (
                          <Card key={time}>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-lg">{time}:00 PM Buses</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                {getExamBusesByTime(time).length > 0 ? (
                                  getExamBusesByTime(time).map(busId => {
                                    const bus = busData.find(b => b.id === busId);
                                    return bus ? (
                                      <div key={busId} className="text-sm">
                                        <span className="font-medium">{bus.busNumber}</span> - {bus.routeName.replace('to College', 'from College')}
                                      </div>
                                    ) : null;
                                  })
                                ) : (
                                  <p className="text-sm text-muted-foreground">No buses assigned</p>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Card>
                      <CardContent className="text-center py-8">
                        <PowerOff className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Exam Mode Disabled</h3>
                        <p className="text-muted-foreground">
                          Exam buses are currently disabled. Enable exam mode to configure exam schedules.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BusScheduleTab;
