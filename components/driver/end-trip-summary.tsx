import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { CheckCircle, Clock, Users, TrendingUp, Award } from 'lucide-react';

interface EndTripSummaryProps {
  onReturnHome: () => void;
}

export function EndTripSummary({ onReturnHome }: EndTripSummaryProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-gray-900 text-3xl mb-2">Trip Complete!</h1>
          <p className="text-gray-600">Great job, Ahmed. Here's your trip summary.</p>
        </div>

        {/* Trip Summary Card */}
        <Card className="shadow-xl mb-6">
          <CardContent className="p-6 space-y-4">
            {/* Total Time */}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-blue-600">Total Time</p>
                  <p className="text-2xl font-bold text-blue-900">1h 15m</p>
                </div>
              </div>
            </div>

            {/* Total Students */}
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-green-600">Total Students</p>
                  <p className="text-2xl font-bold text-green-900">45</p>
                </div>
              </div>
            </div>

            {/* Driving Score */}
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-purple-600">Driving Score</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-purple-900">9.8</p>
                    <p className="text-gray-600">/10</p>
                  </div>
                </div>
              </div>
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feedback Message */}
        <Card className="bg-green-100 border-green-200 mb-6">
          <CardContent className="p-4">
            <p className="text-green-900 text-center">
              <span className="font-medium">Excellent work!</span> You maintained safe speeds and smooth driving throughout the trip.
            </p>
          </CardContent>
        </Card>

        {/* Return Button */}
        <Button
          onClick={onReturnHome}
          className="w-full h-14 bg-green-600 hover:bg-green-700 text-lg shadow-lg"
        >
          Return to Home Dashboard
        </Button>
      </div>
    </div>
  );
}