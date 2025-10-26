import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeft, UserCheck, UserX, Search, AlertCircle } from 'lucide-react';
import { Input } from '../ui/input';
import { Alert, AlertDescription } from '../ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  stop: string;
  status: 'not-aboard' | 'checked-in' | 'checked-out';
}

interface ManualAttendanceScreenProps {
  onBack: () => void;
  currentStop: string;
}

const mockStudents: Student[] = [
  { id: '1', name: 'Ebad ur Rehman', rollNumber: 'CS-2021-001', stop: 'Block D', status: 'not-aboard' },
  { id: '2', name: 'Maria Shafqat', rollNumber: 'CS-2021-045', stop: 'Block D', status: 'checked-in' },
  { id: '3', name: 'Ahmed Ali', rollNumber: 'CS-2021-089', stop: 'Block D', status: 'not-aboard' },
  { id: '4', name: 'Fatima Khan', rollNumber: 'CS-2021-112', stop: 'Block D', status: 'not-aboard' },
  { id: '5', name: 'Hassan Raza', rollNumber: 'CS-2021-156', stop: 'Block D', status: 'not-aboard' },
];

export function ManualAttendanceScreen({ onBack, currentStop }: ManualAttendanceScreenProps) {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [actionType, setActionType] = useState<'check-in' | 'check-out' | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student);
  };

  const handleAction = (action: 'check-in' | 'check-out') => {
    setActionType(action);
    setShowConfirmDialog(true);
  };

  const confirmAction = () => {
    if (selectedStudent && actionType) {
      // Update student status
      setStudents(prev =>
        prev.map(s =>
          s.id === selectedStudent.id
            ? { ...s, status: actionType === 'check-in' ? 'checked-in' : 'checked-out' }
            : s
        )
      );
      
      // Show success message and go back
      setTimeout(() => {
        onBack();
      }, 500);
    }
    setShowConfirmDialog(false);
    setSelectedStudent(null);
    setActionType(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Clean iOS Style */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="hover:bg-gray-100 -ml-2"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </Button>
          <h1 className="text-gray-900">Manual Attendance</h1>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {/* Info Alert */}
        <Alert className="bg-orange-50 border-orange-200">
          <AlertCircle className="w-4 h-4 text-orange-600" />
          <AlertDescription className="text-orange-900">
            Manual attendance requires administrator approval. Students will be notified once approved.
          </AlertDescription>
        </Alert>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search by name or roll number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        {/* Student List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Students at {currentStop}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y max-h-[500px] overflow-auto">
              {filteredStudents.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No students found
                </div>
              ) : (
                filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className={`p-4 ${
                      selectedStudent?.id === student.id ? 'bg-green-50' : 'hover:bg-gray-50'
                    } transition-colors`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">{student.name}</p>
                        <p className="text-gray-600 text-sm">{student.rollNumber}</p>
                      </div>
                      <div>
                        {student.status === 'checked-in' && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            Checked In
                          </span>
                        )}
                        {student.status === 'checked-out' && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            Checked Out
                          </span>
                        )}
                      </div>
                    </div>

                    {selectedStudent?.id === student.id ? (
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <Button
                          onClick={() => handleAction('check-in')}
                          className="bg-green-600 hover:bg-green-700"
                          disabled={student.status === 'checked-in'}
                        >
                          <UserCheck className="w-4 h-4 mr-2" />
                          Mark Check-In
                        </Button>
                        <Button
                          onClick={() => handleAction('check-out')}
                          variant="outline"
                          className="border-blue-600 text-blue-600 hover:bg-blue-50"
                          disabled={student.status === 'checked-out'}
                        >
                          <UserX className="w-4 h-4 mr-2" />
                          Mark Check-Out
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleStudentSelect(student)}
                        variant="outline"
                        className="w-full"
                      >
                        Select Student
                      </Button>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Manual Attendance</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div>
                <p>This will be sent to the Administrator for approval. The student will be notified once the admin approves.</p>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-900 font-medium">{selectedStudent?.name}</p>
                  <p className="text-gray-600 text-sm">{selectedStudent?.rollNumber}</p>
                  <p className="text-green-600 font-medium mt-2">
                    Action: {actionType === 'check-in' ? 'Check-In' : 'Check-Out'}
                  </p>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmAction} className="bg-green-600 hover:bg-green-700">
              Send for Approval
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}