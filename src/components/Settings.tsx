
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
  // Hooks and utilities
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const { textSize, setTextSize } = useTextSize();
  
  // Settings state management
  const [tempSettings, setTempSettings] = useState({
    notifications: true,
    textSize: textSize,
    language: "english",
    darkMode: theme === "dark"
  });

  // Initialize settings with current context values
  useEffect(() => {
    setTempSettings(prev => ({ 
      ...prev, 
      textSize,
      darkMode: theme === "dark"
    }));
  }, [textSize, theme]);

  // Toggle handlers for switch components
  const handleToggleChange = (field: string) => {
    setTempSettings(prev => ({ ...prev, [field]: !prev[field as keyof typeof prev] }));
  };

  // Text size slider handler
  const handleSliderChange = (value: number[]) => {
    setTempSettings(prev => ({ ...prev, textSize: value[0] }));
  };

  // Dropdown select handlers
  const handleSelectChange = (field: string, value: string) => {
    setTempSettings(prev => ({ ...prev, [field]: value }));
  };

  // Save settings function - applies changes to contexts
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

  // Text size utility classes based on current selection
  const textSizeClass = getTextSizeClass(tempSettings.textSize);
  const headingClass = getHeadingTextSizeClass(tempSettings.textSize);
  const subtextClass = getSubtextSizeClass(tempSettings.textSize);

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Main settings card container */}
      <Card className="shadow-md">
        {/* Page header section */}
        <CardHeader className="text-center pb-6">
          <CardTitle className={`${headingClass} text-2xl`}>Personal Preferences</CardTitle>
          <CardDescription className={subtextClass}>Customize your app experience and notification settings</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Notification Settings Section */}
          <div className="space-y-4">
            <h3 className={`font-semibold border-b pb-2 ${headingClass} text-center`}>Notification Settings</h3>
            <div className="space-y-4">
              {/* Bus Updates toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex flex-col text-center flex-1">
                  <Label htmlFor="notifications" className={`font-medium ${textSizeClass}`}>
                    Bus Updates
                  </Label>
                  <span className={`text-muted-foreground ${subtextClass}`}>
                    Receive alerts about delays and route changes
                  </span>
                </div>
                <Switch
                  id="notifications"
                  checked={tempSettings.notifications}
                  onCheckedChange={() => handleToggleChange('notifications')}
                />
              </div>
            </div>
          </div>

          {/* Display Options Section */}
          <div className="space-y-4">
            <h3 className={`font-semibold border-b pb-2 ${headingClass} text-center`}>Display Options</h3>
            <div className="space-y-6">
              {/* Text Size Slider */}
              <div className="p-3 rounded-lg border">
                <div className="flex justify-between items-center mb-3">
                  <Label htmlFor="textSize" className={`font-medium ${textSizeClass}`}>Text Size</Label>
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
                <div className="grid grid-cols-3 text-center text-muted-foreground text-sm mt-2">
                  <span className={subtextClass}>Small</span>
                  <span className={subtextClass}>Medium</span>
                  <span className={subtextClass}>Large</span>
                </div>
              </div>

              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex flex-col text-center flex-1">
                  <Label htmlFor="darkMode" className={`font-medium ${textSizeClass}`}>
                    Dark Mode
                  </Label>
                  <span className={`text-muted-foreground ${subtextClass}`}>
                    Switch between light and dark themes
                  </span>
                </div>
                <Switch
                  id="darkMode"
                  checked={tempSettings.darkMode}
                  onCheckedChange={() => handleToggleChange('darkMode')}
                />
              </div>
            </div>
          </div>
          
          {/* Language Preference Section */}
          <div className="space-y-4">
            <h3 className={`font-semibold border-b pb-2 ${headingClass} text-center`}>Language Preference</h3>
            <div className="p-3 rounded-lg border text-center">
              <Label htmlFor="language" className={`font-medium block mb-2 ${textSizeClass}`}>Select Language</Label>
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
          
          {/* Save Button */}
          <div className="text-center">
            <Button 
              onClick={saveSettings} 
              className={`w-full bg-college-blue hover:bg-college-blue/90 mt-8 ${textSizeClass}`}
            >
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
