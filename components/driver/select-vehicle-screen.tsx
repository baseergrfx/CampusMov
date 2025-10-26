import { Card, CardContent } from '../ui/card';
import { Bus, ArrowLeft } from 'lucide-react';

interface Vehicle {
  id: string;
  number: string;
  model: string;
}

interface SelectVehicleScreenProps {
  onSelectVehicle: (vehicleId: string) => void;
  onBack?: () => void;
}

const vehicles: Vehicle[] = [
  { id: '1', number: 'PSR-101', model: 'Toyota Coaster' },
  { id: '2', number: 'PSR-102', model: 'Toyota Coaster' },
  { id: '3', number: 'PSR-103', model: 'Hino RK8' },
];

export function SelectVehicleScreen({ onSelectVehicle, onBack }: SelectVehicleScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Clean iOS Style */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-4 relative">
          {/* Back Button - Top Left */}
          {onBack && (
            <button
              onClick={onBack}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
          )}
          
          <p className="text-gray-500 text-sm text-center">Step 1 of 2</p>
          <h1 className="text-center text-gray-900 mt-1">Select Your Vehicle</h1>
        </div>
      </div>

      <div className="p-4">
        <p className="text-gray-600 mb-4">Which bus are you driving today?</p>
        
        <div className="space-y-3">
          {vehicles.map((vehicle) => (
            <Card
              key={vehicle.id}
              className="cursor-pointer hover:shadow-lg transition-all hover:border-green-600"
              onClick={() => onSelectVehicle(vehicle.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                    <Bus className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 text-xl font-medium mb-1">
                      {vehicle.number}
                    </h3>
                    <p className="text-gray-600 text-sm">{vehicle.model}</p>
                  </div>
                  <div className="text-green-600">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}