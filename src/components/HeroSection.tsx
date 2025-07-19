import { Button } from '@/components/ui/button';
import { Play, Trophy, Users, Star } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import heroImage from '@/assets/s2p-hero-bg.jpg';

const HeroSection = () => {
  const heroRef = useScrollAnimation();

  return (
    <section ref={heroRef} className="section-reveal relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="S2P Gaming Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/50 to-background/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/50" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-primary to-purple-400 bg-clip-text text-transparent">
              STRIVE 2 PERFECTION
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Premier Fortnite esports organization competing at the highest level for <strong className="text-primary">4 years</strong>
          </p>

          {/* Team tag */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 px-8 py-4 rounded-xl">
              <span className="text-2xl font-bold text-primary">
                #S2PGGs
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="esports-button text-lg px-8 py-4"
              onClick={() => window.open('https://discord.gg/Hyu6j4RFrp', '_blank')}
            >
              Join Our Team
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-lg px-8 py-4"
              onClick={() => window.open('https://www.youtube.com/@S2PGGs', '_blank')}
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Highlights
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 p-6 rounded-xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Active Players</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 p-6 rounded-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Trophy className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-1">75+</div>
              <div className="text-sm text-muted-foreground">Tournament Wins</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 p-6 rounded-xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Star className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-1">25+</div>
              <div className="text-sm text-muted-foreground">Content Creators</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 p-6 rounded-xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Star className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-1">4</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;