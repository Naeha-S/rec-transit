
import React from 'react';
import { Bell, Menu, Home, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useNotifications } from '@/contexts/NotificationContext'; 
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguageContext } from '@/contexts/LanguageContext';

interface HeaderProps {
  onToggleNav: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleNav }) => {
  // Context hooks for language, notifications, theme, and navigation
  const { t } = useLanguageContext();
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  // Navigation handler - always goes to home page
  const handleHomeClick = () => {
    navigate('/');
  };

  // Theme toggle handler - switches between light and dark mode
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    // Fixed header with college blue background
    <header className="fixed w-full bg-college-blue text-white z-50 border-b border-white/10 visible opacity-100 shadow-md">
      <div className="flex h-16 items-center px-3 sm:px-4">
        {/* Mobile menu toggle button - only visible on mobile */}
        <Button variant="ghost" size="icon" className="mr-2 lg:hidden text-white hover:bg-white/10 p-2" onClick={onToggleNav}>
          <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
        
        {/* App logo/title section */}
        <div className="flex items-center gap-1.5">
          <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold truncate">REC Transit</h1>
        </div>
        
        {/* Spacer to push items to the right */}
        <div className="flex-1"></div>
        
        {/* Right side navigation controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Language switcher component */}
          <div className="flex items-center">
            <LanguageSwitcher />
          </div>
          
          {/* Theme toggle button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="text-white hover:bg-white/10 p-2 flex items-center justify-center"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </Button>
          
          {/* Notifications dropdown menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10 p-2">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                {/* Unread notification badge */}
                {unreadCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center p-0 text-[10px] sm:text-xs"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            
            {/* Notifications dropdown content */}
            <DropdownMenuContent align="end" className="w-72 sm:w-80">
              {/* Dropdown header with mark all as read option */}
              <div className="px-3 sm:px-4 py-2 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium">{t('notifications')}</h2>
                  {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs px-2 py-1">
                      {t('markAllAsRead')}
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Notifications list */}
              <div className="max-h-80 overflow-auto">
                {notifications.length > 0 ? (
                  notifications.slice(0, 5).map(notification => (
                    <DropdownMenuItem key={notification.id} className="p-0 focus:bg-transparent">
                      <a 
                        href="/#notifications-section" 
                        className={`flex gap-3 p-3 w-full text-sm ${!notification.read ? 'bg-accent/20' : ''}`}
                      >
                        <span className="line-clamp-2">{notification.title}</span>
                      </a>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <div className="px-3 sm:px-4 py-3 text-sm text-muted-foreground text-center">
                    {t('noNewNotifications')}
                  </div>
                )}
              </div>
              
              {/* View all notifications button */}
              <div className="p-2 border-t">
                <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm" asChild>
                  <a href="/#notifications-section">{t('viewAllNotifications')}</a>
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Home button - navigates to main page */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleHomeClick} 
            className="text-white hover:bg-white/10 p-2 flex items-center justify-center"
            aria-label="Go to home"
          >
            <Home className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
