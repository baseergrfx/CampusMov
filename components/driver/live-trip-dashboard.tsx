import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Camera, AlertTriangle, Users, StopCircle, Square } from 'lucide-react';
import { LiveMap } from '../live-map';
import { useState, useEffect } from 'react';

interface LiveTripDashboardProps {
  onScanQR: () => void;
  onSendDelay: () => void;
  onOpenPassengerList: () => void;
  onEndTrip: () => void;
}

export function LiveTripDashboard({
  onScanQR,
  onSendDelay,
  onOpenPassengerList,
  onEndTrip,
}: LiveTripDashboardProps) {
  // Driver's current location (moving along route)
  const [driverLocation, setDriverLocation] = useState({ lat: 34.0120, lng: 71.5150 });

  // Route from current position to destination
  const route = [
    { lat: 34.0120, lng: 71.5150 }, // Current position
    { lat: 34.0115, lng: 71.5140 },
    { lat: 34.0110, lng: 71.5125 },
    { lat: 34.0100, lng: 71.5110 },
    { lat: 34.0090, lng: 71.5090 },
    { lat: 34.0083, lng: 71.5067 }, // Destination (City University)
  ];

  // Simulate driver moving along route
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.6) * 0.0008,
        lng: prev.lng + (Math.random() - 0.6) * 0.0008,
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const completedStops = 2;
  const totalStops = 6;
  const studentsOnBoard = 8;
  const vehicle = 'CUST-05';

  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* Layer 1: FULL SCREEN MAP - 100% edge-to-edge */}
      <div className="absolute inset-0">
        <LiveMap 
          busLocation={driverLocation}
          userLocation={driverLocation}
          route={route}
          showUserMarker={false}
          zoom={14}
          className="!rounded-none !shadow-none"
        />
      </div>

      {/* Layer 2: TOP OVERLAY - Next Stop Card (Semi-transparent) */}
      <div className="absolute top-4 left-0 right-0 px-4 z-[1000] pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          <Card className="bg-white/90 backdrop-blur-md shadow-2xl border-2 border-gray-200">
            <div className="px-5 py-3">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Current Stop</p>
                  <p className="font-semibold text-gray-900 text-lg">Karkhano Market</p>
                </div>
                <div className="ml-4 text-right">
                  <p className="text-xs text-gray-500 mb-1">Next</p>
                  <p className="font-medium text-green-600">University Town</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">Progress: {completedStops}/{totalStops} stops</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-900 font-medium">{studentsOnBoard}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Layer 3: BOTTOM OVERLAY - Quick Action Bar (Always Visible) */}
      <div className="absolute bottom-0 left-0 right-0 z-[1001]">
        <div className="bg-white/95 backdrop-blur-lg border-t-2 border-gray-200 shadow-2xl">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <div className="grid grid-cols-4 gap-3">
              {/* Scan QR - Green */}
              <button
                onClick={onScanQR}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 active:scale-95 transition-all shadow-lg"
              >
                <Camera className="w-8 h-8 text-white" strokeWidth={2.5} />
                <span className="text-white text-xs font-medium">Scan QR</span>
              </button>

              {/* Send Delay - Orange */}
              <button
                onClick={onSendDelay}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-95 transition-all shadow-lg"
              >
                <AlertTriangle className="w-8 h-8 text-white" strokeWidth={2.5} />
                <span className="text-white text-xs font-medium">Send Delay</span>
              </button>

              {/* Passengers - Blue */}
              <button
                onClick={onOpenPassengerList}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 active:scale-95 transition-all shadow-lg"
              >
                <Users className="w-8 h-8 text-white" strokeWidth={2.5} />
                <span className="text-white text-xs font-medium">Passengers</span>
              </button>

              {/* End Trip - Red */}
              <button
                onClick={onEndTrip}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 active:scale-95 transition-all shadow-lg"
              >
                <Square className="w-8 h-8 text-white fill-current" strokeWidth={2.5} />
                <span className="text-white text-xs font-medium">End Trip</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}