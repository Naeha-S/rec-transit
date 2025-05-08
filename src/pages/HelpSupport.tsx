
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Linkedin, 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  HelpCircle, 
  ChevronDown,
  ChevronUp,
  Shield
} from 'lucide-react';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';

const HelpSupport = () => {
  const { t } = useLanguageContext();
  const [adminPassword, setAdminPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('help');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Show welcome toast when the page loads
    toast({
      title: "Welcome to Help & Support",
      description: "Find answers to your questions and get assistance",
    });
  }, [toast]);

  const openLinkedIn = () => {
    window.open('https://www.linkedin.com/in/naeha-s/', '_blank', 'noopener,noreferrer');
  };
  
  const toggleNav = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const validateAdminPassword = () => {
    if (adminPassword === 'rec') {
      setPasswordError(false);
      localStorage.setItem('isAdmin', 'true');
      toast({
        title: t('adminAccessGranted'),
        description: t('adminAccessGrantedDesc'),
        duration: 3000,
      });
      navigate('/admin');
    } else {
      setPasswordError(true);
      toast({
        title: t('adminAccessDenied'),
        description: t('adminAccessDeniedDesc'),
        variant: 'destructive',
        duration: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden" 
          onClick={toggleNav}
        ></div>
      )}
      
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={sidebarOpen} 
      />
      
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
        <Header onToggleNav={toggleNav} />
        
        <main className="flex-1 p-3 sm:p-4 pt-20 pb-20 lg:pb-4 max-w-7xl mx-auto w-full">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">{t('helpSupport')}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* About Section */}
              <div className="md:col-span-2 space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">{t('about')}</h2>
                  
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      REC Bus Tracker is a comprehensive application designed to help students of Rajalakshmi Engineering College
                      track and manage their daily commute. Our mission is to make transportation hassle-free for all students
                      by providing accurate, real-time information about bus routes, timings, and special schedules.
                    </p>
                    
                    <p className="text-muted-foreground">
                      This application allows you to search for your bus by route number or boarding point, view detailed
                      schedules, access special exam time bus arrangements, and stay informed about any changes or delays.
                      We're constantly working to improve the experience and welcome your feedback.
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        {t('version')}: 2.0.1
                      </p>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={openLinkedIn} 
                        className="flex items-center gap-2"
                      >
                        <Linkedin size={16} />
                        {t('author')}
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* FAQs Section */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">{t('frequentlyAskedQuestions')}</h2>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>How do I find my bus route?</AccordionTrigger>
                      <AccordionContent>
                        You can search for your bus route by entering your boarding point or bus number in the search box on the home page. 
                        The system will display all available buses that match your search criteria. Click on any bus to view detailed information 
                        including all stops and timings.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Are buses available on holidays?</AccordionTrigger>
                      <AccordionContent>
                        No, college buses do not operate on holidays or Sundays. The app will display a notification 
                        when you try to view bus schedules for these days. You can check the calendar for upcoming 
                        holidays in the schedule section.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>How do special exam buses work?</AccordionTrigger>
                      <AccordionContent>
                        During exam periods, special buses are arranged to depart at 1:00 PM, 3:00 PM, and 5:00 PM to accommodate different 
                        exam schedules. These buses follow the same routes as morning buses and are all AC buses. You can view detailed 
                        exam bus schedules in the Exam Timings section.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>What should I do if my bus is delayed?</AccordionTrigger>
                      <AccordionContent>
                        If your bus shows a "delayed" status, you should wait at your boarding point. The delay is usually 
                        communicated by the transport department. For significant delays or cancellations, we recommend contacting 
                        the transport office directly using the contact information provided in the Help & Support section.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-5">
                      <AccordionTrigger>Can I suggest changes to bus routes or timings?</AccordionTrigger>
                      <AccordionContent>
                        Yes, the college transport department welcomes suggestions for improving bus services. You can submit your 
                        feedback through the contact information provided in the Help & Support section. All suggestions are 
                        reviewed periodically and considered for implementation based on feasibility.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-6">
                {/* Contact Info */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">{t('contactUs')}</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{t('email')}</p>
                        <p className="text-sm text-muted-foreground">transport@rajalakshmi.edu.in</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{t('phone')}</p>
                        <p className="text-sm text-muted-foreground">+91 044-2751 2666</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{t('helpdesk')}</p>
                        <p className="text-sm text-muted-foreground">8:00 AM to 5:00 PM (Mon-Sat)</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Admin Access */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">{t('adminAccess')}</h2>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full flex items-center justify-center gap-2"
                      >
                        <Shield size={16} />
                        {t('adminLogin')}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>{t('adminAuthentication')}</DialogTitle>
                        <DialogDescription>
                          {t('adminAuthenticationDesc')}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Input
                            type="password"
                            placeholder={t('enterPassword')}
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            className={passwordError ? "border-red-500" : ""}
                          />
                          {passwordError && (
                            <p className="text-red-500 text-sm">{t('invalidPassword')}</p>
                          )}
                        </div>
                        <Button 
                          onClick={validateAdminPassword} 
                          className="w-full"
                        >
                          {t('login')}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default HelpSupport;
