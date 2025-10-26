import { useState } from 'react';
import { ParentLoginScreen } from './components/parent/parent-login-screen';
import { ParentMainApp } from './components/parent/parent-main-app';

type ParentAppScreen = 'login' | 'main';

interface ParentAppProps {
  onBack: () => void;
}

export function ParentApp({ onBack }: ParentAppProps) {
  const [currentScreen, setCurrentScreen] = useState<ParentAppScreen>('login');

  const handleLogin = () => {
    setCurrentScreen('main');
  };

  const handleLogout = () => {
    setCurrentScreen('login');
  };

  if (currentScreen === 'login') {
    return <ParentLoginScreen onLogin={handleLogin} onBack={onBack} />;
  }

  return <ParentMainApp onLogout={handleLogout} />;
}
