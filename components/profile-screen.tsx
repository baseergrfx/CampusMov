import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { 
  ChevronRight, 
  MapPin, 
  Calendar, 
  CreditCard, 
  Bell, 
  HelpCircle, 
  LogOut,
  User
} from 'lucide-react';
import type { MainScreen } from './main-app';
import { useState } from 'react';

interface ProfileScreenProps {
  onNavigate: (screen: MainScreen) => void;
  onLogout?: () => void;
}

export function ProfileScreen({ onNavigate, onLogout }: ProfileScreenProps) {
  const accountMenuItems = [
    {
      icon: MapPin,
      label: 'My Route Details',
      screen: 'route-details' as MainScreen,
    },
    {
      icon: Calendar,
      label: 'Attendance History',
      screen: 'attendance-history' as MainScreen,
    },
    {
      icon: CreditCard,
      label: 'Transport Fee',
      screen: 'transport-fee' as MainScreen,
    },
  ];

  const settingsMenuItems = [
    {
      icon: Bell,
      label: 'Notification Settings',
      screen: 'notification-settings' as MainScreen,
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      screen: 'help-support' as MainScreen,
    },
  ];

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header - Clean iOS Style */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-3">
          <h1 className="text-center text-gray-900">Profile</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto">
        {/* Profile Section - Hero */}
        <div className="bg-white px-6 py-8">
          <div className="flex flex-col items-center text-center">
            {/* Profile Picture */}
            <div className="relative mb-4">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage src="" alt="Ahmed Khan" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-2xl">
                  AK
                </AvatarFallback>
              </Avatar>
              {/* Edit button overlay - subtle */}
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center border-2 border-white shadow-md hover:bg-gray-800 transition-colors">
                <User className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Student Info */}
            <h2 className="text-gray-900 text-xl mb-1">Ahmed Khan</h2>
            <p className="text-gray-500 text-sm">STU-2024-12345</p>
            <div className="mt-3 px-4 py-1.5 bg-blue-50 rounded-full">
              <p className="text-blue-700 text-sm">Route #42 - Campus Route</p>
            </div>
          </div>
        </div>

        {/* Account Section */}
        <div className="mt-6">
          <div className="px-6 py-2">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Account</p>
          </div>
          
          <div className="bg-white border-y border-gray-200">
            {accountMenuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => onNavigate(item.screen)}
                className="w-full px-6 py-4 flex items-center gap-4 hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-gray-700" />
                </div>
                <span className="flex-1 text-left text-gray-900">{item.label}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Settings Section */}
        <div className="mt-6">
          <div className="px-6 py-2">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Settings</p>
          </div>
          
          <div className="bg-white border-y border-gray-200">
            {settingsMenuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => onNavigate(item.screen)}
                className="w-full px-6 py-4 flex items-center gap-4 hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-gray-700" />
                </div>
                <span className="flex-1 text-left text-gray-900">{item.label}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Logout Section */}
        <div className="mt-6 mb-6">
          <div className="bg-white border-y border-gray-200">
            <button
              onClick={() => setIsLogoutDialogOpen(true)}
              className="w-full px-6 py-4 flex items-center gap-4 hover:bg-red-50 active:bg-red-100 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                <LogOut className="w-5 h-5 text-red-600" />
              </div>
              <span className="flex-1 text-left text-red-600">Logout</span>
              <ChevronRight className="w-5 h-5 text-red-400" />
            </button>
          </div>
        </div>

        {/* App Version */}
        <div className="px-6 py-4 text-center">
          <p className="text-xs text-gray-400">CampusMove Student v1.0.0</p>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to logout? This will end your session.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setIsLogoutDialogOpen(false);
                if (onLogout) onLogout();
              }}
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}