
import React, { useState } from 'react';
import { Bus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

interface BusStop {
  name: string;
  arrivalTime: string;
}

interface BusDetails {
  id: string;
  busNumber: string;
  routeName: string;
  driver: string;
  contactNumber: string;
  stops: BusStop[];
}

const BusList = () => {
  const [selectedBus, setSelectedBus] = useState<BusDetails | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample bus data - in a real app, this would come from an API
  const buses: BusDetails[] = Array.from({ length: 100 }, (_, index) => ({
    id: `bus-${index + 1}`,
    busNumber: `REC${(index + 1).toString().padStart(3, '0')}`,
    routeName: `Route ${String.fromCharCode(65 + (index % 26))}`,
    driver: `Driver ${index + 1}`,
    contactNumber: `+91 98765 ${(10000 + index).toString().substring(1)}`,
    stops: [
      { name: "College", arrivalTime: "08:30 AM" },
      { name: "Poonamallee", arrivalTime: "07:45 AM" },
      { name: "Porur", arrivalTime: "08:00 AM" },
      { name: "Valasaravakkam", arrivalTime: "08:10 AM" },
      { name: "Vadapalani", arrivalTime: "08:20 AM" }
    ]
  }));

  const filteredBuses = buses.filter(bus => 
    bus.busNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bus.routeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-6 px-4 pb-24 lg:pb-6">
      <h1 className="text-2xl font-bold mb-6">College Bus List</h1>
      
      <div className="mb-4">
        <Input
          placeholder="Search by bus number or route..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ScrollArea className="h-[calc(100vh-240px)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bus</TableHead>
                <TableHead>Bus Number</TableHead>
                <TableHead>Route</TableHead>
                <TableHead className="hidden md:table-cell">Driver</TableHead>
                <TableHead className="hidden md:table-cell">Contact</TableHead>
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
                  <TableCell className="hidden md:table-cell">{bus.driver}</TableCell>
                  <TableCell className="hidden md:table-cell">{bus.contactNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      <Dialog open={!!selectedBus} onOpenChange={(open) => !open && setSelectedBus(null)}>
        <DialogContent>
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
            <p><span className="font-medium">Driver:</span> {selectedBus?.driver}</p>
            <p><span className="font-medium">Contact:</span> {selectedBus?.contactNumber}</p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Bus Stops & Timings</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stop Name</TableHead>
                  <TableHead>Arrival Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedBus?.stops.map((stop, index) => (
                  <TableRow key={index}>
                    <TableCell>{stop.name}</TableCell>
                    <TableCell>{stop.arrivalTime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BusList;
