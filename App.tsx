import { useState } from 'react';
import { PortalSelectionScreen } from './components/portal-selection-screen';  // NEW
import StudentApp from './student-app';
import { ParentApp } from './parent-app';  // NEW
import { DriverApp } from './driver-app';
import { AdminApp } from './admin-app';

type AppPortal = 'selection' | 'student' | 'parent' | 'driver' | 'admin';  // NEW

export default function App() {
  const [currentPortal, setCurrentPortal] = useState<AppPortal>('selection');  // NEW: Start with portal selection

  const handleSelectPortal = (portal: 'student' | 'parent' | 'driver' | 'admin') => {
    setCurrentPortal(portal);
  };

  const handleBackToPortalSelection = () => {
    setCurrentPortal('selection');
  };

  // Portal Selection Screen - NEW
  if (currentPortal === 'selection') {
    return <PortalSelectionScreen onSelectPortal={handleSelectPortal} />;
  }

  // Student App
  if (currentPortal === 'student') {
    return <StudentApp onBack={handleBackToPortalSelection} />;
  }

  // Parent App - NEW
  if (currentPortal === 'parent') {
    return <ParentApp onBack={handleBackToPortalSelection} />;
  }

  // Driver App
  if (currentPortal === 'driver') {
    return <DriverApp onBack={handleBackToPortalSelection} />;
  }

  // Admin App
  if (currentPortal === 'admin') {
    return <AdminApp onBack={handleBackToPortalSelection} />;
  }

  // Fallback
  return <PortalSelectionScreen onSelectPortal={handleSelectPortal} />;
}