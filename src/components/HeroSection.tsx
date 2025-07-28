import { useState, useEffect } from 'react';
import { Users, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const HeroSection = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [displayedDescription, setDisplayedDescription] = useState('');
  const [displayedButton1, setDisplayedButton1] = useState('');
  const [displayedButton2, setDisplayedButton2] = useState('');
  const [showDescription, setShowDescription] = useState(false);
  const [showFirstButton, setShowFirstButton] = useState(false);
  const [showSecondButton, setShowSecondButton] = useState(false);
  const [showBrandShowcase, setShowBrandShowcase] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const fullText = 'STRIVE 2 PERFECTION';
  const descriptionText = 'Premier Fortnite esports organization competing at the highest level.';
  const button1Text = 'Join Our Team';
  const button2Text = 'Watch Highlights';

  useEffect(() => {
    // Start page load animations
    setIsLoaded(true);
    
    // Delay text animations slightly for smooth page entry
    setTimeout(() => {
      let currentIndex = 0;
      
      // Title typewriter
      const typewriterInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typewriterInterval);
        // Start description after title completes
        setTimeout(() => {
          setShowDescription(true);
          let descIndex = 0;
          const descInterval = setInterval(() => {
            if (descIndex <= descriptionText.length) {
              setDisplayedDescription(descriptionText.slice(0, descIndex));
              descIndex++;
            } else {
              clearInterval(descInterval);
              // Start first button after description
              setTimeout(() => {
                setShowFirstButton(true);
                let btn1Index = 0;
                const btn1Interval = setInterval(() => {
                  if (btn1Index <= button1Text.length) {
                    setDisplayedButton1(button1Text.slice(0, btn1Index));
                    btn1Index++;
                  } else {
                    clearInterval(btn1Interval);
                    // Start second button after first button
                    setTimeout(() => {
                      setShowSecondButton(true);
                      let btn2Index = 0;
                      const btn2Interval = setInterval(() => {
                        if (btn2Index <= button2Text.length) {
                          setDisplayedButton2(button2Text.slice(0, btn2Index));
                          btn2Index++;
                        } else {
                          clearInterval(btn2Interval);
                          // Trigger brand showcase after second button completes
                          setTimeout(() => {
                            setShowBrandShowcase(true);
                          }, 800);
                        }
                      }, 50);
                    }, 300);
                  }
                }, 50);
              }, 400);
            }
          }, 30);
        }, 500);
      }
    }, 100);

      return () => clearInterval(typewriterInterval);
    }, 800); // 800ms delay for smooth page entry
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* Abstract flowing background layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Main flowing shape with gradient */}
        <div className="absolute inset-0 w-full h-full">
          <svg 
            className="absolute inset-0 w-full h-full object-cover animate-[floatSlow_20s_ease-in-out_infinite] will-change-transform" 
            viewBox="0 0 1200 800" 
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="heroGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1"/>
                <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="0.05"/>
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.08"/>
              </linearGradient>
              <linearGradient id="heroGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.06"/>
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.04"/>
              </linearGradient>
              <filter id="blur1">
                <feGaussianBlur stdDeviation="8"/>
              </filter>
            </defs>
            
            {/* Flowing organic shapes */}
            <path 
              d="M0,400 C300,200 600,600 1200,300 L1200,0 L0,0 Z" 
              fill="url(#heroGradient1)"
              className="animate-[morphShape1_15s_ease-in-out_infinite]"
            />
            <path 
              d="M0,600 C400,300 800,700 1200,400 L1200,800 L0,800 Z" 
              fill="url(#heroGradient2)"
              className="animate-[morphShape2_18s_ease-in-out_infinite_reverse]"
            />
            
            {/* Additional floating elements with blur */}
            <circle 
              cx="200" 
              cy="150" 
              r="80" 
              fill="hsl(var(--primary))" 
              fillOpacity="0.03"
              filter="url(#blur1)"
              className="animate-[floatBubble1_12s_ease-in-out_infinite]"
            />
            <circle 
              cx="1000" 
              cy="600" 
              r="120" 
              fill="hsl(var(--secondary))" 
              fillOpacity="0.04"
              filter="url(#blur1)"
              className="animate-[floatBubble2_16s_ease-in-out_infinite_reverse]"
            />
          </svg>
        </div>
        
        {/* Additional gradient mesh overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 animate-[gradientShift_25s_ease-in-out_infinite]"></div>
        
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:32px_32px] animate-[textureFloat_30s_linear_infinite]"></div>
      </div>
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 xl:gap-24 items-center min-h-[80vh] lg:min-h-screen">
            {/* Left Side - Content */}
            <div className={`text-left transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Title with typewriter effect */}
              <div className="mb-4 sm:mb-6 lg:mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-sans font-medium text-primary glow-text leading-tight sm:leading-none tracking-tight">
                  {displayedText}
                  <span className="animate-pulse">|</span>
                </h1>
              </div>

              {/* Description */}
              {showDescription && (
                <div className="mb-6 sm:mb-8 lg:mb-12">
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light text-muted-foreground leading-relaxed max-w-xl">
                    {displayedDescription}
                    {displayedDescription.length < descriptionText.length && <span className="animate-pulse">|</span>}
                  </p>
                  <p className="text-primary font-semibold glow-text mt-2 sm:mt-3 lg:mt-4 text-sm sm:text-base lg:text-lg">
                    Building champions since 2023.
                  </p>
                </div>
              )}

              {/* CTA Buttons - Mobile optimized */}
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                {showFirstButton && (
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:scale-105 active:scale-95 text-sm sm:text-base lg:text-lg px-6 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 font-semibold rounded-lg min-h-[48px] touch-manipulation"
                    onClick={() => window.open('https://discord.gg/Hyu6j4RFrp', '_blank')}
                  >
                    <Users className="w-4 h-4 lg:w-5 lg:h-5 mr-2 flex-shrink-0" />
                    <span className="truncate">{displayedButton1}</span>
                    {displayedButton1.length < button1Text.length && <span className="animate-pulse">|</span>}
                  </Button>
                )}
                {showSecondButton && (
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary hover:scale-105 active:scale-95 transition-all duration-300 text-sm sm:text-base lg:text-lg px-6 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 font-semibold backdrop-blur-sm bg-background/20 shadow-lg rounded-lg min-h-[48px] touch-manipulation"
                    onClick={() => window.open('https://www.youtube.com/@S2PGGs', '_blank')}
                  >
                    <Play className="w-4 h-4 lg:w-5 lg:h-5 mr-2 flex-shrink-0" />
                    <span className="truncate">{displayedButton2}</span>
                    {displayedButton2.length < button2Text.length && <span className="animate-pulse">|</span>}
                  </Button>
                  )}
                </div>

                {/* Brand showcase - Mobile optimized */}
                {showSecondButton && (
                  <div 
                    className="mt-8 sm:mt-10 lg:mt-16 transition-all duration-1000 ease-out" 
                    style={{ 
                      opacity: showBrandShowcase ? 1 : 0, 
                      transform: showBrandShowcase ? 'translateY(0)' : 'translateY(20px)'
                    }}
                  >
                    <div className="text-center mb-6 sm:mb-8">
                      <p className="text-xs sm:text-sm text-muted-foreground/70 font-medium uppercase tracking-widest">
                        Trusted by Gaming Communities
                      </p>
                    </div>
                    
                    <div className="relative overflow-hidden">
                      {/* Gradient fade edges - Responsive */}
                      <div className="absolute left-0 top-0 w-4 sm:w-8 h-full bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none"></div>
                      <div className="absolute right-0 top-0 w-4 sm:w-8 h-full bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none"></div>
                      
                      {/* Infinite scrolling brand logos - Mobile optimized */}
                      <div className="flex items-center space-x-6 sm:space-x-8 lg:space-x-12 animate-marquee hover:animate-marquee-paused will-change-transform">
                        {/* Duplicate brands for seamless loop */}
                        {[...Array(6)].map((_, setIndex) => (
                          <div key={setIndex} className="flex items-center space-x-6 sm:space-x-8 lg:space-x-12 flex-shrink-0">
                            <img
                              src="/lovable-uploads/874518e7-8c84-4f76-9bfb-529ce4635d31.png"
                              alt="Colosseum Gaming"
                              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain opacity-60"
                              loading="lazy"
                            />
                            <img
                              src="/lovable-uploads/14b1cdc0-4b6b-45c6-a014-47b08199cd63.png"
                              alt="KinxeGaming"
                              className="w-12 h-6 sm:w-14 sm:h-8 lg:w-16 lg:h-10 object-contain opacity-60"
                              loading="lazy"
                            />
                            <img
                              src="/lovable-uploads/5a5e6737-f9a7-483c-a442-b7009a75240a.png"
                              alt="Radiant Studios"
                              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain opacity-60"
                              loading="lazy"
                            />
                            <img
                              src="/lovable-uploads/866683c9-6ba6-488d-93ed-5b444e83f6e6.png"
                              alt="MANATEE.GG"
                              className="w-14 h-6 sm:w-16 sm:h-7 lg:w-20 lg:h-8 object-contain opacity-60"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

            {/* Right Side - Video Displays */}
            <div className="relative ml-auto overflow-hidden order-first lg:order-last">
              <div className="relative sm:ml-8 lg:ml-32">
                {/* Desktop Screen - Mobile optimized laptop design */}
                <div className={`relative group transition-all duration-1200 ${isLoaded ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-16 scale-95'}`} style={{ transitionDelay: '400ms' }}>
                  {/* Laptop base/body - Mobile responsive */}
                  <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg sm:rounded-xl lg:rounded-2xl p-1.5 sm:p-2 lg:p-4 shadow-2xl shadow-black/10 transform hover:scale-105 transition-all duration-500 w-full min-w-[240px] sm:min-w-[320px] md:min-w-[400px] lg:min-w-[700px] max-w-5xl border border-slate-200 will-change-transform">
                    {/* Fade effect on right edge */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent rounded-xl lg:rounded-2xl pointer-events-none z-20" 
                         style={{
                           background: 'linear-gradient(to right, transparent 0%, transparent 85%, rgba(var(--background), 0.3) 95%, rgba(var(--background), 0.8) 100%)'
                         }}></div>
                    
                    {/* Screen bezel - Light mode */}
                    <div className="bg-gradient-to-br from-slate-300 to-slate-400 rounded-lg lg:rounded-xl p-1.5 lg:p-3 mb-2 lg:mb-4 shadow-inner">
                      {/* Screen */}
                      <div className="relative bg-gradient-to-br from-card/95 to-card/70 backdrop-blur-xl rounded-md lg:rounded-lg overflow-hidden">
                        {/* Top bar/menu */}
                        <div className="bg-background/90 px-2 lg:px-4 py-1 lg:py-2 flex items-center justify-between">
                          <div className="flex items-center gap-1 lg:gap-2">
                            <div className="w-2 h-2 lg:w-3 lg:h-3 bg-red-500 rounded-full"></div>
                            <div className="w-2 h-2 lg:w-3 lg:h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-2 h-2 lg:w-3 lg:h-3 bg-green-500 rounded-full"></div>
                          </div>
                          <div className="bg-muted/50 h-1 lg:h-2 rounded-full w-24 lg:w-48"></div>
                          <div className="w-4 lg:w-8 h-1 lg:h-2 bg-muted/30 rounded"></div>
                        </div>
                        
                        {/* Video content - Desktop full screen */}
                        <div className="bg-black h-48 sm:h-64 lg:h-96">
                          <iframe
                            src="https://www.youtube.com/embed/m7YeP9K7t50?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1"
                            className="w-full h-full"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Keyboard area - Light mode */}
                    <div className="bg-gradient-to-br from-slate-200 to-slate-300 rounded-md lg:rounded-lg p-1.5 lg:p-3 shadow-inner">
                      <div className="grid grid-cols-12 gap-0.5 lg:gap-1 mb-1 lg:mb-2">
                        {/* First row of keys */}
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div key={i} className="bg-slate-100 h-3 lg:h-6 rounded-sm shadow-sm border border-slate-300"></div>
                        ))}
                      </div>
                      <div className="grid grid-cols-10 gap-0.5 lg:gap-1 mb-1 lg:mb-2">
                        {/* Second row of keys */}
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div key={i} className="bg-slate-100 h-3 lg:h-6 rounded-sm shadow-sm border border-slate-300"></div>
                        ))}
                      </div>
                      <div className="grid grid-cols-8 gap-0.5 lg:gap-1 mb-1 lg:mb-2">
                        {/* Third row of keys */}
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div key={i} className="bg-slate-100 h-3 lg:h-6 rounded-sm shadow-sm border border-slate-300"></div>
                        ))}
                      </div>
                      {/* Spacebar */}
                      <div className="bg-slate-100 h-3 lg:h-6 rounded-sm w-1/2 mx-auto shadow-sm border border-slate-300"></div>
                      
                      {/* Trackpad */}
                      <div className="bg-slate-50 h-8 lg:h-16 w-16 lg:w-32 rounded-lg mx-auto mt-1.5 lg:mt-3 border border-slate-300 shadow-inner"></div>
                    </div>
                  </div>
                </div>

                {/* Mobile Phone - Mobile optimized design */}
                <div className={`absolute top-4 sm:top-6 lg:top-16 -left-6 sm:-left-8 lg:-left-20 group w-36 sm:w-48 md:w-56 lg:w-72 z-10 scale-75 sm:scale-85 lg:scale-90 transition-all duration-1000 will-change-transform ${isLoaded ? 'opacity-100 translate-y-0 scale-75 sm:scale-85 lg:scale-90' : 'opacity-0 translate-y-12 scale-50'}`} style={{ transitionDelay: '800ms' }}>
                  <div className="relative">
                    {/* Phone outer frame - Mobile responsive */}
                    <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[3rem] p-0.5 sm:p-1 lg:p-2 shadow-2xl shadow-black/20 border border-slate-300">
                      {/* Phone inner frame */}
                      <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-[1.2rem] sm:rounded-[1.5rem] lg:rounded-[2.5rem] p-0.5 lg:p-1">
                        {/* Screen area */}
                        <div className="relative bg-gradient-to-br from-card/95 to-card/70 backdrop-blur-xl rounded-[1rem] sm:rounded-[1.3rem] lg:rounded-[2.2rem] overflow-hidden">
                          {/* Notch - Mobile responsive */}
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 lg:w-32 h-3 sm:h-4 lg:h-6 bg-slate-800 rounded-b-lg sm:rounded-b-xl lg:rounded-b-2xl z-20"></div>
                          
                          {/* Status bar - Mobile responsive */}
                          <div className="relative pt-4 sm:pt-6 lg:pt-8 px-2 sm:px-3 lg:px-6 pb-1 lg:pb-2">
                            <div className="flex justify-between items-center text-foreground text-[8px] sm:text-xs lg:text-sm">
                              <div className="flex items-center gap-0.5 lg:gap-1">
                                <div className="w-0.5 h-0.5 lg:w-1 lg:h-1 bg-foreground rounded-full"></div>
                                <div className="w-0.5 h-0.5 lg:w-1 lg:h-1 bg-foreground rounded-full"></div>
                                <div className="w-0.5 h-0.5 lg:w-1 lg:h-1 bg-foreground/50 rounded-full"></div>
                                <span className="text-[8px] sm:text-[10px] lg:text-xs ml-0.5 lg:ml-1">S2P</span>
                              </div>
                              <div className="flex items-center gap-0.5 lg:gap-1">
                                <div className="w-3 sm:w-4 lg:w-6 h-1.5 sm:h-2 lg:h-3 border border-foreground/50 rounded-sm">
                                  <div className="w-2 sm:w-3 lg:w-4 h-0.5 lg:h-1 bg-green-500 rounded-full mt-0.25 lg:mt-0.5 ml-0.25 lg:ml-0.5"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Video content - Mobile optimized */}
                          <div className="px-1.5 sm:px-2 lg:px-4 pb-2 sm:pb-3 lg:pb-6">
                            <div className="aspect-[9/16] bg-black rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden relative">
                              {/* Fade effect on edges - Reduced for mobile */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent rounded-lg sm:rounded-xl lg:rounded-2xl pointer-events-none z-10" 
                                   style={{
                                     background: 'radial-gradient(ellipse at center, transparent 75%, rgba(var(--background), 0.15) 90%, rgba(var(--background), 0.4) 100%)'
                                   }}></div>
                              
                              <iframe
                                src="https://www.youtube.com/embed/MlQVAxeJQJI?autoplay=1&mute=1&loop=1&playlist=MlQVAxeJQJI&controls=0&showinfo=0&rel=0&modestbranding=1"
                                className="w-full h-full"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                loading="lazy"
                              />
                            </div>
                          </div>
                          
                          {/* Home indicator - Mobile responsive */}
                          <div className="absolute bottom-0.5 sm:bottom-1 lg:bottom-2 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 lg:w-32 h-0.5 lg:h-1 bg-foreground/30 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className={`absolute -top-4 -right-4 w-12 h-12 bg-primary/20 rounded-full blur-xl animate-pulse transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} style={{ transitionDelay: '1200ms' }}></div>
              <div className={`absolute bottom-8 -left-8 w-16 h-16 bg-secondary/20 rounded-full blur-xl animate-pulse transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} style={{ animationDelay: '1s', transitionDelay: '1400ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;