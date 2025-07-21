import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, MessageCircle, Users } from 'lucide-react';

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  status: string;
  created_at: string;
}

const PaymentPending = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (error) throw error;
      setOrder(data);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinDiscord = () => {
    window.open('https://discord.gg/s2p', '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading order details...</div>
        </div>
        <Footer />
      </div>
    );
  }

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
        {order && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Order Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order ID:</span>
                <span className="font-mono text-sm">{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Customer:</span>
                <span>{order.customer_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span>{order.customer_email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Amount:</span>
                <span className="font-bold text-primary">${order.total_amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="capitalize font-medium">{order.status}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Next Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Complete Your Order
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 dark:bg-blue-950/20 dark:border-blue-800">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Important: Final Step Required
              </h3>
              <p className="text-blue-800 dark:text-blue-200 text-sm mb-3">
                To complete your order and confirm shipping details, please:
              </p>
              <ol className="list-decimal list-inside text-blue-800 dark:text-blue-200 text-sm space-y-1">
                <li>Join our Discord server</li>
                <li>Open a support ticket</li>
                <li>Provide your order ID: <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">{orderId}</code></li>
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