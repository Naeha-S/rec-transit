
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useTextSize } from "@/contexts/TextSizeContext";
import { getTextSizeClass } from "@/utils/textSizeUtils";
import { useLocation } from "react-router-dom";

const WelcomeToast = () => {
  const { toast } = useToast();
  const { t } = useLanguageContext();
  const { textSize } = useTextSize();
  const location = useLocation();
  
  const textSizeClass = getTextSizeClass(textSize);
  
  useEffect(() => {
    // Only show welcome toast on home page and admin dashboard
    const shouldShowToast = location.pathname === '/' || location.pathname === '/admin/dashboard' || location.pathname === '/admin';
    
    if (shouldShowToast) {
      // Display welcome toast when component mounts
      const timer = setTimeout(() => {
        const isAdminPage = location.pathname.includes('/admin');
        
        toast({
          title: isAdminPage ? "Welcome to Admin Panel" : "Welcome to REC Transit System",
          description: (
            <div className={`${textSizeClass} text-center`}>
              {isAdminPage ? (
                <>
                  <p>Manage bus routes, schedules and system notifications.</p>
                  <p className="mt-1">Access all administrative features from the dashboard!</p>
                </>
              ) : (
                <>
                  <p>Find bus routes, schedules and real-time updates for REC campus transportation.</p>
                  <p className="mt-1">Tap the menu to explore all features!</p>
                </>
              )}
            </div>
          ),
          duration: 5000,
        });
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [toast, t, textSizeClass, location.pathname]);

  return null;
};

export default WelcomeToast;
