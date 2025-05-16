
import React from 'react';
import { Bell, AlertCircle, Clock, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNotifications, Notification } from '@/contexts/NotificationContext';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { useTextSize } from '@/contexts/TextSizeContext';
import { getTextSizeClass, getHeadingTextSizeClass, getSubtextSizeClass } from '@/utils/textSizeUtils';

interface NotificationsProps {
  limit?: number;
  showViewAll?: boolean;
}

const NotificationIcon: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'alert':
      return <AlertCircle className="text-destructive" size={18} />;
    case 'delay':
      return <Clock className="text-yellow-500" size={18} />;
    case 'info':
      return <Info className="text-blue-500" size={18} />;
    default:
      return <Bell size={18} />;
  }
};

const Notifications: React.FC<NotificationsProps> = ({ limit, showViewAll = false }) => {
  const { notifications, markAsRead } = useNotifications();
  const { t } = useLanguageContext();
  const { textSize } = useTextSize();
  
  const textSizeClass = getTextSizeClass(textSize);
  const headingClass = getHeadingTextSizeClass(textSize);
  const subtextClass = getSubtextSizeClass(textSize);
  
  const displayNotifications = limit ? notifications.slice(0, limit) : notifications;
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className={headingClass}>{t('notifications')}</CardTitle>
          {unreadCount > 0 && (
            <Badge variant="outline" className={`font-normal ${subtextClass}`}>
              {unreadCount} {t('new')}
            </Badge>
          )}
        </div>
        <CardDescription className={subtextClass}>
          {t('recentUpdatesAndAlerts')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {displayNotifications.length > 0 ? (
          <>
            {displayNotifications.map(notification => (
              <div 
                key={notification.id} 
                className={`flex gap-3 p-3 rounded-lg ${notification.read ? 'bg-muted/50' : 'bg-accent/20'}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="mt-0.5">
                  <NotificationIcon type={notification.type} />
                </div>
                <div>
                  <h4 className={`font-medium ${textSizeClass}`}>{notification.title}</h4>
                  <p className={`${textSizeClass} text-muted-foreground mt-1`}>{notification.message}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className={`${subtextClass} text-muted-foreground`}>{notification.time}</span>
                    {!notification.read && (
                      <Badge variant="secondary" className={`${subtextClass} px-2 py-0`}>{t('new')}</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {showViewAll && notifications.length > limit! && (
              <div className="flex justify-center mt-2">
                <Button variant="outline" size="sm" asChild className={textSizeClass}>
                  <a href="/#notifications-section">{t('viewAllNotifications')}</a>
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-6">
            <p className={`text-muted-foreground ${textSizeClass}`}>{t('noNotifications')}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Notifications;
