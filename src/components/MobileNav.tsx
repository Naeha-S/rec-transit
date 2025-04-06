
import React from 'react';
import { Home, Map, Bell, MessageSquare, Bus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'map', label: 'Map', icon: Map, path: '/' },
    { id: 'buses', label: 'Buses', icon: Bus, path: '/buses' },
    { id: 'notifications', label: 'Alerts', icon: Bell, path: '/' },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare, path: '/' }
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    setActiveTab(item.id);
    navigate(item.path);
  };

  if (!isMobile) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-40 lg:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map(item => (
          <Button
            key={item.id}
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center rounded-none h-full w-full py-1 px-0 ${
              activeTab === item.id
                ? 'text-college-blue'
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
