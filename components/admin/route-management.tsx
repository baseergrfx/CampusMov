import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Plus, MapPin, Clock, Users, Edit, Sparkles, Brain, Zap, DollarSign } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { PremiumDialog } from './premium-dialog';

interface Route {
  id: string;
  name: string;
  stops: number;
  students: number;
  duration: string;
  distance: string;
  status: 'active' | 'inactive';
}

const mockRoutes: Route[] = [
  { id: '1', name: 'Route A - Morning Campus', stops: 12, students: 45, duration: '1h 15m', distance: '18 km', status: 'active' },
  { id: '2', name: 'Route B - Canal Road', stops: 10, students: 38, duration: '1h 05m', distance: '15 km', status: 'active' },
  { id: '3', name: 'Route C - Ring Road', stops: 15, students: 52, duration: '1h 30m', distance: '22 km', status: 'active' },
  { id: '4', name: 'Route D - City Center', stops: 8, students: 30, duration: '55m', distance: '12 km', status: 'inactive' },
];

export function RouteManagement() {
  const [routes] = useState<Route[]>(mockRoutes);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [isAIOptimizeOpen, setIsAIOptimizeOpen] = useState(false);
  const [selectedOptimization, setSelectedOptimization] = useState('balanced');
  const [showPremiumDialog, setShowPremiumDialog] = useState(false);

  const handleApplyOptimization = () => {
    alert(`AI Optimization Applied!\n\nSelected: ${selectedOptimization === 'fastest' ? 'Fastest Route' : selectedOptimization === 'efficient' ? 'Fuel-Efficient Route' : 'Balanced Route'}\n\nThe route has been optimized and will take effect on the next trip.`);
    setIsAIOptimizeOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Premium Dialog */}
      <PremiumDialog open={showPremiumDialog} onOpenChange={setShowPremiumDialog} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 text-2xl mb-1">Route Management</h1>
          <p className="text-gray-600">Create, view, and optimize bus routes with AI</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-slate-800 hover:bg-slate-700">
              <Plus className="w-4 h-4 mr-2" />
              Create New Route
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Route</DialogTitle>
              <DialogDescription>
                Add a new bus route with stops and timings
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="route-name">Route Name</Label>
                <Input id="route-name" placeholder="e.g., Route E - North Campus" />
              </div>
              <div className="space-y-2">
                <Label>Route Map</Label>
                <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                  Click to add stops on map
                </div>
              </div>
              <Button className="w-full bg-slate-800 hover:bg-slate-700">
                Create Route
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Route List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {routes.map((route) => (
          <Card 
            key={route.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedRoute(route)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{route.name}</CardTitle>
                <Badge variant={route.status === 'active' ? 'default' : 'outline'}>
                  {route.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{route.stops} stops</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{route.students} students</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{route.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{route.distance}</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRoute(route);
                    setIsAIOptimizeOpen(true);
                  }}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Optimize
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Optimization Dialog */}
      <Dialog open={isAIOptimizeOpen} onOpenChange={setIsAIOptimizeOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              AI-Powered Route Optimization
            </DialogTitle>
            <DialogDescription>
              Select your optimization priority for {selectedRoute?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <RadioGroup value={selectedOptimization} onValueChange={setSelectedOptimization}>
              {/* Fastest Route */}
              <div 
                className="flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setSelectedOptimization('fastest')}
                style={{ borderColor: selectedOptimization === 'fastest' ? '#9333EA' : '#E5E7EB' }}
              >
                <RadioGroupItem value="fastest" id="fastest" className="mt-1" />
                <Label htmlFor="fastest" className="flex-1 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 mb-1">Fastest Route (Time Priority)</p>
                      <p className="text-gray-600 text-sm mb-2">Minimize total travel time for all students</p>
                      <div className="flex gap-4 text-sm">
                        <span className="text-blue-600">Est. Time: 58m</span>
                        <span className="text-gray-500">Distance: 19 km</span>
                      </div>
                    </div>
                  </div>
                </Label>
              </div>

              {/* Most Fuel-Efficient */}
              <div 
                className="flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setSelectedOptimization('efficient')}
                style={{ borderColor: selectedOptimization === 'efficient' ? '#9333EA' : '#E5E7EB' }}
              >
                <RadioGroupItem value="efficient" id="efficient" className="mt-1" />
                <Label htmlFor="efficient" className="flex-1 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 mb-1">Most Fuel-Efficient (Cost Priority)</p>
                      <p className="text-gray-600 text-sm mb-2">Minimize fuel consumption and operational costs</p>
                      <div className="flex gap-4 text-sm">
                        <span className="text-green-600">Fuel Saved: 15%</span>
                        <span className="text-gray-500">Distance: 16 km</span>
                      </div>
                    </div>
                  </div>
                </Label>
              </div>

              {/* Balanced */}
              <div 
                className="flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setSelectedOptimization('balanced')}
                style={{ borderColor: selectedOptimization === 'balanced' ? '#9333EA' : '#E5E7EB' }}
              >
                <RadioGroupItem value="balanced" id="balanced" className="mt-1" />
                <Label htmlFor="balanced" className="flex-1 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Brain className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 mb-1">Balanced (Recommended)</p>
                      <p className="text-gray-600 text-sm mb-2">Optimal balance between time and cost efficiency</p>
                      <div className="flex gap-4 text-sm">
                        <span className="text-purple-600">Time: 1h 02m</span>
                        <span className="text-green-600">Fuel Saved: 8%</span>
                      </div>
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>

            {/* AI Analysis */}
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-purple-900 mb-2">
                      <span className="font-semibold">AI Analysis:</span> Based on historical traffic patterns, weather data, and current conditions, the Balanced route will save approximately PKR 3,200/month in fuel costs while maintaining good travel times.
                    </p>
                    <p className="text-purple-700 text-xs">
                      Last optimized: Never • Expected improvement: 12-15%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button className="flex-1 bg-purple-600 hover:bg-purple-700" onClick={handleApplyOptimization}>
                <Sparkles className="w-4 h-4 mr-2" />
                Apply AI Optimization
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setIsAIOptimizeOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Route Details */}
      {selectedRoute && !isAIOptimizeOpen && (
        <Card>
          <CardHeader>
            <CardTitle>Route Details: {selectedRoute.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Route Map */}
              <div>
                <h3 className="text-gray-900 mb-3">Route Map</h3>
                <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden relative">
                  <svg className="w-full h-full opacity-20">
                    <defs>
                      <pattern id="route-detail-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#route-detail-grid)" />
                  </svg>
                  <svg className="absolute inset-0 w-full h-full">
                    <path
                      d="M 40 200 Q 100 150, 150 120 T 280 60 T 400 40"
                      stroke="#3B82F6"
                      strokeWidth="4"
                      fill="none"
                    />
                  </svg>
                  {/* Stops */}
                  {[...Array(selectedRoute.stops)].map((_, i) => (
                    <div 
                      key={i}
                      className="absolute w-3 h-3 bg-blue-600 rounded-full border-2 border-white"
                      style={{ 
                        left: `${20 + (i * 60 / selectedRoute.stops)}%`, 
                        top: `${40 + Math.sin(i) * 20}%` 
                      }}
                    />
                  ))}
                </div>
                <Button 
                  className="w-full mt-3 bg-purple-600 hover:bg-purple-700" 
                  onClick={() => setShowPremiumDialog(true)}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Upgrade for AI Optimization
                </Button>
              </div>

              {/* Stop List */}
              <div>
                <h3 className="text-gray-900 mb-3">Stops & Timings</h3>
                <div className="space-y-2 max-h-64 overflow-auto">
                  {[...Array(Math.min(selectedRoute.stops, 8))].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-900">Stop {i + 1}</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {`7:${String(30 + i * 5).padStart(2, '0')} AM`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}