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
      <div className="relative z-10 w-full px-4 text-center">
        <div className="w-full">
          {/* Professional title with typewriter effect - Full width */}
          <div className="mb-12 w-full">
            <h1 className="text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] 2xl:text-[14rem] font-sans font-medium text-primary glow-text leading-none tracking-tighter text-center w-full">
              {displayedText}
              <span className="animate-pulse">|</span>
            </h1>
          </div>

          {/* Professional subtitle with typewriter animation */}
          {showDescription && (
            <Card className="mb-16 max-w-6xl mx-auto bg-card/90 backdrop-blur-xl border border-border hover:border-primary/40 transition-all duration-500 animate-[glowFadeIn_1.2s_ease-out_forwards] opacity-100">
              <CardContent className="p-8">
                <p className="text-2xl md:text-3xl font-display font-light text-muted-foreground leading-relaxed">
                  {displayedDescription}
                  {displayedDescription.length < descriptionText.length && <span className="animate-pulse">|</span>}
                  <br />
                  <span className="text-primary font-semibold glow-text">Building champions since 2020.</span>
                </p>
              </CardContent>
            </Card>
          )}

          {/* Professional CTA Buttons with typewriter animations */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            {showFirstButton && (
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-2xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-500 hover:scale-110 hover:-translate-y-2 text-xl px-12 py-8 font-semibold rounded-xl animate-[bounceInLeft_0.8s_ease-out_forwards] opacity-100 transform hover:rotate-1"
                onClick={() => window.open('https://discord.gg/Hyu6j4RFrp', '_blank')}
              >
                <Users className="w-6 h-6 mr-3 animate-[iconFloat_2s_ease-in-out_infinite]" />
                {displayedButton1}
                {displayedButton1.length < button1Text.length && <span className="animate-pulse">|</span>}
              </Button>
            )}
            {showSecondButton && (
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary hover:scale-110 hover:-translate-y-2 transition-all duration-500 text-xl px-12 py-8 font-semibold backdrop-blur-sm bg-background/20 shadow-lg shadow-primary/10 rounded-xl animate-[bounceInRight_0.8s_ease-out_forwards] opacity-100 transform hover:-rotate-1"
                onClick={() => window.open('https://www.youtube.com/@S2PGGs', '_blank')}
              >
                <Play className="w-6 h-6 mr-3 animate-[iconSpin_3s_ease-in-out_infinite]" />
                {displayedButton2}
                {displayedButton2.length < button2Text.length && <span className="animate-pulse">|</span>}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;