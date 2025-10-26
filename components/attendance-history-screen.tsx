import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ChevronLeft, CheckCircle, XCircle, Calendar as CalendarIcon, AlertCircle } from 'lucide-react';
import { Calendar } from './ui/calendar';
import type { MainScreen } from './main-app';

interface RouteDetailsScreenProps {
  onNavigate: (screen: MainScreen) => void;
}

const attendanceLogs = [
  {
    date: 'Oct 24, 2025',
    checkIn: '7:42 AM',
    checkOut: '4:30 PM',
    status: 'complete',
  },
  {
    date: 'Oct 23, 2025',
    checkIn: '7:40 AM',
    checkOut: '4:35 PM',
    status: 'complete',
  },
  {
    date: 'Oct 22, 2025',
    checkIn: '7:41 AM',
    checkOut: 'Missed',
    status: 'incomplete',
  },
  {
    date: 'Oct 21, 2025',
    checkIn: '7:38 AM',
    checkOut: '4:32 PM',
    status: 'complete',
  },
  {
    date: 'Oct 20, 2025',
    checkIn: '7:45 AM',
    checkOut: '4:28 PM',
    status: 'complete',
  },
];

export function AttendanceHistoryScreen({ onNavigate }: RouteDetailsScreenProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Mock dates with attendance (for demo, marking some dates as having attendance)
  const attendanceDates = [
    new Date(2025, 9, 20),
    new Date(2025, 9, 21),
    new Date(2025, 9, 22),
    new Date(2025, 9, 23),
    new Date(2025, 9, 24),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Clean iOS Style */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('profile')}
            className="hover:bg-gray-100 -ml-2"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </Button>
          <h1 className="text-gray-900">Attendance History</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {/* Report Absence Button - NEW */}
        <Button
          onClick={() => onNavigate('report-absence')}
          className="w-full h-12 bg-red-600 hover:bg-red-700 text-white"
        >
          <AlertCircle className="w-5 h-5 mr-2" />
          Report an Absence
        </Button>

        {/* Calendar View */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Monthly Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              modifiers={{
                attendance: attendanceDates,
              }}
              modifiersStyles={{
                attendance: {
                  backgroundColor: '#10B981',
                  color: 'white',
                  borderRadius: '50%',
                },
              }}
            />
          </CardContent>
        </Card>

        {/* Legend */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-around text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Present</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-gray-600">Missed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                <span className="text-gray-600">No Bus</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Log */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {attendanceLogs.map((log, index) => (
                <div key={index} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-gray-900">{log.date}</p>
                    {log.status === 'complete' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Check-In:</span>
                      <span className="text-gray-900">{log.checkIn}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Check-Out:</span>
                      <span
                        className={
                          log.checkOut === 'Missed'
                            ? 'text-red-600'
                            : 'text-gray-900'
                        }
                      >
                        {log.checkOut}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl text-blue-600">20</p>
                <p className="text-xs text-gray-600 mt-1">Total Days</p>
              </div>
              <div>
                <p className="text-2xl text-green-600">19</p>
                <p className="text-xs text-gray-600 mt-1">Present</p>
              </div>
              <div>
                <p className="text-2xl text-red-600">1</p>
                <p className="text-xs text-gray-600 mt-1">Missed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}