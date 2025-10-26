import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ChevronLeft, CreditCard, CheckCircle, Clock, ExternalLink, Smartphone, Wallet } from 'lucide-react';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useState } from 'react';
import type { MainScreen } from './main-app';

interface TransportFeeScreenProps {
  onNavigate: (screen: MainScreen) => void;
}

const paymentHistory = [
  { month: 'September 2025', amount: 'PKR 8,000', status: 'Paid', date: 'Sep 5, 2025' },
  { month: 'August 2025', amount: 'PKR 8,000', status: 'Paid', date: 'Aug 3, 2025' },
  { month: 'July 2025', amount: 'PKR 8,000', status: 'Paid', date: 'Jul 2, 2025' },
  { month: 'June 2025', amount: 'PKR 8,000', status: 'Paid', date: 'Jun 1, 2025' },
];

export function TransportFeeScreen({ onNavigate }: TransportFeeScreenProps) {
  const feeStatus = 'PENDING'; // or 'PAID'
  const amountDue = 'PKR 8,000';
  const dueDate = 'October 31, 2025';
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('jazzcash');
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  const handlePayment = () => {
    // Payment processing logic would go here
    alert(`Processing payment via ${selectedPaymentMethod}...`);
    setIsPaymentDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Clean iOS Style */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('profile')}
            className="hover:bg-gray-100 -ml-2"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </Button>
          <h1 className="text-gray-900">Transport Fee</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {/* Main Status Card */}
        <Card className={`border-2 ${feeStatus === 'PAID' ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'}`}>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full">
                <CreditCard className={`w-8 h-8 ${feeStatus === 'PAID' ? 'text-green-600' : 'text-orange-600'}`} />
              </div>
              <div>
                <Badge
                  className={`${
                    feeStatus === 'PAID'
                      ? 'bg-green-600'
                      : 'bg-orange-600'
                  } text-white`}
                >
                  {feeStatus}
                </Badge>
                <p className="text-gray-900 text-2xl mt-3">{amountDue}</p>
                <p className="text-gray-600 text-sm mt-1">
                  {feeStatus === 'PAID' ? 'Paid for this month' : `Due Date: ${dueDate}`}
                </p>
              </div>
              {feeStatus === 'PENDING' && (
                <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Wallet className="w-4 h-4 mr-2" />
                      Pay Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Select Payment Method</DialogTitle>
                      <DialogDescription>
                        Choose your preferred payment method to pay PKR 8,000
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                        {/* JazzCash */}
                        <div className="flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => setSelectedPaymentMethod('jazzcash')}
                          style={{ borderColor: selectedPaymentMethod === 'jazzcash' ? '#DC2626' : '#E5E7EB' }}>
                          <RadioGroupItem value="jazzcash" id="jazzcash" />
                          <Label htmlFor="jazzcash" className="flex-1 cursor-pointer flex items-center gap-3">
                            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                              <Smartphone className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                              <p className="text-gray-900">JazzCash</p>
                              <p className="text-gray-600 text-xs">Mobile Wallet</p>
                            </div>
                          </Label>
                        </div>

                        {/* Easypaisa */}
                        <div className="flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => setSelectedPaymentMethod('easypaisa')}
                          style={{ borderColor: selectedPaymentMethod === 'easypaisa' ? '#16A34A' : '#E5E7EB' }}>
                          <RadioGroupItem value="easypaisa" id="easypaisa" />
                          <Label htmlFor="easypaisa" className="flex-1 cursor-pointer flex items-center gap-3">
                            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                              <Wallet className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                              <p className="text-gray-900">Easypaisa</p>
                              <p className="text-gray-600 text-xs">Mobile Wallet</p>
                            </div>
                          </Label>
                        </div>

                        {/* Mastercard */}
                        <div className="flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => setSelectedPaymentMethod('mastercard')}
                          style={{ borderColor: selectedPaymentMethod === 'mastercard' ? '#1D4ED8' : '#E5E7EB' }}>
                          <RadioGroupItem value="mastercard" id="mastercard" />
                          <Label htmlFor="mastercard" className="flex-1 cursor-pointer flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                              <CreditCard className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-gray-900">Mastercard</p>
                              <p className="text-gray-600 text-xs">Credit/Debit Card</p>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>

                      {/* Payment Details Input */}
                      {selectedPaymentMethod === 'jazzcash' || selectedPaymentMethod === 'easypaisa' ? (
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label htmlFor="mobile">Mobile Number</Label>
                            <Input id="mobile" placeholder="03XX XXXXXXX" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="pin">PIN/MPIN</Label>
                            <Input id="pin" type="password" placeholder="Enter your PIN" />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input id="card-number" placeholder="1234 5678 9012 3456" />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input id="expiry" placeholder="MM/YY" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV</Label>
                              <Input id="cvv" type="password" placeholder="123" />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Payment Summary */}
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">Amount to Pay</span>
                          <span className="text-blue-600 text-xl">PKR 8,000</span>
                        </div>
                      </div>

                      <Button onClick={handlePayment} className="w-full bg-blue-600 hover:bg-blue-700">
                        Confirm Payment
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Installment Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Installment Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-gray-900 text-sm">Installment 1 of 2</p>
                  <p className="text-gray-600 text-xs">PKR 4,000</p>
                </div>
              </div>
              <Badge className="bg-green-600">Paid</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-gray-900 text-sm">Installment 2 of 2</p>
                  <p className="text-gray-600 text-xs">PKR 4,000</p>
                </div>
              </div>
              <Badge className="bg-orange-600">Pending</Badge>
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
              {paymentHistory.map((payment, index) => (
                <div key={index} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-gray-900">{payment.month}</p>
                    <p className="text-gray-600 text-sm mt-0.5">{payment.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900">{payment.amount}</p>
                    <div className="flex items-center gap-1 mt-0.5 justify-end">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      <span className="text-green-600 text-xs">{payment.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <p className="text-blue-900 text-sm">
              <span>All payments are securely processed. Choose from JazzCash, Easypaisa, or Mastercard for quick and easy payment.</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}