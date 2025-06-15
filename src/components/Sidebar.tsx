
import React from 'react';
import { Home, Bus, Calendar, Clock, Settings, HelpCircle, Shield } from 'lucide-react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen }) => {
  const { isExamSeason } = useAdminAuth();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'buses', label: 'All Buses', icon: Bus, path: '/buses' },
    { id: 'schedules', label: 'Bus Schedules', icon: Calendar, path: '/schedules' },
    ...(isExamSeason ? [{ id: 'examTimings', label: 'Exam Timings', icon: Clock, path: '/exam-timings' }] : []),
    { id: 'help', label: 'Help & Support', icon: HelpCircle, path: '/help-support' },
    { id: 'admin', label: 'Admin', icon: Shield, path: '/admin/dashboard' },
  ];

  const handleNavigation = (item: any) => {
    setActiveTab(item.id);
    window.location.href = item.path;
  };

  return (
    <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Bus className="h-8 w-8 text-college-blue" />
            <span className="text-xl font-bold text-college-blue">REC Transport</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-college-blue text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
