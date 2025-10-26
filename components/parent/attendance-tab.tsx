import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Calendar } from '../ui/calendar';
import { Badge } from '../ui/badge';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface AttendanceRecord {
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: 'complete' | 'partial' | 'absent' | 'pending-approval';
  isManual?: boolean;
}

const mockAttendance: AttendanceRecord[] = [
  {
    date: 'Oct 25, 2025',
    checkIn: '7:21 AM',
    checkOut: '4:30 PM',
    status: 'complete',
  },
  {
    date: 'Oct 24, 2025',
    checkIn: '7:22 AM',
    checkOut: '4:32 PM',
    status: 'complete',
  },
  {
    date: 'Oct 23, 2025',
    checkIn: '7:36 AM',
    checkOut: '4:28 PM',
    status: 'complete',
    isManual: true,
  },
  {
    date: 'Oct 22, 2025',
    checkIn: '7:25 AM',
    status: 'partial',
  },
  {
    date: 'Oct 21, 2025',
    status: 'absent',
  },
];

export function AttendanceTab() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const getStatusBadge = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'complete':
        return <Badge className="bg-green-600">Complete</Badge>;
      case 'partial':
        return <Badge className="bg-orange-600">Partial</Badge>;
      case 'absent':
        return <Badge className="bg-red-600">Absent</Badge>;
      case 'pending-approval':
        return <Badge className="bg-purple-600">Pending Approval</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 shadow-md">
        <div>
          <h1>Attendance Record</h1>
          <p className="text-green-100 text-sm">Transport attendance history</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Calendar */}
        <Card>
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border-0"
            />
          </CardContent>
        </Card>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-2xl text-gray-900">18</p>
              <p className="text-xs text-gray-600">Present</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <p className="text-2xl text-gray-900">2</p>
              <p className="text-xs text-gray-600">Partial</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <p className="text-2xl text-gray-900">1</p>
              <p className="text-xs text-gray-600">Absent</p>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Log */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Attendance</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {mockAttendance.map((record, index) => (
                <div key={index} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-gray-900 font-medium">{record.date}</p>
                      {record.isManual && (
                        <p className="text-xs text-purple-600 mt-1">
                          Manual Entry - Approved
                        </p>
                      )}
                    </div>
                    {getStatusBadge(record.status)}
                  </div>

                  {record.checkIn || record.checkOut ? (
                    <div className="grid grid-cols-2 gap-4">
                      {record.checkIn && (
                        <div>
                          <p className="text-xs text-gray-600">Check-In</p>
                          <p className="text-sm text-gray-900 font-medium">
                            {record.checkIn}
                          </p>
                        </div>
                      )}
                      {record.checkOut && (
                        <div>
                          <p className="text-xs text-gray-600">Check-Out</p>
                          <p className="text-sm text-gray-900 font-medium">
                            {record.checkOut}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No attendance recorded</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
