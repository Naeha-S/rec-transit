
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
import { getTextSizeClass, getHeadingTextSizeClass, getSubtextSizeClass } from '@/utils/textSizeUtils';

const Settings: React.FC = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const { textSize, setTextSize } = useTextSize();
  const [tempSettings, setTempSettings] = useState({
    notifications: true,
    emailAlerts: false,
    textSize: textSize,
    language: "english",
    darkMode: theme === "dark"
  });

  // Initialize settings with the current textSize from context
  useEffect(() => {
    setTempSettings(prev => ({ 
      ...prev, 
      textSize,
      darkMode: theme === "dark"
    }));
  }, [textSize, theme]);

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
    if ((theme === "dark" && !tempSettings.darkMode) || 
        (theme === "light" && tempSettings.darkMode)) {
      setTheme(tempSettings.darkMode ? "dark" : "light");
    }

    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  // Current text size classes
  const textSizeClass = getTextSizeClass(tempSettings.textSize);
  const headingClass = getHeadingTextSizeClass(tempSettings.textSize);
  const subtextClass = getSubtextSizeClass(tempSettings.textSize);

  return (
    <Card className="mx-auto max-w-lg shadow-md">
      <CardHeader className="text-center pb-4">
        <CardTitle className={headingClass}>Personal Preferences</CardTitle>
        <CardDescription className={subtextClass}>Customize your app experience and notification settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className={`font-medium text-center ${headingClass}`}>Notification Settings</h3>
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className={`flex flex-col ${textSizeClass}`}>
              <span>Bus Updates</span>
              <span className={`font-normal text-muted-foreground ${subtextClass}`}>
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
            <Label htmlFor="emailAlerts" className={`flex flex-col ${textSizeClass}`}>
              <span>Email Notifications</span>
              <span className={`font-normal text-muted-foreground ${subtextClass}`}>
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
          <h3 className={`font-medium text-center ${headingClass}`}>Display Options</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="textSize" className={textSizeClass}>Text Size</Label>
                <span className={`text-muted-foreground ${subtextClass}`}>
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
                <span className={subtextClass}>Small</span>
                <span className={subtextClass}>Medium</span>
                <span className={subtextClass}>Large</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Label htmlFor="darkMode" className={`flex flex-col ${textSizeClass}`}>
                <span>Dark Mode</span>
                <span className={`font-normal text-muted-foreground ${subtextClass}`}>
                  Switch between light and dark themes
                </span>
              </Label>
              <Switch
                id="darkMode"
                checked={tempSettings.darkMode}
                onCheckedChange={() => handleToggleChange('darkMode')}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className={`font-medium text-center ${headingClass}`}>Language Preference</h3>
          <div className="space-y-2">
            <Label htmlFor="language" className={textSizeClass}>Select Language</Label>
            <Select 
              value={tempSettings.language} 
              onValueChange={(value) => handleSelectChange('language', value)}
            >
              <SelectTrigger id="language" className={textSizeClass}>
                <SelectValue placeholder="Choose language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english" className={textSizeClass}>English</SelectItem>
                <SelectItem value="tamil" className={textSizeClass}>Tamil</SelectItem>
                <SelectItem value="hindi" className={textSizeClass}>Hindi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button 
          onClick={saveSettings} 
          className={`w-full bg-college-blue hover:bg-college-blue/90 mt-6 ${textSizeClass}`}
        >
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  );
};

export default Settings;
