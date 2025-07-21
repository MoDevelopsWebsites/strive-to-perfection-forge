import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ShoppingCart, Star, ArrowLeft, Package, Truck, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  in_stock: boolean;
}

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (error) throw error;
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast({
        title: "Error",
        description: "Product not found",
        variant: "destructive"
      });
      navigate('/shop');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!product || !customerName || !customerEmail || !shippingAddress) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setProcessing(true);

    try {
      // Calculate total and redirect directly to PayPal
      const totalAmount = (product.price * quantity).toFixed(2);
      const paypalUrl = `https://www.paypal.me/Goku515/${totalAmount}`;
      
      // Open PayPal in new tab
      window.open(paypalUrl, '_blank');
      
      // Redirect to confirmation page with product info
      navigate(`/payment-pending?product=${product.name}&total=${totalAmount}&email=${customerEmail}`);

    } catch (error) {
      console.error('Error processing payment:', error);
      toast({
        title: "Error",
        description: "Failed to process payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading product...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Product not found</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/shop')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </CardContent>
            </Card>
            
            {/* Product Features */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <Package className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium">Premium Quality</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Truck className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium">Fast Shipping</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Shield className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium">Secure Payment</div>
              </div>
            </div>
          </div>

          {/* Product Details & Purchase Form */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">{product.category}</Badge>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-muted-foreground">(4.9) • 127 reviews</span>
              </div>
              <p className="text-muted-foreground mb-4">{product.description}</p>
              <div className="text-3xl font-bold text-primary mb-6">
                ${product.price.toFixed(2)}
              </div>
            </div>

            {/* Purchase Form */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold mb-4">Order Information</h3>
                
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20"
                  />
                </div>

                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">Shipping Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your complete shipping address"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    required
                  />
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg">Total:</span>
                    <span className="text-2xl font-bold text-primary">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                  </div>
                  
                  <Button
                    className="w-full gap-2"
                    onClick={handlePurchase}
                    disabled={processing || !product.in_stock}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {processing ? 'Processing...' : 'Pay with PayPal'}
                  </Button>
                  
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    You'll be redirected to PayPal for secure payment
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Product;