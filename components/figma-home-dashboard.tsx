import { useEffect, useState } from 'react';
import { Bell, QrCode, Calendar, CreditCard, MapPin, Clock, MessageCircle, Route } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Logo } from './logo';
import { LiveMap } from './live-map';
import type { MainScreen } from './main-app';
import svgPaths from "../imports/svg-wp9g254yop";

interface FigmaHomeDashboardProps {
  onNavigate: (screen: MainScreen) => void;
}

export function FigmaHomeDashboard({ onNavigate }: FigmaHomeDashboardProps) {
  const [minutesAway, setMinutesAway] = useState(3);

  // Bus and user locations
  const busLocation = { lat: 33.6844, lng: 73.0479 }; // Islamabad location
  const userLocation = { lat: 33.6995, lng: 73.0363 }; // Student's stop

  // Realistic bus route following GT Road
  const busRoute = [
    { lat: 33.6844, lng: 73.0479 }, // Starting point
    { lat: 33.6880, lng: 73.0450 },
    { lat: 33.6920, lng: 73.0420 },
    { lat: 33.6960, lng: 73.0390 },
    { lat: 33.6995, lng: 73.0363 }, // Student's stop
    { lat: 33.7030, lng: 73.0340 },
    { lat: 33.7070, lng: 73.0310 }, // City University
  ];

  // Simulate bus getting closer
  useEffect(() => {
    const interval = setInterval(() => {
      setMinutesAway((prev) => (prev > 0 ? prev - 1 : 15));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header - Sticky */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-md mx-auto px-5 py-4 flex items-center justify-between">
          <Logo size="sm" />
          
          {/* Notification Bell */}
          <button
            onClick={() => onNavigate('notifications')}
            className="relative w-11 h-11 bg-gradient-to-br from-purple-50 to-blue-50 rounded-full flex items-center justify-center hover:shadow-md transition-all active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
              <g clipPath="url(#clip0_205_821)">
                <path 
                  d={svgPaths.p22e39380} 
                  stroke="#9810FA" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="1.66647" 
                />
                <path 
                  d={svgPaths.p31da330} 
                  stroke="#9810FA" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="1.66647" 
                />
              </g>
              <defs>
                <clipPath id="clip0_205_821">
                  <rect fill="white" height="19.9977" width="19.9977" />
                </clipPath>
              </defs>
            </svg>
            
            {/* Badge */}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-white rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-xs font-bold">3</span>
            </div>
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="max-w-md mx-auto px-5 py-6 space-y-5 pb-32">
        
        {/* 1. ETA Card - Purple Gradient */}
        <Card className="overflow-hidden shadow-lg border-0 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-[21.792px]">
          <CardContent className="p-6 relative">
            {/* Background Blur Effect */}
            <div className="absolute bg-white/10 blur-[58px] h-[232px] w-[232px] left-[-13px] top-0 rounded-full" />
            
            <div className="relative space-y-4">
              {/* Bus Arriving Label */}
              <p className="text-center text-white/80 text-[10.5px] font-['Arial'] tracking-wide">
                Bus Arriving in
              </p>

              {/* Large Time Display */}
              <div className="flex items-baseline justify-center gap-3">
                <span className="text-[72px] font-bold leading-none text-white tracking-tight">
                  {minutesAway}
                </span>
                <span className="text-[25px] font-normal text-white/90">min</span>
              </div>

              {/* AI Confidence Badge */}
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/15 backdrop-blur-md rounded-full border border-white/20">
                  <div className="w-2 h-2 bg-[#8cff20] rounded-full animate-pulse shadow-lg" />
                  <span className="text-xs text-white font-['Arial']">
                    AI Prediction: High Confidence
                  </span>
                </div>
              </div>

              {/* Location & Arrival Time Grid */}
              <div className="grid grid-cols-2 gap-3 pt-3">
                {/* Location */}
                <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
                  <div className="w-12 h-12 bg-white/20 rounded-[18px] flex items-center justify-center flex-shrink-0 shadow-sm">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 22 23">
                      <g>
                        <path 
                          d={svgPaths.p360a4000} 
                          stroke="white" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2.29234" 
                        />
                        <path 
                          d={svgPaths.p2f1ee900} 
                          stroke="white" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2.29234" 
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[8.7px] text-white/70 uppercase tracking-wider mb-0.5 font-['Arial']">
                      Location
                    </p>
                    <p className="text-[13.2px] font-bold text-white truncate font-['Arial']">
                      GT Road & Saddar
                    </p>
                  </div>
                </div>

                {/* Arrival Time */}
                <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
                  <div className="w-12 h-12 bg-white/20 rounded-[18px] flex items-center justify-center flex-shrink-0 shadow-sm">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 22 23">
                      <g clipPath="url(#clip0_205_865)">
                        <path 
                          d={svgPaths.p2fd14000} 
                          stroke="white" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2.29234" 
                        />
                        <path 
                          d={svgPaths.p15787b80} 
                          stroke="white" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2.29234" 
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_205_865">
                          <rect fill="white" height="22.0182" width="21.9946" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[8.7px] text-white/70 uppercase tracking-wider mb-0.5 font-['Arial']">
                      Arrival Time
                    </p>
                    <p className="text-[13.2px] font-bold text-white font-['Arial']">
                      9:45 AM
                    </p>
                  </div>
                </div>
              </div>

              {/* Distance Footer */}
              <div className="pt-4 border-t border-white/20">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#2b7fff] rounded-full" />
                  <span className="text-sm text-white font-['Arial']">
                    1.5 km away from your stop
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Live Map Card */}
        <Card className="overflow-hidden shadow-lg border-0 bg-white rounded-[16.4px]">
          <div className="p-6 pb-3">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                <g clipPath="url(#clip0_205_893)">
                  <path 
                    d={svgPaths.p4bf7df2} 
                    stroke="#9810FA" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="1.66647" 
                  />
                  <path 
                    d={svgPaths.p90364f0} 
                    stroke="#9810FA" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="1.66647" 
                  />
                </g>
                <defs>
                  <clipPath id="clip0_205_893">
                    <rect fill="white" height="19.9977" width="19.9977" />
                  </clipPath>
                </defs>
              </svg>
              <h2 className="text-lg font-['Arial'] text-neutral-950">Live Tracking</h2>
            </div>
          </div>

          {/* Map Preview */}
          <div className="relative h-[256px] bg-gray-100 overflow-hidden">
            <LiveMap 
              busLocation={busLocation}
              userLocation={userLocation}
              route={busRoute}
              zoom={14}
              className="rounded-none"
            />

            {/* View Full Screen Button */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 via-black/30 to-transparent pointer-events-none">
              <button
                onClick={() => {/* TODO: Implement full screen map */}}
                className="w-full bg-white text-gray-900 hover:bg-gray-50 shadow-lg rounded-2xl h-12 font-medium transition-all active:scale-95 flex items-center justify-center gap-2 pointer-events-auto"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                  <path 
                    d={svgPaths.p9d29680} 
                    stroke="#155DFC" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="1.18061" 
                  />
                </svg>
                <span>View Full Screen</span>
              </button>
            </div>
          </div>
        </Card>

        {/* 3. Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900 font-['Arial'] px-1">Quick Actions</h2>
          
          <div className="grid grid-cols-3 gap-3">
            {/* My QR Code */}
            <button
              onClick={() => onNavigate('qr')}
              className="bg-white p-4 rounded-[15.815px] shadow-md hover:shadow-lg transition-all active:scale-95 border border-purple-100/50 flex flex-col items-center justify-center gap-2 min-h-[74px]"
            >
              <div className="w-[37px] h-[31px] bg-gradient-to-br from-blue-500 to-blue-600 rounded-[10.543px] flex items-center justify-center shadow-sm">
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 19 19">
                  <g>
                    <path d={svgPaths.p1e7c0500} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d={svgPaths.p1d42d200} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d={svgPaths.p39313400} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d={svgPaths.p140f5680} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d="M16.1411 16.1406V16.1497" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d={svgPaths.p2c2f5000} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d="M2.30566 9.22266H2.31469" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d="M9.22339 2.30469H9.23242" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d="M9.22339 12.2969V12.3059" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d="M12.2979 9.22266H13.0665" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d="M16.1411 9.22266V9.23168" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d="M9.22339 16.1397V15.3711" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                  </g>
                </svg>
              </div>
              <span className="text-[9.225px] text-gray-900 font-['Arial']">My QR Code</span>
            </button>

            {/* Report Absence */}
            <button
              onClick={() => onNavigate('report-absence')}
              className="bg-white p-4 rounded-[15.815px] shadow-md hover:shadow-lg transition-all active:scale-95 border border-purple-100/50 flex flex-col items-center justify-center gap-2 min-h-[74px]"
            >
              <div className="w-[37px] h-[31px] bg-[#4c6ef5] rounded-[10.543px] flex items-center justify-center shadow-sm">
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 19 19">
                  <g>
                    <path d={svgPaths.p233a512c} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d={svgPaths.p2a0d2a00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                  </g>
                </svg>
              </div>
              <span className="text-[9.225px] text-gray-900 font-['Arial'] text-center leading-tight">
                Report Absence
              </span>
            </button>

            {/* Attendance History */}
            <button
              onClick={() => onNavigate('attendance-history')}
              className="bg-white p-4 rounded-[15.815px] shadow-md hover:shadow-lg transition-all active:scale-95 border border-purple-100/50 flex flex-col items-center justify-center gap-2 min-h-[74px]"
            >
              <div className="w-[37px] h-[29px] bg-[#4c6ef5] rounded-[10.543px] flex items-center justify-center shadow-sm">
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 19 19">
                  <g>
                    <path d="M6.14893 1.53906V4.61356" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d="M12.2979 1.53906V4.61356" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d={svgPaths.p1a4df680} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d="M2.30566 7.6875H16.1409" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                  </g>
                </svg>
              </div>
              <span className="text-[9.225px] text-gray-900 font-['Arial'] text-center leading-tight">
                Attendance History
              </span>
            </button>

            {/* Transport Fee */}
            <button
              onClick={() => onNavigate('transport-fee')}
              className="bg-white p-4 rounded-[15.815px] shadow-md hover:shadow-lg transition-all active:scale-95 border border-purple-100/50 flex flex-col items-center justify-center gap-2 min-h-[74px]"
            >
              <div className="w-[37px] h-[31px] bg-[#4c6ef5] rounded-[10.543px] flex items-center justify-center shadow-sm">
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 19 19">
                  <g>
                    <path d={svgPaths.pf7c3400} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d="M1.53711 7.68555H16.9096" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                  </g>
                </svg>
              </div>
              <span className="text-[9.225px] text-gray-900 font-['Arial'] text-center leading-tight">
                Transport Fee
              </span>
            </button>

            {/* Route Details */}
            <button
              onClick={() => onNavigate('route-details')}
              className="bg-white p-4 rounded-[15.815px] shadow-md hover:shadow-lg transition-all active:scale-95 border border-purple-100/50 flex flex-col items-center justify-center gap-2 min-h-[74px]"
            >
              <div className="w-[37px] h-[31px] bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-[10.543px] flex items-center justify-center shadow-sm">
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 19 19">
                  <g>
                    <path d={svgPaths.p342e3fb8} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d={svgPaths.pb7638c0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d={svgPaths.pf7f6880} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                  </g>
                </svg>
              </div>
              <span className="text-[9.225px] text-gray-900 font-['Arial'] text-center leading-tight">
                Route Details
              </span>
            </button>

            {/* Profile & Settings */}
            <button
              onClick={() => onNavigate('profile')}
              className="bg-white p-4 rounded-[15.815px] shadow-md hover:shadow-lg transition-all active:scale-95 border border-purple-100/50 flex flex-col items-center justify-center gap-2 min-h-[74px]"
            >
              <div className="w-[37px] h-[26px] bg-[#4c6ef5] rounded-[10.543px] flex items-center justify-center shadow-sm">
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 19 19">
                  <g>
                    <path d={svgPaths.p3078c200} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d={svgPaths.pdeab072} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                  </g>
                </svg>
              </div>
              <span className="text-[9.225px] text-gray-900 font-['Arial'] text-center leading-tight">
                Profile & Settings
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating AI Chatbot Button */}
      <button
        onClick={() => onNavigate('ai-assistant')}
        className="fixed bottom-24 right-8 z-[100] w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
        style={{ boxShadow: '0 10px 40px rgba(59, 130, 246, 0.4)' }}
      >
        <MessageCircle className="w-8 h-8 text-white" strokeWidth={2.5} />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-green-500 border-2 border-white rounded-full" />
      </button>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-around">
            {/* Home */}
            <button
              onClick={() => onNavigate('home')}
              className="flex flex-col items-center justify-center gap-1 transition-all active:scale-95 group"
            >
              <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 22 23">
                  <g>
                    <path 
                      d="M2.29102 9.65016L10.2091 2.78091C10.6477 2.40382 11.3002 2.40382 11.7388 2.78091L19.6569 9.65016" 
                      stroke="white" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2.29234" 
                    />
                    <path 
                      d="M4.58398 7.65234V19.2691C4.58398 19.9038 5.09933 20.4191 5.73404 20.4191H16.2139C16.8486 20.4191 17.364 19.9038 17.364 19.2691V7.65234" 
                      stroke="white" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2.29234" 
                    />
                  </g>
                </svg>
              </div>
              <span className="text-[9px] font-semibold text-purple-600">Home</span>
            </button>

            {/* Route Details */}
            <button
              onClick={() => onNavigate('route-details')}
              className="flex flex-col items-center justify-center gap-1 transition-all active:scale-95 group"
            >
              <div className="w-11 h-11 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 19 19">
                  <g>
                    <path d={svgPaths.p342e3fb8} stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d={svgPaths.pb7638c0} stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d={svgPaths.pf7f6880} stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                  </g>
                </svg>
              </div>
              <span className="text-[9px] font-medium text-gray-500">Route</span>
            </button>

            {/* QR Code */}
            <button
              onClick={() => onNavigate('qr')}
              className="flex flex-col items-center justify-center gap-1 transition-all active:scale-95 group"
            >
              <div className="w-11 h-11 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 19 19">
                  <g>
                    <path d={svgPaths.p1e7c0500} stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d={svgPaths.p1d42d200} stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d={svgPaths.p39313400} stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d={svgPaths.p140f5680} stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d="M16.1411 16.1406V16.1497" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d={svgPaths.p2c2f5000} stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d="M2.30566 9.22266H2.31469" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d="M9.22339 2.30469H9.23242" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d="M9.22339 12.2969V12.3059" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d="M12.2979 9.22266H13.0665" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d="M16.1411 9.22266V9.23168" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d="M9.22339 16.1397V15.3711" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                  </g>
                </svg>
              </div>
              <span className="text-[9px] font-medium text-gray-500">QR Code</span>
            </button>

            {/* Attendance */}
            <button
              onClick={() => onNavigate('attendance-history')}
              className="flex flex-col items-center justify-center gap-1 transition-all active:scale-95 group"
            >
              <div className="w-11 h-11 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 19 19">
                  <g>
                    <path d="M6.14893 1.53906V4.61356" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d="M12.2979 1.53906V4.61356" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d={svgPaths.p1a4df680} stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d="M2.30566 7.6875H16.1409" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                  </g>
                </svg>
              </div>
              <span className="text-[9px] font-medium text-gray-500">Record</span>
            </button>

            {/* Profile */}
            <button
              onClick={() => onNavigate('profile')}
              className="flex flex-col items-center justify-center gap-1 transition-all active:scale-95 group"
            >
              <div className="w-11 h-11 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 19 19">
                  <g>
                    <path d={svgPaths.p3078c200} stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                    <path d={svgPaths.pdeab072} stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
                  </g>
                </svg>
              </div>
              <span className="text-[9px] font-medium text-gray-500">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}