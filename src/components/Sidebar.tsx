
import React, { useRef, useEffect } from 'react';
import { Home, Map, Bell, MessageSquare, Settings, HelpCircle, Bus, LayoutDashboard, Clock, CalendarDays } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from 'react-router-dom';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { announceToScreenReader } from '@/utils/accessibilityUtils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen }) => {
  const navigate = useNavigate();
  const { t } = useLanguageContext();
  const sidebarRef = useRef<HTMLElement>(null);
  
  const navItems = [
    { id: 'home', label: t('home'), icon: Home, path: '/' },
    { id: 'map', label: t('routeMap'), icon: Map, path: '/' },
    { id: 'buses', label: t('allBuses'), icon: Bus, path: '/buses' },
    { id: 'schedules', label: t('otherBuses'), icon: Clock, path: '/schedules' },
    { id: 'examTimings', label: t('examTimings'), icon: CalendarDays, path: '/exams' },
    { id: 'buslayout', label: t('busLayout'), icon: LayoutDashboard, path: '/' }
  ];

  const bottomNavItems = [
    { id: 'settings', label: t('settings'), icon: Settings, path: '/' },
    { id: 'help', label: t('helpSupport'), icon: HelpCircle, path: '/help' }
  ];

  const handleNavClick = (item: { id: string; label: string; path: string }) => {
    setActiveTab(item.id);
    navigate(item.path);
    announceToScreenReader(`Navigated to ${item.label}`);
  };

  // Enhanced keyboard navigation for sidebar
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      // Close sidebar on escape key
      const toggleButton = document.querySelector('[aria-label*="menu"]') as HTMLButtonElement;
      toggleButton?.click();
      toggleButton?.focus();
    }
  };

  useEffect(() => {
    if (isOpen && sidebarRef.current) {
      // Focus first navigation item when sidebar opens
      const firstNavButton = sidebarRef.current.querySelector('button[role="menuitem"]') as HTMLButtonElement;
      firstNavButton?.focus();
    }
  }, [isOpen]);

  return (
    <aside 
      ref={sidebarRef}
      className={`fixed top-0 bottom-0 left-0 w-64 bg-college-blue transition-transform transform z-30 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 pt-16`}
      role="navigation"
      aria-label="Main navigation"
      aria-hidden={!isOpen}
      onKeyDown={handleKeyDown}
    >
      <div className="flex flex-col h-full">
        <div className="p-4">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/lovable-uploads/0651b4e9-a2c3-41b8-8f48-f7aa31880871.png" 
              alt="Rajalakshmi Engineering College Logo" 
              className="h-16 w-auto"
            />
          </div>
          
          <nav className="space-y-1" role="menu">
            {navItems.map(item => (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                role="menuitem"
                className={`w-full justify-start text-white hover:bg-white/10 hover:text-white ${
                  activeTab === item.id
                    ? 'bg-white/20 text-white'
                    : ''
                }`}
                onClick={() => handleNavClick(item)}
                aria-current={activeTab === item.id ? 'page' : undefined}
              >
                <item.icon className="mr-2" size={18} aria-hidden="true" />
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-4">
          <Separator className="bg-white/20 mb-4" />
          <nav className="space-y-1" role="menu">
            {bottomNavItems.map(item => (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                role="menuitem"
                className={`w-full justify-start text-white hover:bg-white/10 hover:text-white ${
                  activeTab === item.id
                    ? 'bg-white/20 text-white'
                    : ''
                }`}
                onClick={() => handleNavClick(item)}
                aria-current={activeTab === item.id ? 'page' : undefined}
              >
                <item.icon className="mr-2" size={18} aria-hidden="true" />
                {item.label}
              </Button>
            ))}
          </nav>
          
          <div className="mt-4 text-xs text-white/80 text-center">
            <p>
              <a href="https://www.rectransport.com/" className="underline hover:text-white focus:text-white focus:outline-2 focus:outline-white" target="_blank" rel="noopener noreferrer">
                rectransport.com
              </a>
            </p>
            <p className="mt-1">© 2025 REC Transport</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
