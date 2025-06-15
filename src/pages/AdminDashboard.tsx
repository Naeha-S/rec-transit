
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

const AdminDashboard = () => {
  // Password input state
  const [password, setPassword] = useState("");
  
  // Hook utilities
  const navigate = useNavigate();
  const { t } = useLanguageContext();
  const { toast } = useToast();
  const { isAdminAuthenticated, login, logout } = useAdminAuth();

  // Login handler - authenticates admin with password
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

  // Logout handler - clears authentication and redirects
  const handleLogout = () => {
    logout();
    navigate('/');
    toast({
      description: "Logged out successfully",
    });
  };

  // Login form - shown when not authenticated
  if (!isAdminAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Card className="w-full max-w-md">
          {/* Login form header */}
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Admin Login</CardTitle>
          </CardHeader>
          
          {/* Login form content */}
          <CardContent className="grid gap-4">
            {/* Password input field */}
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
            {/* Login submit button */}
            <Button onClick={handleLogin}>Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin dashboard view - shown when authenticated
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <Card className="w-full max-w-md">
        {/* Dashboard header */}
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
        </CardHeader>
        
        {/* Dashboard content */}
        <CardContent className="grid gap-4">
          <p>You are logged in as admin</p>
          {/* Logout button */}
          <Button onClick={handleLogout}>Logout</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
