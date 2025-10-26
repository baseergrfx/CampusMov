import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Sparkles, Check } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

interface PremiumDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PremiumDialog({ open, onOpenChange }: PremiumDialogProps) {
  const premiumFeatures = [
    'AI-powered route optimization',
    'Advanced performance analytics',
    'Fuel & cost savings reports',
    'Predictive delay alerts',
    'Driver behavior monitoring',
    'Real-time anomaly detection',
    'Priority customer support',
    'Custom integrations & API access',
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl">Upgrade to Premium</DialogTitle>
              <DialogDescription>
                Unlock powerful AI features and advanced analytics
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Pricing */}
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
            <CardContent className="p-6 text-center">
              <p className="text-gray-600 mb-2">Starting at</p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-4xl font-bold text-purple-600">PKR 20,000</span>
                <span className="text-gray-600">/bus/month</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">Includes all standard features plus premium</p>
            </CardContent>
          </Card>

          {/* Features */}
          <div>
            <h3 className="text-gray-900 font-medium mb-4">Premium Features Include:</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ROI Info */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <p className="text-blue-900 text-sm">
                <strong>Average ROI:</strong> Premium customers save an average of PKR 50,000/month through optimized routes and fuel efficiency - paying for itself in the first month!
              </p>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Button 
              className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              onClick={() => {
                window.open('mailto:sales@campusmove.com?subject=Premium Upgrade Request&body=I would like to upgrade to CampusMove Premium. Please contact me with more details.', '_blank');
                onOpenChange(false);
              }}
            >
              Contact Sales
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Maybe Later
            </Button>
          </div>

          <p className="text-xs text-center text-gray-500">
            Have questions? Contact us at <a href="mailto:sales@campusmove.com" className="text-purple-600 hover:underline">sales@campusmove.com</a> or call +92 300 1234567
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
