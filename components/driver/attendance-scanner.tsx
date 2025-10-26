import { useState } from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, Camera, CheckCircle, XCircle, UserPlus } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import type { Student } from './driver-main-app';

interface AttendanceScannerProps {
  onBack: () => void;
  onScanSuccess: (studentId: string, action: 'check-in' | 'check-out') => void;
  onManualAttendance: () => void;  // NEW: Navigate to manual attendance
  students: Student[];
}

export function AttendanceScanner({ onBack, onScanSuccess, onManualAttendance, students }: AttendanceScannerProps) {
  const [scanResult, setScanResult] = useState<{
    type: 'success' | 'error';
    action?: 'check-in' | 'check-out';
    name?: string;
    message?: string;
  } | null>(null);

  // Simulate QR code scanning
  const handleScanSimulation = () => {
    // Randomly select a student for demo
    const pendingStudents = students.filter(s => s.status === 'pending');
    const checkedInStudents = students.filter(s => s.status === 'checked-in');
    
    const randomAction = Math.random() > 0.5 ? 'check-in' : 'check-out';
    
    if (randomAction === 'check-in' && pendingStudents.length > 0) {
      const randomStudent = pendingStudents[Math.floor(Math.random() * pendingStudents.length)];
      setScanResult({
        type: 'success',
        action: 'check-in',
        name: randomStudent.name,
      });
      onScanSuccess(randomStudent.studentId, 'check-in');
      
      // Auto-dismiss after 2 seconds
      setTimeout(() => {
        setScanResult(null);
      }, 2000);
    } else if (randomAction === 'check-out' && checkedInStudents.length > 0) {
      const randomStudent = checkedInStudents[Math.floor(Math.random() * checkedInStudents.length)];
      setScanResult({
        type: 'success',
        action: 'check-out',
        name: randomStudent.name,
      });
      onScanSuccess(randomStudent.studentId, 'check-out');
      
      // Auto-dismiss after 2 seconds
      setTimeout(() => {
        setScanResult(null);
      }, 2000);
    } else {
      // Simulate error (wrong bus)
      setScanResult({
        type: 'error',
        message: 'Error: Student Not on This Route',
      });
      
      // Auto-dismiss after 2 seconds
      setTimeout(() => {
        setScanResult(null);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-green-700"
            onClick={onBack}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1>Scan QR Code</h1>
        </div>
      </div>

      {/* Camera Viewfinder */}
      <div className="relative h-[calc(100vh-72px)] flex items-center justify-center">
        {/* Mock Camera View */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-90">
          {/* Camera grid overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-72 h-72">
              {/* Scanning frame corners */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-green-500"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-green-500"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-green-500"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-green-500"></div>
              
              {/* Scanning line animation */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-full h-1 bg-green-500 shadow-lg shadow-green-500/50 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Instruction Text */}
        {!scanResult && (
          <div className="absolute bottom-40 left-0 right-0 text-center px-4">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="p-4">
                <p className="text-gray-900">Please scan the student's QR code</p>
                <p className="text-gray-600 text-sm mt-1">Position the QR code within the frame</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Success/Error Overlay */}
        {scanResult && (
          <div className={`absolute inset-0 flex items-center justify-center ${
            scanResult.type === 'success' 
              ? scanResult.action === 'check-in' 
                ? 'bg-green-600' 
                : 'bg-red-600'
              : 'bg-red-600'
          } bg-opacity-95`}>
            <div className="text-center text-white px-4">
              {scanResult.type === 'success' ? (
                <>
                  <CheckCircle className="w-24 h-24 mx-auto mb-4" />
                  <h2 className="text-3xl mb-2">
                    {scanResult.action === 'check-in' ? 'CHECK-IN' : 'CHECK-OUT'}
                  </h2>
                  <p className="text-xl">{scanResult.name}</p>
                </>
              ) : (
                <>
                  <XCircle className="w-24 h-24 mx-auto mb-4" />
                  <h2 className="text-3xl mb-2">ERROR</h2>
                  <p className="text-xl">{scanResult.message}</p>
                </>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute bottom-8 left-0 right-0 px-4 space-y-3 z-10">
          {/* Manual Attendance Button - NEW */}
          <Button
            onClick={onManualAttendance}
            className="w-full bg-orange-600 hover:bg-orange-700 h-14"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Mark Manually
          </Button>

          {/* Demo Button (for testing - remove in production) */}
          <Button
            onClick={handleScanSimulation}
            className="w-full bg-green-600 hover:bg-green-700 h-14"
          >
            <Camera className="w-5 h-5 mr-2" />
            Simulate Scan (Demo)
          </Button>
        </div>
      </div>
    </div>
  );
}