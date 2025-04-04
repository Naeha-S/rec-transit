
import React from 'react';
import { Bell, AlertCircle, Clock, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: number;
  type: 'alert' | 'delay' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: 1,
    type: 'alert',
    title: 'Route Change for Bus 15A',
    message: 'Due to road construction, Bus 15A will take an alternate route via Mount-Poonamalle Road.',
    time: '10 min ago',
    read: false
  },
  {
    id: 2,
    type: 'delay',
    title: 'Bus 23B Delayed',
    message: 'Bus 23B from Tambaram is running 15 minutes late due to heavy traffic.',
    time: '25 min ago',
    read: false
  },
  {
    id: 3,
    type: 'info',
    title: 'New Bus Added',
    message: 'A new bus (35C) has been added from Velachery to college starting next week.',
    time: '2 hours ago',
    read: true
  }
];

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

const Notifications: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Notifications</CardTitle>
          <Badge variant="outline" className="font-normal">
            {notifications.filter(n => !n.read).length} new
          </Badge>
        </div>
        <CardDescription>
          Recent updates and alerts for your bus routes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`flex gap-3 p-3 rounded-lg ${notification.read ? 'bg-muted/50' : 'bg-accent/20'}`}
            >
              <div className="mt-0.5">
                <NotificationIcon type={notification.type} />
              </div>
              <div>
                <h4 className="font-medium text-sm">{notification.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                  {!notification.read && (
                    <Badge variant="secondary" className="text-xs px-2 py-0">New</Badge>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No notifications at this time</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Notifications;
