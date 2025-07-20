import { useState, useEffect, useRef } from 'react';
import { ShoppingBag, ExternalLink, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const MerchSection = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger cards to appear one by one with delays
            setTimeout(() => setVisibleCards(prev => [true, prev[1], prev[2]]), 200);
            setTimeout(() => setVisibleCards(prev => [prev[0], true, prev[2]]), 600);
            setTimeout(() => setVisibleCards(prev => [prev[0], prev[1], true]), 1000);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const merchItems = [
    {
      id: 1,
      name: "S2PGGs Gaming Jersey",
      description: "Premium esports jersey with signature purple design",
      image: "/lovable-uploads/d84d4bbd-8083-4b11-ad0b-42850856a57f.png",
      price: "From $45",
      category: "Jersey"
    },
    {
      id: 2,
      name: "Custom Gamertag Jersey",
      description: "Personalized jersey with your gamertag - Strive 2 Perfection",
      image: "/lovable-uploads/217da5cf-f539-4bd2-9e98-da82d4ae1c1e.png",
      price: "From $50",
      category: "Custom Jersey"
    },
    {
      id: 3,
      name: "S2PGGs Apparel Collection",
      description: "Complete collection featuring jersey and hoodie combo",
      image: "/lovable-uploads/6c6abcc5-cdb4-419a-9113-483835517d96.png",
      price: "From $80",
      category: "Bundle"
    }
  ];

  return (
    <section ref={sectionRef} id="merch" className="relative min-h-screen py-20 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-primary animate-pulse" />
            <h2 className="text-4xl md:text-6xl font-sans font-medium text-primary glow-text">
              OFFICIAL MERCH
            </h2>
            <Zap className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground font-display max-w-3xl mx-auto">
            Rep the squad with our exclusive S2PGGs merchandise collection
          </p>
        </div>

        {/* Merch Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {merchItems.map((item, index) => (
            <Card
              key={item.id}
              className={`group gaming-card hover:border-primary/60 transition-all duration-700 cursor-pointer overflow-hidden relative ${
                hoveredItem === index ? 'scale-105 -translate-y-4' : ''
              } ${
                visibleCards[index] 
                  ? 'animate-[glowFadeIn_1.2s_ease-out_forwards] opacity-100' 
                  : 'opacity-0 translate-y-20'
              }`}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
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
                    src={item.image}
                    alt={item.name}
                    className="w-full h-80 object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                  />
                  
                  {/* Floating particles effect */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-4 left-4 w-2 h-2 bg-primary rounded-full animate-[float_2s_ease-in-out_infinite]"></div>
                    <div className="absolute top-8 right-6 w-1 h-1 bg-secondary rounded-full animate-[float_2s_ease-in-out_infinite] animation-delay-500"></div>
                    <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-accent rounded-full animate-[float_2s_ease-in-out_infinite] animation-delay-1000"></div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6 relative z-20">
                <div className="mb-2">
                  <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm font-semibold rounded-full border border-primary/30">
                    {item.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-gaming font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {item.name}
                </h3>
                
                <p className="text-muted-foreground mb-4 font-display">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary glow-text">
                    {item.price}
                  </span>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ShoppingBag className="w-6 h-6 text-primary animate-bounce" />
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
              <CardContent className="p-6">
                <p className="text-lg text-muted-foreground font-display mb-4">
                  Ready to join the squad?
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-2xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-500 hover:scale-110 hover:-translate-y-2 text-xl px-12 py-8 font-semibold rounded-xl group"
                  onClick={() => window.open('https://www.manatee.gg/collections/s2p', '_blank')}
                >
                  <ShoppingBag className="w-6 h-6 mr-3 group-hover:animate-bounce" />
                  Shop Official Merch
                  <ExternalLink className="w-5 h-5 ml-3 group-hover:animate-pulse" />
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <p className="text-sm text-muted-foreground/60 font-display">
            Powered by Manatee.gg • Free shipping on orders over $75
          </p>
        </div>
      </div>
    </section>
  );
};

export default MerchSection;