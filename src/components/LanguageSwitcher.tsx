
import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguageContext } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const LanguageSwitcher: React.FC = () => {
  const { language, changeLanguage } = useLanguageContext();
  
  const languages = {
    en: "English",
    ta: "தமிழ்",
    hi: "हिंदी"
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {languages[language]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage('en')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('ta')}>
          தமிழ் (Tamil)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('hi')}>
          हिंदी (Hindi)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
