
import React from 'react';
import { Bell, Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useNotifications } from '@/contexts/NotificationContext'; 
import { Badge } from "@/components/ui/badge";
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
  const { theme, setTheme } = useTheme();
  const { t } = useLanguageContext();
  const { notifications, unreadCount, markAllAsRead } = useNotifications();

  return (
    <header className="fixed w-full bg-college-blue text-white z-50 border-b border-white/10 visible opacity-100 shadow-md">
      <div className="flex h-16 items-center px-4">
        <Button variant="ghost" size="icon" className="mr-2 lg:hidden text-white hover:bg-white/10" onClick={onToggleNav}>
          <Menu className="h-6 w-6" />
        </Button>
        <div className="flex items-center gap-1.5">
          <h1 className="text-xl font-bold">{t('recTransitSystem')}</h1>
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="px-4 py-2 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium">{t('notifications')}</h2>
                  {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                      {t('markAllAsRead')}
                    </Button>
                  )}
                </div>
              </div>
              <div className="max-h-80 overflow-auto">
                {notifications.length > 0 ? (
                  notifications.slice(0, 5).map(notification => (
                    <DropdownMenuItem key={notification.id} className="p-0 focus:bg-transparent">
                      <a 
                        href="/#notifications-section" 
                        className={`flex gap-3 p-3 w-full ${!notification.read ? 'bg-accent/20' : ''}`}
                      >
                        <span className="text-sm">{notification.title}</span>
                      </a>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-muted-foreground text-center">
                    {t('noNewNotifications')}
                  </div>
                )}
              </div>
              <div className="p-2 border-t">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="/#notifications-section">{t('viewAllNotifications')}</a>
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="text-white hover:bg-white/10">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Button variant="ghost" size="icon" asChild className="text-white hover:bg-white/10">
            <a href="/admin">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
