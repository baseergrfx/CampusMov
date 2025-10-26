import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Send, MessageSquare } from 'lucide-react';
import { Badge } from '../ui/badge';

interface Message {
  id: string;
  recipient: string;
  message: string;
  timestamp: string;
  status: 'sent' | 'delivered';
}

const mockMessages: Message[] = [
  {
    id: '1',
    recipient: 'All Parents',
    message: 'University transport will be suspended tomorrow due to public holiday.',
    timestamp: '2025-10-23 10:30 AM',
    status: 'sent',
  },
  {
    id: '2',
    recipient: 'Route B Parents',
    message: 'Route B will have a 15-minute delay today due to road construction.',
    timestamp: '2025-10-22 07:45 AM',
    status: 'delivered',
  },
  {
    id: '3',
    recipient: 'All Drivers',
    message: 'Reminder: Please submit your weekly reports by Friday.',
    timestamp: '2025-10-21 09:00 AM',
    status: 'delivered',
  },
];

export function CommunicationHub() {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [messages] = useState<Message[]>(mockMessages);

  const handleSendMessage = () => {
    if (recipient && message) {
      // Send message logic
      alert('Message sent successfully!');
      setMessage('');
      setRecipient('');
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 text-2xl mb-1">Communication Hub</h1>
        <p className="text-gray-600">Send broadcasts to parents and drivers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Create New Broadcast */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="w-5 h-5" />
              Create New Broadcast
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">Send To:</Label>
              <Select value={recipient} onValueChange={setRecipient}>
                <SelectTrigger>
                  <SelectValue placeholder="Select recipients" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-parents">All Parents</SelectItem>
                  <SelectItem value="all-drivers">All Drivers</SelectItem>
                  <SelectItem value="route-a-parents">Parents - Route A</SelectItem>
                  <SelectItem value="route-b-parents">Parents - Route B</SelectItem>
                  <SelectItem value="route-c-parents">Parents - Route C</SelectItem>
                  <SelectItem value="route-d-parents">Parents - Route D</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message:</Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                rows={8}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <p className="text-sm text-gray-500">{message.length} / 500 characters</p>
            </div>

            <Button 
              className="w-full bg-slate-800 hover:bg-slate-700"
              onClick={handleSendMessage}
              disabled={!recipient || !message}
            >
              <Send className="w-4 h-4 mr-2" />
              Send Now
            </Button>

            {/* Quick Templates */}
            <div className="space-y-2">
              <Label>Quick Templates:</Label>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => setMessage('All university transport will be suspended tomorrow due to a public holiday.')}
                >
                  Holiday Announcement
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => setMessage('There will be a delay in your route today due to traffic conditions. Please plan accordingly.')}
                >
                  Delay Notification
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => setMessage('Reminder: Monthly transport fees are due by the end of this week.')}
                >
                  Fee Reminder
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Message History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Message History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[600px] overflow-auto">
              {messages.map((msg) => (
                <div key={msg.id} className="p-4 bg-gray-50 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{msg.recipient}</Badge>
                    <Badge className={msg.status === 'sent' ? 'bg-blue-600' : 'bg-green-600'}>
                      {msg.status}
                    </Badge>
                  </div>
                  <p className="text-gray-900 text-sm">{msg.message}</p>
                  <p className="text-gray-500 text-xs">{msg.timestamp}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <p className="text-blue-900 text-sm">
            <span>Messages are sent as push notifications to the selected recipients' mobile apps. All parents and drivers will receive them instantly.</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
