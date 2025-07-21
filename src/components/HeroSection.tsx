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
  
  const fullText = 'STRIVE 2 PERFECTION';
  const descriptionText = 'Premier Fortnite esports organization competing at the highest level.';
  const button1Text = 'Join Our Team';
  const button2Text = 'Watch Highlights';

  useEffect(() => {
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
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* Abstract flowing background layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Main flowing shape with gradient */}
        <div className="absolute inset-0 w-full h-full">
          <svg 
            className="absolute inset-0 w-full h-full object-cover animate-[floatSlow_20s_ease-in-out_infinite]" 
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
      
      <div className="relative z-10 w-full px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center min-h-[80vh]">
            {/* Left Side - Content */}
            <div className="text-left">
              {/* Title with typewriter effect */}
              <div className="mb-8">
                <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-sans font-medium text-primary glow-text leading-none tracking-tight">
                  {displayedText}
                  <span className="animate-pulse">|</span>
                </h1>
              </div>

              {/* Description */}
              {showDescription && (
                <div className="mb-12">
                  <p className="text-lg md:text-xl lg:text-2xl font-light text-muted-foreground leading-relaxed max-w-xl">
                    {displayedDescription}
                    {displayedDescription.length < descriptionText.length && <span className="animate-pulse">|</span>}
                  </p>
                  <p className="text-primary font-semibold glow-text mt-4 text-lg">
                    Building champions since 2023.
                  </p>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {showFirstButton && (
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:scale-105 text-lg px-8 py-6 font-semibold rounded-lg"
                    onClick={() => window.open('https://discord.gg/Hyu6j4RFrp', '_blank')}
                  >
                    <Users className="w-5 h-5 mr-2" />
                    {displayedButton1}
                    {displayedButton1.length < button1Text.length && <span className="animate-pulse">|</span>}
                  </Button>
                )}
                {showSecondButton && (
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary hover:scale-105 transition-all duration-300 text-lg px-8 py-6 font-semibold backdrop-blur-sm bg-background/20 shadow-lg rounded-lg"
                    onClick={() => window.open('https://www.youtube.com/@S2PGGs', '_blank')}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    {displayedButton2}
                    {displayedButton2.length < button2Text.length && <span className="animate-pulse">|</span>}
                  </Button>
                )}
              </div>
            </div>

            {/* Right Side - Video Displays */}
            <div className="relative ml-auto overflow-hidden">
              <div className="relative ml-32">
                {/* Desktop Screen - Realistic laptop design */}
                 <div className="relative group">
                   {/* Laptop base/body - Ultra realistic with liquid blending */}
                   <div className="relative bg-gradient-to-br from-slate-100 via-slate-50 to-white rounded-3xl p-3 shadow-2xl shadow-black/20 transform hover:scale-105 transition-all duration-500 w-full min-w-[800px] max-w-6xl border border-slate-300/50">
                     {/* Liquid blending effects around edges */}
                     <div className="absolute inset-0 rounded-3xl pointer-events-none z-20 overflow-hidden">
                       {/* Top edge liquid blend */}
                       <div className="absolute -top-2 left-1/4 right-1/4 h-8 bg-gradient-to-b from-transparent via-background/20 to-transparent blur-sm animate-[liquidFlow1_8s_ease-in-out_infinite]"></div>
                       {/* Right edge liquid blend */}
                       <div className="absolute top-1/4 bottom-1/4 -right-3 w-12 bg-gradient-to-l from-background/60 via-background/30 to-transparent blur-lg animate-[liquidFlow2_12s_ease-in-out_infinite]"></div>
                       {/* Bottom edge liquid blend */}
                       <div className="absolute -bottom-3 left-1/3 right-1/3 h-10 bg-gradient-to-t from-background/40 via-background/20 to-transparent blur-md animate-[liquidFlow3_10s_ease-in-out_infinite]"></div>
                       {/* Left edge liquid blend */}
                       <div className="absolute top-1/3 bottom-1/3 -left-2 w-8 bg-gradient-to-r from-background/30 via-background/15 to-transparent blur-sm animate-[liquidFlow4_6s_ease-in-out_infinite]"></div>
                       
                       {/* Corner liquid effects */}
                       <div className="absolute -top-1 -right-1 w-16 h-16 bg-gradient-radial from-background/25 to-transparent blur-lg animate-[cornerLiquid1_15s_ease-in-out_infinite]"></div>
                       <div className="absolute -bottom-2 -left-1 w-20 h-20 bg-gradient-radial from-background/20 to-transparent blur-xl animate-[cornerLiquid2_18s_ease-in-out_infinite]"></div>
                     </div>
                     
                     {/* Screen assembly with realistic bezels */}
                     <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-2xl p-1 mb-3 shadow-inner">
                       {/* Screen with realistic proportions */}
                       <div className="relative bg-gradient-to-br from-slate-900 to-black rounded-xl p-2 shadow-2xl shadow-black/60">
                         {/* Camera notch */}
                         <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-700 rounded-full shadow-inner"></div>
                         
                         {/* Actual screen area */}
                         <div className="relative bg-gradient-to-br from-card/95 to-card/70 backdrop-blur-xl rounded-lg overflow-hidden">
                           {/* macOS-style top bar */}
                           <div className="bg-gradient-to-r from-slate-100 to-slate-50 px-4 py-2 flex items-center justify-between border-b border-slate-200">
                             <div className="flex items-center gap-2">
                               <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
                               <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></div>
                               <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
                             </div>
                             <div className="bg-slate-200 h-6 rounded-full w-64 flex items-center px-3">
                               <div className="w-3 h-3 bg-slate-400 rounded-full mr-2"></div>
                               <div className="bg-slate-300 h-2 rounded-full flex-1"></div>
                             </div>
                             <div className="flex items-center gap-2">
                               <div className="w-4 h-2 bg-slate-300 rounded"></div>
                               <div className="w-4 h-2 bg-slate-300 rounded"></div>
                               <div className="w-4 h-2 bg-slate-300 rounded"></div>
                             </div>
                           </div>
                           
                           {/* Video content - Desktop full screen */}
                           <div className="bg-black h-96 relative overflow-hidden">
                             {/* Video with subtle overlay */}
                             <iframe
                               src="https://www.youtube.com/embed/U6dHTga_rBQ?autoplay=1&mute=1&loop=1&playlist=U6dHTga_rBQ&controls=0&showinfo=0&rel=0&modestbranding=1"
                               className="w-full h-full"
                               allow="autoplay; encrypted-media"
                               allowFullScreen
                             />
                             {/* Subtle screen reflection effect */}
                             <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
                           </div>
                         </div>
                       </div>
                     </div>
                     
                     {/* Realistic keyboard area */}
                     <div className="bg-gradient-to-br from-slate-100 via-slate-50 to-white rounded-xl p-4 shadow-inner border border-slate-200">
                       {/* Function keys row */}
                       <div className="grid grid-cols-16 gap-1 mb-2">
                         {Array.from({ length: 16 }).map((_, i) => (
                           <div key={i} className="bg-gradient-to-b from-slate-200 to-slate-300 h-4 rounded-sm shadow-sm border border-slate-300 text-xs flex items-center justify-center text-slate-600">
                             {i < 4 ? '' : i < 16 ? `F${i-3}` : ''}
                           </div>
                         ))}
                       </div>
                       
                       {/* Number row */}
                       <div className="grid grid-cols-14 gap-1 mb-1">
                         {Array.from({ length: 14 }).map((_, i) => (
                           <div key={i} className="bg-gradient-to-b from-slate-200 to-slate-300 h-6 rounded-sm shadow-sm border border-slate-300"></div>
                         ))}
                       </div>
                       
                       {/* QWERTY rows */}
                       <div className="grid grid-cols-13 gap-1 mb-1">
                         {Array.from({ length: 13 }).map((_, i) => (
                           <div key={i} className="bg-gradient-to-b from-slate-200 to-slate-300 h-6 rounded-sm shadow-sm border border-slate-300"></div>
                         ))}
                       </div>
                       
                       <div className="grid grid-cols-12 gap-1 mb-1">
                         {Array.from({ length: 12 }).map((_, i) => (
                           <div key={i} className="bg-gradient-to-b from-slate-200 to-slate-300 h-6 rounded-sm shadow-sm border border-slate-300"></div>
                         ))}
                       </div>
                       
                       <div className="grid grid-cols-10 gap-1 mb-2">
                         {Array.from({ length: 10 }).map((_, i) => (
                           <div key={i} className="bg-gradient-to-b from-slate-200 to-slate-300 h-6 rounded-sm shadow-sm border border-slate-300"></div>
                         ))}
                       </div>
                       
                       {/* Spacebar */}
                       <div className="bg-gradient-to-b from-slate-200 to-slate-300 h-6 rounded-sm w-2/3 mx-auto shadow-sm border border-slate-300 mb-3"></div>
                       
                       {/* Trackpad with realistic design */}
                       <div className="bg-gradient-to-br from-slate-100 to-slate-200 h-20 w-40 rounded-xl mx-auto border border-slate-300 shadow-inner relative">
                         <div className="absolute inset-2 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg"></div>
                       </div>
                     </div>
                   </div>
                 </div>

                {/* Mobile Phone - Realistic design, smaller scale, slightly overlapping */}
                <div className="absolute top-16 -left-20 group w-72 z-10 scale-90">
                  <div className="relative">
                    {/* Phone outer frame - Light mode */}
                    <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-[3rem] p-2 shadow-2xl shadow-black/20 border border-slate-300">
                      {/* Phone inner frame */}
                      <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-[2.5rem] p-1">
                        {/* Screen area */}
                        <div className="relative bg-gradient-to-br from-card/95 to-card/70 backdrop-blur-xl rounded-[2.2rem] overflow-hidden">
                          {/* Notch */}
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-20"></div>
                          
                          {/* Status bar */}
                          <div className="relative pt-8 px-6 pb-2">
                            <div className="flex justify-between items-center text-foreground text-sm">
                              <div className="flex items-center gap-1">
                                <div className="w-1 h-1 bg-foreground rounded-full"></div>
                                <div className="w-1 h-1 bg-foreground rounded-full"></div>
                                <div className="w-1 h-1 bg-foreground/50 rounded-full"></div>
                                <span className="text-xs ml-1">S2P</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="w-6 h-3 border border-foreground/50 rounded-sm">
                                  <div className="w-4 h-1 bg-green-500 rounded-full mt-0.5 ml-0.5"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Video content */}
                          <div className="px-4 pb-6">
                            <div className="aspect-[9/16] bg-black rounded-2xl overflow-hidden relative">
                              {/* Fade effect on edges */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent rounded-2xl pointer-events-none z-10" 
                                   style={{
                                     background: 'radial-gradient(ellipse at center, transparent 70%, rgba(var(--background), 0.2) 85%, rgba(var(--background), 0.6) 100%)'
                                   }}></div>
                              
                              <iframe
                                src="https://www.youtube.com/embed/MlQVAxeJQJI?autoplay=1&mute=1&loop=1&playlist=MlQVAxeJQJI&controls=0&showinfo=0&rel=0&modestbranding=1"
                                className="w-full h-full"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                              />
                            </div>
                          </div>
                          
                          {/* Home indicator */}
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-foreground/30 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute bottom-8 -left-8 w-16 h-16 bg-secondary/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;