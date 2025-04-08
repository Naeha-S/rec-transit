import React from 'react';
import { Home, Map, Bell, MessageSquare, Settings, HelpCircle, Bus, LayoutDashboard, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from 'react-router-dom';
import { useLanguageContext } from '@/contexts/LanguageContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen }) => {
  const navigate = useNavigate();
  const { t } = useLanguageContext();
  
  const navItems = [
    { id: 'home', label: t('home'), icon: Home, path: '/' },
    { id: 'map', label: t('routeMap'), icon: Map, path: '/' },
    { id: 'buses', label: t('allBuses'), icon: Bus, path: '/buses' },
    { id: 'schedules', label: 'Other Buses', icon: Clock, path: '/schedules' },
    { id: 'buslayout', label: t('busLayout'), icon: LayoutDashboard, path: '/' },
    { id: 'feedback', label: t('sendFeedback'), icon: MessageSquare, path: '/' }
  ];

  const bottomNavItems = [
    { id: 'settings', label: t('settings'), icon: Settings, path: '/' },
    { id: 'help', label: t('helpSupport'), icon: HelpCircle, path: '/help' }
  ];

  const handleNavClick = (item: { id: string; path: string }) => {
    setActiveTab(item.id);
    navigate(item.path);
  };

  return (
    <aside className={`fixed top-0 bottom-0 left-0 w-64 bg-sidebar transition-transform transform z-30 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } lg:translate-x-0 pt-16`}>
      <div className="flex flex-col h-full">
        <div className="p-4">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/lovable-uploads/7b7ff6d9-374d-4250-b14e-19f4dc1efcca.png" 
              alt="REC Logo" 
              className="h-12 w-auto"
            />
          </div>
          
          <nav className="space-y-1">
            {navItems.map(item => (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                className={`w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground ${
                  activeTab === item.id
                    ? 'bg-sidebar-accent text-sidebar-foreground'
                    : ''
                }`}
                onClick={() => handleNavClick(item)}
              >
                <item.icon className="mr-2" size={18} />
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-4">
          <Separator className="bg-sidebar-border mb-4" />
          <nav className="space-y-1">
            {bottomNavItems.map(item => (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                className={`w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground ${
                  activeTab === item.id
                    ? 'bg-sidebar-accent text-sidebar-foreground'
                    : ''
                }`}
                onClick={() => handleNavClick(item)}
              >
                <item.icon className="mr-2" size={18} />
                {item.label}
              </Button>
            ))}
          </nav>
          
          <div className="mt-4 text-xs text-sidebar-accent-foreground text-center">
            <p>
              <a href="https://www.rectransport.com/" className="underline hover:text-sidebar-foreground" target="_blank" rel="noopener noreferrer">
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
