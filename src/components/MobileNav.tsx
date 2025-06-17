
import React, { useRef, useEffect } from 'react';
import { Home, Map, MessageSquare, Bus, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { announceToScreenReader, keyboardNavigation } from '@/utils/accessibilityUtils';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { t } = useLanguageContext();
  const navRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = React.useState(-1);
  
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'map', label: 'Live Map', icon: Map, path: '/' },
    { id: 'buses', label: 'My Buses', icon: Bus, path: '/buses' },
    { id: 'schedules', label: 'Schedules', icon: Clock, path: '/schedules' },
    { id: 'feedback', label: 'Help', icon: MessageSquare, path: '/' }
  ];

  const handleNavClick = (item: typeof navItems[0], index: number) => {
    setActiveTab(item.id);
    navigate(item.path);
    announceToScreenReader(`Navigated to ${item.label}`);
    setFocusedIndex(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const buttons = navRef.current?.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
    if (buttons) {
      keyboardNavigation.handleArrowKeys(
        e.nativeEvent,
        Array.from(buttons),
        index,
        setFocusedIndex
      );
    }
  };

  // Enhanced touch handling
  const handleTouchStart = (e: React.TouchEvent) => {
    // Prevent bounce scrolling on iOS
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    // Find active tab index for initial focus state
    const activeIndex = navItems.findIndex(item => item.id === activeTab);
    if (activeIndex !== -1) {
      setFocusedIndex(activeIndex);
    }
  }, [activeTab]);

  // Enhanced viewport height handling for mobile
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  if (!isMobile) return null;

  return (
    <nav 
      ref={navRef}
      className="fixed bottom-0 left-0 right-0 bg-college-blue text-white border-t border-white/10 z-40 lg:hidden safe-padding"
      role="navigation"
      aria-label="Mobile navigation"
      onTouchStart={handleTouchStart}
      style={{ 
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        minHeight: '64px'
      }}
    >
      <div className="flex justify-around items-center h-16 px-1 sm:px-2">
        {navItems.map((item, index) => (
          <Button
            key={item.id}
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center justify-center rounded-lg h-12 w-full max-w-[70px] py-1 px-1 transition-all duration-200 touch-manipulation ${
              activeTab === item.id
                ? 'text-college-orange bg-white/10 scale-105'
                : 'text-white hover:bg-white/10 active:bg-white/20 active:scale-95'
            }`}
            onClick={() => handleNavClick(item, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            aria-label={`${item.label}${activeTab === item.id ? ', current page' : ''}`}
            aria-current={activeTab === item.id ? 'page' : undefined}
            tabIndex={focusedIndex === index ? 0 : -1}
            style={{
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation'
            }}
          >
            <item.icon 
              size={18} 
              className={`mb-0.5 transition-transform duration-200 ${
                activeTab === item.id ? 'scale-110' : ''
              }`} 
              aria-hidden="true" 
            />
            <span className={`text-[9px] sm:text-[10px] font-medium leading-none truncate max-w-full transition-all duration-200 ${
              activeTab === item.id ? 'font-semibold' : ''
            }`}>
              {item.label}
            </span>
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
