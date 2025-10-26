import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { MapPin, Navigation, TrendingUp } from 'lucide-react';

interface LocationPermissionScreenProps {
  onAllow: () => void;
}

export function LocationPermissionScreen({ onAllow }: LocationPermissionScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Icon */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
            <MapPin className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-gray-900 text-2xl mb-2">Location Access Required</h1>
          <p className="text-gray-600">
            CampusMove needs your location to provide the best experience
          </p>
        </div>

        {/* Benefits */}
        <Card className="mb-6">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Navigation className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-gray-900 font-medium mb-1">Track the Bus</h3>
                <p className="text-sm text-gray-600">
                  Share real-time bus location with students and parents
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-gray-900 font-medium mb-1">Accurate ETAs</h3>
                <p className="text-sm text-gray-600">
                  Provide precise arrival times to all passengers
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-gray-900 font-medium mb-1">AI Navigation</h3>
                <p className="text-sm text-gray-600">
                  Get smart route optimization and traffic updates
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Note */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-green-900">
            <span className="font-medium">Privacy Protected:</span> Your location is only tracked while you're on an active trip. We never share your data with third parties.
          </p>
        </div>

        {/* Allow Button */}
        <Button
          onClick={onAllow}
          className="w-full h-14 bg-green-600 hover:bg-green-700 text-lg"
        >
          Allow Location Access
        </Button>

        <p className="text-center text-gray-500 text-xs mt-4">
          Select "Allow while using app" when prompted
        </p>
      </div>
    </div>
  );
}
