import { Bus } from 'lucide-react';
import { Logo } from './logo';

export function SplashScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50">
      <div className="text-center space-y-8 px-4">
        {/* Logo */}
        <div className="flex justify-center">
          <Logo size="xl" />
        </div>

        {/* Brand Name */}
        <div className="space-y-2">
          <h1 className="text-gray-900 text-4xl tracking-tight">CampusMove</h1>
          <p className="text-gray-500 text-base max-w-md mx-auto">
            Smart Transport Solution
          </p>
        </div>

        {/* Loading indicator */}
        <div className="flex justify-center pt-4">
          <div className="flex space-x-1.5">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}