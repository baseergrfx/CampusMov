import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { DollarSign, Calendar, CheckCircle, Clock, ExternalLink } from 'lucide-react';

interface FeeRecord {
  month: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
}

const mockFeeRecords: FeeRecord[] = [
  {
    month: 'November 2025',
    amount: 8000,
    dueDate: 'Nov 30, 2025',
    status: 'pending',
  },
  {
    month: 'October 2025',
    amount: 8000,
    dueDate: 'Oct 31, 2025',
    status: 'paid',
    paidDate: 'Oct 28, 2025',
  },
  {
    month: 'September 2025',
    amount: 8000,
    dueDate: 'Sep 30, 2025',
    status: 'paid',
    paidDate: 'Sep 25, 2025',
  },
  {
    month: 'August 2025',
    amount: 8000,
    dueDate: 'Aug 31, 2025',
    status: 'paid',
    paidDate: 'Aug 29, 2025',
  },
];

export function FeesTab() {
  const currentFee = mockFeeRecords.find(f => f.status === 'pending' || f.status === 'overdue');

  const getStatusBadge = (status: FeeRecord['status']) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-600">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-orange-600">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-red-600">Overdue</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 shadow-md">
        <div>
          <h1>Transport Fees</h1>
          <p className="text-green-100 text-sm">Fee status & payment history</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Current Fee Status */}
        {currentFee && (
          <Card className={`border-2 ${
            currentFee.status === 'pending' ? 'border-orange-200 bg-orange-50' : 'border-red-200 bg-red-50'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Current Fee Status</p>
                  <h3 className={`text-2xl mb-2 ${
                    currentFee.status === 'pending' ? 'text-orange-900' : 'text-red-900'
                  }`}>
                    PKR {currentFee.amount.toLocaleString()}
                  </h3>
                  {getStatusBadge(currentFee.status)}
                </div>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                  currentFee.status === 'pending' ? 'bg-orange-100' : 'bg-red-100'
                }`}>
                  <DollarSign className={`w-7 h-7 ${
                    currentFee.status === 'pending' ? 'text-orange-600' : 'text-red-600'
                  }`} />
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Due Date: <span className="font-medium">{currentFee.dueDate}</span></span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Period: <span className="font-medium">{currentFee.month}</span></span>
                </div>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700">
                <ExternalLink className="w-4 h-4 mr-2" />
                Pay via University Portal
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Payment Methods Info */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <p className="text-blue-900 text-sm mb-2">
              <span className="font-medium">Accepted Payment Methods:</span>
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-white">JazzCash</Badge>
              <Badge variant="outline" className="bg-white">Easypaisa</Badge>
              <Badge variant="outline" className="bg-white">Mastercard</Badge>
              <Badge variant="outline" className="bg-white">Bank Transfer</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment History</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {mockFeeRecords.map((record, index) => (
                <div key={index} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">{record.month}</p>
                      <p className="text-sm text-gray-600">PKR {record.amount.toLocaleString()}</p>
                    </div>
                    {getStatusBadge(record.status)}
                  </div>

                  {record.status === 'paid' && record.paidDate ? (
                    <div className="flex items-center gap-2 text-green-600 text-sm mt-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Paid on {record.paidDate}</span>
                    </div>
                  ) : record.status === 'pending' ? (
                    <div className="text-sm text-orange-600 mt-2">
                      Due: {record.dueDate}
                    </div>
                  ) : (
                    <div className="text-sm text-red-600 mt-2">
                      Overdue since {record.dueDate}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Total Summary */}
        <Card className="bg-gray-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Paid This Year</p>
                <p className="text-gray-900 text-2xl font-medium">PKR 24,000</p>
              </div>
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
