import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  User, 
  Phone, 
  Mail, 
  Bus, 
  TrendingUp, 
  Award, 
  LogOut, 
  Home as HomeIcon,
  ChevronRight,
  Clock,
  MapPin
} from 'lucide-react';

interface DriverProfileScreenProps {
  driverName: string;
  currentTab?: 'home' | 'profile';
  onTabChange?: (tab: 'home' | 'profile') => void;
  onLogout: () => void;
}

export function DriverProfileScreen({ driverName, currentTab = 'profile', onTabChange, onLogout }: DriverProfileScreenProps) {
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
                <AvatarImage src="" alt={driverName} />
                <AvatarFallback className="bg-gradient-to-br from-green-600 to-emerald-600 text-white text-2xl">
                  {driverName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {/* Edit button overlay */}
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center border-2 border-white shadow-md hover:bg-gray-800 transition-colors">
                <User className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Driver Info */}
            <h2 className="text-gray-900 text-xl mb-1">{driverName}</h2>
            <p className="text-gray-500 text-sm">Driver ID: D-2001</p>
            <div className="mt-3">
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0">Active</Badge>
            </div>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="mt-6">
          <div className="px-6 py-2">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Contact Information</p>
          </div>
          
          <div className="bg-white border-y border-gray-200">
            <div className="px-6 py-4 flex items-center gap-4 border-b border-gray-100">
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                <Phone className="w-5 h-5 text-gray-700" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-gray-900">+92 300 1234567</p>
              </div>
            </div>
            
            <div className="px-6 py-4 flex items-center gap-4 border-b border-gray-100">
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                <Mail className="w-5 h-5 text-gray-700" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-gray-900 text-sm">ahmed.khan@campusmove.com</p>
              </div>
            </div>
            
            <div className="px-6 py-4 flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                <Bus className="w-5 h-5 text-gray-700" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Assigned Vehicle</p>
                <p className="text-gray-900">PSR-101</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="mt-6">
          <div className="px-6 py-2">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Performance</p>
          </div>
          
          <div className="bg-white border-y border-gray-200 px-6 py-6">
            {/* Overall Score */}
            <div className="text-center mb-6 pb-6 border-b border-gray-100">
              <p className="text-sm text-gray-500 mb-2">Overall Driving Score</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl text-green-600">9.4</span>
                <span className="text-gray-400">/10</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-2">
                  <Bus className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-2xl text-gray-900 mb-1">156</p>
                <p className="text-xs text-gray-500">Total Trips</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-2xl text-green-600 mb-1">94%</p>
                <p className="text-xs text-gray-500">On-Time</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-2">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-2xl text-gray-900 mb-1">6.2k</p>
                <p className="text-xs text-gray-500">Students</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-2xl text-gray-900 mb-1">42m</p>
                <p className="text-xs text-gray-500">Avg. Time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-6">
          <div className="px-6 py-2">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Achievements</p>
          </div>
          
          <div className="bg-white border-y border-gray-200 px-6 py-6">
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-sm">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <p className="text-xs text-gray-600">Perfect Month</p>
              </div>
              
              <div className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-sm">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <p className="text-xs text-gray-600">Top Driver</p>
              </div>
              
              <div className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-sm">
                  <Bus className="w-7 h-7 text-white" />
                </div>
                <p className="text-xs text-gray-600">100 Trips</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="mt-6">
          <div className="px-6 py-2">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Account</p>
          </div>
          
          <div className="bg-white border-y border-gray-200">
            <button className="w-full px-6 py-4 flex items-center gap-4 hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100">
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-gray-700" />
              </div>
              <span className="flex-1 text-left text-gray-900">Payment History</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button
              onClick={onLogout}
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
        <div className="px-6 py-4 text-center mb-6">
          <p className="text-xs text-gray-400">CampusMove Driver v1.0.0</p>
        </div>
      </div>

      {/* Bottom Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 safe-bottom">
        <div className="flex items-center justify-around h-16">
          <button
            onClick={() => onTabChange?.('home')}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              currentTab === 'home'
                ? 'text-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <HomeIcon className="w-6 h-6 mb-1" />
            <span className="text-xs">Home</span>
          </button>

          <button
            onClick={() => onTabChange?.('profile')}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              currentTab === 'profile'
                ? 'text-green-600'
                : 'text-gray-500 hover:text-gray-700'
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
