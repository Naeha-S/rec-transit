
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle, Mail, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from "@/hooks/use-toast";

const HelpSupport = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('help');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const toggleNav = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would submit the form data to a server
    console.log("Form submitted:", contactForm);
    toast({
      title: "Message sent",
      description: "We'll get back to you as soon as possible.",
    });
    // Reset form
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const faqs = [
    {
      question: "How do I check my bus route?",
      answer: "You can check your bus route by going to the 'All Buses' page and searching for your bus number. You can also search for your location in the search bar on the home page."
    },
    {
      question: "What if my bus is late?",
      answer: "If your bus is running late, you will receive a notification through the app. You can also check the status of your bus in the 'All Buses' section."
    },
    {
      question: "How do I report an issue with my bus?",
      answer: "You can report an issue by using the feedback form on the app. Go to the 'Send Feedback' section from the sidebar and fill out the form with details about the issue."
    },
    {
      question: "Can I track my bus in real-time?",
      answer: "Yes, you can track your bus in real-time using the Route Map feature. This shows the current location of all active buses."
    },
    {
      question: "How do I change my boarding point?",
      answer: "To change your boarding point, go to 'Settings' and update your preferred boarding location under profile settings."
    },
    {
      question: "Are there buses available on weekends?",
      answer: "Most routes don't operate on weekends. However, some special weekend buses may be available. Check the 'Other Buses' section for weekend schedules if available."
    }
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay for sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden" 
          onClick={toggleNav}
        ></div>
      )}
      
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={sidebarOpen} 
      />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
        <Header onToggleNav={toggleNav} />
        
        <main className="flex-1 p-3 sm:p-4 pt-20 pb-20 lg:pb-4 max-w-7xl mx-auto w-full">
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
              <h1 className="text-xl sm:text-2xl font-bold text-college-blue dark:text-college-orange mb-6">Help & Support</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* FAQs */}
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5" />
                      Frequently Asked Questions
                    </CardTitle>
                    <CardDescription>Find answers to commonly asked questions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                          <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
                
                {/* Contact Form */}
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Contact Us
                    </CardTitle>
                    <CardDescription>Have a specific question? We're here to help!</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-1">
                            Name
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={contactForm.name}
                            onChange={handleInputChange}
                            placeholder="Your name"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Email
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={contactForm.email}
                            onChange={handleInputChange}
                            placeholder="Your email"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium mb-1">
                            Subject
                          </label>
                          <Input
                            id="subject"
                            name="subject"
                            value={contactForm.subject}
                            onChange={handleInputChange}
                            placeholder="What's this about?"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium mb-1">
                            Message
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            value={contactForm.message}
                            onChange={handleInputChange}
                            placeholder="How can we help you?"
                            rows={4}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full">Send Message</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
              
              {/* Contact Information */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-4">Direct Contact</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 border rounded-lg">
                    <Phone className="h-5 w-5 text-college-blue mt-0.5" />
                    <div>
                      <h3 className="font-medium">Call Us</h3>
                      <p className="text-sm text-muted-foreground">Mon-Fri, 8:00 AM - 6:00 PM</p>
                      <p className="mt-1">+91 44 2235 1234</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 border rounded-lg">
                    <Mail className="h-5 w-5 text-college-blue mt-0.5" />
                    <div>
                      <h3 className="font-medium">Email Us</h3>
                      <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
                      <p className="mt-1">support@rectransport.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* Mobile Navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default HelpSupport;
