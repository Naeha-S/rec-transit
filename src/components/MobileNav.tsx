
import React from 'react';
import { Home, Map, MessageSquare, Bus, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguageContext } from '@/contexts/LanguageContext';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { t } = useLanguageContext();
  
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'map', label: 'Live Map', icon: Map, path: '/' },
    { id: 'buses', label: 'My Buses', icon: Bus, path: '/buses' },
    { id: 'schedules', label: 'Schedules', icon: Clock, path: '/schedules' },
    { id: 'feedback', label: 'Help', icon: MessageSquare, path: '/' }
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    setActiveTab(item.id);
    navigate(item.path);
  };

  if (!isMobile) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-college-blue text-white border-t border-white/10 z-40 lg:hidden safe-padding">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map(item => (
          <Button
            key={item.id}
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center justify-center rounded-lg h-12 w-full max-w-[70px] py-1 px-1 transition-colors ${
              activeTab === item.id
                ? 'text-college-orange bg-white/10'
                : 'text-white hover:bg-white/10'
            }`}
            onClick={() => handleNavClick(item)}
          >
            <item.icon size={16} className="mb-0.5" />
            <span className="text-[9px] font-medium leading-none truncate max-w-full">{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;
