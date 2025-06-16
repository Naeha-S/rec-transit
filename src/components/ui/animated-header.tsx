
import React from 'react';
import { Menu, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedButton } from './animated-button';
import { cn } from '@/lib/utils';

interface AnimatedHeaderProps {
  onToggleNav: () => void;
  title?: string;
  showNotifications?: boolean;
  notificationCount?: number;
  className?: string;
}

export const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  onToggleNav,
  title = "REC Transit",
  showNotifications = true,
  notificationCount = 0,
  className
}) => {
  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b',
      'transition-all duration-300 hover:bg-white/100 hover:shadow-md',
      className
    )}>
      <div className="flex items-center justify-between p-3 sm:p-4">
        {/* Left section with menu and title */}
        <div className="flex items-center space-x-3">
          <AnimatedButton
            variant="ghost"
            size="icon"
            onClick={onToggleNav}
            className="lg:hidden hover:bg-gray-100 transition-colors duration-200"
            animation="scale"
          >
            <Menu size={20} />
          </AnimatedButton>
          
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 animate-fade-in">
            {title}
          </h1>
        </div>

        {/* Right section with notifications and settings */}
        <div className="flex items-center space-x-2">
          {showNotifications && (
            <div className="relative">
              <AnimatedButton
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100 transition-colors duration-200"
                animation="pulse"
              >
                <Bell size={18} />
              </AnimatedButton>
              
              {notificationCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </div>
              )}
            </div>
          )}
          
          <AnimatedButton
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 transition-colors duration-200"
            animation="scale"
          >
            <Settings size={18} />
          </AnimatedButton>
        </div>
      </div>
    </header>
  );
};
