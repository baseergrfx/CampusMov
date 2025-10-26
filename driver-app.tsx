import { useState, useEffect } from 'react';
import { DriverSplashScreen } from './components/driver/driver-splash-screen';
import { LocationPermissionScreen } from './components/driver/location-permission-screen';
import { DriverLoginScreen } from './components/driver/driver-login-screen';
import { DriverHomeDashboard } from './components/driver/driver-home-dashboard';
import { DriverProfileScreen } from './components/driver/driver-profile-screen';
import { SelectVehicleScreen } from './components/driver/select-vehicle-screen';
import { SelectRouteScreen } from './components/driver/select-route-screen';
import { DriverMainApp } from './components/driver/driver-main-app';
import { EndTripSummary } from './components/driver/end-trip-summary';

export type DriverScreen = 
  | 'splash' 
  | 'location-permission'
  | 'login' 
  | 'home'
  | 'profile'
  | 'select-vehicle'
  | 'select-route'
  | 'live-trip'
  | 'trip-summary';

interface DriverAppProps {
  onBack: () => void;
}

export function DriverApp({ onBack }: DriverAppProps) {
  const [currentScreen, setCurrentScreen] = useState<DriverScreen>('splash');
  const [isFirstTime, setIsFirstTime] = useState(true); // Track first-time user
  const [selectedVehicle, setSelectedVehicle] = useState<string>('');
  const [selectedVehicleNumber, setSelectedVehicleNumber] = useState<string>('');
  const [selectedRoute, setSelectedRoute] = useState<string>('');
  const [currentTab, setCurrentTab] = useState<'home' | 'profile'>('home');

  useEffect(() => {
    // Show splash screen for 3 seconds
    const timer = setTimeout(() => {
      // For first-time users, show location permission
      // For returning users, go straight to login
      if (isFirstTime) {
        setCurrentScreen('location-permission');
      } else {
        setCurrentScreen('login');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isFirstTime]);

  const handleLocationPermission = () => {
    setIsFirstTime(false);
    setCurrentScreen('login');
  };

  const handleLogin = () => {
    setCurrentScreen('home');
    setCurrentTab('home');
  };

  const handleLogout = () => {
    setCurrentScreen('login');
  };

  const handleStartTrip = () => {
    setCurrentScreen('select-vehicle');
  };

  const handleSelectVehicle = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
    // Map vehicle ID to vehicle number (in real app, this would come from API)
    const vehicleNumbers: Record<string, string> = {
      '1': 'PSR-101',
      '2': 'PSR-102',
      '3': 'PSR-103',
    };
    setSelectedVehicleNumber(vehicleNumbers[vehicleId] || 'PSR-101');
    setCurrentScreen('select-route');
  };

  const handleStartRoute = (routeId: string) => {
    setSelectedRoute(routeId);
    setCurrentScreen('live-trip');
  };

  const handleEndTrip = () => {
    setCurrentScreen('trip-summary');
  };

  const handleReturnHome = () => {
    setCurrentScreen('home');
    setCurrentTab('home');
  };

  const handleTabChange = (tab: 'home' | 'profile') => {
    setCurrentTab(tab);
    if (tab === 'home') {
      setCurrentScreen('home');
    } else {
      setCurrentScreen('profile');
    }
  };

  // Splash Screen
  if (currentScreen === 'splash') {
    return <DriverSplashScreen />;
  }

  // Location Permission (First-time only)
  if (currentScreen === 'location-permission') {
    return <LocationPermissionScreen onAllow={handleLocationPermission} />;
  }

  // Login Screen
  if (currentScreen === 'login') {
    return <DriverLoginScreen onLogin={handleLogin} onBack={onBack} />;
  }

  // Home Dashboard (Off Duty)
  if (currentScreen === 'home') {
    return (
      <DriverHomeDashboard
        driverName="Ahmed"
        onStartTrip={handleStartTrip}
        currentTab={currentTab}
        onTabChange={handleTabChange}
      />
    );
  }

  // Profile Screen
  if (currentScreen === 'profile') {
    return (
      <DriverProfileScreen
        driverName="Ahmed"
        currentTab={currentTab}
        onTabChange={handleTabChange}
        onLogout={handleLogout}
      />
    );
  }

  // Select Vehicle (Step 1)
  if (currentScreen === 'select-vehicle') {
    return (
      <SelectVehicleScreen 
        onSelectVehicle={handleSelectVehicle}
        onBack={handleReturnHome}
      />
    );
  }

  // Select Route (Step 2)
  if (currentScreen === 'select-route') {
    return (
      <SelectRouteScreen
        vehicleNumber={selectedVehicleNumber}
        onStartRoute={handleStartRoute}
        onBack={() => setCurrentScreen('select-vehicle')}
      />
    );
  }

  // Live Trip (On Duty)
  if (currentScreen === 'live-trip') {
    return (
      <DriverMainApp
        vehicle={selectedVehicleNumber}
        trip={selectedRoute}
        onEndTrip={handleEndTrip}
      />
    );
  }

  // Trip Summary
  if (currentScreen === 'trip-summary') {
    return <EndTripSummary onReturnHome={handleReturnHome} />;
  }

  // Fallback
  return <DriverLoginScreen onLogin={handleLogin} onBack={onBack} />;
}