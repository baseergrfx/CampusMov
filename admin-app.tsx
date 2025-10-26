import { useState } from 'react';
import { AdminLoginScreen } from './components/admin/admin-login-screen';
import { AdminDashboard } from './components/admin/admin-dashboard';

interface AdminAppProps {
  onBack: () => void;  // NEW
}

export function AdminApp({ onBack }: AdminAppProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <AdminLoginScreen onLogin={handleLogin} onBack={onBack} />;  // NEW: Pass onBack
  }

  return <AdminDashboard />;
}