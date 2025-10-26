import { useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { MapPin, Clock, Sparkles, Bell, AlertCircle } from 'lucide-react';
import { LiveMap } from '../live-map';
import { ProximityAlarm } from '../proximity-alarm';
import type { MainScreen } from '../main-app';

interface HomeTabProps {
  onNavigate: (screen: MainScreen) => void;
}

export function HomeTab({ onNavigate }: HomeTabProps) {
  const [minutesAway, setMinutesAway] = useState(12);
  
  // Load proximity alarm setting from localStorage
  const [isProximityAlarmEnabled, setIsProximityAlarmEnabled] = useState(() => {
    const saved = localStorage.getItem('proximityAlarmEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Listen for changes to alarm settings
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('proximityAlarmEnabled');
      setIsProximityAlarmEnabled(saved !== null ? JSON.parse(saved) : true);
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // User location (City University Peshawar area)
  const userLocation = { lat: 34.0083, lng: 71.5067 };
  
  // Bus location (will move towards user)
  const [busLocation, setBusLocation] = useState({ lat: 34.0150, lng: 71.5200 });
  
  // Route from bus to user
  const route = [
    { lat: 34.0150, lng: 71.5200 },
    { lat: 34.0145, lng: 71.5185 },
    { lat: 34.0135, lng: 71.5170 },
    { lat: 34.0125, lng: 71.5155 },
    { lat: 34.0115, lng: 71.5140 },
    { lat: 34.0105, lng: 71.5125 },
    { lat: 34.0095, lng: 71.5105 },
    { lat: 34.0088, lng: 71.5085 },
    { lat: 34.0083, lng: 71.5067 },
  ];

  const distanceKm = (minutesAway * 0.5).toFixed(1);

  // Simulate bus getting closer
  useEffect(() => {
    const interval = setInterval(() => {
      setMinutesAway((prev) => {
        const newMinutes = prev > 0 ? prev - 1 : 15;
        
        const totalStops = route.length - 1;
        const progress = 1 - (newMinutes / 15);
        const currentStopIndex = Math.min(Math.floor(progress * totalStops), totalStops - 1);
        const nextStopIndex = Math.min(currentStopIndex + 1, totalStops);
        
        const localProgress = (progress * totalStops) - currentStopIndex;
        const currentStop = route[currentStopIndex];
        const nextStop = route[nextStopIndex];
        
        const newLat = currentStop.lat + (nextStop.lat - currentStop.lat) * localProgress;
        const newLng = currentStop.lng + (nextStop.lng - currentStop.lng) * localProgress;
        
        setBusLocation({ lat: newLat, lng: newLng });
        
        return newMinutes;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white relative flex flex-col pb-20">
      {/* FULL SCREEN MAP */}
      <div className="flex-1 relative" style={{ height: 'calc(100vh - 80px)' }}>
        <LiveMap 
          busLocation={busLocation}
          userLocation={userLocation}
          route={route}
        />
        
        {/* Top Left - AI Chatbot Button */}
        <button
          onClick={() => onNavigate('ai-assistant')}
          className="absolute top-4 left-4 z-10 w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
        >
          <Sparkles className="w-6 h-6 text-white" strokeWidth={2.5} />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
        </button>

        {/* Top Right - Notifications Button */}
        <button
          onClick={() => onNavigate('notifications')}
          className="absolute top-4 right-4 z-10"
        >
          <div className="relative">
            <div className="w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform">
              <Bell className="w-6 h-6 text-gray-700" strokeWidth={2.5} />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 border-2 border-white rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">3</span>
            </div>
          </div>
        </button>

        {/* ETA Card - Top Center */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 max-w-sm w-full px-20">
          <Card className="bg-white/95 backdrop-blur-xl shadow-2xl border-0">
            <CardContent className="p-5">
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-2">Your bus is</p>
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-5xl font-semibold text-blue-600">{minutesAway}</span>
                  <span className="text-xl text-gray-600">min</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{distanceKm} km away</p>
                <div className="flex items-center justify-center gap-2 text-xs text-purple-600">
                  <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-pulse"></span>
                  AI-Predicted · High confidence
                </div>
              </div>
              
              {/* Location Details */}
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-600">GT Road & Saddar Bazaar</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-600">Arriving at 9:45 AM</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Floating Report Absence Button - Bottom Right */}
        <button
          onClick={() => onNavigate('report-absence')}
          className="absolute bottom-6 right-6 z-10 bg-gradient-to-br from-orange-500 to-red-500 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform"
        >
          <AlertCircle className="w-5 h-5" strokeWidth={2.5} />
          <span className="font-medium">Report Absence</span>
        </button>
      </div>

      {/* Proximity Alarm System */}
      <ProximityAlarm 
        minutesAway={minutesAway} 
        isAlarmEnabled={isProximityAlarmEnabled}
        distanceKm={distanceKm}
      />
    </div>
  );
}
