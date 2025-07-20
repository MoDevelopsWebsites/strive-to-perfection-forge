import { useState, useEffect } from 'react';
import { Users, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const HeroSection = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [showDescription, setShowDescription] = useState(false);
  const [showFirstButton, setShowFirstButton] = useState(false);
  const [showSecondButton, setShowSecondButton] = useState(false);
  
  const fullText = 'STRIVE 2 PERFECTION';

  useEffect(() => {
    let currentIndex = 0;
    const typewriterInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typewriterInterval);
        // Show description after typewriter completes (500ms delay)
        setTimeout(() => setShowDescription(true), 500);
        // Show first button after description animation completes (1300ms total)
        setTimeout(() => setShowFirstButton(true), 1300);
        // Show second button after first button completes (2100ms total)
        setTimeout(() => setShowSecondButton(true), 2100);
      }
    }, 100);

    return () => clearInterval(typewriterInterval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Professional title with typewriter effect */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-medium text-primary glow-text leading-tight tracking-tight">
              {displayedText}
              <span className="animate-pulse">|</span>
            </h1>
          </div>

          {/* Professional subtitle with advanced animation */}
          {showDescription && (
            <Card className="mb-16 max-w-4xl mx-auto bg-card/90 backdrop-blur-xl border border-border hover:border-primary/40 transition-all duration-500 animate-[slideUpScale_0.8s_ease-out_forwards] opacity-0">
              <CardContent className="p-8">
                <p className="text-2xl md:text-3xl font-display font-light text-muted-foreground leading-relaxed animate-[fadeInUp_1s_ease-out_0.2s_forwards] opacity-0">
                  Premier Fortnite esports organization competing at the highest level.
                  <br />
                  <span className="text-primary font-semibold glow-text animate-[glowPulse_2s_ease-in-out_infinite]">Building champions since 2020.</span>
                </p>
              </CardContent>
            </Card>
          )}

          {/* Professional CTA Buttons with sequential animations */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            {showFirstButton && (
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-2xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-500 hover:scale-110 hover:-translate-y-2 text-xl px-12 py-8 font-semibold rounded-xl animate-[bounceInLeft_0.8s_ease-out_forwards] opacity-0 transform hover:rotate-1"
                onClick={() => window.open('https://discord.gg/Hyu6j4RFrp', '_blank')}
              >
                <Users className="w-6 h-6 mr-3 animate-[iconFloat_2s_ease-in-out_infinite]" />
                Join Our Team
              </Button>
            )}
            {showSecondButton && (
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary hover:scale-110 hover:-translate-y-2 transition-all duration-500 text-xl px-12 py-8 font-semibold backdrop-blur-sm bg-background/20 shadow-lg shadow-primary/10 rounded-xl animate-[bounceInRight_0.8s_ease-out_forwards] opacity-0 transform hover:-rotate-1"
                onClick={() => window.open('https://www.youtube.com/@S2PGGs', '_blank')}
              >
                <Play className="w-6 h-6 mr-3 animate-[iconSpin_3s_ease-in-out_infinite]" />
                Watch Highlights
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;