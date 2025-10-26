import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ChevronLeft, Volume2, ChevronRight, Settings } from 'lucide-react';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import type { MainScreen } from './main-app';
import { useState, useEffect } from 'react';

interface NotificationSettingsScreenProps {
  onNavigate: (screen: MainScreen) => void;
}

export function NotificationSettingsScreen({ onNavigate }: NotificationSettingsScreenProps) {
  const [settings, setSettings] = useState(() => {
    // Load saved proximity alarm setting
    const savedAlarm = localStorage.getItem('proximityAlarmEnabled');
    return {
      busStarted: true,
      proximityAlert: true,
      proximityAlarm: savedAlarm !== null ? JSON.parse(savedAlarm) : true,
      checkInOut: true,
      adminAnnouncements: true, // locked on
    };
  });

  // Listen for changes from alarm settings screen
  useEffect(() => {
    const handleStorageChange = () => {
      const savedAlarm = localStorage.getItem('proximityAlarmEnabled');
      if (savedAlarm !== null) {
        setSettings(prev => ({ ...prev, proximityAlarm: JSON.parse(savedAlarm) }));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const toggleSetting = (key: keyof typeof settings) => {
    if (key === 'adminAnnouncements') return; // locked
    
    const newValue = !settings[key];
    setSettings(prev => ({ ...prev, [key]: newValue }));
    
    // Save proximity alarm setting to localStorage
    if (key === 'proximityAlarm') {
      localStorage.setItem('proximityAlarmEnabled', JSON.stringify(newValue));
      // Dispatch event for same-window updates
      window.dispatchEvent(new Event('storage'));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Clean iOS Style */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('profile')}
            className="hover:bg-gray-100 -ml-2"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </Button>
          <h1 className="text-gray-900">Notification Settings</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Push Notifications</CardTitle>
            <CardDescription>
              Choose which notifications you want to receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Bus Started Route */}
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <Label htmlFor="bus-started" className="text-gray-900">
                  Bus Started Route
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Get an alert when your bus begins its route
                </p>
              </div>
              <Switch
                id="bus-started"
                checked={settings.busStarted}
                onCheckedChange={() => toggleSetting('busStarted')}
              />
            </div>

            {/* Proximity Alert */}
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <Label htmlFor="proximity" className="text-gray-900">
                  Proximity Alert
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Get an alert when the bus is 10 minutes away
                </p>
              </div>
              <Switch
                id="proximity"
                checked={settings.proximityAlert}
                onCheckedChange={() => toggleSetting('proximityAlert')}
              />
            </div>

            {/* Proximity Alarm */}
            <button
              onClick={() => onNavigate('alarm-settings')}
              className="w-full flex items-center justify-between hover:bg-gray-50 transition-colors -mx-6 px-6 py-1 rounded-lg"
            >
              <div className="flex-1 pr-4 text-left">
                <div className="flex items-center gap-2">
                  <Label className="text-gray-900 cursor-pointer">
                    Proximity Alarm
                  </Label>
                  <Volume2 className="w-4 h-4 text-orange-600" />
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Customize alarm distance, time, and sound
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {settings.proximityAlarm ? 'On' : 'Off'}
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            {/* Check-In/Out Confirmation */}
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <Label htmlFor="check-in-out" className="text-gray-900">
                  Check-In/Out Confirmation
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Get an alert confirming your attendance scan
                </p>
              </div>
              <Switch
                id="check-in-out"
                checked={settings.checkInOut}
                onCheckedChange={() => toggleSetting('checkInOut')}
              />
            </div>

            {/* Admin Announcements - Locked */}
            <div className="flex items-center justify-between opacity-75">
              <div className="flex-1 pr-4">
                <Label htmlFor="admin" className="text-gray-900">
                  Admin Announcements
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Important delays or university-wide transport news (Required)
                </p>
              </div>
              <Switch
                id="admin"
                checked={settings.adminAnnouncements}
                disabled
              />
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <p className="text-blue-900 text-sm">
              <span>Admin announcements cannot be disabled as they contain critical information about transport services.</span>
            </p>
          </CardContent>
        </Card>

        {/* Proximity Alarm Info Card */}
        {settings.proximityAlarm && (
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <Volume2 className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-orange-900 font-medium text-sm">Proximity Alarm Enabled</p>
                  <p className="text-orange-800 text-xs">
                    Jab bus 1km (2 minutes) door hogi, aap ke phone par loud alarm bajega. Yeh normal notification se zyada effective hai aur ensure karta hai ke aap bus miss na karein.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}