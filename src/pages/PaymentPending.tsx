import { useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, MessageCircle, Users } from 'lucide-react';

const PaymentPending = () => {
  const [searchParams] = useSearchParams();
  const productName = searchParams.get('product') || 'S2P Product';
  const totalAmount = searchParams.get('total') || '0.00';
  const customerEmail = searchParams.get('email') || '';

  const handleJoinDiscord = () => {
    window.open('https://discord.gg/Hyu6j4RFrp', '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Payment Pending</h1>
          <p className="text-muted-foreground">
            Thank you for your order! We're processing your payment.
          </p>
        </div>

        {/* Order Details */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Product:</span>
              <span className="font-medium">{productName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span>{customerEmail}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Amount:</span>
              <span className="font-bold text-primary">£{totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span className="capitalize font-medium">Pending</span>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Complete Your Order
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-black-50 border border-black-200 rounded-lg p-4 dark:bg-black-950/20 dark:border-black-800">
              <h3 className="font-semibold text-black-900 dark:text-black-100 mb-2">
                Important: Final Step Required
              </h3>
              <p className="text-black-800 dark:text-black-200 text-sm mb-3">
                To complete your order and confirm shipping details, please:
              </p>
              <ol className="list-decimal list-inside text-black-800 dark:text-black-200 text-sm space-y-1">
                <li>Join our Discord server</li>
                <li>Open a support ticket</li>
                <li>Provide your order details (product: {productName}, total: £{totalAmount})</li>
                <li>Confirm your shipping address</li>
              </ol>
            </div>

            <Button
              onClick={handleJoinDiscord}
              className="w-full gap-2"
              size="lg"
            >
              <Users className="w-5 h-5" />
              Join S2P Discord Server
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              <p>Our team will process your order within 24 hours</p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3">What happens next?</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <span className="font-bold text-primary">1.</span>
                <span>Your PayPal payment will be verified by our team</span>
              </div>
              <div className="flex gap-3">
                <span className="font-bold text-primary">2.</span>
                <span>We'll confirm your shipping details via Discord</span>
              </div>
              <div className="flex gap-3">
                <span className="font-bold text-primary">3.</span>
                <span>Your order will be packaged and shipped within 3-5 business days</span>
              </div>
              <div className="flex gap-3">
                <span className="font-bold text-primary">4.</span>
                <span>You'll receive tracking information once shipped</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentPending;