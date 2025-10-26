import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ChevronLeft, AlertCircle, Phone, Mail, MessageCircle, ChevronRight, Bot, Send } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { useState } from 'react';
import type { MainScreen } from './main-app';

interface HelpSupportScreenProps {
  onNavigate: (screen: MainScreen) => void;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  message: string;
  timestamp: string;
}

const faqs = [
  {
    question: 'How do I scan my QR code for attendance?',
    answer: 'Open the "My QR Code" tab from the bottom navigation, present your phone screen to the driver\'s scanner when boarding and exiting the bus. Wait for a confirmation beep.',
  },
  {
    question: 'What if I miss the check-out scan?',
    answer: 'Your attendance will be marked as incomplete for that day. Please ensure you scan both when boarding and exiting the bus.',
  },
  {
    question: 'How accurate is the bus tracking?',
    answer: 'The bus location updates in real-time using GPS. The estimated arrival time is calculated based on current traffic conditions and may vary by a few minutes.',
  },
  {
    question: 'Can I change my assigned bus route?',
    answer: 'Route assignments are managed by the transport office. Please contact them directly to request a route change.',
  },
  {
    question: 'How do I pay my transport fee?',
    answer: 'Go to Profile > My Transport Fee and click "Pay Now" to be redirected to the university\'s payment portal.',
  },
];

export function HelpSupportScreen({ onNavigate }: HelpSupportScreenProps) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      message: 'Hello! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    setChatMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      let botResponse = '';
      const lowerInput = inputMessage.toLowerCase();

      if (lowerInput.includes('bus') && (lowerInput.includes('time') || lowerInput.includes('when'))) {
        botResponse = 'The scheduled time for \'Block D Stop\' is 7:35 AM. The bus is currently running 2 minutes late, so the predicted arrival is 7:37 AM.';
      } else if (lowerInput.includes('fee') || lowerInput.includes('payment')) {
        botResponse = 'Syncing with the university portal... Your transport fee of PKR 8,000 is PENDING and due on October 31, 2025. Would you like to pay now?';
      } else if (lowerInput.includes('route') || lowerInput.includes('stop')) {
        botResponse = 'You are assigned to Route #42 - Campus Route. Your pickup stop is Block D Stop at 7:35 AM.';
      } else if (lowerInput.includes('attendance')) {
        botResponse = 'Your current attendance rate is 96%. You have 1 missed check-out this month. Would you like to see your full attendance history?';
      } else {
        botResponse = 'I can help you with information about your bus schedule, fees, routes, and attendance. What would you like to know?';
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        message: botResponse,
        timestamp: new Date().toLocaleTimeString(),
      };

      setChatMessages(prev => [...prev, aiMessage]);
    }, 1000);

    setInputMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Clean iOS Style */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('profile')}
            className="hover:bg-gray-100 -ml-2"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </Button>
          <h1 className="text-gray-900">Help & Support</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {/* AI Chatbot */}
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-600" />
              24/7 AI Support Assistant
            </CardTitle>
            <CardDescription>
              Get instant answers to your questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat Now
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md h-[600px] flex flex-col p-0">
                <DialogHeader className="p-4 border-b">
                  <DialogTitle className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-purple-600" />
                    AI Assistant
                  </DialogTitle>
                  <DialogDescription>
                    Ask me anything about your bus, fees, or routes
                  </DialogDescription>
                </DialogHeader>
                
                {/* Chat Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            msg.type === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                          <p
                            className={`text-xs mt-1 ${
                              msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                            }`}
                          >
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your question..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button
                      size="icon"
                      onClick={handleSendMessage}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Try asking: "What time is my bus?" or "What is my fee status?"
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-3">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">Report an Issue</p>
                  <p className="text-gray-600 text-sm">Report a problem with the app or bus</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">Contact Transport Office</p>
                  <p className="text-gray-600 text-sm">+92 300 1234567</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contact Us</CardTitle>
            <CardDescription>
              Get in touch with the transport office
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Phone className="w-4 h-4 mr-3 text-blue-600" />
              <div className="text-left">
                <p className="text-sm">Phone</p>
                <p className="text-xs text-gray-600">+92 300 1234567</p>
              </div>
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Mail className="w-4 h-4 mr-3 text-green-600" />
              <div className="text-left">
                <p className="text-sm">Email</p>
                <p className="text-xs text-gray-600">transport@cust.edu.pk</p>
              </div>
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <MessageCircle className="w-4 h-4 mr-3 text-purple-600" />
              <div className="text-left">
                <p className="text-sm">WhatsApp</p>
                <p className="text-xs text-gray-600">+92 300 1234567</p>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className="bg-gray-50">
          <CardContent className="p-4 text-center text-sm text-gray-600">
            <p>CampusMove Student App v1.0.0</p>
            <p className="mt-1">© 2025 City University Of Science and Technology</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}