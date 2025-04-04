
import React, { useState, useEffect } from 'react';
import { Bus, Clock, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useQuery } from '@tanstack/react-query';
import { fetchBusData, BusDetails } from '@/utils/busData';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const BusList = () => {
  const [selectedBus, setSelectedBus] = useState<BusDetails | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  
  const { data: buses = [], isLoading, error } = useQuery({
    queryKey: ['buses'],
    queryFn: fetchBusData,
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading bus data",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const filteredBuses = buses.filter(bus => 
    bus.busNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bus.routeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-6 px-4 pb-24 lg:pb-6">
      <h1 className="text-2xl font-bold mb-6">REC College Bus List</h1>
      
      <div className="mb-4">
        <Input
          placeholder="Search by bus number or route..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-college-blue"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <ScrollArea className="h-[calc(100vh-240px)]">
            <Table>
              <TableHeader className="sticky top-0 bg-college-blue text-white">
                <TableRow>
                  <TableHead className="text-white">Bus</TableHead>
                  <TableHead className="text-white">Bus Number</TableHead>
                  <TableHead className="text-white">Route</TableHead>
                  <TableHead className="text-white hidden md:table-cell">Start Time</TableHead>
                  <TableHead className="text-white hidden md:table-cell">Driver</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBuses.map((bus) => (
                  <TableRow 
                    key={bus.id}
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => setSelectedBus(bus)}
                  >
                    <TableCell>
                      <div className="bg-college-blue text-white p-2 rounded-full inline-flex items-center justify-center">
                        <Bus size={16} />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{bus.busNumber}</TableCell>
                    <TableCell>{bus.routeName}</TableCell>
                    <TableCell className="hidden md:table-cell">{bus.stops[0]?.arrivalTime}</TableCell>
                    <TableCell className="hidden md:table-cell">{bus.driver}</TableCell>
                  </TableRow>
                ))}
                {filteredBuses.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      No buses found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      )}

      <Dialog open={!!selectedBus} onOpenChange={(open) => !open && setSelectedBus(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center gap-2">
                <Bus className="text-college-blue" />
                <span>{selectedBus?.busNumber} - {selectedBus?.routeName}</span>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Bus Details</h3>
            <Card className="bg-muted/30">
              <CardContent className="pt-6">
                <p className="mb-2"><span className="font-medium">Driver:</span> {selectedBus?.driver}</p>
                <p><span className="font-medium">Contact:</span> {selectedBus?.contactNumber}</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Bus Stops & Timings</h3>
            <div className="space-y-3">
              {selectedBus?.stops.map((stop, index) => (
                <Card key={index} className="bg-muted/30">
                  <CardContent className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="text-college-blue" size={18} />
                      <span className="font-medium">{stop.name}</span>
                    </div>
                    <Badge className="flex items-center gap-1">
                      <Clock size={14} />
                      {stop.arrivalTime}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BusList;
