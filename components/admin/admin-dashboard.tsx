import { useState } from 'react';
import { LiveFleetDashboard } from './live-fleet-dashboard';
import { RouteManagement } from './route-management';
import { StudentManagement } from './student-management';
import { DriverFleetManagement } from './driver-fleet-management';
import { AnalyticsReports } from './analytics-reports';
import { CommunicationHub } from './communication-hub';
import { SettingsBilling } from './settings-billing';
import { Button } from '../ui/button';
import { Logo } from '../logo';
import { 
  LayoutDashboard, 
  Map, 
  Users, 
  Bus, 
  BarChart3, 
  MessageSquare, 
  Settings,
  LogOut,
  Shield
} from 'lucide-react';

export type AdminScreen = 
  | 'dashboard'
  | 'routes'
  | 'students'
  | 'drivers'
  | 'analytics'
  | 'communication'
  | 'settings';

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [currentScreen, setCurrentScreen] = useState<AdminScreen>('dashboard');

  const menuItems = [
    { id: 'dashboard' as AdminScreen, label: 'Fleet Overview', icon: LayoutDashboard },
    { id: 'routes' as AdminScreen, label: 'Route Management', icon: Map },
    { id: 'students' as AdminScreen, label: 'Student Management', icon: Users },
    { id: 'drivers' as AdminScreen, label: 'Driver & Fleet', icon: Bus },
    { id: 'analytics' as AdminScreen, label: 'Analytics & Reports', icon: BarChart3 },
    { id: 'communication' as AdminScreen, label: 'Communication', icon: MessageSquare },
    { id: 'settings' as AdminScreen, label: 'Settings & Billing', icon: Settings },
  ];

  const renderContent = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <LiveFleetDashboard />;
      case 'routes':
        return <RouteManagement />;
      case 'students':
        return <StudentManagement />;
      case 'drivers':
        return <DriverFleetManagement />;
      case 'analytics':
        return <AnalyticsReports />;
      case 'communication':
        return <CommunicationHub />;
      case 'settings':
        return <SettingsBilling />;
      default:
        return <LiveFleetDashboard />;
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-lg p-1">
              <Logo size="sm" />
            </div>
            <div>
              <h1 className="text-lg">CampusMove</h1>
              <p className="text-xs text-slate-400">Admin Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentScreen === item.id
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-700">
          <Button
            onClick={onLogout}
            variant="ghost"
            className="w-full justify-start text-slate-300 hover:bg-slate-700/50 hover:text-white"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
}