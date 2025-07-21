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
            <div className="relative">
              <div className="relative">
                {/* Desktop Screen - Full width, larger */}
                <div className="relative group">
                  <div className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl rounded-2xl p-8 shadow-2xl shadow-primary/10 border border-border/50 transform hover:scale-105 transition-all duration-500 w-full max-w-2xl">
                    <div className="bg-background/80 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="bg-muted/50 h-2 rounded-full w-full"></div>
                    </div>
                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                      <iframe
                        src="https://www.youtube.com/embed/videoseries?list=UU_x5XG1OV2P6uZZ5FSM9Ttw&autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1"
                        className="w-full h-full"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>

                {/* Mobile Phone - Overlapping the desktop */}
                <div className="absolute -top-8 -left-16 group w-80 z-10">
                  <div className="bg-gradient-to-br from-card/95 to-card/70 backdrop-blur-xl rounded-3xl p-5 shadow-2xl shadow-primary/20 border border-border/50 transform hover:scale-105 transition-all duration-500">
                    <div className="bg-background/90 rounded-2xl p-4">
                      <div className="bg-muted/50 h-6 rounded-full w-28 mx-auto mb-3"></div>
                      <div className="aspect-[9/16] bg-black rounded-xl overflow-hidden">
                        <iframe
                          src="https://www.youtube.com/embed/videoseries?list=UU_x5XG1OV2P6uZZ5FSM9Ttw&autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1"
                          className="w-full h-full"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                        />
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