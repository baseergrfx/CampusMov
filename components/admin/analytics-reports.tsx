import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Download, TrendingUp, Users, DollarSign, Clock, Shield } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { AnomalyDetection } from './anomaly-detection';
import { PremiumDialog } from './premium-dialog';
import { useState } from 'react';

export function AnalyticsReports() {
  const [showPremiumDialog, setShowPremiumDialog] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Premium Dialog */}
      <PremiumDialog open={showPremiumDialog} onOpenChange={setShowPremiumDialog} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 text-2xl mb-1">Analytics & Reports</h1>
          <p className="text-gray-600">Data-driven insights with AI-powered anomaly detection</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="this-month">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Attendance Rate</p>
                <p className="text-gray-900 text-2xl mt-1">96.2%</p>
                <p className="text-green-600 text-xs mt-1">↑ 2.1% from last month</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">On-Time Performance</p>
                <p className="text-gray-900 text-2xl mt-1">92.5%</p>
                <p className="text-green-600 text-xs mt-1">↑ 1.5% from last month</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Fuel Savings</p>
                <p className="text-gray-900 text-2xl mt-1">PKR 45K</p>
                <p className="text-green-600 text-xs mt-1">From route optimization</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Bus Utilization</p>
                <p className="text-gray-900 text-2xl mt-1">88%</p>
                <p className="text-gray-600 text-xs mt-1">Average capacity</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="attendance" className="space-y-6">
        <TabsList>
          <TabsTrigger value="attendance">Attendance Reports</TabsTrigger>
          <TabsTrigger value="performance">
            Performance Analytics
            <Badge className="ml-2 bg-purple-600 text-xs">Premium</Badge>
          </TabsTrigger>
          <TabsTrigger value="anomalies">
            <Shield className="w-4 h-4 mr-2" />
            AI Anomaly Detection
          </TabsTrigger>
          <TabsTrigger value="drivers">Driver Reports</TabsTrigger>
        </TabsList>

        {/* Attendance Reports */}
        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Attendance Reports</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export to PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export to Excel
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Chart Placeholder */}
                <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                    <p>Attendance Trend Chart</p>
                    <p className="text-sm">(Oct 1 - Oct 24, 2025)</p>
                  </div>
                </div>

                {/* Summary Table */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <p className="text-2xl text-green-600">1,245</p>
                    <p className="text-sm text-gray-600 mt-1">Total Check-ins</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg text-center">
                    <p className="text-2xl text-red-600">52</p>
                    <p className="text-sm text-gray-600 mt-1">Missed Check-ins</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <p className="text-2xl text-blue-600">96.2%</p>
                    <p className="text-sm text-gray-600 mt-1">Attendance Rate</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Analytics */}
        <TabsContent value="performance" className="space-y-4">
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-gray-900 text-lg">Premium Feature</h3>
                  <p className="text-gray-600 mt-2">
                    Unlock advanced performance analytics including on-time performance charts, fuel & cost savings analysis, and bus utilization metrics.
                  </p>
                </div>
                <Button 
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => setShowPremiumDialog(true)}
                >
                  Upgrade to Premium
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Anomaly Detection Tab */}
        <TabsContent value="anomalies">
          <AnomalyDetection />
        </TabsContent>

        {/* Driver Reports */}
        <TabsContent value="drivers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Driver Performance Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Ahmed Shah', hours: '165h', trips: 42, alerts: 0 },
                  { name: 'Muhammad Ali', hours: '158h', trips: 40, alerts: 2 },
                  { name: 'Imran Khan', hours: '162h', trips: 41, alerts: 1 },
                  { name: 'Bilal Ahmed', hours: '0h', trips: 0, alerts: 0 },
                ].map((driver, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-gray-900">{driver.name}</p>
                    </div>
                    <div className="flex gap-8 text-sm">
                      <div>
                        <p className="text-gray-600">Hours</p>
                        <p className="text-gray-900">{driver.hours}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Trips</p>
                        <p className="text-gray-900">{driver.trips}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Alerts</p>
                        <p className={driver.alerts > 0 ? 'text-orange-600' : 'text-green-600'}>
                          {driver.alerts}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}