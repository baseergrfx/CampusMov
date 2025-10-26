import { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Bell, MapPin, User, Clock, Phone, Bus } from 'lucide-react';
import { LiveMap } from '../live-map';
import { Logo } from '../logo';

interface Child {
  id: string;
  name: string;
  status: 'on-bus' | 'at-university' | 'at-home';
  route: string;
  busNumber: string;
  driverName: string;
  driverPhone: string;
  eta?: number; // minutes
}

interface ChildDashboardProps {
  onShowNotifications: () => void;
}

export function ChildDashboard({ onShowNotifications }: ChildDashboardProps) {
  // Mock multiple children
  const [children] = useState<Child[]>([
    {
      id: '1',
      name: 'Maria',
      status: 'on-bus',
      route: 'Route A',
      busNumber: 'PSR-101',
      driverName: 'Ahmed Khan',
      driverPhone: '+92 300 1234567',
      eta: 15,
    },
    {
      id: '2',
      name: 'Ebad',
      status: 'at-university',
      route: 'Route A',
      busNumber: 'PSR-101',
      driverName: 'Ahmed Khan',
      driverPhone: '+92 300 1234567',
    },
  ]);

  const [selectedChild, setSelectedChild] = useState<Child>(children[0]);
  const [busLocation, setBusLocation] = useState({ lat: 34.0120, lng: 71.5150 });
  const userLocation = { lat: 34.0083, lng: 71.5067 }; // University location

  // Route from bus to university
  const route = [
    { lat: 34.0120, lng: 71.5150 },
    { lat: 34.0115, lng: 71.5140 },
    { lat: 34.0110, lng: 71.5125 },
    { lat: 34.0100, lng: 71.5110 },
    { lat: 34.0090, lng: 71.5090 },
    { lat: 34.0083, lng: 71.5067 },
  ];

  // Simulate bus movement
  useEffect(() => {
    if (selectedChild.status === 'on-bus') {
      const interval = setInterval(() => {
        setBusLocation(prev => ({
          lat: prev.lat + (Math.random() - 0.6) * 0.0008,
          lng: prev.lng + (Math.random() - 0.6) * 0.0008,
        }));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [selectedChild.status]);

  const getStatusBadge = (status: Child['status']) => {
    switch (status) {
      case 'on-bus':
        return <Badge className="bg-blue-600">On The Bus</Badge>;
      case 'at-university':
        return <Badge className="bg-green-600">At University</Badge>;
      case 'at-home':
        return <Badge className="bg-gray-600">At Home</Badge>;
    }
  };

  const getStatusMessage = (child: Child) => {
    switch (child.status) {
      case 'on-bus':
        return `${child.name} is On The Bus (${child.route})`;
      case 'at-university':
        return `${child.name} is At University`;
      case 'at-home':
        return `${child.name} is At Home`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-lg p-1">
              <Logo size="sm" />
            </div>
            <div>
              <h1>Child Dashboard</h1>
              <p className="text-green-100 text-sm">Live tracking & status</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-green-700 relative"
            onClick={onShowNotifications}
          >
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Child Selector (if multiple children) */}
        {children.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {children.map((child) => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child)}
                className={`px-6 py-3 rounded-xl transition-all whitespace-nowrap ${
                  selectedChild.id === child.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {child.name}
              </button>
            ))}
          </div>
        )}

        {/* Main Status Card */}
        <Card className="border-2 border-green-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-gray-900 text-lg mb-2">
                  {getStatusMessage(selectedChild)}
                </h3>
                {getStatusBadge(selectedChild.status)}
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-green-600" />
              </div>
            </div>

            {selectedChild.status === 'on-bus' && selectedChild.eta && (
              <div className="flex items-center gap-2 mt-4 p-3 bg-blue-50 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-blue-900">
                  ETA to University: <span className="font-semibold">{selectedChild.eta} minutes</span>
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Live Map */}
        {selectedChild.status === 'on-bus' && (
          <Card>
            <CardContent className="p-0">
              <div className="h-80 rounded-lg overflow-hidden">
                <LiveMap
                  busLocation={busLocation}
                  userLocation={userLocation}
                  route={route}
                  showUserMarker={true}
                  zoom={13}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bus & Driver Details */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-gray-900 font-medium">Transport Details</h3>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Bus className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Bus Number</p>
                <p className="text-gray-900">{selectedChild.busNumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Driver</p>
                <p className="text-gray-900">{selectedChild.driverName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Route</p>
                <p className="text-gray-900">{selectedChild.route}</p>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <Phone className="w-4 h-4 mr-2" />
              Contact Driver
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}