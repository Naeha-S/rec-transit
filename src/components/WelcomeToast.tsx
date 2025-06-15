
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useTextSize } from "@/contexts/TextSizeContext";
import { getTextSizeClass } from "@/utils/textSizeUtils";

const WelcomeToast = () => {
  const { toast } = useToast();
  const { t } = useLanguageContext();
  const { textSize } = useTextSize();
  
  const textSizeClass = getTextSizeClass(textSize);
  
  useEffect(() => {
    // Display welcome toast when component mounts
    const timer = setTimeout(() => {
      toast({
        title: "Welcome to REC Transit System",
        description: (
          <div className={`${textSizeClass} text-center`}>
            <p>Find bus routes, schedules and real-time updates for REC campus transportation.</p>
            <p className="mt-1">Tap the menu to explore all features!</p>
          </div>
        ),
        duration: 5000,
      });
    }, 800);
    
    return () => clearTimeout(timer);
  }, [toast, t, textSizeClass]);

  return null;
};

export default WelcomeToast;
