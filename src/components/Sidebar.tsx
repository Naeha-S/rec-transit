
import React, { useRef, useEffect } from 'react';
import { Home, Map, MessageSquare, Settings, Shield, Layout, Bus, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { useLanguageContext } from '@/contexts/LanguageContext';
import { announceToScreenReader, keyboardNavigation } from '@/utils/accessibilityUtils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguageContext();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = React.useState(-1);

  const sidebarItems = [
    { id: 'home', label: t('Home'), icon: Home, path: '/' },
    { id: 'map', label: t('Interactive Map'), icon: Map, path: '/' },
    { id: 'buses', label: t('All Buses'), icon: Bus, path: '/buses' },
    { id: 'schedules', label: t('Schedules'), icon: Clock, path: '/schedules' },
    { id: 'buslayout', label: t('Bus Layout'), icon: Layout, path: '/' },
    { id: 'feedback', label: t('Send Feedback'), icon: MessageSquare, path: '/' },
    { id: 'settings', label: t('Settings'), icon: Settings, path: '/' },
    { id: 'admin', label: t('Admin Panel'), icon: Shield, path: '/admin' }
  ];

  const handleNavClick = (item: typeof sidebarItems[0], index: number) => {
    console.log('Sidebar navigation clicked:', item.id, 'to path:', item.path);
    
    // Prevent navigation conflicts by ensuring we set the tab first
    setActiveTab(item.id);
    announceToScreenReader(`Navigated to ${item.label}`);
    setFocusedIndex(index);
    
    // Use a small delay to ensure state is updated before navigation
    setTimeout(() => {
      if (item.path !== '/') {
        navigate(item.path);
      }
    }, 10);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const buttons = sidebarRef.current?.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
    if (buttons) {
      keyboardNavigation.handleArrowKeys(
        e.nativeEvent,
        Array.from(buttons),
        index,
        setFocusedIndex
      );
    }
  };

  useEffect(() => {
    // Find active tab index for initial focus state
    const activeIndex = sidebarItems.findIndex(item => item.id === activeTab);
    if (activeIndex !== -1) {
      setFocusedIndex(activeIndex);
    }
  }, [activeTab]);

  return (
    <div
      ref={sidebarRef}
      className={cn(
        "fixed left-0 top-0 z-30 h-full w-64 bg-college-blue text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 border-b border-white/10">
          <span className="text-lg font-semibold">{t('REC Bus Tracker')}</span>
        </div>
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => (
              <li key={item.id}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start font-medium hover:bg-white/10",
                    activeTab === item.id ? "bg-white/10" : "transparent"
                  )}
                  onClick={() => handleNavClick(item, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  aria-label={`${item.label}${activeTab === item.id ? ', current page' : ''}`}
                  aria-current={activeTab === item.id ? 'page' : undefined}
                  tabIndex={focusedIndex === index ? 0 : -1}
                >
                  <item.icon className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>{item.label}</span>
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-white/10 p-3">
          <p className="text-xs text-white/60">
            {t('Version')} {import.meta.env.VITE_APP_VERSION || '1.0.0'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
