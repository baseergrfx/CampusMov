import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { PlayCircle, Clock, Users, TrendingUp, Bell, Calendar, Home as HomeIcon, User } from 'lucide-react';
import React from 'react';
import { Logo } from '../logo';

interface DriverHomeDashboardProps {
  driverName: string;
  onStartTrip: () => void;
  currentTab?: 'home' | 'profile';
  onTabChange?: (tab: 'home' | 'profile') => void;
}

interface TripSummary {
  date: string;
  route: string;
  students: number;
  drivingScore: number;
}

interface ScheduledTrip {
  time: string;
  route: string;
  status: 'pending' | 'completed';
}

const lastTrip: TripSummary = {
  date: 'Oct 24, 4:30 PM',
  route: 'Route A - Afternoon',
  students: 42,
  drivingScore: 9.2,
};

const todaySchedule: ScheduledTrip[] = [
  { time: '7:00 AM', route: 'Route A - Morning', status: 'completed' },
  { time: '4:15 PM', route: 'Route A - Afternoon', status: 'pending' },
];

const adminNotifications = [
  {
    id: '1',
    message: 'Reminder: All buses need refueling today',
    time: '2 hours ago',
  },
  {
    id: '2',
    message: 'New route optimization available for Route A',
    time: '1 day ago',
  },
];

export function DriverHomeDashboard({ driverName, onStartTrip, currentTab = 'home', onTabChange }: DriverHomeDashboardProps) {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const hasNewNotifications = true; // Set to true if there are unread notifications

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-green-600 text-white p-6 shadow-md">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-lg p-1">
              <Logo size="sm" />
            </div>
            <h1 className="text-2xl">Welcome, {driverName}</h1>
          </div>
          
          {/* Bell Icon with Red Dot */}
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 hover:bg-green-700 rounded-full transition-colors"
          >
            <Bell className="w-6 h-6" />
            {hasNewNotifications && (
              <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-green-600"></span>
            )}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-gray-500 hover:bg-gray-600">Status: OFF DUTY</Badge>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Primary Action: Start New Trip */}
        <Card className="border-2 border-green-600 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <PlayCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-gray-900 text-xl mb-2">Ready to Drive?</h2>
              <p className="text-gray-600 mb-6">Start your next scheduled trip</p>
              <Button
                onClick={onStartTrip}
                className="w-full h-14 bg-green-600 hover:bg-green-700 text-lg shadow-lg"
              >
                <PlayCircle className="w-6 h-6 mr-2" />
                START NEW TRIP
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Module 1: Last Completed Trip */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Last Trip Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Date & Time</span>
              <span className="text-gray-900 font-medium">{lastTrip.date}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Route</span>
              <span className="text-gray-900 font-medium">{lastTrip.route}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600 flex items-center gap-1">
                <Users className="w-4 h-4" />
                Students
              </span>
              <span className="text-gray-900 font-medium">{lastTrip.students}</span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t">
              <span className="text-gray-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                Driving Score
              </span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-green-600">
                  {lastTrip.drivingScore}
                </span>
                <span className="text-gray-600">/10</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Module 2: Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {todaySchedule.map((trip, index) => (
                <div key={index} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-gray-900 font-medium">{trip.time}</p>
                    <p className="text-sm text-gray-600">{trip.route}</p>
                  </div>
                  <Badge
                    className={
                      trip.status === 'completed'
                        ? 'bg-green-600'
                        : 'bg-orange-600'
                    }
                  >
                    {trip.status === 'completed' ? 'Completed' : 'Pending'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Module 3: Admin Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="w-5 h-5 text-red-600" />
              Admin Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {adminNotifications.map((notification) => (
                <div key={notification.id} className="p-4">
                  <p className="text-gray-900 mb-1">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Tab Bar - NEW */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-bottom">
        <div className="flex items-center justify-around h-16">
          <button
            onClick={() => onTabChange?.('home')}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              currentTab === 'home'
                ? 'text-green-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <HomeIcon className="w-6 h-6 mb-1" />
            <span className="text-xs">Home</span>
          </button>

          <button
            onClick={() => onTabChange?.('profile')}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              currentTab === 'profile'
                ? 'text-green-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <User className="w-6 h-6 mb-1" />
            <span className="text-xs">My Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}