import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Calendar as CalendarIcon, CheckCircle } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { Badge } from './ui/badge';
import type { MainScreen } from './main-app';

interface ReportAbsenceScreenProps {
  onNavigate: (screen: MainScreen) => void;
}

export function ReportAbsenceScreen({ onNavigate }: ReportAbsenceScreenProps) {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    // Check if date is already selected
    const isSelected = selectedDates.some(
      (d) => d.toDateString() === date.toDateString()
    );

    if (isSelected) {
      // Remove date
      setSelectedDates(selectedDates.filter((d) => d.toDateString() !== date.toDateString()));
    } else {
      // Add date
      setSelectedDates([...selectedDates, date]);
    }
  };

  const handleSubmit = () => {
    // In real app, this would send to backend
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      onNavigate('attendance-history');
    }, 2000);
  };

  const formatDatesList = () => {
    if (selectedDates.length === 0) return 'No dates selected';
    
    return selectedDates
      .sort((a, b) => a.getTime() - b.getTime())
      .map((date) => {
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        return `${month} ${day}`;
      })
      .join(', ');
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-gray-900 text-2xl mb-2">Absence Reported!</h2>
          <p className="text-gray-600">
            Your absence has been submitted successfully.
            <br />
            The driver and admin have been notified.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-blue-700"
            onClick={() => onNavigate('attendance-history')}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1>Report an Absence</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {/* Instructions */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <p className="text-blue-900 text-sm">
              Select the date(s) you will be absent. The driver will automatically skip your stop on those days.
            </p>
          </CardContent>
        </Card>

        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-blue-600" />
              Select Absence Dates
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              onSelect={handleDateSelect}
              className="rounded-md border"
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              modifiers={{
                selected: selectedDates,
              }}
              modifiersStyles={{
                selected: {
                  backgroundColor: '#EF4444',
                  color: 'white',
                  borderRadius: '50%',
                  fontWeight: 'bold',
                },
              }}
            />
          </CardContent>
        </Card>

        {/* Selected Dates Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Selected Dates</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDates.length > 0 ? (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {selectedDates
                    .sort((a, b) => a.getTime() - b.getTime())
                    .map((date, index) => (
                      <Badge key={index} className="bg-red-600 text-white px-3 py-1">
                        {date.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </Badge>
                    ))}
                </div>
                <p className="text-sm text-gray-600">
                  {selectedDates.length} {selectedDates.length === 1 ? 'day' : 'days'} selected
                </p>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No dates selected. Tap on calendar dates to select.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Info */}
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <p className="text-yellow-900 text-sm">
              <span className="font-medium">Note:</span> This will notify the driver and admin. Your stop will be skipped on the selected dates.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Submit Button - Fixed at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={handleSubmit}
            disabled={selectedDates.length === 0}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Absence Report
          </Button>
        </div>
      </div>
    </div>
  );
}
