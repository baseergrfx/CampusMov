import { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Sun, Smartphone, AlarmClock, Sparkles, ChevronLeft } from 'lucide-react';
import type { MainScreen } from './main-app';
import QRCode from 'react-qr-code';
import { toast } from 'sonner';

interface QRCodeScreenProps {
  onNavigate: (screen: MainScreen) => void;
}

export function QRCodeScreen({ onNavigate }: QRCodeScreenProps) {
  const [brightness, setBrightness] = useState(100);

  // Simulate brightness increase
  useEffect(() => {
    setBrightness(100);
  }, []);

  const studentName = 'Ahmed Khan';
  const studentId = 'STU-2024-12345';
  const route = 'Route #42';

  // Create a unique data string (JSON is a great format)
  const qrData = JSON.stringify({
    id: studentId,
    name: studentName,
    route: route,
  });

  const handleSetAlarm = () => {
    const pickupTime = '6:30 AM';
    toast.success('Morning Alarm Set!', {
      description: `Alarm scheduled for ${pickupTime} (30 min before pickup)`,
      duration: 4000,
    });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white pb-32">{/* Added padding for floating button */}
      {/* Header with Back Button */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-lg mx-auto px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="flex-1 text-center text-gray-900 -ml-10">My QR Code</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-8 space-y-6">
        {/* Brightness Indicator - Subtle iOS style */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <Sun className="w-4 h-4" />
          <span>Brightness maximized</span>
        </div>

        {/* Main QR Code Card - Clean and centered */}
        <Card className="bg-white shadow-sm border-gray-100 overflow-hidden">
          <div className="p-8">
            {/* Student Info - Above QR */}
            <div className="text-center mb-6 space-y-1">
              <h2 className="text-gray-900">{studentName}</h2>
              <p className="text-sm text-gray-500">{studentId}</p>
              <p className="text-sm text-blue-600">{route}</p>
            </div>

            {/* QR Code - Large and centered */}
            <div className="flex justify-center mb-6">
              <div className="relative bg-gray-50 p-8 rounded-3xl">
                {/* Blue Corner Brackets - Scanner Frame */}
                <div className="absolute top-4 left-4 w-12 h-12 border-l-4 border-t-4 border-blue-500 rounded-tl-lg"></div>
                <div className="absolute top-4 right-4 w-12 h-12 border-r-4 border-t-4 border-blue-500 rounded-tr-lg"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 border-l-4 border-b-4 border-blue-500 rounded-bl-lg"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 border-r-4 border-b-4 border-blue-500 rounded-br-lg"></div>

                {/* Replaced the fake <svg> with the real <QRCode> component */}
                <QRCode
                  value={qrData}
                  size={240} // Fits the 240x240 space
                  fgColor="#1e3a5f" // Your navy blue color
                  bgColor="#ffffff" // Explicit white background
                  className="bg-white" // Keep your original class
                />
              </div>
            </div>

            {/* Scan instruction - Simple and clear */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
                <Smartphone className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-900">
                  Show to driver when boarding
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Trip Actions Card - NEW */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <button
            onClick={handleSetAlarm}
            className="w-full text-left px-5 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <AlarmClock className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Set Morning Alarm</p>
                <p className="text-sm text-gray-500">
                  Get a reminder 30 mins before pickup
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Simple Instructions - iOS style (Unchanged) */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-100">
            <div className="px-5 py-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-xs text-blue-600">1</span>
                </div>
                <p className="text-sm text-gray-700">
                  Open this screen when boarding
                </p>
              </div>
            </div>
            <div className="px-5 py-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-xs text-blue-600">2</span>
                </div>
                <p className="text-sm text-gray-700">
                  Hold QR code steady for scanning
                </p>
              </div>
            </div>
            <div className="px-5 py-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-xs text-blue-600">3</span>
                </div>
                <p className="text-sm text-gray-700">Wait for confirmation beep</p>
              </div>
            </div>
            <div className="px-5 py-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-xs text-blue-600">4</span>
                </div>
                <p className="text-sm text-gray-700">
                  Repeat when exiting the bus
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle note (Unchanged) */}
        <p className="text-center text-xs text-gray-400">
          This code is unique to your account
        </p>
      </div>

      {/* Removed floating AI chat button - now accessed from home screen */}
    </div>
  );
}