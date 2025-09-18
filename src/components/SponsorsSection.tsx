const SponsorsSection = () => {
  const sponsors = [
    { 
      name: "Colosseum Gaming", 
      logo: "/lovable-uploads/874518e7-8c84-4f76-9bfb-529ce4635d31.png",
      className: "h-12 object-contain"
    },
    { 
      name: "KinxeGaming", 
      logo: "/lovable-uploads/14b1cdc0-4b6b-45c6-a014-47b08199cd63.png",
      className: "h-10 object-contain"
    },
    { 
      name: "Radiant Studios", 
      logo: "/lovable-uploads/5a5e6737-f9a7-483c-a442-b7009a75240a.png",
      className: "h-12 object-contain"
    },
    { 
      name: "MANATEE.GG", 
      logo: "/lovable-uploads/866683c9-6ba6-488d-93ed-5b444e83f6e6.png",
      className: "h-8 object-contain"
    }
  ];

  return (
    <section className="bg-white py-16 border-t">
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
          
          {/* Infinite scrolling sponsor logos */}
          <div className="flex items-center space-x-12 animate-marquee hover:animate-marquee-paused will-change-transform">
            {/* Duplicate sponsors for seamless loop */}
            {[...Array(8)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center space-x-12 flex-shrink-0">
                {sponsors.map((sponsor, index) => (
                  <div key={`${setIndex}-${index}`} className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                    <img 
                      src={sponsor.logo} 
                      alt={sponsor.name}
                      className={sponsor.className}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;