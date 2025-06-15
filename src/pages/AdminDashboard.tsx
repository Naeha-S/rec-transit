
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

const AdminDashboard = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { t } = useLanguageContext();
  const { toast } = useToast();
  const { isAdminAuthenticated, login, logout } = useAdminAuth();

  const handleLogin = () => {
    const success = login(password);
    if (success) {
      toast({
        title: "Login Successful",
        description: "Welcome to admin dashboard",
      });
      navigate('/admin');
    } else {
      toast({
        title: "Login Failed",
        description: "Incorrect password",
        variant: "destructive",
      });
    }
    setPassword("");
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast({
      description: "Logged out successfully",
    });
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Admin Login</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button onClick={handleLogin}>Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p>You are logged in as admin</p>
          <Button onClick={handleLogout}>Logout</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
