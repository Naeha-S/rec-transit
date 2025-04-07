
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
    { id: 'home', label: t('home'), icon: Home, path: '/' },
    { id: 'map', label: t('map'), icon: Map, path: '/' },
    { id: 'buses', label: t('buses'), icon: Bus, path: '/buses' },
    { id: 'schedules', label: t('schedule'), icon: Clock, path: '/schedules' },
    { id: 'feedback', label: t('feedback'), icon: MessageSquare, path: '/' }
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    setActiveTab(item.id);
    navigate(item.path);
  };

  if (!isMobile) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-border z-40 lg:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map(item => (
          <Button
            key={item.id}
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center justify-center rounded-none h-full w-full py-1 px-0 ${
              activeTab === item.id
                ? 'text-college-blue dark:text-college-orange'
                : 'text-muted-foreground'
            }`}
            onClick={() => handleNavClick(item)}
          >
            <item.icon size={18} />
            <span className="text-[10px] mt-1">{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;
