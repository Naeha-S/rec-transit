
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguageContext } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useTextSize } from '@/contexts/TextSizeContext';
import { getTextSizeClass, getSubtextSizeClass } from '@/utils/textSizeUtils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const boardingPoints = [
  "Poonamallee", "Porur", "Valasaravakkam", "Vadapalani", 
  "Koyambedu", "Anna Nagar", "Ambattur", "Avadi", 
  "Tambaram", "Chromepet", "Pallavaram", "Guindy",
  "T. Nagar", "Nungambakkam", "Adyar", "Velachery"
];

// Add more specific bus routes from the Excel file
const busRoutes = [
  "Ennore", "Tondiarpet", "T.Nagar", "Tambaram",
  "Periyamedu", "Tollgate", "Ajax-Thiruvottiyur", "Avadi",
  "Poonamallee", "Sholinganallur", "Velachery", "Koyambedu",
  "Ambattur", "Chromepet"
];

// Add bus numbers to suggestions
const busNumbers = ["1", "1A", "1B", "2", "2A", "2B", "3", "3A", "3B", "4", "4A", "4B", "5A", "7", "8", "10B", "11", "12", "15"];
const allSuggestions = [...boardingPoints, ...busNumbers, ...busRoutes];

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "Search for your bus or boarding point" }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { t } = useLanguageContext();
  const navigate = useNavigate();
  const { textSize } = useTextSize();
  
  const textSizeClass = getTextSizeClass(textSize);
  const subtextClass = getSubtextSizeClass(textSize);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 0) {
      const filtered = allSuggestions.filter(point => 
        point.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch(suggestion);
    
    // Navigate to the buses page with the suggestion as a search parameter
    navigate(`/buses?search=${encodeURIComponent(suggestion)}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
      
      // Add navigation to buses page with search parameter
      navigate(`/buses?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto text-center">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={t(placeholder)}
          className={`w-full px-4 py-3 pr-12 border-2 border-college-blue rounded-lg focus:outline-none focus:ring-2 focus:ring-college-blue text-center ${textSizeClass}`}
          onFocus={() => query.length > 0 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        <Button 
          type="submit" 
          className="absolute right-1 top-1 bg-college-blue hover:bg-college-blue/90"
          size="icon"
        >
          <Search size={20} />
        </Button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className={`absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto ${textSizeClass}`}>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-center"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
