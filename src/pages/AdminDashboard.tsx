
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Shield, AlertTriangle, Clock } from 'lucide-react';

const AdminDashboard = () => {
  // Password input state
  const [password, setPassword] = useState("");
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  
  // Hook utilities
  const navigate = useNavigate();
  const { t } = useLanguageContext();
  const { toast } = useToast();
  const { isAdminAuthenticated, login, logout, isRateLimited } = useAdminAuth();

  // Password strength validation
  const validatePasswordStrength = (password: string) => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password)
    };
    return checks;
  };

  // Login handler - authenticates admin with password
  const handleLogin = () => {
    if (isRateLimited) {
      toast({
        title: "Rate Limited",
        description: "Too many login attempts. Please wait 15 minutes before trying again.",
        variant: "destructive",
      });
      return;
    }

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
        description: "Incorrect password. Check security requirements.",
        variant: "destructive",
      });
      setShowPasswordRequirements(true);
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
    const passwordChecks = validatePasswordStrength(password);
    
    return (
      <div className="flex items-center justify-center min-h-screen bg-background p-4">
        <Card className="w-full max-w-md">
          {/* Login form header */}
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Shield className="h-8 w-8 text-college-blue mr-2" />
              <CardTitle className="text-2xl">Secure Admin Login</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              Enhanced security with session management
            </p>
          </CardHeader>
          
          {/* Login form content */}
          <CardContent className="grid gap-4">
            {isRateLimited && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Too many login attempts. Please wait 15 minutes before trying again.
                </AlertDescription>
              </Alert>
            )}
            
            {/* Password input field */}
            <div className="grid gap-2">
              <Input
                id="password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isRateLimited && handleLogin()}
                disabled={isRateLimited}
                className="text-base"
              />
              
              {showPasswordRequirements && (
                <div className="text-xs space-y-1 mt-2 p-2 bg-muted rounded">
                  <p className="font-medium">Password requirements:</p>
                  <p className={passwordChecks.length ? 'text-green-600' : 'text-red-600'}>
                    ✓ At least 8 characters
                  </p>
                  <p className={passwordChecks.uppercase ? 'text-green-600' : 'text-red-600'}>
                    ✓ One uppercase letter
                  </p>
                  <p className={passwordChecks.lowercase ? 'text-green-600' : 'text-red-600'}>
                    ✓ One lowercase letter
                  </p>
                  <p className={passwordChecks.number ? 'text-green-600' : 'text-red-600'}>
                    ✓ One number
                  </p>
                </div>
              )}
            </div>
            
            {/* Login submit button */}
            <Button 
              onClick={handleLogin} 
              disabled={isRateLimited}
              className="w-full"
            >
              {isRateLimited ? 'Rate Limited' : 'Sign In Securely'}
            </Button>
            
            <div className="text-xs text-center text-muted-foreground">
              <Clock className="inline h-3 w-3 mr-1" />
              Session timeout: 30 minutes
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin dashboard view - shown when authenticated
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        {/* Dashboard header */}
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Shield className="h-8 w-8 text-green-600 mr-2" />
            <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Secure session active
          </p>
        </CardHeader>
        
        {/* Dashboard content */}
        <CardContent className="grid gap-4">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              You are logged in as admin with enhanced security features enabled.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-2">
            <Button 
              onClick={() => navigate('/admin')} 
              className="w-full"
              variant="default"
            >
              Access Admin Panel
            </Button>
            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="w-full"
            >
              Secure Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
