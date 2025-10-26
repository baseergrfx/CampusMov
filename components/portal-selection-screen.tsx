import { Button } from './ui/button';
import { GraduationCap, Users, Car, Shield, HelpCircle, Info, Phone } from 'lucide-react';
import { Logo } from './logo';

interface PortalSelectionScreenProps {
  onSelectPortal: (portal: 'student' | 'parent' | 'driver' | 'admin') => void;
}

export function PortalSelectionScreen({ onSelectPortal }: PortalSelectionScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4 pb-24">
        <div className="w-full max-w-md">
          {/* Logo & Branding */}
          <div className="text-center mb-12">
            <div className="mb-4 flex justify-center">
              <Logo size="xl" />
            </div>
            <h1 className="text-gray-900 text-3xl mb-2">CampusMove</h1>
            <p className="text-gray-600">Smart, Safe & Reliable University Transport</p>
          </div>

          {/* Portal Buttons */}
          <div className="space-y-4 mb-8">
            {/* Student Portal */}
            <Button
              onClick={() => onSelectPortal('student')}
              className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4 w-full">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-lg">I am a Student</span>
              </div>
            </Button>

            {/* Parent Portal */}
            <Button
              onClick={() => onSelectPortal('parent')}
              className="w-full h-16 bg-green-600 hover:bg-green-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4 w-full">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-lg">I am a Parent</span>
              </div>
            </Button>

            {/* Driver Portal */}
            <Button
              onClick={() => onSelectPortal('driver')}
              className="w-full h-16 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4 w-full">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Car className="w-6 h-6" />
                </div>
                <span className="text-lg">I am a Driver</span>
              </div>
            </Button>
          </div>

          {/* Admin Link */}
          <div className="text-center">
            <button
              onClick={() => onSelectPortal('admin')}
              className="text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              <span className="text-sm">Administrator Login</span>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-xs">
              © 2025 CampusMove. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar - NEW */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-around h-16 px-4">
          <button className="flex flex-col items-center justify-center flex-1 h-full transition-colors text-gray-600 hover:text-blue-600">
            <Info className="w-5 h-5 mb-1" />
            <span className="text-xs">About</span>
          </button>

          <button className="flex flex-col items-center justify-center flex-1 h-full transition-colors text-gray-600 hover:text-blue-600">
            <HelpCircle className="w-5 h-5 mb-1" />
            <span className="text-xs">Help</span>
          </button>

          <button className="flex flex-col items-center justify-center flex-1 h-full transition-colors text-gray-600 hover:text-blue-600">
            <Phone className="w-5 h-5 mb-1" />
            <span className="text-xs">Contact</span>
          </button>
        </div>
      </div>
    </div>
  );
}