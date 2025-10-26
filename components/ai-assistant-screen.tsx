import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ChevronLeft, Send, Mic, Sparkles, Clock, Bell, MapPin, CreditCard } from 'lucide-react';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import type { MainScreen } from './main-app';
import { toast } from 'sonner@2.0.3';

interface AIAssistantScreenProps {
  onNavigate: (screen: MainScreen) => void;
}

interface Message {
  role: 'user' | 'bot';
  text: string;
  action?: 'alert-set' | 'info' | 'action-completed';
  timestamp: Date;
}

export function AIAssistantScreen({ onNavigate }: AIAssistantScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'bot', 
      text: '👋 Assalam-o-Alaikum! Main aap ka CampusMove Assistant hoon. Main aap ki bus tracking, attendance, fees, aur alerts ke saath madad kar sakta hoon. Kya madad chahiye?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested quick actions
  const quickActions = [
    { icon: MapPin, text: 'Bus kahan hai?', color: 'blue' },
    { icon: Clock, text: 'Kitne minute mein aayegi?', color: 'green' },
    { icon: Bell, text: '10-minute alert set karo', color: 'purple' },
    { icon: CreditCard, text: 'Fees status batao', color: 'orange' },
  ];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (message?: string) => {
    const messageToSend = message || inputMessage;
    if (!messageToSend.trim()) return;

    // Add user message
    const userMessage: Message = {
      role: 'user',
      text: messageToSend,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response with realistic delay
    setTimeout(() => {
      const botResponse = getBotResponse(messageToSend);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 800 + Math.random() * 400); // 800-1200ms delay
  };

  const getBotResponse = (message: string): Message => {
    const lowerMessage = message.toLowerCase();
    
    // Route/Trip queries - Enhanced for City University
    if (lowerMessage.includes('route') || lowerMessage.includes('rasta') || lowerMessage.includes('stops') || lowerMessage.includes('trip')) {
      return {
        role: 'bot',
        text: '🗺️ Aap Route #42 (Morning Campus) par hain:\\n\\n📍 City University Main Campus\\n🚏 Total Stops: 12\\n⏰ Morning: 7:00 AM - 9:30 AM\\n⏰ Evening: 4:30 PM - 6:30 PM\\n🎯 Aap ka stop: City University Gate 2\\n\\nYeh route Saddar se shuru hota hai aur GT Road se hote hue campus tak jata hai. Kya detailed route map dekhna chahte hain?',
        action: 'info',
        timestamp: new Date()
      };
    }
    
    // Driver queries - Enhanced
    if (lowerMessage.includes('driver') || lowerMessage.includes('contact') || lowerMessage.includes('number')) {
      return {
        role: 'bot',
        text: '👨‍✈️ Route #42 Driver Details:\\n\\n👤 Name: Mr. Irfan Khan\\n📱 Contact: 0300-1234567\\n🚌 Bus: CUST-05 (Green)\\n⭐ Rating: 4.8/5.0\\n📋 License: Valid till Dec 2026\\n\\n⚠️ Note: Sirf emergency mein driver ko call karein. Route tracking ke liye app use karein.',
        action: 'info',
        timestamp: new Date()
      };
    }
    
    // Timing queries - Enhanced
    if (lowerMessage.includes('timing') || lowerMessage.includes('time') || lowerMessage.includes('schedule') || lowerMessage.includes('waqt')) {
      return {
        role: 'bot',
        text: '⏰ Route #42 Detailed Timings:\\n\\n🌅 Morning Trip:\\n• Departure: 7:00 AM sharp\\n• Your Pickup: 7:45 AM\\n• Campus Arrival: 9:15 AM\\n\\n🌆 Evening Trip:\\n• Campus Departure: 4:30 PM\\n• Your Drop-off: 5:45 PM\\n• Route End: 6:30 PM\\n\\n⚠️ Please be at your stop 5 minutes early!',
        action: 'info',
        timestamp: new Date()
      };
    }

    // University/CUST queries - Enhanced
    if (lowerMessage.includes('cust') || lowerMessage.includes('university') || lowerMessage.includes('guidance')) {
      return {
        role: 'bot',
        text: '🏛️ City University of Science & Technology:\\n\\n📚 Programs: BBA, BS CS, Engineering, Medical\\n💵 Transport Fee: PKR 3,500/month\\n🚌 Available Routes: 15+ covering major areas\\n📍 Campus: Dalazak Road, Peshawar\\n⏰ Classes: 8:00 AM - 5:00 PM\\n\\nTransport service sab students ke liye available hai. Registration Student Affairs Office se karein.',
        action: 'info',
        timestamp: new Date()
      };
    }
    
    // Bus location queries
    if (lowerMessage.includes('bus kahan') || lowerMessage.includes('where') || lowerMessage.includes('location')) {
      return {
        role: 'bot',
        text: '🚌 Aap ki bus abhi GT Road & Saddar Bazaar par hai, aur wo 12 minutes mein aap ke stop par pohanchegi.\n\n📍 Current Location: GT Road\n⏱️ ETA: 9:45 AM\n🔢 Bus Number: CUST-05',
        action: 'info',
        timestamp: new Date()
      };
    }
    
    // Time/ETA queries
    if (lowerMessage.includes('kitne minute') || lowerMessage.includes('kab') || lowerMessage.includes('when') || lowerMessage.includes('arrive')) {
      return {
        role: 'bot',
        text: '⏰ Aap ki bus 12 minutes mein aap ke stop par hogi. ETA: 9:45 AM\n\nKya main aap ke liye proximity alert set kar doon? Jab bus 10 minutes ya 1km door ho, aap ko notification milegi.',
        action: 'info',
        timestamp: new Date()
      };
    }
    
    // Alert setting queries
    if (lowerMessage.includes('alert') || lowerMessage.includes('notification') || lowerMessage.includes('10 minute') || lowerMessage.includes('1km')) {
      // Check if it's to set alert
      if (lowerMessage.includes('set') || lowerMessage.includes('kar') || lowerMessage.includes('on') || lowerMessage.includes('enable')) {
        toast.success('✅ 10-Minute Proximity Alert Enabled');
        return {
          role: 'bot',
          text: '✅ Perfect! Maine aap ke liye "10-Minute Proximity Alert" set kar diya hai.\n\nJab bhi aap ki bus aap se 10 minutes (ya 1km) door hogi, aap ko notification milegi. Yeh alert Notification Settings se control kar sakte hain.',
          action: 'alert-set',
          timestamp: new Date()
        };
      } else {
        return {
          role: 'bot',
          text: '🔔 Proximity Alert aap ko tab notify karti hai jab bus 10 minutes (1km) door ho.\n\nKya main yeh alert aap ke liye set kar doon?',
          action: 'info',
          timestamp: new Date()
        };
      }
    }
    
    // Attendance queries
    if (lowerMessage.includes('attendance') || lowerMessage.includes('hazri') || lowerMessage.includes('present')) {
      return {
        role: 'bot',
        text: '✅ Aap ki attendance record:\n\n📊 Rate: 96% (48/50 days)\n📅 Is mahine: 22 present, 1 absent\n🎯 Last Check-in: Aaj 8:30 AM\n\nKya detailed attendance history dekhna chahte hain?',
        action: 'info',
        timestamp: new Date()
      };
    }
    
    // Fee/Payment queries
    if (lowerMessage.includes('fee') || lowerMessage.includes('payment') || lowerMessage.includes('paisa') || lowerMessage.includes('pay')) {
      return {
        role: 'bot',
        text: '💰 Aap ki transport fee details:\n\n📅 Current Month: PKR 3,500\n✅ Status: Paid (Oct 5, 2025)\n📆 Next Due: Nov 1, 2025\n💳 Payment Method: JazzCash\n\nKya aap payment history dekhna chahte hain?',
        action: 'info',
        timestamp: new Date()
      };
    }
    
    // Proximity Alarm queries
    if (lowerMessage.includes('alarm') || lowerMessage.includes('loud') || lowerMessage.includes('awaz')) {
      return {
        role: 'bot',
        text: '🔊 Proximity Alarm ek special feature hai:\n\n⚡ Jab bus 1km (2 minutes) door ho, aap ke phone par loud alarm bajta hai\n📱 Yeh Settings > Notifications se control kar sakte hain\n⏰ Normal notification se zyada effective hai\n\nKya main yeh alarm aap ke liye enable kar doon?',
        action: 'info',
        timestamp: new Date()
      };
    }
    
    // Default response with helpful suggestions
    return {
      role: 'bot',
      text: 'Main yeh sab kar sakta hoon:\n\n🚌 Bus location & ETA\n🔔 Proximity alerts set karna\n📊 Attendance record\n💰 Fee status\n🗺️ Route details\n⏰ Schedule information\n\nAap mujhe kuch bhi pooch sakte hain ya action karwa sakte hain!',
      action: 'info',
      timestamp: new Date()
    };
  };

  const handleQuickAction = (text: string) => {
    handleSendMessage(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex flex-col">
      {/* Header - iOS Style with Gradient */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('home')}
            className="hover:bg-gray-100 -ml-2"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </Button>
          <div className="flex items-center gap-2 flex-1">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">AI Assistant</h1>
              <p className="text-xs text-gray-500">Powered by CampusMove AI</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-0">
            Beta
          </Badge>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-4">
        <div className="max-w-4xl mx-auto py-4 space-y-4 pb-6">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
                {/* Message Bubble */}
                <div
                  className={`px-4 py-3 rounded-2xl shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white'
                      : 'bg-white text-gray-900 border border-gray-100'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line leading-relaxed">{msg.text}</p>
                  
                  {/* Action Badge */}
                  {msg.action === 'alert-set' && msg.role === 'bot' && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-green-600">
                        <Bell className="w-4 h-4" />
                        <span className="text-xs font-medium">Alert Successfully Set</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Timestamp */}
                <p className={`text-xs text-gray-500 mt-1 px-1 ${
                  msg.role === 'user' ? 'text-right' : 'text-left'
                }`}>
                  {msg.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions - Show only at start */}
          {messages.length === 1 && !isTyping && (
            <div className="space-y-3 pt-2">
              <p className="text-xs text-gray-500 font-medium px-1">Quick Actions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickAction(action.text)}
                    className="flex items-center gap-2 p-3 bg-white hover:bg-gray-50 border border-gray-100 rounded-xl transition-all active:scale-95 shadow-sm"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br ${
                      action.color === 'blue' ? 'from-blue-500 to-blue-600' :
                      action.color === 'green' ? 'from-green-500 to-emerald-600' :
                      action.color === 'purple' ? 'from-purple-500 to-purple-600' :
                      'from-orange-500 to-orange-600'
                    }`}>
                      <action.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs text-gray-700 font-medium text-left">{action.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area - Fixed at Bottom */}
      <div className="bg-white/80 backdrop-blur-xl border-t border-gray-200/50">
        <div className="max-w-4xl mx-auto p-4">
          {/* Info Banner */}
          <Card className="mb-3 border-purple-200 bg-purple-50">
            <CardContent className="p-3">
              <p className="text-xs text-purple-900">
                <Sparkles className="w-3 h-3 inline mr-1" />
                AI Assistant actions ko perform kar sakta hai jaise alerts set karna, information dena, aur settings change karna.
              </p>
            </CardContent>
          </Card>

          {/* Input Box */}
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 border-gray-200 focus:border-purple-500 focus:ring-purple-500 bg-white"
            />
            <Button
              size="icon"
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim()}
              className="bg-gradient-to-br from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="border-gray-200 hover:bg-gray-50"
            >
              <Mic className="w-4 h-4 text-gray-700" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}