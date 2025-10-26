import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeft, AlertTriangle, AlertCircle, UserX, AlertOctagon, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

interface SendAlertProps {
  onBack: () => void;
}

const alertTypes = [
  {
    id: 'traffic',
    icon: AlertTriangle,
    title: 'Traffic Delay',
    description: 'Route is delayed due to heavy traffic',
    message: 'Route A is delayed due to heavy traffic.',
    color: 'orange',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-600',
    borderColor: 'border-orange-200',
  },
  {
    id: 'breakdown',
    icon: AlertOctagon,
    title: 'Bus Breakdown',
    description: 'Vehicle mechanical issue',
    message: 'URGENT: Bus breakdown at current location. GPS coordinates sent.',
    color: 'red',
    bgColor: 'bg-red-100',
    textColor: 'text-red-600',
    borderColor: 'border-red-200',
  },
  {
    id: 'student-issue',
    icon: UserX,
    title: 'Student Issue',
    description: 'Need admin assistance with student',
    message: 'Student-related issue. Please contact driver immediately.',
    color: 'purple',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-600',
    borderColor: 'border-purple-200',
  },
  {
    id: 'emergency',
    icon: AlertCircle,
    title: 'Emergency',
    description: 'Immediate assistance required',
    message: 'EMERGENCY ALERT: Immediate assistance required!',
    color: 'red',
    bgColor: 'bg-red-600',
    textColor: 'text-white',
    borderColor: 'border-red-700',
  },
];

export function SendAlert({ onBack }: SendAlertProps) {
  const [sentAlert, setSentAlert] = useState<string | null>(null);

  const handleSendAlert = (alertType: typeof alertTypes[0]) => {
    setSentAlert(alertType.title);
    
    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setSentAlert(null);
    }, 3000);
  };

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
          <h1>Send Alert</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {/* Success Message */}
        {sentAlert && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <AlertDescription className="text-green-900">
              Alert sent successfully! The transport office has been notified about: {sentAlert}
            </AlertDescription>
          </Alert>
        )}

        {/* Info Card */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <p className="text-blue-900 text-sm">
              <span>Quick alerts to notify the transport office. Select the type of issue you're experiencing.</span>
            </p>
          </CardContent>
        </Card>

        {/* Alert Buttons */}
        <div className="space-y-3">
          {alertTypes.map((alert) => {
            const Icon = alert.icon;
            const isEmergency = alert.id === 'emergency';
            
            return (
              <Card
                key={alert.id}
                className={`cursor-pointer hover:shadow-lg transition-all ${
                  isEmergency ? 'border-2 border-red-600' : ''
                }`}
                onClick={() => handleSendAlert(alert)}
              >
                <CardContent className={`p-6 ${isEmergency ? alert.bgColor : ''}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${alert.bgColor} rounded-full flex items-center justify-center flex-shrink-0 ${
                      isEmergency ? 'bg-white' : ''
                    }`}>
                      <Icon className={`w-6 h-6 ${alert.textColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`${isEmergency ? 'text-white' : 'text-gray-900'} mb-1`}>
                        {alert.title}
                      </h3>
                      <p className={`text-sm ${isEmergency ? 'text-red-100' : 'text-gray-600'}`}>
                        {alert.description}
                      </p>
                      <div className={`mt-3 p-2 rounded text-xs ${
                        isEmergency 
                          ? 'bg-red-700 text-white' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        Will send: "{alert.message}"
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Transport Office Contact</CardTitle>
            <CardDescription>
              For non-urgent matters, you can call directly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Call Transport Office: +92 300 1234567
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
