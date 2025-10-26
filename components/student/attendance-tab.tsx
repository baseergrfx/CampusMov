import { useState } from 'react';
import { QrCode, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

type AttendanceSubTab = 'qr' | 'history';

export function AttendanceTab() {
  const [activeSubTab, setActiveSubTab] = useState<AttendanceSubTab>('qr');

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 pt-4 pb-2">
          <h1 className="text-gray-900 text-2xl mb-4">Attendance</h1>
          
          {/* Sub-tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveSubTab('qr')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all ${
                activeSubTab === 'qr'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <QrCode className="w-5 h-5" />
              <span className="font-medium">My QR Code</span>
            </button>
            
            <button
              onClick={() => setActiveSubTab('history')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all ${
                activeSubTab === 'history'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span className="font-medium">History</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeSubTab === 'qr' && <QRCodeContent />}
        {activeSubTab === 'history' && <AttendanceHistoryContent />}
      </div>
    </div>
  );
}

function QRCodeContent() {
  return (
    <div className="space-y-6">
      {/* QR Code Card */}
      <Card className="border-0 shadow-xl overflow-hidden">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-6 text-center">
            <h2 className="text-xl mb-1">Your Attendance QR Code</h2>
            <p className="text-blue-100 text-sm">Show this to the driver when boarding</p>
          </div>

          {/* QR Code */}
          <div className="bg-white p-8 flex flex-col items-center">
            <div className="bg-white p-6 rounded-2xl shadow-inner border-4 border-blue-100">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=STUDENT-ID-12345-ROUTE-A1"
                alt="QR Code"
                className="w-48 h-48"
              />
            </div>
            
            {/* Student Info */}
            <div className="mt-6 text-center">
              <p className="text-gray-900 font-medium text-lg">Ahmad Khan</p>
              <p className="text-gray-500 text-sm">Student ID: 12345</p>
              <p className="text-gray-500 text-sm">Route: A1 - GT Road</p>
            </div>

            {/* Status Badge */}
            <div className="mt-4">
              <Badge className="bg-green-100 text-green-700 px-4 py-2">
                <CheckCircle className="w-4 h-4 mr-1" />
                Active & Valid
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="border-0 shadow-md bg-blue-50">
        <CardContent className="p-4">
          <h3 className="font-medium text-gray-900 mb-2">How to use:</h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>• Show this QR code to the driver when boarding</li>
            <li>• Driver will scan it to mark your attendance</li>
            <li>• Keep your screen brightness high for easy scanning</li>
            <li>• Check your history tab to verify attendance</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function AttendanceHistoryContent() {
  const attendanceRecords = [
    {
      date: 'Today, Oct 26',
      checkIn: '8:45 AM',
      checkOut: '3:30 PM',
      status: 'present',
      route: 'GT Road',
    },
    {
      date: 'Yesterday, Oct 25',
      checkIn: '8:42 AM',
      checkOut: '3:28 PM',
      status: 'present',
      route: 'GT Road',
    },
    {
      date: 'Thursday, Oct 24',
      checkIn: null,
      checkOut: null,
      status: 'absent',
      route: 'GT Road',
      reason: 'Reported sick',
    },
    {
      date: 'Wednesday, Oct 23',
      checkIn: '8:50 AM',
      checkOut: '3:35 PM',
      status: 'present',
      route: 'GT Road',
    },
    {
      date: 'Tuesday, Oct 22',
      checkIn: '8:38 AM',
      checkOut: '3:25 PM',
      status: 'present',
      route: 'GT Road',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Stats Card */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
        <CardContent className="p-6">
          <h3 className="text-lg mb-4">This Month's Summary</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-semibold mb-1">18</div>
              <div className="text-blue-100 text-xs">Present</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold mb-1">2</div>
              <div className="text-blue-100 text-xs">Absent</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold mb-1">90%</div>
              <div className="text-blue-100 text-xs">Attendance</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History List */}
      <div className="space-y-3">
        {attendanceRecords.map((record, index) => (
          <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-medium text-gray-900">{record.date}</p>
                    {record.status === 'present' ? (
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Present
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-700">
                        <XCircle className="w-3 h-3 mr-1" />
                        Absent
                      </Badge>
                    )}
                  </div>
                  
                  {record.status === 'present' ? (
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>✓ Check-in: {record.checkIn} - {record.route}</p>
                      <p>✓ Check-out: {record.checkOut} - City University</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">Reason: {record.reason}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}