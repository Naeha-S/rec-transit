
import React, { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const WelcomeToast: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const hasShownWelcome = localStorage.getItem('hasShownWelcome');
    
    if (!hasShownWelcome) {
      toast({
        title: "Welcome to REC Bus Tracker!",
        description: "Find your college bus routes, check schedules, and get real-time updates. Search for your boarding point or bus number to get started.",
        action: <Button onClick={() => navigate('/buses')}>Explore Buses</Button>,
        duration: 8000,
      });
      
      localStorage.setItem('hasShownWelcome', 'true');
    }
  }, [toast, navigate]);

  return null; // This is a utility component, it doesn't render anything
};

export default WelcomeToast;
