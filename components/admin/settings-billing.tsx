import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { CreditCard, Download, Plus, Minus, TrendingUp } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface Invoice {
  id: string;
  month: string;
  amount: string;
  status: 'paid' | 'pending';
  date: string;
}

const mockInvoices: Invoice[] = [
  { id: '1', month: 'October 2025', amount: 'PKR 160,000', status: 'pending', date: 'Oct 31, 2025' },
  { id: '2', month: 'September 2025', amount: 'PKR 160,000', status: 'paid', date: 'Sep 30, 2025' },
  { id: '3', month: 'August 2025', amount: 'PKR 160,000', status: 'paid', date: 'Aug 31, 2025' },
  { id: '4', month: 'July 2025', amount: 'PKR 160,000', status: 'paid', date: 'Jul 31, 2025' },
];

export function SettingsBilling() {
  const busCount = 10;
  const pricePerBus = 16000;
  const monthlyTotal = busCount * pricePerBus;
  const currentPlan = 'Standard';

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 text-2xl mb-1">Settings & Billing</h1>
        <p className="text-gray-600">Manage your subscription and account settings</p>
      </div>

      <Tabs defaultValue="subscription" className="space-y-6">
        <TabsList>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="billing">Billing History</TabsTrigger>
          <TabsTrigger value="account">Account Settings</TabsTrigger>
        </TabsList>

        {/* Subscription Tab */}
        <TabsContent value="subscription" className="space-y-6">
          {/* Current Plan */}
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-slate-50 rounded-lg">
                <div>
                  <h3 className="text-gray-900 text-xl">{currentPlan} Plan</h3>
                  <p className="text-gray-600 mt-1">PKR {pricePerBus.toLocaleString()}/bus/month</p>
                </div>
                <Badge className="bg-blue-600 text-lg px-4 py-2">Active</Badge>
              </div>

              <Separator />

              {/* Subscription Details */}
              <div className="space-y-4">
                <h3 className="text-gray-900">Subscription Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 text-sm">Number of Buses</p>
                    <p className="text-gray-900 text-2xl mt-1">{busCount}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 text-sm">Price per Bus</p>
                    <p className="text-gray-900 text-2xl mt-1">PKR {pricePerBus.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg col-span-2">
                    <p className="text-gray-600 text-sm">Monthly Total</p>
                    <p className="text-blue-600 text-3xl mt-1">PKR {monthlyTotal.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Manage Subscription */}
              <div className="space-y-3">
                <h3 className="text-gray-900">Manage Subscription</h3>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Bus
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Minus className="w-4 h-4 mr-2" />
                    Remove Bus
                  </Button>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Upgrade to Premium
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Premium Features */}
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="text-purple-900">Premium Plan Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-purple-900">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  AI-powered route optimization
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  Advanced performance analytics
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  Fuel & cost savings reports
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  Priority support
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  Custom integrations
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Maintenance Fee Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Fee Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-gray-600 text-sm">
                  Quarterly maintenance fees ensure your system stays up-to-date and secure.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 text-sm">Quarterly Fee</p>
                    <p className="text-gray-900 text-xl mt-1">PKR 15,000</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 text-sm">Next Payment</p>
                    <p className="text-gray-900 text-xl mt-1">Jan 1, 2026</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing History Tab */}
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockInvoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-gray-900">{invoice.month}</p>
                        <p className="text-gray-600 text-sm">{invoice.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-gray-900">{invoice.amount}</p>
                      <Badge variant={invoice.status === 'paid' ? 'default' : 'outline'}
                        className={invoice.status === 'paid' ? 'bg-green-600' : 'text-orange-600 border-orange-600'}>
                        {invoice.status}
                      </Badge>
                      {invoice.status === 'paid' && (
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Settings Tab */}
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">Institution</p>
                  <p className="text-gray-900 mt-1">City University Of Science and Technology</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Admin Email</p>
                  <p className="text-gray-900 mt-1">transport@cust.edu.pk</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Contact Number</p>
                  <p className="text-gray-900 mt-1">+92 300 1234567</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Account Since</p>
                  <p className="text-gray-900 mt-1">January 2025</p>
                </div>
              </div>
              <Separator />
              <Button variant="outline">Change Password</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Admin Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Muhammad Tariq', role: 'Transport Manager', email: 'mtariq@cust.edu.pk' },
                  { name: 'Ayesha Khan', role: 'Assistant Manager', email: 'akhan@cust.edu.pk' },
                ].map((user, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-gray-900">{user.name}</p>
                      <p className="text-gray-600 text-sm">{user.email}</p>
                    </div>
                    <Badge variant="outline">{user.role}</Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-3">
                <Plus className="w-4 h-4 mr-2" />
                Add Admin User
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
