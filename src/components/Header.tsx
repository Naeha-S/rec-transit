
import React, { useState } from 'react';
import { Bell, Menu, Search, X, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  onToggleNav: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleNav }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const { language, changeLanguage, t } = useLanguageContext();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    
    switch(path) {
      case '/': return t('home');
      case '/buses': return t('allBuses');
      case '/schedules': return t('otherBuses');
      case '/exams': return t('examTimings');
      case '/admin': return t('adminDashboard');
      case '/help': return t('helpSupport');
      default: return t('home');
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToNotifications = () => {
    const notificationsSection = document.getElementById('notifications-section');
    if (notificationsSection) {
      notificationsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-college-blue text-white shadow-lg fixed top-0 left-0 right-0 z-[100]">
      <div className="container mx-auto px-3 py-2 sm:px-4 sm:py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden mr-1 sm:mr-2 text-white hover:bg-college-blue/80" 
            onClick={onToggleNav}
          >
            <Menu size={isMobile ? 20 : 24} />
          </Button>
          <div className="flex items-center">
            <span className="font-bold text-base sm:text-lg mr-1">REC</span>
            <span className="text-college-orange font-bold">Transit</span>
            <span className="ml-4 font-medium hidden md:inline">{getPageTitle()}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 sm:space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-college-blue/80">
                <Globe size={isMobile ? 18 : 20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => changeLanguage('en')}>
                English {language === 'en' && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage('ta')}>
                தமிழ் {language === 'ta' && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage('hi')}>
                हिंदी {language === 'hi' && '✓'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-college-blue/80 relative">
                <Bell size={isMobile ? 18 : 20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-college-orange rounded-full"></span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
              <div className="p-4 border-b">
                <h3 className="font-semibold">{t('recentNotifications')}</h3>
                <p className="text-xs text-muted-foreground mt-1">{t('unreadNotifications').replace('{count}', '3')}</p>
              </div>
              <div className="max-h-80 overflow-auto">
                <div className="p-3 border-b hover:bg-muted">
                  <div className="flex gap-2">
                    <span className="h-2 w-2 mt-1.5 bg-college-orange rounded-full flex-shrink-0"></span>
                    <div>
                      <p className="text-sm font-medium">Route Change for Bus 15A</p>
                      <p className="text-xs text-muted-foreground">Due to road construction, Bus 15A will take an alternate route</p>
                      <p className="text-xs text-muted-foreground mt-1">10 minutes ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-b hover:bg-muted">
                  <div className="flex gap-2">
                    <span className="h-2 w-2 mt-1.5 bg-college-orange rounded-full flex-shrink-0"></span>
                    <div>
                      <p className="text-sm font-medium">Bus 23B Delayed</p>
                      <p className="text-xs text-muted-foreground">Bus 23B is running 15 minutes late due to heavy traffic</p>
                      <p className="text-xs text-muted-foreground mt-1">25 minutes ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 hover:bg-muted">
                  <div className="flex gap-2">
                    <div>
                      <p className="text-sm font-medium">New Bus Added</p>
                      <p className="text-xs text-muted-foreground">A new bus (35C) has been added from Velachery to college</p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-2 border-t">
                <Button variant="ghost" size="sm" className="w-full justify-center text-xs" onClick={scrollToNotifications}>
                  {t('viewAllNotifications')}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-college-blue/80 lg:hidden" 
            onClick={toggleMenu}
          >
            {isOpen ? <X size={isMobile ? 18 : 20} /> : <Search size={isMobile ? 18 : 20} />}
          </Button>
        </div>
      </div>
      
      {isOpen && (
        <div className="bg-white p-3 shadow-md lg:hidden animate-slide-in">
          <div className="relative">
            <input 
              type="text" 
              placeholder={t('searchBoardingPoint')}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-college-blue text-sm"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={16} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
