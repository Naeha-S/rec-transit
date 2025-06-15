
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAdminSettings } from "@/contexts/AdminSettingsContext";
import { useLanguageContext } from '@/contexts/LanguageContext';

const AdminSettingsTab = () => {
  const { settings, updateBusesReturningAfter5 } = useAdminSettings();
  const [tempBusCount, setTempBusCount] = useState(settings.busesReturningAfter5.toString());
  const { toast } = useToast();
  const { t } = useLanguageContext();

  const handleSave = () => {
    const count = parseInt(tempBusCount);
    if (isNaN(count) || count < 0) {
      toast({
        title: "Error",
        description: "Please enter a valid number",
        variant: "destructive",
      });
      return;
    }

    updateBusesReturningAfter5(count);
    toast({
      title: "Settings Updated",
      description: "Bus count has been updated successfully",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Settings</CardTitle>
        <CardDescription>
          Configure system-wide settings and parameters
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="busCount">Buses Returning After 5 PM</Label>
          <Input 
            id="busCount" 
            type="number"
            min="0"
            placeholder="Enter number of buses"
            value={tempBusCount}
            onChange={(e) => setTempBusCount(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            This number will be displayed on the home page quick stats
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>Save Settings</Button>
      </CardFooter>
    </Card>
  );
};

export default AdminSettingsTab;
