
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { useNotifications } from '@/contexts/NotificationContext';
import Notifications from '@/components/Notifications';

const NotificationsSection: React.FC = () => {
  const isMobile = useIsMobile();
  const { t } = useLanguageContext();
  const { announcements } = useNotifications();

  return (
    <div id="notifications-section" className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      <Card className="shadow-md">
        <CardHeader className="pb-2 text-center">
          <CardTitle className="text-base sm:text-lg">{t('notifications')}</CardTitle>
          <CardDescription>{t('latestNotifications')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Notifications showViewAll={false} />
        </CardContent>
      </Card>
      
      <Card className="shadow-md">
        <CardHeader className="pb-2 text-center">
          <CardTitle className="text-base sm:text-lg">{t('announcements')}</CardTitle>
          <CardDescription>{t('recentUpdates')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcements.map(announcement => (
              <div key={announcement.id} className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md">
                <AlertTriangle className="text-amber-500 mt-0.5 flex-shrink-0" size={isMobile ? 16 : 18} />
                <div className="text-center w-full">
                  <h4 className="font-medium text-sm">{announcement.title}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">{announcement.message}</p>
                </div>
              </div>
            ))}
            {announcements.length === 0 && (
              <p className="text-center text-muted-foreground">{t('noAnnouncements')}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsSection;
