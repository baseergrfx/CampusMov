import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface Driver {
  id: string;
  name: string;
  phone: string;
  assignedBus: string;
  status: 'active' | 'inactive' | 'on-route';
}

interface Vehicle {
  id: string;
  busId: string;
  licensePlate: string;
  gpsTrackerId: string;
  driver: string;
  maintenanceStatus: 'good' | 'due' | 'overdue';
  lastMaintenance: string;
}

const mockDrivers: Driver[] = [
  { id: '1', name: 'Ahmed Shah', phone: '+92 300 1111111', assignedBus: 'Bus-01', status: 'on-route' },
  { id: '2', name: 'Muhammad Ali', phone: '+92 300 2222222', assignedBus: 'Bus-02', status: 'on-route' },
  { id: '3', name: 'Imran Khan', phone: '+92 300 3333333', assignedBus: 'Bus-03', status: 'active' },
  { id: '4', name: 'Bilal Ahmed', phone: '+92 300 4444444', assignedBus: 'Bus-04', status: 'inactive' },
];

const mockVehicles: Vehicle[] = [
  { id: '1', busId: 'Bus-01', licensePlate: 'CUST-123', gpsTrackerId: 'GPS-001', driver: 'Ahmed Shah', maintenanceStatus: 'good', lastMaintenance: '2025-09-15' },
  { id: '2', busId: 'Bus-02', licensePlate: 'CUST-456', gpsTrackerId: 'GPS-002', driver: 'Muhammad Ali', maintenanceStatus: 'due', lastMaintenance: '2025-07-20' },
  { id: '3', busId: 'Bus-03', licensePlate: 'CUST-789', gpsTrackerId: 'GPS-003', driver: 'Imran Khan', maintenanceStatus: 'good', lastMaintenance: '2025-10-01' },
  { id: '4', busId: 'Bus-04', licensePlate: 'CUST-321', gpsTrackerId: 'GPS-004', driver: 'Bilal Ahmed', maintenanceStatus: 'overdue', lastMaintenance: '2025-06-10' },
];

export function DriverFleetManagement() {
  const [drivers] = useState<Driver[]>(mockDrivers);
  const [vehicles] = useState<Vehicle[]>(mockVehicles);

  const getDriverStatusBadge = (status: Driver['status']) => {
    switch (status) {
      case 'on-route':
        return <Badge className="bg-green-600">On Route</Badge>;
      case 'active':
        return <Badge className="bg-blue-600">Active</Badge>;
      case 'inactive':
        return <Badge variant="outline">Inactive</Badge>;
    }
  };

  const getMaintenanceBadge = (status: Vehicle['maintenanceStatus']) => {
    switch (status) {
      case 'good':
        return <Badge className="bg-green-600">Good</Badge>;
      case 'due':
        return <Badge className="bg-orange-600">Due Soon</Badge>;
      case 'overdue':
        return <Badge className="bg-red-600">Overdue</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 text-2xl mb-1">Driver & Fleet Management</h1>
        <p className="text-gray-600">Manage drivers, vehicles, and maintenance</p>
      </div>

      <Tabs defaultValue="drivers" className="space-y-6">
        <TabsList>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
        </TabsList>

        {/* Drivers Tab */}
        <TabsContent value="drivers" className="space-y-4">
          <div className="flex justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-slate-800 hover:bg-slate-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Driver
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Driver</DialogTitle>
                  <DialogDescription>
                    Create a driver profile and set login credentials
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="driver-name">Driver Name</Label>
                    <Input id="driver-name" placeholder="Enter driver name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="driver-phone">Phone Number</Label>
                    <Input id="driver-phone" placeholder="+92 300 1234567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="driver-password">Initial Password</Label>
                    <Input id="driver-password" type="password" placeholder="Set password" />
                  </div>
                  <Button className="w-full bg-slate-800 hover:bg-slate-700">
                    Create Driver Account
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Driver List ({drivers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Assigned Bus</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drivers.map((driver) => (
                    <TableRow key={driver.id}>
                      <TableCell>{driver.name}</TableCell>
                      <TableCell>{driver.phone}</TableCell>
                      <TableCell>{driver.assignedBus}</TableCell>
                      <TableCell>{getDriverStatusBadge(driver.status)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vehicles Tab */}
        <TabsContent value="vehicles" className="space-y-4">
          <div className="flex justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-slate-800 hover:bg-slate-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Bus
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Register New Bus</DialogTitle>
                  <DialogDescription>
                    Add a new vehicle to your fleet
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bus-id">Bus ID</Label>
                    <Input id="bus-id" placeholder="e.g., Bus-06" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="license-plate">License Plate</Label>
                    <Input id="license-plate" placeholder="e.g., CUST-999" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gps-tracker">GPS Tracker ID</Label>
                    <Input id="gps-tracker" placeholder="e.g., GPS-006" />
                  </div>
                  <Button className="w-full bg-slate-800 hover:bg-slate-700">
                    Register Bus
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Vehicle Fleet ({vehicles.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bus ID</TableHead>
                    <TableHead>License Plate</TableHead>
                    <TableHead>GPS Tracker</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Maintenance</TableHead>
                    <TableHead>Last Service</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell>{vehicle.busId}</TableCell>
                      <TableCell>{vehicle.licensePlate}</TableCell>
                      <TableCell>{vehicle.gpsTrackerId}</TableCell>
                      <TableCell>{vehicle.driver}</TableCell>
                      <TableCell>{getMaintenanceBadge(vehicle.maintenanceStatus)}</TableCell>
                      <TableCell>{new Date(vehicle.lastMaintenance).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
