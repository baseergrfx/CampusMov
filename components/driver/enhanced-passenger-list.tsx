import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { ArrowLeft, Search, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

interface Student {
  id: string;
  name: string;
  stop: string;
  status: 'checked-in' | 'pending' | 'absent' | 'manual-pending';
  checkInTime?: string;
}

interface EnhancedPassengerListProps {
  onBack: () => void;
}

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Ahmed Khan',
    stop: 'Karkhano Market',
    status: 'checked-in',
    checkInTime: '7:42 AM',
  },
  {
    id: '2',
    name: 'Maria Noor',
    stop: 'Phase 3 Chowk',
    status: 'absent',
  },
  {
    id: '3',
    name: 'Ebad ur Rehman',
    stop: 'University Town',
    status: 'pending',
  },
  {
    id: '4',
    name: 'Fatima Ali',
    stop: 'University Town',
    status: 'checked-in',
    checkInTime: '7:48 AM',
  },
  {
    id: '5',
    name: 'Hassan Ahmed',
    stop: 'Tehkal Bala',
    status: 'pending',
  },
  {
    id: '6',
    name: 'Aisha Malik',
    stop: 'Abdara Road',
    status: 'pending',
  },
];

export function EnhancedPassengerList({ onBack }: EnhancedPassengerListProps) {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successStudentName, setSuccessStudentName] = useState('');

  const handleManualCheckIn = (studentId: string, studentName: string) => {
    // Update student status to manual-pending (awaiting admin approval)
    setStudents(students.map(student => 
      student.id === studentId
        ? { ...student, status: 'manual-pending' as const }
        : student
    ));

    setSuccessStudentName(studentName);
    setShowSuccessAlert(true);

    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 3000);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.stop.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const checkedInCount = students.filter(s => s.status === 'checked-in').length;
  const pendingCount = students.filter(s => s.status === 'pending').length;
  const absentCount = students.filter(s => s.status === 'absent').length;
  const manualPendingCount = students.filter(s => s.status === 'manual-pending').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 shadow-md">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-green-700"
            onClick={onBack}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-xl">Passenger List</h1>
            <p className="text-green-100 text-sm">Manual Attendance</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search students or stops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>
      </div>

      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="p-4">
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-900">
              Manual check-in request for <strong>{successStudentName}</strong> sent to admin for approval.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Stats */}
      <div className="p-4">
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-4 gap-2 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">{checkedInCount}</p>
                <p className="text-xs text-gray-600">Checked In</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
                <p className="text-xs text-gray-600">Pending</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{absentCount}</p>
                <p className="text-xs text-gray-600">Absent</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{manualPendingCount}</p>
                <p className="text-xs text-gray-600">Manual</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student List */}
      <div className="px-4 pb-4 space-y-2">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-gray-900 font-medium">{student.name}</h3>
                    <p className="text-sm text-gray-600">{student.stop}</p>
                  </div>
                  
                  {/* Status Badge */}
                  <div>
                    {student.status === 'checked-in' && (
                      <Badge className="bg-green-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Checked In
                      </Badge>
                    )}
                    {student.status === 'pending' && (
                      <Badge className="bg-orange-600">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                    {student.status === 'absent' && (
                      <Badge className="bg-red-600">
                        <XCircle className="w-3 h-3 mr-1" />
                        Absent
                      </Badge>
                    )}
                    {student.status === 'manual-pending' && (
                      <Badge className="bg-blue-600">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Pending Approval
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Check-in Time or Action */}
                {student.status === 'checked-in' && student.checkInTime && (
                  <p className="text-xs text-green-600">✓ {student.checkInTime}</p>
                )}

                {student.status === 'pending' && (
                  <Button
                    onClick={() => handleManualCheckIn(student.id, student.name)}
                    size="sm"
                    className="w-full mt-2 bg-blue-600 hover:bg-blue-700"
                  >
                    Mark Check-In Manually
                  </Button>
                )}

                {student.status === 'manual-pending' && (
                  <p className="text-xs text-blue-600 mt-2">
                    ⏳ Awaiting admin approval...
                  </p>
                )}

                {student.status === 'absent' && (
                  <p className="text-xs text-red-600 mt-2">
                    ✗ Student reported absent
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredStudents.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No students found</p>
          </div>
        )}
      </div>

      {/* Info Footer */}
      <div className="p-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <p className="text-sm text-blue-900">
              <span className="font-medium">Manual Check-In:</span> Use this when a student forgets their QR code. All manual check-ins require admin approval for security.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
