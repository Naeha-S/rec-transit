
import React, { useState } from 'react';
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

const HelpSupport = () => {
  const { t } = useLanguageContext();
  const [adminPassword, setAdminPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const openLinkedIn = () => {
    window.open('https://www.linkedin.com/in/naeha-s/', '_blank', 'noopener,noreferrer');
  };
  
  const validateAdminPassword = () => {
    if (adminPassword === 'REC_admin#1234') {
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{t('helpSupport')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* About Section */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">{t('about')}</h2>
            
            <div className="space-y-4">
              <p className="text-muted-foreground">
                {t('aboutProjectDescription')}
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
                <AccordionTrigger>{t('faq1')}</AccordionTrigger>
                <AccordionContent>
                  {t('faq1Answer')}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>{t('faq2')}</AccordionTrigger>
                <AccordionContent>
                  {t('faq2Answer')}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>{t('faq3')}</AccordionTrigger>
                <AccordionContent>
                  {t('faq3Answer')}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>{t('faq4')}</AccordionTrigger>
                <AccordionContent>
                  {t('faq4Answer')}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>{t('faq5')}</AccordionTrigger>
                <AccordionContent>
                  {t('faq5Answer')}
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
                  <p className="text-sm text-muted-foreground">support@rectransport.com</p>
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
                  <p className="text-sm text-muted-foreground">{t('helpdeskTiming')}</p>
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
  );
};

export default HelpSupport;
