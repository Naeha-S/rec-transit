
import React from 'react';
import { Home, Map, Bell, MessageSquare, Settings, HelpCircle, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'map', label: 'Route Map', icon: Map },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'feedback', label: 'Send Feedback', icon: MessageSquare }
  ];

  const bottomNavItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help & Support', icon: HelpCircle }
  ];

  return (
    <aside className={`fixed top-0 bottom-0 left-0 w-64 bg-sidebar transition-transform transform z-30 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } lg:translate-x-0 pt-16`}>
      <div className="flex flex-col h-full">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-6">
            <div className="h-8 w-8 rounded-full bg-college-orange flex items-center justify-center text-white font-bold">
              R
            </div>
            <div className="text-white">
              <p className="font-semibold">Rajalakshmi</p>
              <p className="text-xs text-sidebar-accent-foreground">Transport System</p>
            </div>
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
                onClick={() => setActiveTab(item.id)}
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
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="mr-2" size={18} />
                {item.label}
              </Button>
            ))}
            
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
            >
              <LogOut className="mr-2" size={18} />
              Logout
            </Button>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
