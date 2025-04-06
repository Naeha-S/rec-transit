
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { useLanguageContext } from '@/contexts/LanguageContext';

const Settings: React.FC = () => {
  const { toast } = useToast();
  const { language, changeLanguage } = useLanguageContext();
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: false,
    darkMode: document.documentElement.classList.contains('dark'),
    textSize: 1,
    language: language,
    mapStyle: "standard"
  });

  useEffect(() => {
    // Update language in settings when context language changes
    setSettings(prev => ({ ...prev, language }));
  }, [language]);

  const handleToggleChange = (field: string) => {
    if (field === 'darkMode') {
      const newDarkModeValue = !settings.darkMode;
      if (newDarkModeValue) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
      }
    }
    setSettings(prev => ({ ...prev, [field]: !prev[field as keyof typeof prev] }));
  };

  const handleSliderChange = (value: number[]) => {
    setSettings(prev => ({ ...prev, textSize: value[0] }));
  };

  const handleSelectChange = (field: string, value: string) => {
    if (field === 'language') {
      changeLanguage(value as any);
    }
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
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your app preferences and accessibility options</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Notifications</h3>
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className="flex flex-col space-y-1">
              <span>Push Notifications</span>
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
              <span>Email Alerts</span>
              <span className="font-normal text-sm text-muted-foreground">
                Get email notifications for important updates
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
          <h3 className="text-sm font-medium">Appearance</h3>
          <div className="flex items-center justify-between">
            <Label htmlFor="darkMode" className="flex flex-col space-y-1">
              <span>Dark Mode</span>
              <span className="font-normal text-sm text-muted-foreground">
                Switch between light and dark themes
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
          <h3 className="text-sm font-medium">Language & Region</h3>
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select 
              value={settings.language} 
              onValueChange={(value) => handleSelectChange('language', value)}
            >
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ta">Tamil</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Map Settings</h3>
          <RadioGroup 
            value={settings.mapStyle}
            onValueChange={(value) => handleRadioChange('mapStyle', value)}
            className="grid grid-cols-1 sm:grid-cols-3 gap-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="standard" id="standard" />
              <Label htmlFor="standard">Standard</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="satellite" id="satellite" />
              <Label htmlFor="satellite">Satellite</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="terrain" id="terrain" />
              <Label htmlFor="terrain">Terrain</Label>
            </div>
          </RadioGroup>
        </div>
        
        <Button 
          onClick={saveSettings} 
          className="w-full bg-college-blue hover:bg-college-blue/90"
        >
          Save Settings
        </Button>
      </CardContent>
    </Card>
  );
};

export default Settings;
