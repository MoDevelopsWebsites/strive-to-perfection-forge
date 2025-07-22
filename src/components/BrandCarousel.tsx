import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const brands = [
  {
    id: 1,
    name: "Colosseum Gaming",
    logo: "/lovable-uploads/874518e7-8c84-4f76-9bfb-529ce4635d31.png",
  },
  {
    id: 2,
    name: "KinxeGaming",
    logo: "/lovable-uploads/14b1cdc0-4b6b-45c6-a014-47b08199cd63.png",
  },
  {
    id: 3,
    name: "Radiant Studios",
    logo: "/lovable-uploads/5a5e6737-f9a7-483c-a442-b7009a75240a.png",
  }
];

// Duplicate brands for seamless infinite loop
const infiniteBrands = [...brands, ...brands, ...brands, ...brands];

const BrandCarousel = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="w-full py-16 bg-background/50 backdrop-blur-sm border-y border-border/20">
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center">
          <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">
            Trusted by Gaming Communities
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            Our Brand Portfolio
          </h2>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Navigation Arrows */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300 shadow-lg"
          onClick={() => {}}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300 shadow-lg"
          onClick={() => {}}
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Infinite Scrolling Container */}
        <div
          className={`flex w-full ${isPaused ? 'animate-marquee-paused' : 'animate-marquee'}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {infiniteBrands.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="flex-shrink-0 px-4 md:px-6"
            >
              <div className="group relative">
                <div className="w-32 md:w-40 lg:w-48 h-20 md:h-24 lg:h-28 bg-white/80 backdrop-blur-sm rounded-xl border border-border/30 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:bg-white/90 flex items-center justify-center p-4">
                  {/* Subtle glow effect on hover */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-w-full max-h-full object-contain filter group-hover:brightness-105 transition-all duration-300 relative z-10"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient fade edges */}
        <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-background/80 to-transparent pointer-events-none z-5"></div>
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-background/80 to-transparent pointer-events-none z-5"></div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {brands.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === 0 ? 'bg-primary w-6' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            onClick={() => {}}
          />
        ))}
      </div>
    </section>
  );
};

export default BrandCarousel;