
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";
import { useTextSize } from '@/contexts/TextSizeContext';

const Settings: React.FC = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const { textSize, setTextSize } = useTextSize();
  const [tempSettings, setTempSettings] = useState({
    notifications: true,
    emailAlerts: false,
    textSize: textSize,
    language: "english"
  });

  // Initialize settings with the current textSize from context
  useEffect(() => {
    setTempSettings(prev => ({ ...prev, textSize }));
  }, [textSize]);

  const handleToggleChange = (field: string) => {
    setTempSettings(prev => ({ ...prev, [field]: !prev[field as keyof typeof prev] }));
  };

  const handleSliderChange = (value: number[]) => {
    setTempSettings(prev => ({ ...prev, textSize: value[0] }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setTempSettings(prev => ({ ...prev, [field]: value }));
  };

  const saveSettings = () => {
    // Apply text size change to context
    setTextSize(tempSettings.textSize);
    
    // Apply theme if it has changed
    if ((theme === "dark" && tempSettings.darkMode === false) || 
        (theme === "light" && tempSettings.darkMode === true)) {
      setTheme(tempSettings.darkMode ? "dark" : "light");
    }

    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  // Generate className based on text size
  const getTextSizeClass = () => {
    switch(textSize) {
      case 0: return "text-sm";
      case 2: return "text-lg";
      default: return "text-base";
    }
  };

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader className="text-center">
        <CardTitle>Personal Preferences</CardTitle>
        <CardDescription>Customize your app experience and notification settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className={`font-medium text-center ${getTextSizeClass()}`}>Notification Settings</h3>
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className={`flex flex-col space-y-1 ${getTextSizeClass()}`}>
              <span>Bus Updates</span>
              <span className={`font-normal text-muted-foreground ${textSize === 0 ? 'text-xs' : textSize === 2 ? 'text-base' : 'text-sm'}`}>
                Receive alerts about delays and route changes
              </span>
            </Label>
            <Switch
              id="notifications"
              checked={tempSettings.notifications}
              onCheckedChange={() => handleToggleChange('notifications')}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="emailAlerts" className={`flex flex-col space-y-1 ${getTextSizeClass()}`}>
              <span>Email Notifications</span>
              <span className={`font-normal text-muted-foreground ${textSize === 0 ? 'text-xs' : textSize === 2 ? 'text-base' : 'text-sm'}`}>
                Get email alerts for schedule changes
              </span>
            </Label>
            <Switch
              id="emailAlerts"
              checked={tempSettings.emailAlerts}
              onCheckedChange={() => handleToggleChange('emailAlerts')}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className={`font-medium text-center ${getTextSizeClass()}`}>Display Options</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="textSize" className={getTextSizeClass()}>Text Size</Label>
              <span className={`text-muted-foreground ${textSize === 0 ? 'text-xs' : textSize === 2 ? 'text-base' : 'text-sm'}`}>
                {tempSettings.textSize === 0 ? "Small" : tempSettings.textSize === 1 ? "Medium" : "Large"}
              </span>
            </div>
            <Slider
              id="textSize"
              min={0}
              max={2}
              step={1}
              value={[tempSettings.textSize]}
              onValueChange={handleSliderChange}
              className="my-4"
            />
            <div className="grid grid-cols-3 text-center text-muted-foreground text-sm mt-1">
              <span>Small</span>
              <span>Medium</span>
              <span>Large</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className={`font-medium text-center ${getTextSizeClass()}`}>Language Preference</h3>
          <div className="space-y-2">
            <Label htmlFor="language" className={getTextSizeClass()}>Select Language</Label>
            <Select 
              value={tempSettings.language} 
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
        
        <Button 
          onClick={saveSettings} 
          className="w-full bg-college-blue hover:bg-college-blue/90 mt-6"
        >
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  );
};

export default Settings;
