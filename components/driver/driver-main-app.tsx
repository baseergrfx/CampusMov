import { useState } from 'react';
import { LiveTripDashboard } from './live-trip-dashboard';
import { AttendanceScanner } from './attendance-scanner';
import { EnhancedPassengerList } from './enhanced-passenger-list';
import { SendDelayNotification } from './send-delay-notification';
import { ManualAttendanceScreen } from './manual-attendance-screen';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';

export type DriverMainScreen = 
  | 'live-trip'
  | 'scanner' 
  | 'passenger-list'
  | 'send-delay'
  | 'manual-attendance';

interface DriverMainAppProps {
  vehicle: string;
  trip: string;
  onEndTrip: () => void;
}

export interface Student {
  id: string;
  name: string;
  studentId: string;
  status: 'pending' | 'checked-in' | 'checked-out';
  checkInTime?: string;
  checkOutTime?: string;
}

export function DriverMainApp({ vehicle, trip, onEndTrip }: DriverMainAppProps) {
  const [currentScreen, setCurrentScreen] = useState<DriverMainScreen>('live-trip');
  const [showEndTripDialog, setShowEndTripDialog] = useState(false);
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'Ahmed Khan', studentId: 'STU-2024-001', status: 'pending' },
    { id: '2', name: 'Maria Shafqat', studentId: 'STU-2024-002', status: 'pending' },
    { id: '3', name: 'Ebad ur Rehman', studentId: 'STU-2024-003', status: 'pending' },
    { id: '4', name: 'Sarah Ali', studentId: 'STU-2024-004', status: 'pending' },
    { id: '5', name: 'Usman Tariq', studentId: 'STU-2024-005', status: 'pending' },
    { id: '6', name: 'Fatima Noor', studentId: 'STU-2024-006', status: 'pending' },
  ]);

  const navigateTo = (screen: DriverMainScreen) => {
    setCurrentScreen(screen);
  };

  const handleScanSuccess = (studentId: string, action: 'check-in' | 'check-out') => {
    const now = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });

    setStudents(prev => prev.map(student => {
      if (student.studentId === studentId) {
        if (action === 'check-in') {
          return { ...student, status: 'checked-in', checkInTime: now };
        } else {
          return { ...student, status: 'checked-out', checkOutTime: now };
        }
      }
      return student;
    }));
  };

  const handleEndTripClick = () => {
    setShowEndTripDialog(true);
  };

  const confirmEndTrip = () => {
    setShowEndTripDialog(false);
    onEndTrip();
  };

  // Scanner Screen
  if (currentScreen === 'scanner') {
    return (
      <AttendanceScanner 
        onBack={() => navigateTo('live-trip')}
        onScanSuccess={handleScanSuccess}
        onManualAttendance={() => navigateTo('manual-attendance')}
        students={students}
      />
    );
  }

  // Enhanced Passenger List
  if (currentScreen === 'passenger-list') {
    return (
      <EnhancedPassengerList 
        onBack={() => navigateTo('live-trip')}
      />
    );
  }

  // Send Delay Notification
  if (currentScreen === 'send-delay') {
    return (
      <SendDelayNotification 
        onBack={() => navigateTo('live-trip')}
      />
    );
  }

  // Manual Attendance
  if (currentScreen === 'manual-attendance') {
    return (
      <ManualAttendanceScreen 
        onBack={() => navigateTo('scanner')}
        currentStop="Block D"
      />
    );
  }

  // Main Live Trip Dashboard (Redesigned)
  return (
    <>
      <LiveTripDashboard 
        onScanQR={() => navigateTo('scanner')}
        onSendDelay={() => navigateTo('send-delay')}
        onOpenPassengerList={() => navigateTo('passenger-list')}
        onEndTrip={handleEndTripClick}
      />

      {/* End Trip Confirmation Dialog */}
      <AlertDialog open={showEndTripDialog} onOpenChange={setShowEndTripDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>End Trip?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to end this trip? This action will complete the route and show your trip summary.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmEndTrip}
              className="bg-red-600 hover:bg-red-700"
            >
              Yes, End Trip
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}