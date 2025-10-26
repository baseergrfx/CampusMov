import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { AlertTriangle, Shield, UserX, Brain } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';

interface Anomaly {
  id: string;
  type: 'safety' | 'attendance' | 'welfare';
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  timestamp: string;
  actionRequired: boolean;
}

const mockAnomalies: Anomaly[] = [
  {
    id: '1',
    type: 'safety',
    severity: 'high',
    title: 'Multiple Hard Braking Events',
    description: 'Driver (Bus-04) registered 3 hard braking events today. Review required.',
    timestamp: '10 min ago',
    actionRequired: true,
  },
  {
    id: '2',
    type: 'attendance',
    severity: 'medium',
    title: 'Early Check-Out Detection',
    description: 'Student (Maria Shafqat) was checked out 5km before her designated stop. Follow up with driver?',
    timestamp: '1 hour ago',
    actionRequired: true,
  },
  {
    id: '3',
    type: 'welfare',
    severity: 'high',
    title: 'Consecutive Absences',
    description: 'Student (ID 12345) has missed 3 consecutive morning check-ins. Notify academic registrar?',
    timestamp: '2 hours ago',
    actionRequired: true,
  },
  {
    id: '4',
    type: 'safety',
    severity: 'medium',
    title: 'Speeding Alert',
    description: 'Bus-02 exceeded speed limit by 15 km/h on Ring Road. Driver: Muhammad Ali.',
    timestamp: '3 hours ago',
    actionRequired: false,
  },
  {
    id: '5',
    type: 'attendance',
    severity: 'low',
    title: 'Unusual Check-In Time',
    description: 'Student (Usman Tariq) checked in 30 minutes earlier than usual pattern. Monitoring.',
    timestamp: '5 hours ago',
    actionRequired: false,
  },
];

export function AnomalyDetection() {
  const getSeverityColor = (severity: Anomaly['severity']) => {
    switch (severity) {
      case 'high':
        return 'bg-red-600';
      case 'medium':
        return 'bg-orange-600';
      case 'low':
        return 'bg-yellow-600';
    }
  };

  const getTypeIcon = (type: Anomaly['type']) => {
    switch (type) {
      case 'safety':
        return <Shield className="w-5 h-5" />;
      case 'attendance':
        return <AlertTriangle className="w-5 h-5" />;
      case 'welfare':
        return <UserX className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: Anomaly['type']) => {
    switch (type) {
      case 'safety':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'attendance':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'welfare':
        return 'text-purple-600 bg-purple-50 border-purple-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Header */}
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-900">
            <Brain className="w-5 h-5" />
            AI Anomaly Detection System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-purple-800 text-sm mb-4">
            Our AI learns normal behavior patterns for every student and driver, automatically flagging anomalies that require attention.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 bg-white rounded-lg border border-purple-200">
              <p className="text-2xl text-red-600">{mockAnomalies.filter(a => a.type === 'safety').length}</p>
              <p className="text-xs text-gray-600 mt-1">Safety Alerts</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-purple-200">
              <p className="text-2xl text-orange-600">{mockAnomalies.filter(a => a.type === 'attendance').length}</p>
              <p className="text-xs text-gray-600 mt-1">Attendance Alerts</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-purple-200">
              <p className="text-2xl text-purple-600">{mockAnomalies.filter(a => a.type === 'welfare').length}</p>
              <p className="text-xs text-gray-600 mt-1">Welfare Alerts</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Anomaly List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Anomalies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockAnomalies.map((anomaly) => (
            <Alert key={anomaly.id} className={getTypeColor(anomaly.type)}>
              <div className="flex items-start gap-3">
                {getTypeIcon(anomaly.type)}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold mb-1">
                        {anomaly.title}
                        <Badge className={`ml-2 ${getSeverityColor(anomaly.severity)}`}>
                          {anomaly.severity.toUpperCase()}
                        </Badge>
                      </p>
                      <p className="text-sm">{anomaly.description}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{anomaly.timestamp}</span>
                  </div>
                  {anomaly.actionRequired && (
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="default" className="h-8">
                        Take Action
                      </Button>
                      <Button size="sm" variant="outline" className="h-8">
                        Mark as Reviewed
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8">
                        Dismiss
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Alert>
          ))}
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle>AI Insights & Patterns</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-900 text-sm">
              <span className="font-semibold">Pattern Detected:</span> Bus-04 shows 40% more hard braking events on Friday mornings, likely due to increased traffic on Ring Road route.
            </p>
            <p className="text-blue-700 text-xs mt-2">Recommendation: Consider alternate route or adjusted timing for Fridays.</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-green-900 text-sm">
              <span className="font-semibold">Positive Trend:</span> Overall driver safety scores have improved by 18% since implementing AI monitoring 3 months ago.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
