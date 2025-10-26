import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { QrCode, Bell, MapPin, Clock, Calendar, CreditCard, Route, User, MessageCircle, Maximize2 } from 'lucide-react';
import { LiveMap } from './live-map';
import { ProximityAlarm } from './proximity-alarm';
import type { MainScreen } from './main-app';
import { Logo } from './logo';

interface HomeDashboardProps {
  onNavigate: (screen: MainScreen) => void;
}

export function HomeDashboard({ onNavigate }: HomeDashboardProps) {
  const [minutesAway, setMinutesAway] = useState(12);
  const [isFullScreenMap, setIsFullScreenMap] = useState(false);
  
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
  
  // Route from bus to user - FOLLOWS ROADS REALISTICALLY
  const route = [
    // Bus starting position - Chesapeake Avenue area
    { lat: 34.0150, lng: 71.5200 },
    { lat: 34.0148, lng: 71.5195 },
    { lat: 34.0146, lng: 71.5190 },
    
    // Turn onto main road
    { lat: 34.0143, lng: 71.5183 },
    { lat: 34.0140, lng: 71.5176 },
    { lat: 34.0137, lng: 71.5170 },
    
    // Whittier Street intersection
    { lat: 34.0133, lng: 71.5162 },
    { lat: 34.0129, lng: 71.5155 },
    { lat: 34.0125, lng: 71.5148 },
    
    // Continue on main road
    { lat: 34.0120, lng: 71.5140 },
    { lat: 34.0115, lng: 71.5132 },
    { lat: 34.0110, lng: 71.5124 },
    
    // Dresden Street area
    { lat: 34.0105, lng: 71.5115 },
    { lat: 34.0100, lng: 71.5107 },
    { lat: 34.0095, lng: 71.5098 },
    
    // Final approach to City University
    { lat: 34.0091, lng: 71.5088 },
    { lat: 34.0087, lng: 71.5078 },
    { lat: 34.0085, lng: 71.5072 },
    
    // City University destination
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

  // Full Screen Map View
  if (isFullScreenMap) {
    return (
      <div className="min-h-screen bg-white relative flex flex-col">
        <div className="flex-1 relative">
          <LiveMap 
            busLocation={busLocation}
            userLocation={userLocation}
            route={route}
          />
          
          {/* Back Button */}
          <button
            onClick={() => setIsFullScreenMap(false)}
            className="absolute top-6 left-6 z-10 px-5 py-3 bg-white rounded-full shadow-lg flex items-center gap-2 hover:shadow-xl active:scale-95 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Back</span>
          </button>
        </div>
        
        {/* Proximity Alarm */}
        <ProximityAlarm 
          minutesAway={minutesAway} 
          isAlarmEnabled={isProximityAlarmEnabled}
          distanceKm={distanceKm}
        />
      </div>
    );
  }

  // Main Scrollable Dashboard - REFERENCE IMAGE STYLE
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white pb-32 relative">
      {/* Header with Logo */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-purple-100/50 sticky top-0 z-10 shadow-sm">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between">
          <Logo size="sm" />
          <button
            onClick={() => onNavigate('notifications')}
            className="relative w-11 h-11 bg-gradient-to-br from-purple-50 to-blue-50 rounded-full flex items-center justify-center hover:shadow-md transition-all active:scale-95"
          >
            <Bell className="w-5 h-5 text-purple-600" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-white rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-xs font-semibold">3</span>
            </div>
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 py-6 space-y-5">
        {/* 1. ETA Card - TOP WIDGET */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-purple-50/30 overflow-hidden backdrop-blur-sm">
          <CardContent className="p-6">
            {/* Bus Info Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400 mb-1.5">Your Bus</p>
                <h3 className="text-2xl font-semibold text-gray-900">PSR-101</h3>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full shadow-sm">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                <span className="text-white text-xs font-semibold uppercase tracking-wide">Live</span>
              </div>
            </div>

            {/* ETA Display - Main Focus */}
            <div className="relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-8 shadow-xl">
              {/* Decorative Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl"></div>
              </div>
              
              <div className="relative text-center">
                <p className="text-white/80 text-sm mb-3 font-medium">Arriving in</p>
                <div className="flex items-baseline justify-center gap-3 mb-4">
                  <span className="text-7xl font-bold tracking-tight text-white drop-shadow-lg">{minutesAway}</span>
                  <span className="text-3xl font-semibold text-white/90">min</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/15 backdrop-blur-md rounded-full border border-white/20">
                  <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse shadow-lg shadow-yellow-300/50"></div>
                  <span className="text-sm text-white font-medium">AI Prediction: High Confidence</span>
                </div>
              </div>
            </div>

            {/* Location & Time Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="group p-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200/60 hover:border-purple-200 hover:shadow-md transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <MapPin className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Location</p>
                    <p className="text-sm font-semibold text-gray-900 truncate">GT Road & Saddar</p>
                  </div>
                </div>
              </div>
              
              <div className="group p-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200/60 hover:border-blue-200 hover:shadow-md transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Clock className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Arrival Time</p>
                    <p className="text-sm font-semibold text-gray-900">9:45 AM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Distance Info */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span className="font-medium">{distanceKm} km away from your stop</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Map Preview Widget - SECOND WIDGET */}
        <Card className="shadow-lg border-0 bg-white overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              Live Tracking
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative">
              {/* Map Preview */}
              <div className="h-64 bg-gray-100">
                <LiveMap 
                  busLocation={busLocation}
                  userLocation={userLocation}
                  route={route}
                  zoom={13}
                />
              </div>
              
              {/* View Full Screen Button Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/40 via-black/20 to-transparent">
                <Button
                  onClick={() => setIsFullScreenMap(true)}
                  className="w-full bg-white text-gray-900 hover:bg-gray-50 shadow-lg rounded-2xl h-12 font-medium"
                  size="lg"
                >
                  <Maximize2 className="w-5 h-5 mr-2" />
                  View Full Screen
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. Quick Actions Grid - THIRD WIDGET */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 px-1">Quick Actions</h2>
          
          <div className="grid grid-cols-2 gap-3">
            {/* My QR Code */}
            <button
              onClick={() => onNavigate('qr')}
              className="h-28 flex flex-col items-center justify-center gap-3 bg-white rounded-3xl shadow-md hover:shadow-lg transition-all active:scale-95 border border-purple-100/50 p-4"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
                <QrCode className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-medium text-gray-900">My QR Code</span>
            </button>

            {/* Report Absence */}
            <button
              onClick={() => onNavigate('report-absence')}
              className="h-28 flex flex-col items-center justify-center gap-3 bg-white rounded-3xl shadow-md hover:shadow-lg transition-all active:scale-95 border border-purple-100/50 p-4"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-sm">
                <Bell className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-medium text-gray-900">Report Absence</span>
            </button>

            {/* Attendance History */}
            <button
              onClick={() => onNavigate('attendance-history')}
              className="h-28 flex flex-col items-center justify-center gap-3 bg-white rounded-3xl shadow-md hover:shadow-lg transition-all active:scale-95 border border-purple-100/50 p-4"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-sm">
                <Calendar className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-medium text-gray-900">Attendance History</span>
            </button>

            {/* My Transport Fee */}
            <button
              onClick={() => onNavigate('transport-fee')}
              className="h-28 flex flex-col items-center justify-center gap-3 bg-white rounded-3xl shadow-md hover:shadow-lg transition-all active:scale-95 border border-purple-100/50 p-4"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-sm">
                <CreditCard className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-medium text-gray-900">Transport Fee</span>
            </button>

            {/* My Route Details */}
            <button
              onClick={() => onNavigate('route-details')}
              className="h-28 flex flex-col items-center justify-center gap-3 bg-white rounded-3xl shadow-md hover:shadow-lg transition-all active:scale-95 border border-purple-100/50 p-4"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-sm">
                <Route className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-medium text-gray-900">Route Details</span>
            </button>

            {/* Profile & Settings */}
            <button
              onClick={() => onNavigate('profile')}
              className="h-28 flex flex-col items-center justify-center gap-3 bg-white rounded-3xl shadow-md hover:shadow-lg transition-all active:scale-95 border border-purple-100/50 p-4"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center shadow-sm">
                <User className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-medium text-gray-900">Profile & Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. AI Chatbot - Floating Action Button (FAB) - ONLY FLOATING ELEMENT */}
      <button
        onClick={() => onNavigate('ai-assistant')}
        className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
        style={{ boxShadow: '0 10px 40px rgba(59, 130, 246, 0.4)' }}
      >
        <MessageCircle className="w-8 h-8 text-white" strokeWidth={2.5} />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-green-500 border-2 border-white rounded-full"></div>
      </button>

      {/* Proximity Alarm System */}
      <ProximityAlarm 
        minutesAway={minutesAway} 
        isAlarmEnabled={isProximityAlarmEnabled}
        distanceKm={distanceKm}
      />
    </div>
  );
}