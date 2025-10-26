import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { MapPin, Clock, Users, ArrowLeft } from 'lucide-react';

interface Route {
  id: string;
  name: string;
  time: string;
  stops: number;
  estimatedStudents: number;
}

interface SelectRouteScreenProps {
  vehicleNumber: string;
  onStartRoute: (routeId: string) => void;
  onBack?: () => void;
}

const routes: Route[] = [
  {
    id: '1',
    name: 'Route A - Morning',
    time: '7:00 AM',
    stops: 8,
    estimatedStudents: 45,
  },
  {
    id: '2',
    name: 'Route A - Afternoon',
    time: '4:15 PM',
    stops: 8,
    estimatedStudents: 42,
  },
  {
    id: '3',
    name: 'Route B - Morning',
    time: '7:30 AM',
    stops: 6,
    estimatedStudents: 35,
  },
];

export function SelectRouteScreen({ vehicleNumber, onStartRoute, onBack }: SelectRouteScreenProps) {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const handleStartRoute = () => {
    if (selectedRoute) {
      onStartRoute(selectedRoute);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Clean iOS Style */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-4 relative">
          {/* Back Button - Top Left */}
          {onBack && (
            <button
              onClick={onBack}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
          )}
          
          <p className="text-gray-500 text-sm text-center">Step 2 of 2</p>
          <h1 className="text-center text-gray-900 mt-1">Confirm Your Route</h1>
        </div>
      </div>

      <div className="flex-1 p-4 pb-24">
        <p className="text-gray-600 mb-4">Select your scheduled route for today</p>
        
        <div className="space-y-3">
          {routes.map((route) => (
            <Card
              key={route.id}
              className={`cursor-pointer transition-all ${
                selectedRoute === route.id
                  ? 'border-2 border-green-600 shadow-lg bg-green-50'
                  : 'hover:shadow-md hover:border-green-300'
              }`}
              onClick={() => setSelectedRoute(route.id)}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className={`text-lg font-medium mb-1 ${
                      selectedRoute === route.id ? 'text-green-900' : 'text-gray-900'
                    }`}>
                      {route.name}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{route.time}</span>
                    </div>
                  </div>
                  {selectedRoute === route.id && (
                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{route.stops} stops</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>~{route.estimatedStudents} students</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <Button
          onClick={handleStartRoute}
          disabled={!selectedRoute}
          className="w-full h-14 bg-green-600 hover:bg-green-700 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          GO LIVE & START ROUTE
        </Button>
      </div>
    </div>
  );
}