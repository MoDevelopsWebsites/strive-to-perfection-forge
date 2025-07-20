import { useState, useEffect } from 'react';
import { Trophy, Users, Calendar, TrendingUp, Play, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const stats = [
    { icon: Calendar, label: 'Years Active', value: '4+', gradient: 'from-blue-500 to-cyan-500' },
    { icon: Trophy, label: 'Tournaments', value: '50+', gradient: 'from-yellow-500 to-orange-500' },
    { icon: Users, label: 'Team Members', value: '12+', gradient: 'from-green-500 to-emerald-500' },
    { icon: TrendingUp, label: 'Content Views', value: '1M+', gradient: 'from-purple-500 to-pink-500' },
  ];

  const achievements = [
    { text: 'Elite Competitive Team', icon: Trophy },
    { text: 'Content Creation Hub', icon: Play },
    { text: 'Active Community', icon: Users },
  ];

  useEffect(() => {
    // Initialize loading state
    setIsLoaded(true);

    // Hero entrance animations
    const tl = gsap.timeline();
    
    // Title animation with stagger
    tl.fromTo('.hero-title-line', 
      { 
        opacity: 0, 
        y: 100,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.3,
        ease: "power3.out"
      }
    );

    // Subtitle and description
    tl.fromTo('.hero-subtitle', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

    // Achievement badges with stagger
    tl.fromTo('.achievement-badge', 
      { 
        opacity: 0, 
        scale: 0.5,
        y: 30
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.7)"
      },
      "-=0.3"
    );

    // CTA buttons
    tl.fromTo('.hero-cta', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    );

    // Stats cards with advanced stagger
    tl.fromTo('.stat-card', 
      { 
        opacity: 0, 
        y: 60,
        rotationX: 45,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      },
      "-=0.6"
    );

    // Continuous floating animations for background elements
    gsap.to('.float-slow', {
      y: -20,
      duration: 4,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true
    });

    gsap.to('.float-medium', {
      y: -30,
      x: 15,
      duration: 3,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
      delay: 1
    });

    gsap.to('.float-fast', {
      y: -25,
      x: -10,
      duration: 2.5,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
      delay: 0.5
    });

    // Sparkle animation for special effects
    gsap.to('.sparkle-element', {
      rotation: 360,
      scale: 1.2,
      duration: 3,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.5
    });

    // Scroll indicator animation
    gsap.to('.scroll-indicator', {
      y: 10,
      duration: 1.5,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 hero-gradient"></div>
      
      {/* Multiple floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="float-slow absolute top-20 left-10 w-80 h-80 bg-primary/8 rounded-full blur-3xl"></div>
        <div className="float-medium absolute bottom-20 right-10 w-96 h-96 bg-secondary/6 rounded-full blur-3xl"></div>
        <div className="float-fast absolute top-1/3 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="float-slow absolute bottom-1/3 left-1/4 w-72 h-72 bg-primary-glow/8 rounded-full blur-3xl"></div>
        
        {/* Sparkle effects */}
        <div className="sparkle-element absolute top-1/4 left-1/3 w-4 h-4 bg-primary/40 rounded-full blur-sm"></div>
        <div className="sparkle-element absolute bottom-1/4 right-1/3 w-3 h-3 bg-secondary/50 rounded-full blur-sm"></div>
        <div className="sparkle-element absolute top-1/2 left-1/5 w-2 h-2 bg-accent/60 rounded-full blur-sm"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Enhanced main heading with professional styling */}
          <div className="mb-8">
            <h1 className="hero-title-line text-5xl md:text-7xl lg:text-8xl font-gaming font-black mb-4">
              <span className="glow-text text-primary block relative">
                STRIVE
                <div className="absolute -inset-2 bg-primary/20 rounded-lg blur-xl -z-10"></div>
              </span>
            </h1>
            <h1 className="hero-title-line text-5xl md:text-7xl lg:text-8xl font-gaming font-black">
              <span className="text-transparent bg-gradient-to-r from-secondary to-accent bg-clip-text block relative">
                2 PERFECTION
                <div className="absolute -inset-2 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-lg blur-xl -z-10"></div>
              </span>
            </h1>
          </div>

          {/* Enhanced subtitle with professional card */}
          <Card className="hero-subtitle mb-8 max-w-3xl mx-auto bg-card/20 backdrop-blur-xl border-primary/20 hover:border-primary/40 transition-all duration-500">
            <CardContent className="p-6">
              <p className="text-xl md:text-2xl font-display font-light text-muted-foreground">
                Premier Fortnite esports organization competing at the highest level for{' '}
                <span className="text-primary font-semibold glow-text">4 years</span>
              </p>
            </CardContent>
          </Card>

          {/* Achievement badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <Badge 
                  key={achievement.text}
                  className="achievement-badge bg-gradient-to-r from-primary/20 to-secondary/20 text-foreground border-primary/30 px-4 py-2 text-sm font-medium backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/25"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {achievement.text}
                </Badge>
              );
            })}
          </div>

          {/* Team tag with enhanced styling */}
          <div className="flex items-center justify-center mb-10">
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-xl border-primary/30 hover:border-primary/50 transition-all duration-500 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                  <span className="text-3xl font-gaming font-bold text-primary glow-text">
                    #S2PGGs
                  </span>
                  <Zap className="w-6 h-6 text-secondary animate-pulse" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="hero-cta flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-2xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-500 hover:scale-105 hover:-translate-y-1 text-lg px-10 py-6 font-semibold"
              onClick={() => window.open('https://discord.gg/Hyu6j4RFrp', '_blank')}
            >
              <Users className="w-5 h-5 mr-2" />
              Join Our Team
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary hover:scale-105 hover:-translate-y-1 transition-all duration-500 text-lg px-10 py-6 font-semibold backdrop-blur-sm bg-background/20 shadow-lg shadow-primary/10"
              onClick={() => window.open('https://www.youtube.com/@S2PGGs', '_blank')}
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Highlights
            </Button>
          </div>

          {/* Enhanced Stats with professional cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card 
                  key={stat.label}
                  className="stat-card bg-card/20 backdrop-blur-xl border-primary/20 hover:border-primary/40 transition-all duration-500 hover:scale-110 hover:-translate-y-2 group overflow-hidden"
                >
                  <CardContent className="p-6 text-center relative">
                    {/* Animated background glow */}
                    <div className={`absolute -inset-1 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-20 rounded-lg blur transition-opacity duration-500`}></div>
                    
                    {/* Icon with gradient background */}
                    <div className={`relative w-14 h-14 mx-auto mb-4 bg-gradient-to-br ${stat.gradient} rounded-full flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-all duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    
                    {/* Value with enhanced styling */}
                    <div className="relative text-3xl font-gaming font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.value}
                    </div>
                    
                    {/* Label */}
                    <div className="relative text-sm text-muted-foreground font-display font-medium">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="relative">
          <div className="w-8 h-12 border-2 border-primary/60 rounded-full flex justify-center bg-background/20 backdrop-blur-sm shadow-lg shadow-primary/20">
            <div className="w-1.5 h-4 bg-gradient-to-b from-primary to-secondary rounded-full mt-2 animate-pulse"></div>
          </div>
          <div className="absolute -inset-2 bg-primary/20 rounded-full blur-md animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;