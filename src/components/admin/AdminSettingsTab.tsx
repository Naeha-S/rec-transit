
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAdminSettings } from "@/contexts/AdminSettingsContext";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useLanguageContext } from '@/contexts/LanguageContext';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

const AdminSettingsTab = () => {
  const { settings, updateBusesReturningAfter5 } = useAdminSettings();
  const { changePassword, feedbackEmail, updateFeedbackEmail } = useAdminAuth();
  const [tempBusCount, setTempBusCount] = useState(settings.busesReturningAfter5.toString());
  const [tempFeedbackEmail, setTempFeedbackEmail] = useState(feedbackEmail);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguageContext();

  const handleBusCountSave = () => {
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

  const handleFeedbackEmailSave = () => {
    if (!tempFeedbackEmail || !tempFeedbackEmail.includes('@')) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    updateFeedbackEmail(tempFeedbackEmail);
    toast({
      title: "Settings Updated",
      description: "Feedback email has been updated successfully",
    });
  };

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all password fields",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 3) {
      toast({
        title: "Error",
        description: "Password must be at least 3 characters long",
        variant: "destructive",
      });
      return;
    }

    const success = changePassword(currentPassword, newPassword);
    if (success) {
      toast({
        title: "Password Changed",
        description: "Your password has been updated successfully",
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      toast({
        title: "Error",
        description: "Current password is incorrect",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
          <CardDescription>
            Configure system-wide settings and parameters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="busCount">Return after 5</Label>
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
          <Button onClick={handleBusCountSave}>Save Settings</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Feedback Email Configuration
          </CardTitle>
          <CardDescription>
            Set the email address where feedback submissions will be sent
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="feedbackEmail">Feedback Email Address</Label>
            <Input 
              id="feedbackEmail" 
              type="email"
              placeholder="Enter feedback email address"
              value={tempFeedbackEmail}
              onChange={(e) => setTempFeedbackEmail(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              All feedback submissions will be sent to this email address
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleFeedbackEmailSave}>Save Email</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Change Admin Password
          </CardTitle>
          <CardDescription>
            Update your admin panel password for security
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <Input 
                id="currentPassword" 
                type={showPasswords ? "text" : "password"}
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPasswords(!showPasswords)}
              >
                {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input 
              id="newPassword" 
              type={showPasswords ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input 
              id="confirmPassword" 
              type={showPasswords ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handlePasswordChange}>Change Password</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminSettingsTab;
