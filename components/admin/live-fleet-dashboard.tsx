import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Bus, Users, CheckCircle, AlertTriangle, MapPin, Clock, AlertCircle, Brain, TrendingUp, UserCheck, X } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';
import { LiveMap } from '../live-map';
import { useState, useEffect } from 'react';

interface BusStatus {
  id: string;
  name: string;
  route: string;
  status: 'on-time' | 'delayed' | 'complete' | 'alert' | 'offline';
  students: number;
  nextStop?: string;
  delayMinutes?: number;
  alertMessage?: string;
  location?: string;
  lat?: number;
  lng?: number;
}

const mockBuses: BusStatus[] = [
  {
    id: '1',
    name: 'Bus-01',
    route: 'Route A',
    status: 'on-time',
    students: 40,
    nextStop: 'Block D',
    lat: 34.0100,
    lng: 71.5100,
  },
  {
    id: '2',
    name: 'Bus-02',
    route: 'Route B',
    status: 'delayed',
    students: 35,
    nextStop: 'Canal Rd',
    delayMinutes: 20,  // UPDATED: Driver sent +20 min delay
    lat: 34.0120,
    lng: 71.5150,
  },
  {
    id: '3',
    name: 'Bus-03',
    route: 'Route C',
    status: 'complete',
    students: 0,
    lat: 34.0083,
    lng: 71.5067,
  },
  {
    id: '4',
    name: 'Bus-04',
    route: 'Route D',
    status: 'alert',
    students: 38,
    location: 'Ring Rd',
    alertMessage: 'Bus Breakdown',
    lat: 34.0090,
    lng: 71.5180,
  },
  {
    id: '5',
    name: 'Bus-05',
    route: 'Not Assigned',
    status: 'offline',
    students: 0,
  },
];

const liveAlerts = [
  { id: '1', bus: 'Bus-04', severity: 'urgent', message: 'URGENT: Bus Breakdown', time: '2 min ago' },
  { id: '2', bus: 'Bus-02', severity: 'info', message: 'DELAY: Traffic Delay (+20 Mins)', time: '15 min ago' },  // NEW: Delay notification
];

// NEW: Pending manual attendance approvals
const pendingApprovals = [
  {
    id: '1',
    driver: 'Ahmed Khan',
    bus: 'PSR-101',
    route: 'Route A',
    student: 'Ebad ur Rehman',
    rollNumber: 'CS-2021-003',
    action: 'Check-In',
    time: '2 min ago',
  },
];

export function LiveFleetDashboard() {
  const activeBuses = mockBuses.filter(b => b.status !== 'offline').length;
  const totalBuses = mockBuses.length;
  const totalStudentsOnBoard = mockBuses.reduce((sum, bus) => sum + bus.students, 0);
  const attendanceRate = 96;
  const activeAlerts = liveAlerts.length;

  // Animate bus positions slightly
  const [busLocations, setBusLocations] = useState(
    mockBuses
      .filter(bus => bus.lat && bus.lng && bus.status !== 'offline')
      .map(bus => ({
        id: bus.id,
        lat: bus.lat!,
        lng: bus.lng!,
        label: bus.name,
        status: bus.status as 'on-time' | 'delayed' | 'alert' | 'complete',
      }))
  );

  // Admin center location (City University)
  const centerLocation = { lat: 34.0083, lng: 71.5067 };

  // Simulate slight bus movement
  useEffect(() => {
    const interval = setInterval(() => {
      setBusLocations(prev => 
        prev.map(bus => ({
          ...bus,
          lat: bus.lat + (Math.random() - 0.5) * 0.0005,
          lng: bus.lng + (Math.random() - 0.5) * 0.0005,
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = (status: BusStatus['status']) => {
    switch (status) {
      case 'on-time':
        return <Badge className="bg-green-600">On Time</Badge>;
      case 'delayed':
        return <Badge className="bg-orange-600">Delayed</Badge>;
      case 'complete':
        return <Badge className="bg-blue-600">Complete</Badge>;
      case 'alert':
        return <Badge className="bg-red-600">ALERT</Badge>;
      case 'offline':
        return <Badge variant="outline" className="text-gray-600">Offline</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 text-2xl mb-1">Live Fleet Overview</h1>
        <p className="text-gray-600">Real-time monitoring with AI-powered insights</p>
      </div>

      {/* AI Predictive Insights Widget */}
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-900">
            <Brain className="w-5 h-5" />
            AI Predictive Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-orange-50 border-orange-200">
            <AlertCircle className="w-4 h-4 text-orange-600" />
            <AlertDescription className="text-orange-900">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="mb-1"><span className="font-semibold">Predictive Alert:</span> Route B is <span className="font-semibold">85% likely</span> to be 10-15 mins late due to historical Friday traffic patterns.</p>
                  <p className="text-sm mt-2">Suggestion: Send pre-emptive delay notification to Route B parents?</p>
                </div>
              </div>
            </AlertDescription>
          </Alert>
          <div className="flex gap-2">
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              Send Notification
            </Button>
            <Button size="sm" variant="outline">
              Dismiss
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-white rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span>Today's Efficiency</span>
              </div>
              <p className="text-xl text-gray-900">12% <span className="text-sm text-green-600">↑</span></p>
              <p className="text-xs text-gray-500">vs. last week</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <Brain className="w-4 h-4 text-purple-600" />
                <span>AI Accuracy</span>
              </div>
              <p className="text-xl text-gray-900">94.5%</p>
              <p className="text-xs text-gray-500">prediction score</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Buses Active</p>
                <p className="text-gray-900 text-2xl mt-1">{activeBuses} / {totalBuses}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Bus className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Students On-Board</p>
                <p className="text-gray-900 text-2xl mt-1">{totalStudentsOnBoard}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Today's Attendance</p>
                <p className="text-gray-900 text-2xl mt-1">{attendanceRate}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-900 text-sm">Active Alerts</p>
                <p className="text-red-600 text-2xl mt-1">{activeAlerts}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Live Map */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Live Fleet Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <LiveMap 
                userLocation={centerLocation}
                buses={busLocations}
                showUserMarker={false}
                zoom={12}
              />
            </div>
          </CardContent>
        </Card>

        {/* Bus Status List */}
        <Card>
          <CardHeader>
            <CardTitle>Bus Status</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y max-h-96 overflow-auto">
              {mockBuses.map((bus) => (
                <div key={bus.id} className="p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-gray-900">{bus.name}</p>
                      <p className="text-gray-600 text-sm">{bus.route}</p>
                    </div>
                    {getStatusBadge(bus.status)}
                  </div>
                  
                  {bus.status !== 'offline' && bus.status !== 'complete' && (
                    <>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                        <Users className="w-4 h-4" />
                        <span>{bus.students} Students</span>
                      </div>
                      {bus.nextStop && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          <MapPin className="w-4 h-4" />
                          <span>Next: {bus.nextStop}</span>
                        </div>
                      )}
                      {bus.delayMinutes && (
                        <div className="flex items-center gap-2 text-sm text-orange-600 mt-1">
                          <Clock className="w-4 h-4" />
                          <span>Delayed {bus.delayMinutes}m</span>
                        </div>
                      )}
                      {bus.alertMessage && (
                        <div className="flex items-center gap-2 text-sm text-red-600 mt-1">
                          <AlertCircle className="w-4 h-4" />
                          <span>{bus.alertMessage}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Alert Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            Live Alert Feed
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {liveAlerts.map((alert) => (
            <Alert 
              key={alert.id} 
              className={alert.severity === 'urgent' ? 'border-red-200 bg-red-50' : 'border-blue-200 bg-blue-50'}
            >
              <AlertDescription className="flex items-center justify-between">
                <div>
                  <span className={alert.severity === 'urgent' ? 'text-red-900' : 'text-blue-900'}>
                    [{alert.bus}] {alert.message}
                  </span>
                </div>
                <span className="text-sm text-gray-500">{alert.time}</span>
              </AlertDescription>
            </Alert>
          ))}
        </CardContent>
      </Card>

      {/* Pending Manual Attendance Approvals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-green-600" />
            Pending Manual Attendance Approvals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pendingApprovals.map((approval) => (
            <Alert 
              key={approval.id} 
              className="border-green-200 bg-green-50"
            >
              <AlertDescription className="flex items-center justify-between">
                <div>
                  <span className="text-green-900">
                    [{approval.bus}] {approval.student} ({approval.rollNumber}) - {approval.action}
                  </span>
                </div>
                <span className="text-sm text-gray-500">{approval.time}</span>
              </AlertDescription>
            </Alert>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}