
import React, { useState } from 'react';
import { Bell, Menu, Search, X, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderProps {
  onToggleNav: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleNav }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('English');
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const switchLanguage = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <header className="bg-college-blue text-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-3 py-2 sm:px-4 sm:py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden mr-1 sm:mr-2 text-white hover:bg-college-blue/80" 
            onClick={onToggleNav}
          >
            <Menu size={isMobile ? 20 : 24} />
          </Button>
          <div className="flex items-center">
            <span className="font-bold text-base sm:text-lg mr-1">REC</span>
            <span className="text-college-orange font-bold">Transit</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 sm:space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-college-blue/80">
                <Globe size={isMobile ? 18 : 20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => switchLanguage('English')}>
                English {language === 'English' && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => switchLanguage('Tamil')}>
                தமிழ் {language === 'Tamil' && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => switchLanguage('Hindi')}>
                हिंदी {language === 'Hindi' && '✓'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" size="icon" className="text-white hover:bg-college-blue/80 relative">
            <Bell size={isMobile ? 18 : 20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-college-orange rounded-full"></span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-college-blue/80 lg:hidden" 
            onClick={toggleMenu}
          >
            {isOpen ? <X size={isMobile ? 18 : 20} /> : <Search size={isMobile ? 18 : 20} />}
          </Button>
        </div>
      </div>
      
      {isOpen && (
        <div className="bg-white p-3 shadow-md lg:hidden animate-slide-in">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search for boarding point..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-college-blue text-sm"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={16} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
