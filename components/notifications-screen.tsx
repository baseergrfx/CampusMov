import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ChevronLeft, Bus, CheckCircle, Clock, MapPin, AlertCircle, DollarSign } from 'lucide-react';
import type { MainScreen } from './main-app';

interface NotificationsScreenProps {
  onNavigate: (screen: MainScreen) => void;
}

interface Notification {
  id: string;
  type: 'route-start' | 'check-in' | 'arrival' | 'check-out' | 'delay' | 'announcement' | 'fee';
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'arrival',
    message: 'Your bus is 10 minutes away from your stop',
    time: '5 min ago',
    read: false,
  },
  {
    id: '2',
    type: 'route-start',
    message: 'Your bus has started its route',
    time: '25 min ago',
    read: false,
  },
  {
    id: '3',
    type: 'check-in',
    message: '✅ Checked In: You successfully boarded Bus-05 at 7:42 AM',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '4',
    type: 'check-out',
    message: '✅ Checked Out: You successfully exited at City University at 8:15 AM',
    time: '5 hours ago',
    read: true,
  },
  {
    id: '5',
    type: 'delay',
    message: '❗️ DELAY: Bus-05 is running 15 minutes late due to traffic',
    time: '1 day ago',
    read: true,
  },
  {
    id: '6',
    type: 'announcement',
    message: 'ANNOUNCEMENT: All university transport will be suspended tomorrow due to public holiday',
    time: '2 days ago',
    read: true,
  },
  {
    id: '7',
    type: 'fee',
    message: 'REMINDER: Your transport fee is due in 3 days',
    time: '3 days ago',
    read: true,
  },
];

function getNotificationIcon(type: Notification['type']) {
  switch (type) {
    case 'route-start':
      return <Bus className="w-5 h-5 text-blue-600" />;
    case 'check-in':
    case 'check-out':
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    case 'arrival':
      return <MapPin className="w-5 h-5 text-orange-600" />;
    case 'delay':
      return <AlertCircle className="w-5 h-5 text-red-600" />;
    case 'announcement':
      return <AlertCircle className="w-5 h-5 text-purple-600" />;
    case 'fee':
      return <DollarSign className="w-5 h-5 text-yellow-600" />;
    default:
      return <Clock className="w-5 h-5 text-gray-600" />;
  }
}

export function NotificationsScreen({ onNavigate }: NotificationsScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Clean iOS Style */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('home')}
            className="hover:bg-gray-100 -ml-2"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </Button>
          <h1 className="text-gray-900">Notifications</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-3">
        {/* Unread Section */}
        <div className="space-y-3">
          <h2 className="text-gray-700 px-2">New</h2>
          {mockNotifications
            .filter((n) => !n.read)
            .map((notification) => (
              <Card
                key={notification.id}
                className="bg-white border-l-4 border-l-blue-600 shadow-sm"
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900">{notification.message}</p>
                      <p className="text-gray-500 text-sm mt-1">{notification.time}</p>
                    </div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Read Section */}
        <div className="space-y-3 pt-4">
          <h2 className="text-gray-700 px-2">Earlier</h2>
          {mockNotifications
            .filter((n) => n.read)
            .map((notification) => (
              <Card key={notification.id} className="bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-0.5 opacity-60">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-700">{notification.message}</p>
                      <p className="text-gray-500 text-sm mt-1">{notification.time}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}