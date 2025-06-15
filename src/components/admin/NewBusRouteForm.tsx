
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Save, Bus } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const stopSchema = z.object({
  name: z.string().min(1, "Stop name is required"),
  time: z.string().min(1, "Time is required"),
});

const busRouteSchema = z.object({
  busNumber: z.string().min(1, "Bus number is required"),
  routeName: z.string().min(1, "Route name is required"),
  driver: z.string().min(1, "Driver name is required"),
  contactNumber: z.string().min(10, "Valid contact number is required").max(15),
  stops: z.array(stopSchema).min(2, "At least 2 stops are required"),
  schedules: z.object({
    tenAm: z.boolean(),
    fivePm: z.boolean(),
  }).refine(data => data.tenAm || data.fivePm, {
    message: "At least one schedule must be selected",
  }),
});

type BusRouteFormData = z.infer<typeof busRouteSchema>;

const NewBusRouteForm: React.FC = () => {
  const { toast } = useToast();
  const [stops, setStops] = useState([
    { name: '', time: '' },
    { name: '', time: '' }
  ]);

  const form = useForm<BusRouteFormData>({
    resolver: zodResolver(busRouteSchema),
    defaultValues: {
      busNumber: '',
      routeName: '',
      driver: '',
      contactNumber: '',
      stops: stops,
      schedules: {
        tenAm: false,
        fivePm: false,
      },
    },
  });

  const addStop = () => {
    const newStops = [...stops, { name: '', time: '' }];
    setStops(newStops);
    form.setValue('stops', newStops);
  };

  const removeStop = (index: number) => {
    if (stops.length > 2) {
      const newStops = stops.filter((_, i) => i !== index);
      setStops(newStops);
      form.setValue('stops', newStops);
    }
  };

  const updateStop = (index: number, field: 'name' | 'time', value: string) => {
    const newStops = [...stops];
    newStops[index][field] = value;
    setStops(newStops);
    form.setValue('stops', newStops);
  };

  const onSubmit = (data: BusRouteFormData) => {
    // Here you would typically save the data to your backend/storage
    console.log('New bus route data:', data);
    
    toast({
      title: "Bus Route Created",
      description: `Bus ${data.busNumber} route has been created successfully and added to selected schedules.`,
    });

    // Reset form
    form.reset();
    setStops([{ name: '', time: '' }, { name: '', time: '' }]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bus className="h-5 w-5" />
          New Bus Route
        </CardTitle>
        <CardDescription>
          Create a new bus route with stops, timings, and schedule assignments. All fields marked with * are mandatory.
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
                      <Input placeholder="e.g., REC-101" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <FormField
                control={form.control}
                name="driver"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Driver Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Driver full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., +91 9876543210" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Schedule Selection */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Schedule Assignment *</Label>
              <FormDescription>
                Select which schedules this bus should be added to. The bus will automatically appear in "All Buses" and "Exam Buses" sections.
              </FormDescription>
              
              <div className="flex gap-6">
                <FormField
                  control={form.control}
                  name="schedules.tenAm"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>10 AM Schedule</FormLabel>
                        <FormDescription>
                          Morning college arrival buses
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="schedules.fivePm"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>5 PM Schedule</FormLabel>
                        <FormDescription>
                          Evening college departure buses
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              
              {form.formState.errors.schedules && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.schedules.message}
                </p>
              )}
            </div>

            {/* Bus Stops */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Bus Stops * (Minimum 2 required)</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addStop}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Stop
                </Button>
              </div>

              <div className="space-y-3">
                {stops.map((stop, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="flex-1">
                      <Input
                        placeholder="Stop name (e.g., Tambaram Railway Station)"
                        value={stop.name}
                        onChange={(e) => updateStop(index, 'name', e.target.value)}
                      />
                    </div>
                    <div className="w-32">
                      <Input
                        placeholder="Time (e.g., 8:30 AM)"
                        value={stop.time}
                        onChange={(e) => updateStop(index, 'time', e.target.value)}
                      />
                    </div>
                    {stops.length > 2 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeStop(index)}
                        className="shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              {form.formState.errors.stops && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.stops.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Create Bus Route
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NewBusRouteForm;
