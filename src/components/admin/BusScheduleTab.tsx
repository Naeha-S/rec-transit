
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bus } from "lucide-react";
import { BusDetails } from '@/utils/busData';
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
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bus className="h-5 w-5" />
          Bus Schedules
        </CardTitle>
        <CardDescription>
          Manage and view all bus routes and schedules
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="py-8 text-center">Loading bus data...</div>
        ) : (
          <div className="space-y-6">
            <Tabs defaultValue="morning" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="morning">Morning</TabsTrigger>
                <TabsTrigger value="evening">Evening</TabsTrigger>
                <TabsTrigger value="exams">Exam Times</TabsTrigger>
              </TabsList>
              
              <TabsContent value="morning">
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>Morning Bus Schedule (College Arrival: 7:40 AM)</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Bus No.</TableHead>
                        <TableHead>Route</TableHead>
                        <TableHead>Driver</TableHead>
                        <TableHead className="text-right">Contact</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {busData.map((bus) => (
                        <TableRow key={bus.id}>
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
                        <TableHead>Bus No.</TableHead>
                        <TableHead>Route</TableHead>
                        <TableHead>Departure</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {busData.map((bus) => (
                        <TableRow key={bus.id + "-evening"}>
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
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BusScheduleTab;
