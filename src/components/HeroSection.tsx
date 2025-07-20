import { Trophy, Users, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const stats = [
    { icon: Calendar, label: 'Years Active', value: '4+' },
    { icon: Trophy, label: 'Tournaments', value: '50+' },
    { icon: Users, label: 'Team Members', value: '12+' },
    { icon: TrendingUp, label: 'Content Views', value: '1M+' },
  ];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden parallax-bg">
      {/* Background with gradient */}
      <div className="absolute inset-0 hero-gradient"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-medium"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary-glow/10 rounded-full blur-3xl animate-float-fast"></div>
        <div className="absolute top-10 right-20 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-float-medium"></div>
        <div className="absolute bottom-10 left-20 w-40 h-40 bg-accent/5 rounded-full blur-2xl animate-float-slow"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-gaming font-black mb-6">
            <span className="glow-text text-primary">STRIVE</span>
            <br />
            <span className="text-accent">2 PERFECTION</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl font-display font-light mb-8 text-muted-foreground max-w-2xl mx-auto">
            Premier Fortnite esports organization competing at the highest level for <strong className="text-primary">4 years</strong>
          </p>

          {/* Team tag */}
          <div className="flex items-center justify-center mb-8">
            <div className="gaming-card px-8 py-4 hover-lift">
              <span className="text-2xl font-gaming font-bold text-primary glow-text">
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
              Watch Highlights
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="gaming-card p-6 hover-lift animate-slide-in-left"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-gaming font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-display">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;