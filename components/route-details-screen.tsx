import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ChevronLeft, MapPin, Clock, Bus, Phone, User } from 'lucide-react';
import type { MainScreen } from './main-app';
import { LiveMap } from './live-map';

interface RouteDetailsScreenProps {
  onNavigate: (screen: MainScreen) => void;
}

const routeStops = [
  { name: 'Main Gate', time: '7:30 AM', status: 'completed' },
  { name: 'Block A Stop', time: '7:35 AM', status: 'completed' },
  { name: 'Block B Stop', time: '7:40 AM', status: 'current' },
  { name: 'Library Station', time: '7:45 AM', status: 'upcoming' },
  { name: 'Block D Stop', time: '7:50 AM', status: 'upcoming' },
  { name: 'Engineering Block', time: '7:55 AM', status: 'upcoming' },
  { name: 'City University', time: '8:00 AM', status: 'upcoming' },
];

export function RouteDetailsScreen({ onNavigate }: RouteDetailsScreenProps) {
  // User's stop location
  const userLocation = { lat: 34.0083, lng: 71.5067 };

  // Complete route with all stops
  const completeRoute = [
    { lat: 34.0050, lng: 71.5020 }, // Main Gate
    { lat: 34.0060, lng: 71.5030 }, // Block A
    { lat: 34.0070, lng: 71.5045 }, // Block B
    { lat: 34.0075, lng: 71.5052 }, // Library
    { lat: 34.0078, lng: 71.5058 }, // Block D
    { lat: 34.0081, lng: 71.5063 }, // Engineering
    { lat: 34.0083, lng: 71.5067 }, // City University (destination)
  ];

  return (
    <div className="min-h-screen bg-gray-50">
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
          <h1 className="text-gray-900">Route Details</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {/* Bus & Driver Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bus & Driver Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Bus className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Bus Number</p>
                <p className="text-gray-900">CUST-05</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Driver</p>
                <p className="text-gray-900">Mr. Ahmed Shah</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              <Phone className="w-4 h-4 mr-2" />
              Contact Driver
            </Button>
          </CardContent>
        </Card>

        {/* Route Map */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Route Map</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-64 rounded-b-lg overflow-hidden">
              <LiveMap 
                userLocation={userLocation}
                route={completeRoute}
                showUserMarker={true}
                zoom={13}
              />
            </div>
          </CardContent>
        </Card>

        {/* Stop List & Timings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Stops & Timings</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {routeStops.map((stop, index) => (
                <div key={index} className="p-4 flex items-center gap-4">
                  <div className="relative">
                    {index !== routeStops.length - 1 && (
                      <div className="absolute top-8 left-1/2 w-0.5 h-12 -translate-x-1/2 bg-gray-200"></div>
                    )}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        stop.status === 'completed'
                          ? 'bg-green-100'
                          : stop.status === 'current'
                          ? 'bg-blue-100'
                          : 'bg-gray-100'
                      }`}
                    >
                      <MapPin
                        className={`w-4 h-4 ${
                          stop.status === 'completed'
                            ? 'text-green-600'
                            : stop.status === 'current'
                            ? 'text-blue-600'
                            : 'text-gray-400'
                        }`}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className={`${stop.status === 'current' ? 'text-blue-600' : 'text-gray-900'}`}>
                      {stop.name}
                    </p>
                    {stop.status === 'current' && (
                      <p className="text-blue-600 text-xs mt-0.5">Current Stop</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{stop.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}