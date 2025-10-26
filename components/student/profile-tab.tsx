import { 
  DollarSign, 
  MapPin, 
  Bell, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  User
} from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import type { MainScreen } from '../main-app';

interface ProfileTabProps {
  onNavigate: (screen: MainScreen) => void;
  onLogout?: () => void;
}

export function ProfileTab({ onNavigate, onLogout }: ProfileTabProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header with Profile Info */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-6 pb-8">
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20 border-4 border-white/30">
            <AvatarFallback className="bg-white text-blue-600 text-2xl">AK</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl mb-1">Ahmad Khan</h1>
            <p className="text-blue-100">Student ID: 12345</p>
            <p className="text-blue-100 text-sm">Route A1 - GT Road</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 -mt-4 space-y-4">
        {/* Transport & Route Section */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            <MenuItem
              icon={<DollarSign className="w-5 h-5 text-green-600" />}
              title="My Transport Fee"
              description="View fee status and payment history"
              onClick={() => onNavigate('transport-fee')}
            />
            <Divider />
            <MenuItem
              icon={<MapPin className="w-5 h-5 text-blue-600" />}
              title="My Route Details"
              description="See scheduled stops and times"
              onClick={() => onNavigate('route-details')}
            />
          </CardContent>
        </Card>

        {/* Settings Section */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            <MenuItem
              icon={<Bell className="w-5 h-5 text-purple-600" />}
              title="Notification Settings"
              description="Control proximity alarm & alerts"
              onClick={() => onNavigate('notification-settings')}
            />
          </CardContent>
        </Card>

        {/* Support Section */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            <MenuItem
              icon={<HelpCircle className="w-5 h-5 text-orange-600" />}
              title="Help & Support"
              description="FAQs and contact information"
              onClick={() => onNavigate('help-support')}
            />
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full h-14 border-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
        >
          <LogOut className="w-5 h-5 mr-2" />
          <span className="font-medium">Logout</span>
        </Button>

        {/* Footer Info */}
        <div className="text-center text-gray-400 text-xs py-4">
          <p>CampusMove v1.0</p>
          <p className="mt-1">© 2025 City University Transport</p>
        </div>
      </div>
    </div>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

function MenuItem({ icon, title, description, onClick }: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
    >
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1 text-left">
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-500 mt-0.5">{description}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </button>
  );
}

function Divider() {
  return <div className="border-t border-gray-100"></div>;
}
