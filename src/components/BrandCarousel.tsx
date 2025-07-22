import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const brands = [
  {
    id: 1,
    name: "Colosseum Gaming",
    logo: "/lovable-uploads/874518e7-8c84-4f76-9bfb-529ce4635d31.png",
    description: "Epic gaming experiences"
  },
  {
    id: 2,
    name: "KinxeGaming",
    logo: "/lovable-uploads/14b1cdc0-4b6b-45c6-a014-47b08199cd63.png",
    description: "Competitive gaming excellence"
  },
  {
    id: 3,
    name: "Radiant Studios",
    logo: "/lovable-uploads/5a5e6737-f9a7-483c-a442-b7009a75240a.png",
    description: "Creative digital solutions"
  }
];

const BrandCarousel = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element-1 absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
        <div className="floating-element-2 absolute top-32 right-20 w-16 h-16 bg-accent/10 rounded-full blur-lg"></div>
        <div className="floating-element-3 absolute bottom-20 left-1/4 w-24 h-24 bg-muted/20 rounded-full blur-2xl"></div>
        <div className="floating-element-4 absolute bottom-10 right-10 w-18 h-18 bg-primary/5 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Our Brand Portfolio
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the diverse gaming brands under our umbrella, each bringing unique experiences to the community
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {brands.map((brand) => (
                <CarouselItem key={brand.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="group relative">
                    <div className="relative p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-500 hover:transform hover:scale-105">
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative z-10">
                        {/* Brand logo container */}
                        <div className="flex justify-center mb-6">
                          <div className="relative w-24 h-24 rounded-xl bg-background/80 backdrop-blur-sm p-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                            <img
                              src={brand.logo}
                              alt={brand.name}
                              className="w-full h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                            />
                          </div>
                        </div>

                        {/* Brand info */}
                        <div className="text-center">
                          <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                            {brand.name}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {brand.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation buttons */}
            <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300" />
            <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300" />
          </Carousel>

          {/* Decorative gradient blur */}
          <div className="absolute -inset-x-20 -inset-y-10 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 rounded-3xl blur-3xl pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;