
import React from 'react';
import { Home, Map, Bell, MessageSquare, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'map', label: 'Map', icon: Map },
    { id: 'notifications', label: 'Alerts', icon: Bell },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

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
            onClick={() => setActiveTab(item.id)}
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
