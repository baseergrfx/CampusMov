import { useState } from 'react';
import { ChildDashboard } from './child-dashboard';
import { AttendanceTab } from './attendance-tab';
import { FeesTab } from './fees-tab';
import { ProfileTab } from './profile-tab';
import { NotificationLog } from './notification-log';
import { Home, ClipboardList, DollarSign, User } from 'lucide-react';

type ParentScreen = 'dashboard' | 'attendance' | 'fees' | 'profile' | 'notifications';

interface ParentMainAppProps {
  onLogout: () => void;
}

export function ParentMainApp({ onLogout }: ParentMainAppProps) {
  const [currentScreen, setCurrentScreen] = useState<ParentScreen>('dashboard');

  const navigateTo = (screen: ParentScreen) => {
    setCurrentScreen(screen);
  };

  // Show notification log (no bottom nav)
  if (currentScreen === 'notifications') {
    return <NotificationLog onBack={() => navigateTo('dashboard')} />;
  }

  return (
    <div className="relative">
      {/* Main Content */}
      {currentScreen === 'dashboard' && (
        <ChildDashboard onShowNotifications={() => navigateTo('notifications')} />
      )}
      {currentScreen === 'attendance' && <AttendanceTab />}
      {currentScreen === 'fees' && <FeesTab />}
      {currentScreen === 'profile' && <ProfileTab onLogout={onLogout} />}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-bottom">
        <div className="flex items-center justify-around h-16">
          <button
            onClick={() => navigateTo('dashboard')}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              currentScreen === 'dashboard'
                ? 'text-green-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Home className="w-6 h-6 mb-1" />
            <span className="text-xs">Home</span>
          </button>

          <button
            onClick={() => navigateTo('attendance')}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              currentScreen === 'attendance'
                ? 'text-green-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ClipboardList className="w-6 h-6 mb-1" />
            <span className="text-xs">Attendance</span>
          </button>

          <button
            onClick={() => navigateTo('fees')}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              currentScreen === 'fees'
                ? 'text-green-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <DollarSign className="w-6 h-6 mb-1" />
            <span className="text-xs">Fees</span>
          </button>

          <button
            onClick={() => navigateTo('profile')}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              currentScreen === 'profile'
                ? 'text-green-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <User className="w-6 h-6 mb-1" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
