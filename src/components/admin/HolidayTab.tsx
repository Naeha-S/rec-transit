
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNotifications } from "@/contexts/NotificationContext";
import { useHolidayContext } from "@/contexts/HolidayContext";
import { useLanguageContext } from '@/contexts/LanguageContext';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

const HolidayTab = () => {
  // State for holiday management
  const [holidayDate, setHolidayDate] = useState<Date | undefined>(undefined);
  const [holidayReason, setHolidayReason] = useState('');
  
  // Hooks
  const { toast } = useToast();
  const { addNotification } = useNotifications();
  const { isHolidayActive, holidayData, declareHoliday, cancelHoliday } = useHolidayContext();
  const { t } = useLanguageContext();

  const handleDeclareHoliday = () => {
    if (!holidayDate || !holidayReason) {
      toast({
        title: t('error'),
        description: t('fillAllFields'),
        variant: "destructive",
      });
      return;
    }
    
    // Declare holiday
    declareHoliday(holidayDate, holidayReason);
    
    // Add a notification about the holiday
    addNotification({
      title: t('holidayAnnouncement'),
      message: `${t('noServiceOn')} ${format(holidayDate, 'PP')}. ${t('reason')}: ${holidayReason}`,
      type: 'alert',
      date: new Date(),
    });
    
    toast({
      title: t('holidayDeclared'),
      description: t('holidayAnnouncedToUsers'),
    });
    
    // Reset form
    setHolidayReason('');
  };
  
  const handleCancelHoliday = () => {
    cancelHoliday();
    
    // Add a notification about the cancellation
    addNotification({
      title: t('holidayCancelled'),
      message: t('normalServiceResumed'),
      type: 'info',
      date: new Date(),
    });
  };

  return (
    <div className="space-y-4">
      {isHolidayActive ? (
        <Card className="border-amber-500 dark:border-amber-400">
          <CardHeader className="bg-amber-50 dark:bg-amber-900/20">
            <CardTitle className="text-amber-600 dark:text-amber-400">{t('holidayActive')}</CardTitle>
            <CardDescription className="text-amber-700 dark:text-amber-300">
              {t('busesDisabledDueToHoliday')}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">{t('holidayInformation')}</h3>
                <div className="grid grid-cols-2 gap-y-2">
                  <div className="text-sm font-medium">{t('date')}:</div>
                  <div className="text-sm">{holidayData?.date.toDateString()}</div>
                  
                  <div className="text-sm font-medium">{t('reason')}:</div>
                  <div className="text-sm">{holidayData?.reason}</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleCancelHoliday}
            >
              {t('cancelHoliday')}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{t('declareHoliday')}</CardTitle>
            <CardDescription>
              Declare holidays when bus services will not be available
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="holiday-date">{t('holidayDate')}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="holiday-date"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !holidayDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {holidayDate ? format(holidayDate, "PP") : <span>{t('pickDate')}</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={holidayDate}
                    onSelect={setHolidayDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="holiday-reason">{t('holidayReason')}</Label>
              <Textarea 
                id="holiday-reason" 
                placeholder={t('enterReasonForHoliday')}
                value={holidayReason}
                onChange={(e) => setHolidayReason(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleDeclareHoliday}>{t('declareHoliday')}</Button>
          </CardFooter>
        </Card>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>{t('holidayEffects')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>All bus routes will be disabled on the holiday date</li>
            <li>A system-wide notification will be sent to all users</li>
            <li>Exam bus schedules will also be disabled during holidays</li>
            <li>The holiday can be cancelled at any time to resume normal service</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default HolidayTab;
