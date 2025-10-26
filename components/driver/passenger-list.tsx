import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeft, CheckCircle, Circle, MinusCircle } from 'lucide-react';
import { Badge } from '../ui/badge';
import type { Student } from './driver-main-app';

interface PassengerListProps {
  students: Student[];
  onBack: () => void;
}

export function PassengerList({ students, onBack }: PassengerListProps) {
  const onBoardCount = students.filter(s => s.status === 'checked-in').length;
  const checkedOutCount = students.filter(s => s.status === 'checked-out').length;
  const pendingCount = students.filter(s => s.status === 'pending').length;

  const getStatusIcon = (status: Student['status']) => {
    switch (status) {
      case 'checked-in':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'checked-out':
        return <MinusCircle className="w-5 h-5 text-gray-400" />;
      default:
        return <Circle className="w-5 h-5 text-gray-300" />;
    }
  };

  const getStatusBadge = (status: Student['status']) => {
    switch (status) {
      case 'checked-in':
        return <Badge className="bg-green-600">On-Board</Badge>;
      case 'checked-out':
        return <Badge variant="outline" className="text-gray-600">Checked Out</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
          <h1>Passenger List</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl text-green-600">{onBoardCount}</p>
              <p className="text-xs text-gray-600 mt-1">On-Board</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl text-gray-600">{checkedOutCount}</p>
              <p className="text-xs text-gray-600 mt-1">Checked Out</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl text-orange-600">{pendingCount}</p>
              <p className="text-xs text-gray-600 mt-1">Pending</p>
            </CardContent>
          </Card>
        </div>

        {/* Student List */}
        <Card>
          <CardHeader>
            <CardTitle>All Students ({students.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {students.map((student) => (
                <div key={student.id} className="p-4 flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {getStatusIcon(student.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900">{student.name}</p>
                    <p className="text-gray-600 text-sm">{student.studentId}</p>
                    {student.status === 'checked-in' && student.checkInTime && (
                      <p className="text-green-600 text-xs mt-1">
                        Boarded at {student.checkInTime}
                      </p>
                    )}
                    {student.status === 'checked-out' && student.checkOutTime && (
                      <p className="text-gray-500 text-xs mt-1">
                        Exited at {student.checkOutTime}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    {getStatusBadge(student.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <p className="text-blue-900 text-sm">
              <span>This list updates automatically as you scan student QR codes. Use this as a reference to manually verify who is on board.</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
