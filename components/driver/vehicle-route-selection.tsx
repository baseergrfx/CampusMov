import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Bus, MapPin, Clock, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

interface VehicleRouteSelectionProps {
  onStartTrip: (vehicle: string, trip: string) => void;
}

const vehicles = [
  { id: 'bus-05', name: 'Bus-05 (CUST-123)' },
  { id: 'bus-07', name: 'Bus-07 (CUST-456)' },
  { id: 'bus-12', name: 'Bus-12 (CUST-789)' },
];

const trips = [
  { 
    id: 'morning-a', 
    name: 'Morning Route A', 
    time: '7:00 AM',
    stops: 12,
    students: 45,
  },
  { 
    id: 'afternoon-a', 
    name: 'Afternoon Route A', 
    time: '4:00 PM',
    stops: 12,
    students: 42,
  },
  { 
    id: 'morning-b', 
    name: 'Morning Route B', 
    time: '7:30 AM',
    stops: 10,
    students: 38,
  },
];

export function VehicleRouteSelection({ onStartTrip }: VehicleRouteSelectionProps) {
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedTrip, setSelectedTrip] = useState('');

  const handleStartTrip = () => {
    if (selectedVehicle && selectedTrip) {
      const vehicle = vehicles.find(v => v.id === selectedVehicle);
      const trip = trips.find(t => t.id === selectedTrip);
      if (vehicle && trip) {
        onStartTrip(vehicle.name, trip.name);
      }
    }
  };

  const selectedTripData = trips.find(t => t.id === selectedTrip);
  const canStartTrip = selectedVehicle && selectedTrip;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-gray-900 text-2xl mb-2">Welcome, Driver</h1>
          <p className="text-gray-600">Select your vehicle and trip to begin</p>
        </div>

        {/* Step 1: Select Vehicle */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bus className="w-5 h-5 text-green-600" />
              Step 1: Select Your Vehicle
            </CardTitle>
            <CardDescription>
              Choose the bus you're driving today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
              <SelectTrigger>
                <SelectValue placeholder="Select a vehicle" />
              </SelectTrigger>
              <SelectContent>
                {vehicles.map((vehicle) => (
                  <SelectItem key={vehicle.id} value={vehicle.id}>
                    {vehicle.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedVehicle && (
              <div className="mt-3 flex items-center gap-2 text-green-600 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>Vehicle selected</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Step 2: Select Trip */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-600" />
              Step 2: Select Your Trip
            </CardTitle>
            <CardDescription>
              Choose the route and time for this trip
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              {trips.map((trip) => (
                <div
                  key={trip.id}
                  onClick={() => setSelectedTrip(trip.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedTrip === trip.id
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-gray-900">{trip.name}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{trip.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{trip.stops} stops</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bus className="w-4 h-4" />
                          <span>{trip.students} students</span>
                        </div>
                      </div>
                    </div>
                    {selectedTrip === trip.id && (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trip Summary (if both selected) */}
        {canStartTrip && selectedTripData && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <AlertDescription className="text-green-900">
              <p className="mb-2">Ready to start your trip!</p>
              <div className="text-sm space-y-1">
                <p>• Vehicle: {vehicles.find(v => v.id === selectedVehicle)?.name}</p>
                <p>• Route: {selectedTripData.name} at {selectedTripData.time}</p>
                <p>• {selectedTripData.stops} stops with {selectedTripData.students} expected students</p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Start Trip Button */}
        <Button
          onClick={handleStartTrip}
          disabled={!canStartTrip}
          className="w-full h-14 bg-green-600 hover:bg-green-700 disabled:bg-gray-300"
        >
          Start Trip
        </Button>
      </div>
    </div>
  );
}
