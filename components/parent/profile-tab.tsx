import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { User, Bell, HelpCircle, LogOut, Phone, Mail, MessageSquare } from 'lucide-react';
import { ChatbotButton } from '../chatbot-button';

interface ProfileTabProps {
  onLogout: () => void;
}

export function ProfileTab({ onLogout }: ProfileTabProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 shadow-md">
        <div>
          <h1>Profile & Settings</h1>
          <p className="text-green-100 text-sm">Manage your account</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile Info */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900 font-medium">Ayesha Khan</h3>
                <p className="text-gray-600 text-sm">Parent Account</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+92 300 1234567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="text-sm">ayesha.khan@example.com</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Children */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Registered Children</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900 font-medium">Maria Khan</p>
                    <p className="text-sm text-gray-600">CS-2021-045</p>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900 font-medium">Ebad Khan</p>
                    <p className="text-sm text-gray-600">CS-2021-003</p>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="check-in">Student Check-In</Label>
                <p className="text-sm text-gray-600">Get notified when your child boards the bus</p>
              </div>
              <Switch id="check-in" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="arrival">Student Arrived</Label>
                <p className="text-sm text-gray-600">Get notified when your child arrives at university</p>
              </div>
              <Switch id="arrival" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="delays">Delay Alerts</Label>
                <p className="text-sm text-gray-600">Get notified about bus delays</p>
              </div>
              <Switch id="delays" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="fees">Fee Reminders</Label>
                <p className="text-sm text-gray-600">Get reminded about upcoming fee payments</p>
              </div>
              <Switch id="fees" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="emergency">Emergency Alerts</Label>
                <p className="text-sm text-gray-600">Critical safety notifications</p>
              </div>
              <Switch id="emergency" defaultChecked disabled />
            </div>
          </CardContent>
        </Card>

        {/* Help & Support */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Help & Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <MessageSquare className="w-4 h-4 mr-2" />
              Contact Transport Office
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <HelpCircle className="w-4 h-4 mr-2" />
              FAQs & Guide
            </Button>
          </CardContent>
        </Card>

        {/* Logout */}
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full h-12 border-red-200 text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </div>

      {/* Chatbot Button */}
      <ChatbotButton />
    </div>
  );
}
