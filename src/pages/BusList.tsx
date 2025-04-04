
import React, { useState, useEffect } from 'react';
import { Bus, Clock, MapPin, Phone, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useQuery } from '@tanstack/react-query';
import { fetchBusData, BusDetails } from '@/utils/busData';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

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
    <div className="container mx-auto py-4 px-4 pb-24 lg:pb-6 max-w-7xl">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-college-blue">REC College Bus Routes</h1>
            <p className="text-muted-foreground mt-1">Find bus routes, timings, and stop information</p>
          </div>
          
          <div className="w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by bus number or route..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-college-blue"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <ScrollArea className="h-[calc(100vh-240px)]">
              <Table>
                <TableHeader className="sticky top-0 bg-college-blue text-white">
                  <TableRow>
                    <TableHead className="text-white w-12"></TableHead>
                    <TableHead className="text-white">Bus Number</TableHead>
                    <TableHead className="text-white">Route</TableHead>
                    <TableHead className="text-white hidden md:table-cell">First Pickup</TableHead>
                    <TableHead className="text-white hidden md:table-cell">Driver</TableHead>
                    <TableHead className="text-white hidden lg:table-cell">Contact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBuses.map((bus) => (
                    <TableRow 
                      key={bus.id}
                      className="cursor-pointer hover:bg-muted transition-colors"
                      onClick={() => setSelectedBus(bus)}
                    >
                      <TableCell className="py-3">
                        <div className="bg-college-blue text-white p-2 rounded-full inline-flex items-center justify-center">
                          <Bus size={16} />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{bus.busNumber}</TableCell>
                      <TableCell>{bus.routeName}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {bus.stops[0]?.arrivalTime}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{bus.driver}</TableCell>
                      <TableCell className="hidden lg:table-cell">{bus.contactNumber}</TableCell>
                    </TableRow>
                  ))}
                  {filteredBuses.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <Bus size={24} className="text-muted-foreground" />
                          <p>No buses found matching your search.</p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setSearchQuery('')}
                            className="mt-2"
                          >
                            Reset Search
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        )}
      </div>

      <Dialog open={!!selectedBus} onOpenChange={(open) => !open && setSelectedBus(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center gap-2">
                <Bus className="text-college-blue" />
                <span>Bus {selectedBus?.busNumber} - {selectedBus?.routeName}</span>
              </div>
            </DialogTitle>
            <DialogDescription>
              Complete bus details and route information
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="flex-1 pr-4 mt-2">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2 text-college-blue">Bus Details</h3>
                <Card className="bg-muted/30">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 flex justify-center">
                          <Bus className="text-college-blue" size={18} />
                        </div>
                        <div>
                          <p className="font-medium">Bus {selectedBus?.busNumber}</p>
                          <p className="text-sm text-muted-foreground">{selectedBus?.routeName} Route</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 flex justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-college-blue">
                            <circle cx="12" cy="6" r="4"/>
                            <path d="M12 10v14"/>
                            <path d="M9 17h6"/>
                          </svg>
                        </div>
                        <p><span className="font-medium">Driver:</span> {selectedBus?.driver}</p>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 flex justify-center">
                          <Phone className="text-college-blue" size={18} />
                        </div>
                        <p><span className="font-medium">Contact:</span> {selectedBus?.contactNumber}</p>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 flex justify-center">
                          <Clock className="text-college-blue" size={18} />
                        </div>
                        <p>
                          <span className="font-medium">College Arrival:</span> 8:30 AM
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-college-blue">Bus Stops & Timings</h3>
                <div className="space-y-3">
                  {selectedBus?.stops.map((stop, index) => (
                    <Card key={index} className={`bg-muted/30 ${index === 0 ? 'border-l-4 border-college-orange' : ''}`}>
                      <CardContent className="py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className={index === 0 ? "text-college-orange" : "text-college-blue"} size={18} />
                          <div>
                            <span className="font-medium">{stop.name}</span>
                            {index === 0 && (
                              <div className="text-xs text-muted-foreground">First pickup</div>
                            )}
                          </div>
                        </div>
                        <Badge className={`flex items-center gap-1 ${index === 0 ? 'bg-college-orange hover:bg-college-orange/90' : ''}`}>
                          <Clock size={14} />
                          {stop.arrivalTime}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
          
          <div className="mt-4 pt-2 border-t">
            <Button variant="outline" className="w-full" onClick={() => setSelectedBus(null)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BusList;
