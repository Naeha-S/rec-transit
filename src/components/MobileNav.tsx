
import React from 'react';
import { Home, Map, Bell, MessageSquare, Settings, Bus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  
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

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-40">
      <div className="flex justify-around items-center h-16">
        {navItems.map(item => (
          <Button
            key={item.id}
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center rounded-none h-full w-full py-1 ${
              activeTab === item.id
                ? 'text-college-blue'
                : 'text-muted-foreground'
            }`}
            onClick={() => handleNavClick(item)}
          >
            <item.icon size={20} />
            <span className="text-xs mt-1">{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;
