
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguageContext } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useTextSize } from '@/contexts/TextSizeContext';
import { getTextSizeClass, getSubtextSizeClass } from '@/utils/textSizeUtils';
import { fetchBusData, type BusDetails } from '@/utils/busData';

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

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "Search for your bus or boarding point" }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [busData, setBusData] = useState<BusDetails[]>([]);
  const { t } = useLanguageContext();
  const navigate = useNavigate();
  const { textSize } = useTextSize();
  
  const textSizeClass = getTextSizeClass(textSize);
  const subtextClass = getSubtextSizeClass(textSize);

  // Load bus data on component mount
  useEffect(() => {
    const loadBusData = async () => {
      try {
        const data = await fetchBusData();
        setBusData(data);
      } catch (error) {
        console.error("Error loading bus data for search:", error);
      }
    };
    
    loadBusData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 0) {
      const searchLower = value.toLowerCase();
      
      // Create suggestions from bus data
      const busSuggestions: string[] = [];
      
      // Add bus numbers and route names
      busData.forEach(bus => {
        if (bus.busNumber.toLowerCase().includes(searchLower)) {
          busSuggestions.push(`Bus ${bus.busNumber}`);
        }
        
        const routeName = bus.routeName.replace(' to College', '');
        if (routeName.toLowerCase().includes(searchLower)) {
          busSuggestions.push(routeName);
        }
        
        // Add stop names
        bus.stops.forEach(stop => {
          if (stop.name.toLowerCase().includes(searchLower) && 
              !busSuggestions.includes(stop.name)) {
            busSuggestions.push(stop.name);
          }
        });
      });
      
      // Add boarding points
      const boardingPointSuggestions = boardingPoints.filter(point => 
        point.toLowerCase().includes(searchLower)
      );
      
      // Combine all suggestions and remove duplicates
      const allSuggestions = [...new Set([...busSuggestions, ...boardingPointSuggestions])];
      
      // Limit to 8 suggestions for better UX
      setSuggestions(allSuggestions.slice(0, 8));
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
