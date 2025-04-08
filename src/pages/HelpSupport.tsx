
import React from 'react';
import { Button } from '@/components/ui/button';
import { Linkedin } from 'lucide-react';
import { useLanguageContext } from '@/contexts/LanguageContext';

const HelpSupport = () => {
  const { t } = useLanguageContext();

  const openLinkedIn = () => {
    window.open('https://www.linkedin.com/in/naeha-s/', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{t('helpSupport')}</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-4">{t('about')}</h2>
        
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            {t('aboutProjectDescription')}
          </p>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={openLinkedIn} 
            className="flex items-center gap-2"
          >
            <Linkedin size={16} />
            Author
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
