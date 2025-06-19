
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Save } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm, useFieldArray } from "react-hook-form";

interface BusStop {
  name: string;
  arrivalTime: string;
}

interface NewBusRouteForm {
  busNumber: string;
  routeName: string;
  driver: string;
  stops: BusStop[];
  scheduleType: '10am' | '5pm' | 'both';
}

const NewBusRouteTab: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<NewBusRouteForm>({
    defaultValues: {
      busNumber: '',
      routeName: '',
      driver: '',
      stops: [{ name: '', arrivalTime: '' }],
      scheduleType: 'both'
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "stops"
  });

  const onSubmit = async (data: NewBusRouteForm) => {
    // Validate required fields
    if (!data.busNumber.trim() || !data.routeName.trim() || !data.driver.trim()) {
      toast({
        title: "Validation Error",
        description: "Bus number, route name, and driver are required fields.",
        variant: "destructive",
      });
      return;
    }

    // Validate stops
    const validStops = data.stops.filter(stop => stop.name.trim() && stop.arrivalTime.trim());
    if (validStops.length === 0) {
      toast({
        title: "Validation Error", 
        description: "At least one stop with name and time is required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Here you would typically save to your backend/context
      console.log('New bus route data:', { ...data, stops: validStops });
      
      toast({
        title: "Success",
        description: `Bus route ${data.busNumber} has been created and added to ${data.scheduleType === 'both' ? 'all schedules' : data.scheduleType === '10am' ? '10 AM schedule' : '5 PM schedule'}.`,
      });
      
      // Reset form
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create bus route. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addStop = () => {
    append({ name: '', arrivalTime: '' });
  };

  const removeStop = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          New Bus Route
        </CardTitle>
        <CardDescription>
          Create a new bus route with stops and timings. The route will be automatically added to all buses and can be managed from other sections.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="busNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bus Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., REC001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="driver"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Driver Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="routeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Route Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Tambaram to College" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Schedule Type Selection */}
            <FormField
              control={form.control}
              name="scheduleType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add to Schedule</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select schedule type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="both">Both 10 AM and 5 PM</SelectItem>
                      <SelectItem value="10am">10 AM Only</SelectItem>
                      <SelectItem value="5pm">5 PM Only</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bus Stops */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Bus Stops *</Label>
                <Button type="button" onClick={addStop} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Stop
                </Button>
              </div>
              
              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-end">
                    <div className="flex-1">
                      <Label htmlFor={`stops.${index}.name`}>Stop Name</Label>
                      <Input
                        placeholder="e.g., Tambaram Station"
                        {...form.register(`stops.${index}.name`)}
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor={`stops.${index}.arrivalTime`}>Arrival Time</Label>
                      <Input
                        type="time"
                        {...form.register(`stops.${index}.arrivalTime`)}
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={() => removeStop(index)}
                      variant="outline"
                      size="sm"
                      disabled={fields.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                {isSubmitting ? 'Creating Route...' : 'Create Bus Route'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NewBusRouteTab;
