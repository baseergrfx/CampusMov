import { useState } from 'react';
import { FigmaHomeDashboard } from './figma-home-dashboard';
import { QRCodeScreen } from './qr-code-screen';
import { ProfileScreen } from './profile-screen';
import { RouteDetailsScreen } from './route-details-screen';
import { AttendanceHistoryScreen } from './attendance-history-screen';
import { ReportAbsenceScreen } from './report-absence-screen';
import { TransportFeeScreen } from './transport-fee-screen';
import { NotificationSettingsScreen } from './notification-settings-screen';
import { AlarmSettingsScreen } from './alarm-settings-screen';
import { HelpSupportScreen } from './help-support-screen';
import { NotificationsScreen } from './notifications-screen';
import { AIAssistantScreen } from './ai-assistant-screen';

export type MainScreen = 
  | 'home' 
  | 'qr' 
  | 'profile' 
  | 'route-details'
  | 'attendance-history'
  | 'report-absence'
  | 'transport-fee'
  | 'notification-settings'
  | 'alarm-settings'
  | 'help-support'
  | 'notifications'
  | 'ai-assistant';

interface MainAppProps {
  onLogout?: () => void;
}

export function MainApp({ onLogout }: MainAppProps) {
  const [currentScreen, setCurrentScreen] = useState<MainScreen>('home');

  const navigateTo = (screen: MainScreen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <FigmaHomeDashboard onNavigate={navigateTo} />;
      case 'qr':
        return <QRCodeScreen onNavigate={navigateTo} />;
      case 'profile':
        return <ProfileScreen onNavigate={navigateTo} onLogout={onLogout} />;
      case 'route-details':
        return <RouteDetailsScreen onNavigate={navigateTo} />;
      case 'attendance-history':
        return <AttendanceHistoryScreen onNavigate={navigateTo} />;
      case 'report-absence':
        return <ReportAbsenceScreen onNavigate={navigateTo} />;
      case 'transport-fee':
        return <TransportFeeScreen onNavigate={navigateTo} />;
      case 'notification-settings':
        return <NotificationSettingsScreen onNavigate={navigateTo} />;
      case 'alarm-settings':
        return <AlarmSettingsScreen onNavigate={navigateTo} />;
      case 'help-support':
        return <HelpSupportScreen onNavigate={navigateTo} />;
      case 'notifications':
        return <NotificationsScreen onNavigate={navigateTo} />;
      case 'ai-assistant':
        return <AIAssistantScreen onBack={() => navigateTo('home')} />;
      default:
        return <FigmaHomeDashboard onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="h-screen bg-gray-50 overflow-auto">
      {renderScreen()}
    </div>
  );
}