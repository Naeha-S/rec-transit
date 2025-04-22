
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import { useLanguageContext } from '@/contexts/LanguageContext';

interface AdminDashboardProps {
  isAuthenticated?: boolean;
  setIsAuthenticated?: (isAuthenticated: boolean) => void;
}

const AdminDashboard = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguageContext();

  const adminPassword = "rec";

  const handleLogin = () => {
    if (password === adminPassword) {
      setIsAuthenticated(true);
      toast({
        title: t('loginSuccessful'),
        description: t('welcomeToAdminDashboard'),
      });
      navigate('/admin-panel'); // Redirect to the new admin panel page
    } else {
      toast({
        title: t('loginFailed'),
        description: t('incorrectPassword'),
        variant: "destructive",
      });
    }
    setPassword("");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
    toast({
      description: t('loggedOutSuccessfully'),
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{t('adminLogin')}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Input
                id="password"
                type="password"
                placeholder={t('password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button onClick={handleLogin}>{t('signIn')}</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t('adminDashboard')}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p>{t('youAreLoggedInAsAdmin')}</p>
          <Button onClick={handleLogout}>{t('logout')}</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
