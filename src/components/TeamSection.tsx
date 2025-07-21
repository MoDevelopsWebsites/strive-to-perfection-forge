import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Trophy, Target, Zap } from 'lucide-react';
import { TeamCarousel } from '@/components/TeamCarousel';
import NumberCounter from '@/components/NumberCounter';

const TeamSection = () => {
  const teamStats = [
    { label: 'Active Members', value: '25+', icon: Users },
    { label: 'Tournaments Won', value: '12', icon: Trophy },
    { label: 'Success Rate', value: '85%', icon: Target },
    { label: 'Years Experience', value: '5+', icon: Zap },
  ];

  return (
    <section className="py-16 lg:py-20 relative">
      {/* Floating background elements matching hero */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-60 lg:w-80 h-60 lg:h-80 bg-secondary/4 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-56 lg:w-72 h-56 lg:h-72 bg-primary/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-gaming font-bold text-primary glow-text mb-4 lg:mb-6">
            OUR TEAM
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground font-display max-w-3xl mx-auto px-4">
            Meet the elite roster behind S2PGGs' success. From leadership to competitive players, 
            we're united in our drive to achieve perfection.
          </p>
        </div>

        {/* Leadership Carousel */}
        <div className="mb-12 lg:mb-16">
          <div className="text-center mb-6 lg:mb-8">
            <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-2">Meet Our Leadership</h3>
            <p className="text-muted-foreground px-4">The visionaries driving S2PGGs forward</p>
          </div>
          <TeamCarousel />
        </div>

        {/* Enhanced Team Excellence Section */}
        <div className="mb-12 lg:mb-16">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {/* Team Values */}
            <Card className="bg-card/20 backdrop-blur-xl border-primary/20 hover:border-primary/40 transition-all duration-500 hover:scale-105 group">
              <CardContent className="p-6 lg:p-8">
                <div className="text-center mb-4 lg:mb-6">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4 shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-all duration-300">
                    <Target className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-2">Our Mission</h3>
                </div>
                <p className="text-muted-foreground text-center leading-relaxed text-sm lg:text-base">
                  To cultivate excellence in competitive gaming while building a community that embodies dedication, 
                  skill, and the relentless pursuit of perfection in everything we do.
                </p>
              </CardContent>
            </Card>

            {/* Team Achievements */}
            <Card className="bg-card/20 backdrop-blur-xl border-primary/20 hover:border-primary/40 transition-all duration-500 hover:scale-105 group">
              <CardContent className="p-6 lg:p-8">
                <div className="text-center mb-4 lg:mb-6">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4 shadow-lg shadow-yellow-500/25 group-hover:shadow-yellow-500/40 transition-all duration-300">
                    <Trophy className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-2">Our Legacy</h3>
                </div>
                <p className="text-muted-foreground text-center leading-relaxed text-sm lg:text-base">
                  Four years of competitive excellence, building champions and creating content that inspires 
                  the next generation of gamers to strive for their own perfection.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto">
          {teamStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={stat.label}
                className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-4 lg:p-6 text-center">
                  <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-primary mx-auto mb-2 lg:mb-3" />
                  <NumberCounter
                    targetValue={stat.value}
                    duration={2000}
                    className="text-2xl lg:text-3xl font-gaming font-bold text-primary mb-1 lg:mb-2"
                  />
                  <div className="text-xs lg:text-sm text-muted-foreground font-display">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;