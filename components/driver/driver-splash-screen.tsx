import { Bus } from 'lucide-react';
import { Logo } from '../logo';

export function DriverSplashScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-600 via-green-700 to-green-800">
      <div className="text-center space-y-8 px-4">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center shadow-2xl p-6">
              <Logo size="lg" />
            </div>
            {/* Animated ring */}
            <div className="absolute inset-0 rounded-3xl border-4 border-white/30 animate-ping"></div>
          </div>
        </div>

        {/* Brand Name */}
        <div className="space-y-2">
          <h1 className="text-white text-4xl tracking-tight">CampusMove</h1>
          <p className="text-green-100 text-xl">Driver Portal</p>
          <p className="text-green-200 text-sm mt-4">
            Manage Routes • Track Attendance • Stay Connected
          </p>
        </div>

        {/* Loading indicator */}
        <div className="flex justify-center pt-4">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}