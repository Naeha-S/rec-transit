
import React from 'react';
import { Home, Map, Bell, MessageSquare, Settings, HelpCircle, LogOut, Bus, LayoutDashboard } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen }) => {
  const navigate = useNavigate();
  
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'map', label: 'Route Map', icon: Map, path: '/' },
    { id: 'buses', label: 'All Buses', icon: Bus, path: '/buses' },
    { id: 'buslayout', label: 'Bus Layout', icon: LayoutDashboard, path: '/' },
    { id: 'notifications', label: 'Notifications', icon: Bell, path: '/' },
    { id: 'feedback', label: 'Send Feedback', icon: MessageSquare, path: '/' }
  ];

  const bottomNavItems = [
    { id: 'settings', label: 'Settings', icon: Settings, path: '/' },
    { id: 'help', label: 'Help & Support', icon: HelpCircle, path: '/' }
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
            
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
            >
              <LogOut className="mr-2" size={18} />
              Logout
            </Button>
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
