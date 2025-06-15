
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Bus } from "lucide-react";
import { BusDetails } from '@/utils/busData';
import { useBusVisibility } from '@/contexts/BusVisibilityContext';
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
  const { updateBusVisibility, isBusVisible } = useBusVisibility();

  const handleVisibilityToggle = (busId: string, timeSlot: 'morning' | 'evening' | 'exam' | 'allBuses', checked: boolean) => {
    updateBusVisibility(busId, timeSlot, checked);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bus className="h-5 w-5" />
          Bus Schedules
        </CardTitle>
        <CardDescription>
          Manage and view all bus routes and schedules. Toggle switches to control visibility on public pages.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="py-8 text-center">Loading bus data...</div>
        ) : (
          <div className="space-y-6">
            <Tabs defaultValue="morning" className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="morning">Morning</TabsTrigger>
                <TabsTrigger value="evening">Evening</TabsTrigger>
                <TabsTrigger value="exams">Exam Times</TabsTrigger>
                <TabsTrigger value="allBuses">All Buses</TabsTrigger>
              </TabsList>
              
              <TabsContent value="morning">
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>Morning Bus Schedule (College Arrival: 7:40 AM)</TableCaption>
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
                        <TableRow key={bus.id}>
                          <TableCell>
                            <Switch
                              checked={isBusVisible(bus.id, 'morning')}
                              onCheckedChange={(checked) => handleVisibilityToggle(bus.id, 'morning', checked)}
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
              
              <TabsContent value="evening">
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>Evening Bus Schedule (College Departure: 4:30 PM)</TableCaption>
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
                        <TableRow key={bus.id + "-evening"}>
                          <TableCell>
                            <Switch
                              checked={isBusVisible(bus.id, 'evening')}
                              onCheckedChange={(checked) => handleVisibilityToggle(bus.id, 'evening', checked)}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{bus.busNumber}</TableCell>
                          <TableCell>{bus.routeName.replace('to College', 'from College')}</TableCell>
                          <TableCell>4:30 PM</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="exams">
                <div className="space-y-6">
                  {[1, 3, 5].map(hour => (
                    <div key={`exam-${hour}`} className="overflow-x-auto">
                      <Table>
                        <TableCaption>{`Exam Bus Schedule (${hour}:00 PM)`}</TableCaption>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Visible</TableHead>
                            <TableHead>Bus No.</TableHead>
                            <TableHead>Route</TableHead>
                            <TableHead>Departure</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {busData
                            .filter((_, index) => index % 3 === hour % 3)
                            .map((bus) => (
                              <TableRow key={`${bus.id}-${hour}pm`}>
                                <TableCell>
                                  <Switch
                                    checked={isBusVisible(bus.id, 'exam')}
                                    onCheckedChange={(checked) => handleVisibilityToggle(bus.id, 'exam', checked)}
                                  />
                                </TableCell>
                                <TableCell className="font-medium">{bus.busNumber}</TableCell>
                                <TableCell>{bus.routeName.replace('to College', 'from College')}</TableCell>
                                <TableCell>{`${hour}:00 PM`}</TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="allBuses">
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>All Buses Page Visibility Control</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Visible on All Buses Page</TableHead>
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
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BusScheduleTab;
