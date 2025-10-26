import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { ArrowLeft, Bell, CheckCircle, AlertTriangle, DollarSign, Clock } from 'lucide-react';

interface Notification {
  id: string;
  type: 'check-in' | 'arrival' | 'delay' | 'fee' | 'alert';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'check-in',
    title: 'Maria boarded the bus',
    message: 'Maria has checked in on Bus PSR-101 at Block D Stop',
    time: '2 min ago',
    read: false,
  },
  {
    id: '2',
    type: 'delay',
    title: 'Bus delay notification',
    message: 'Route A is delayed by 20 minutes due to traffic',
    time: '15 min ago',
    read: false,
  },
  {
    id: '3',
    type: 'arrival',
    title: 'Maria arrived at university',
    message: 'Maria has safely arrived at City University',
    time: '2 hours ago',
    read: true,
  },
  {
    id: '4',
    type: 'fee',
    title: 'Fee payment reminder',
    message: 'Transport fee of PKR 8,000 is due on Oct 31, 2025',
    time: '1 day ago',
    read: true,
  },
  {
    id: '5',
    type: 'check-in',
    title: 'Ebad boarded the bus',
    message: 'Ebad has checked in on Bus PSR-101 at Main Gate',
    time: '2 days ago',
    read: true,
  },
];

interface NotificationLogProps {
  onBack: () => void;
}

export function NotificationLog({ onBack }: NotificationLogProps) {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'check-in':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'arrival':
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case 'delay':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'fee':
        return <DollarSign className="w-5 h-5 text-purple-600" />;
      case 'alert':
        return <Bell className="w-5 h-5 text-red-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 shadow-md">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-green-700"
            onClick={onBack}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1>Notifications</h1>
            <p className="text-green-100 text-sm">All alerts & updates</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {mockNotifications.map((notification) => (
          <Card
            key={notification.id}
            className={notification.read ? 'bg-white' : 'bg-green-50 border-green-200'}
          >
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className={`font-medium ${notification.read ? 'text-gray-900' : 'text-green-900'}`}>
                      {notification.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <Clock className="w-3 h-3" />
                      <span>{notification.time}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
