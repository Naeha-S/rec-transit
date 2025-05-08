
import React, { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const WelcomeToast: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const hasShownWelcome = localStorage.getItem('hasShownWelcome');
    
    if (!hasShownWelcome) {
      toast({
        title: "Welcome to REC Bus Tracker!",
        description: "Find your bus routes, schedules and more. Click to explore.",
        action: {
          label: "Explore",
          onClick: () => navigate('/buses')
        },
        duration: 5000,
      });
      
      localStorage.setItem('hasShownWelcome', 'true');
    }
  }, [toast, navigate]);

  return null; // This is a utility component, it doesn't render anything
};

export default WelcomeToast;
