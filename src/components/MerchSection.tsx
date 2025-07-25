import { useState, useEffect, useRef } from 'react';
import { ShoppingBag, ExternalLink, Zap, Star, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
}

const MerchSection = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products...');
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('in_stock', true)
          .order('name');
        
        if (error) throw error;
        console.log('Products fetched:', data);
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Automatically show cards once products are loaded
    if (products.length > 0) {
      setTimeout(() => setVisibleCards([true, false, false]), 200);
      setTimeout(() => setVisibleCards([true, true, false]), 600);
      setTimeout(() => setVisibleCards([true, true, true]), 1000);
    }
  }, [products]);

  const getProductImage = (product: Product) => {
    switch (product.name) {
      case 'S2P Jersey':
        return '/lovable-uploads/6ffcd167-a35a-4525-a433-71d35bbcbf75.png';
      case 'S2P Hoodie':
        return '/lovable-uploads/0443d5b0-7a21-4503-a12a-dd28026a206c.png';
      case 'S2P Hoodie & Jersey Bundle':
        return '/lovable-uploads/ab9ae4a2-d781-4232-96f6-c6d3ecefc679.png';
      default:
        return product.image_url;
    }
  };

  if (loading) {
    return (
      <section className="relative min-h-screen py-20 backdrop-blur-xl flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="merch" className="relative min-h-screen py-20 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <h2 className="text-4xl md:text-6xl font-sans font-medium text-primary glow-text">
              OFFICIAL STORE
            </h2>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground font-display max-w-3xl mx-auto mb-4">
            Premium S2P merchandise crafted for champions
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Tag className="w-4 h-4" />
            <span>Free shipping on orders over £50</span>
            <span className="mx-2">•</span>
            <span>Secure PayPal checkout</span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto mb-8 lg:mb-12">
          {products.slice(0, 3).map((product, index) => (
            <Card
              key={product.id}
              className={`group gaming-card hover:border-primary/60 transition-all duration-700 cursor-pointer overflow-hidden relative ${
                hoveredItem === index ? 'scale-105 -translate-y-4' : ''
              } ${
                visibleCards[index] 
                  ? 'animate-[glowFadeIn_1.2s_ease-out_forwards] opacity-100' 
                  : 'opacity-0 translate-y-20'
              }`}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {/* Enhanced glow effect that appears on scroll */}
              <div className={`absolute -inset-4 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 rounded-xl blur-xl transition-all duration-1000 ${
                visibleCards[index] ? 'opacity-100 animate-pulse' : 'opacity-0'
              }`}></div>
              <div className="relative overflow-hidden">
                {/* Holographic effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                
                {/* Image with advanced effects */}
                <div className="relative z-20 bg-gradient-to-br from-background/50 to-card/50 backdrop-blur-sm">
                  <img
                    src={getProductImage(product)}
                    alt={product.name}
                    className="w-full h-64 lg:h-80 object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                  />
                  
                  {/* Floating particles effect */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-4 left-4 w-2 h-2 bg-primary rounded-full animate-[float_2s_ease-in-out_infinite]"></div>
                    <div className="absolute top-8 right-6 w-1 h-1 bg-secondary rounded-full animate-[float_2s_ease-in-out_infinite] animation-delay-500"></div>
                    <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-accent rounded-full animate-[float_2s_ease-in-out_infinite] animation-delay-1000"></div>
                  </div>
                </div>
              </div>

              <CardContent className="p-4 lg:p-6 relative z-20">
                <div className="mb-2">
                  <span className="inline-block px-2 lg:px-3 py-1 bg-primary/20 text-primary text-xs lg:text-sm font-semibold rounded-full border border-primary/30">
                    {product.category}
                  </span>
                </div>
                
                <h3 className="text-lg lg:text-xl font-gaming font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {product.name}
                </h3>
                
                <p className="text-muted-foreground mb-3 lg:mb-4 font-display line-clamp-2 text-sm lg:text-base">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xl lg:text-2xl font-bold text-primary glow-text">
                    £{product.price}
                  </span>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ShoppingBag className="w-5 h-5 lg:w-6 lg:h-6 text-primary animate-bounce" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="mb-8">
            <Card className="inline-block bg-card/40 backdrop-blur-xl border border-primary/30 hover:border-primary/60 transition-all duration-500">
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground font-display mb-6">
                  Explore our complete collection of premium S2P merchandise
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-2xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-500 hover:scale-110 hover:-translate-y-2 text-lg lg:text-xl px-8 lg:px-12 py-4 lg:py-6 font-semibold rounded-xl group"
                    onClick={() => navigate('/shop')}
                  >
                    <ShoppingBag className="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3 group-hover:animate-bounce" />
                    View Full Store
                    <Zap className="w-4 h-4 lg:w-5 lg:h-5 ml-2 lg:ml-3 group-hover:animate-pulse" />
                  </Button>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    {products.length} items in stock
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-sm text-muted-foreground/80">
            <div className="flex items-center justify-center gap-2">
              <ShoppingBag className="w-4 h-4 text-primary" />
              <span>Secure PayPal Checkout</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span>Fast Worldwide Shipping</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Star className="w-4 h-4 text-primary" />
              <span>Premium Quality</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MerchSection;