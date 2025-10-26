import { useState, useEffect } from 'react';
import { SplashScreen } from './components/splash-screen';
import { LoginScreen } from './components/login-screen';
import { ForgotPasswordScreen } from './components/forgot-password-screen';
import { MainApp } from './components/main-app';
import { Toaster } from './components/ui/sonner';

export type Screen = 
  | 'splash' 
  | 'login' 
  | 'forgot-password' 
  | 'main';

interface StudentAppProps {
  onBack: () => void;  // NEW
}

export default function StudentApp({ onBack }: StudentAppProps) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Show splash screen for 3 seconds
    const timer = setTimeout(() => {
      setCurrentScreen('login');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('main');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login');
  };

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  if (currentScreen === 'splash') {
    return <SplashScreen />;
  }

  if (currentScreen === 'forgot-password') {
    return <ForgotPasswordScreen onBack={() => navigateTo('login')} />;
  }

  if (!isLoggedIn) {
    return (
      <>
        <LoginScreen 
          onLogin={handleLogin}
          onBack={onBack}  // NEW: Pass onBack to LoginScreen
        />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <MainApp onLogout={handleLogout} />
      <Toaster />
    </>
  );
}