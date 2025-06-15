
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useLanguageContext } from '@/contexts/LanguageContext';
import Notifications from '@/components/Notifications';

const NotificationsSection: React.FC = () => {
  const { t } = useLanguageContext();

  return (
    <div id="notifications-section" className="w-full">
      <Card className="shadow-md">
        <CardContent className="text-center pt-6">
          <Notifications showViewAll={false} />
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsSection;
