
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

const Settings: React.FC = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: false,
    darkMode: false,
    textSize: 1,
    language: "english",
    mapStyle: "standard"
  });

  const handleToggleChange = (field: string) => {
    setSettings(prev => ({ ...prev, [field]: !prev[field as keyof typeof prev] }));
  };

  const handleSliderChange = (value: number[]) => {
    setSettings(prev => ({ ...prev, textSize: value[0] }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleRadioChange = (field: string, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const saveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Preferences</CardTitle>
        <CardDescription>Customize your app experience and notification settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Notification Settings</h3>
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className="flex flex-col space-y-1">
              <span>Bus Updates</span>
              <span className="font-normal text-sm text-muted-foreground">
                Receive alerts about delays and route changes
              </span>
            </Label>
            <Switch
              id="notifications"
              checked={settings.notifications}
              onCheckedChange={() => handleToggleChange('notifications')}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="emailAlerts" className="flex flex-col space-y-1">
              <span>Email Notifications</span>
              <span className="font-normal text-sm text-muted-foreground">
                Get email alerts for schedule changes
              </span>
            </Label>
            <Switch
              id="emailAlerts"
              checked={settings.emailAlerts}
              onCheckedChange={() => handleToggleChange('emailAlerts')}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Display Options</h3>
          <div className="flex items-center justify-between">
            <Label htmlFor="darkMode" className="flex flex-col space-y-1">
              <span>Dark Mode</span>
              <span className="font-normal text-sm text-muted-foreground">
                Switch to dark theme for night viewing
              </span>
            </Label>
            <Switch
              id="darkMode"
              checked={settings.darkMode}
              onCheckedChange={() => handleToggleChange('darkMode')}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="textSize">Text Size</Label>
              <span className="text-sm text-muted-foreground">
                {settings.textSize === 0 ? "Small" : settings.textSize === 1 ? "Medium" : "Large"}
              </span>
            </div>
            <Slider
              id="textSize"
              min={0}
              max={2}
              step={1}
              value={[settings.textSize]}
              onValueChange={handleSliderChange}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Language Preference</h3>
          <div className="space-y-2">
            <Label htmlFor="language">Select Language</Label>
            <Select 
              value={settings.language} 
              onValueChange={(value) => handleSelectChange('language', value)}
            >
              <SelectTrigger id="language">
                <SelectValue placeholder="Choose language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="tamil">Tamil</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Map Display</h3>
          <RadioGroup 
            value={settings.mapStyle}
            onValueChange={(value) => handleRadioChange('mapStyle', value)}
            className="grid grid-cols-1 sm:grid-cols-3 gap-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="standard" id="standard" />
              <Label htmlFor="standard">Standard View</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="satellite" id="satellite" />
              <Label htmlFor="satellite">Satellite View</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="terrain" id="terrain" />
              <Label htmlFor="terrain">Terrain View</Label>
            </div>
          </RadioGroup>
        </div>
        
        <Button 
          onClick={saveSettings} 
          className="w-full bg-college-blue hover:bg-college-blue/90"
        >
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  );
};

export default Settings;
