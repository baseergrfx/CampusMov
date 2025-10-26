import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { ArrowLeft, AlertTriangle, Wrench, UserX, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

interface SendDelayNotificationProps {
  onBack: () => void;
}

const delayReasons = [
  {
    id: 'traffic',
    icon: AlertTriangle,
    title: 'Traffic Delay',
    description: 'Heavy traffic on route',
    color: 'orange',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-600',
  },
  {
    id: 'vehicle',
    icon: Wrench,
    title: 'Vehicle Problem',
    description: 'Mechanical or technical issue',
    color: 'red',
    bgColor: 'bg-red-100',
    textColor: 'text-red-600',
  },
  {
    id: 'student',
    icon: UserX,
    title: 'Student is Late',
    description: 'Waiting for student at stop',
    color: 'purple',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-600',
  },
  {
    id: 'other',
    icon: AlertCircle,
    title: 'Other',
    description: 'Different reason for delay',
    color: 'gray',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-600',
  },
];

const delayTimes = [
  { id: '5', minutes: 5, label: '+5 Minutes' },
  { id: '10', minutes: 10, label: '+10 Minutes' },
];

export function SendDelayNotification({ onBack }: SendDelayNotificationProps) {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [selectedDelay, setSelectedDelay] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSendNotification = () => {
    if (!selectedReason || !selectedDelay) return;
    
    const reason = delayReasons.find(r => r.id === selectedReason);
    const delay = delayTimes.find(d => d.id === selectedDelay);
    
    // Simulate sending notification
    setSent(true);
    
    // Auto-dismiss and go back after 2 seconds
    setTimeout(() => {
      onBack();
    }, 2000);
  };

  const canSubmit = selectedReason && selectedDelay;

  if (sent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl text-gray-900 mb-2">Notification Sent!</h2>
            <p className="text-gray-600">
              All students and administrators have been notified about the delay. 
              AI is now recalculating arrival times.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-green-700"
            onClick={onBack}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1>Send Delay Notification</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Info Alert */}
        <Alert className="bg-blue-50 border-blue-200">
          <AlertCircle className="w-4 h-4 text-blue-600" />
          <AlertDescription className="text-blue-900">
            This will notify all students and administrators. AI will automatically update arrival times.
          </AlertDescription>
        </Alert>

        {/* Step 1: Select Reason */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                1
              </div>
              <h3 className="text-gray-900 font-medium">Select Reason</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {delayReasons.map((reason) => {
                const Icon = reason.icon;
                const isSelected = selectedReason === reason.id;
                
                return (
                  <button
                    key={reason.id}
                    onClick={() => setSelectedReason(reason.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      isSelected 
                        ? 'border-green-600 bg-green-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${reason.bgColor} rounded-full flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${reason.textColor}`} />
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${isSelected ? 'text-green-900' : 'text-gray-900'}`}>
                          {reason.title}
                        </p>
                        <p className={`text-sm ${isSelected ? 'text-green-700' : 'text-gray-600'}`}>
                          {reason.description}
                        </p>
                      </div>
                      {isSelected && (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Select Delay Time */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                selectedReason ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                2
              </div>
              <h3 className={`font-medium ${selectedReason ? 'text-gray-900' : 'text-gray-400'}`}>
                Estimated Delay
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {delayTimes.map((time) => {
                const isSelected = selectedDelay === time.id;
                
                return (
                  <button
                    key={time.id}
                    onClick={() => selectedReason && setSelectedDelay(time.id)}
                    disabled={!selectedReason}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      !selectedReason 
                        ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                        : isSelected 
                          ? 'border-green-600 bg-green-50' 
                          : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Clock className={`w-8 h-8 mx-auto mb-2 ${
                      isSelected ? 'text-green-600' : 'text-gray-400'
                    }`} />
                    <p className={`text-lg font-medium ${
                      isSelected ? 'text-green-900' : 'text-gray-900'
                    }`}>
                      {time.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Summary & Send */}
        {canSubmit && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <h3 className="text-green-900 font-medium mb-3">Ready to Send</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-green-800">
                  <span className="text-sm">Reason:</span>
                  <span className="font-medium">
                    {delayReasons.find(r => r.id === selectedReason)?.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-green-800">
                  <span className="text-sm">Delay:</span>
                  <span className="font-medium">
                    {delayTimes.find(d => d.id === selectedDelay)?.label}
                  </span>
                </div>
              </div>
              
              <Button 
                onClick={handleSendNotification}
                className="w-full h-12 bg-green-600 hover:bg-green-700"
              >
                Send Notification
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Contact Info */}
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-gray-600 text-sm">
              For emergencies, call Transport Office: 
              <span className="font-medium text-gray-900"> +92 300 1234567</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}