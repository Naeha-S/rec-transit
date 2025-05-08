
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguageContext } from '@/contexts/LanguageContext';

const FeedbackForm: React.FC = () => {
  const { toast } = useToast();
  const { t } = useLanguageContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    busNumber: '',
    feedbackType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, feedbackType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create the email content
      const emailContent = `
        Name: ${formData.name}
        Email: ${formData.email}
        Bus Number: ${formData.busNumber}
        Feedback Type: ${formData.feedbackType}
        Message: ${formData.message}
      `;
      
      // Send to your email (in a real app, this would be a server API call)
      // For demo purposes, we'll simulate a successful email send
      console.log("Email content that would be sent:", emailContent);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: t('feedbackSubmitted'),
        description: t('thanksForFeedback'),
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        busNumber: '',
        feedbackType: '',
        message: ''
      });
    } catch (error) {
      console.error("Error sending feedback:", error);
      toast({
        title: t('error'),
        description: t('errorSendingFeedback'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('sendFeedback')}</CardTitle>
        <CardDescription>
          {t('reportIssuesOrSuggest')}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('name')}</Label>
              <Input
                id="name"
                name="name"
                placeholder={t('yourName')}
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('email')}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={t('yourEmail')}
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="busNumber">{t('busNumber')}</Label>
              <Input
                id="busNumber"
                name="busNumber"
                placeholder={t('exampleBusNumber')}
                value={formData.busNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="feedbackType">{t('feedbackType')}</Label>
              <Select value={formData.feedbackType} onValueChange={handleSelectChange} required>
                <SelectTrigger id="feedbackType">
                  <SelectValue placeholder={t('selectType')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="issue">{t('reportIssue')}</SelectItem>
                  <SelectItem value="suggestion">{t('suggestion')}</SelectItem>
                  <SelectItem value="complaint">{t('complaint')}</SelectItem>
                  <SelectItem value="praise">{t('praise')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">{t('message')}</Label>
            <Textarea
              id="message"
              name="message"
              placeholder={t('describeFeedback')}
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-college-blue hover:bg-college-blue/90" disabled={isSubmitting}>
            {isSubmitting ? t('submitting') : t('submitFeedback')}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default FeedbackForm;
