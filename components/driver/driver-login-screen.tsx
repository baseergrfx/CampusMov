import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';
import { Bus, ArrowLeft } from 'lucide-react';
import { Logo } from '../logo';

interface DriverLoginScreenProps {
  onLogin: () => void;
  onBack: () => void;  // NEW
}

export function DriverLoginScreen({ onLogin, onBack }: DriverLoginScreenProps) {
  const [driverId, setDriverId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
      {/* Back Button - NEW */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onBack}
        className="absolute top-4 left-4 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-6 h-6" />
      </Button>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="mb-4 flex justify-center">
            <Logo size="lg" />
          </div>
          <h1 className="text-gray-900 text-2xl mb-1">Driver Portal</h1>
          <p className="text-gray-600">Manage your trips safely</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="driverId">Driver ID / Phone Number</Label>
            <Input
              id="driverId"
              type="text"
              placeholder="Enter your driver ID or phone"
              value={driverId}
              onChange={(e) => setDriverId(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            Login
          </Button>
          <Button
            type="button"
            variant="link"
            className="w-full"
          >
            Forgot Password?
          </Button>
        </form>
      </div>
    </div>
  );
}