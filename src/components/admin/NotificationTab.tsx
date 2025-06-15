
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useNotifications } from "@/contexts/NotificationContext";
import { useLanguageContext } from '@/contexts/LanguageContext';

const NotificationTab = () => {
  // Form state for creating new notifications
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'info' | 'delay' | 'alert'>('info');
  
  // Context hooks
  const { toast } = useToast();
  const { addNotification } = useNotifications();
  const { t } = useLanguageContext();

  // Notification submission handler
  const handleSendNotification = () => {
    // Form validation
    if (!notificationTitle || !notificationMessage || !notificationType) {
      toast({
        title: t('error'),
        description: t('fillAllFields'),
        variant: "destructive",
      });
      return;
    }

    // Create and add new notification
    addNotification({
      title: notificationTitle,
      message: notificationMessage,
      type: notificationType,
      date: new Date(),
    });

    toast({
      title: t('notificationAdded'),
      description: t('notificationAddedDesc'),
    });
    
    // Reset form after successful submission
    setNotificationTitle('');
    setNotificationMessage('');
    setNotificationType('info');
  };

  return (
    // Notification creation form card
    <Card>
      {/* Card header with title and description */}
      <CardHeader>
        <CardTitle>{t('sendNewNotifications')}</CardTitle>
        <CardDescription>
          Send notifications to all users of the transit system
        </CardDescription>
      </CardHeader>
      
      {/* Form content */}
      <CardContent className="space-y-4">
        {/* Notification title input */}
        <div className="space-y-2">
          <Label htmlFor="title">{t('notificationTitle')}</Label>
          <Input 
            id="title" 
            placeholder={t('notificationTitle')}
            value={notificationTitle}
            onChange={(e) => setNotificationTitle(e.target.value)}
          />
        </div>
        
        {/* Notification type selector */}
        <div className="space-y-2">
          <Label htmlFor="type">{t('type')}</Label>
          <Select 
            value={notificationType}
            onValueChange={(value: 'info' | 'delay' | 'alert') => setNotificationType(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('selectType')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="info">{t('information')}</SelectItem>
              <SelectItem value="delay">{t('delay')}</SelectItem>
              <SelectItem value="alert">{t('alert')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Notification message textarea */}
        <div className="space-y-2">
          <Label htmlFor="message">{t('notificationMessage')}</Label>
          <Textarea 
            id="message" 
            placeholder={t('notificationMessage')}
            value={notificationMessage}
            onChange={(e) => setNotificationMessage(e.target.value)}
            rows={4}
          />
        </div>
      </CardContent>
      
      {/* Submit button */}
      <CardFooter>
        <Button onClick={handleSendNotification}>{t('sendNotification')}</Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationTab;
