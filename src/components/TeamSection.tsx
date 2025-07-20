import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Trophy, Target, Zap } from 'lucide-react';
import teamPhoto from '@/assets/team-photo.jpg';
import { TeamCarousel } from '@/components/TeamCarousel';

const TeamSection = () => {
  const teamStats = [
    { label: 'Active Members', value: '25+', icon: Users },
    { label: 'Tournaments Won', value: '12', icon: Trophy },
    { label: 'Success Rate', value: '85%', icon: Target },
    { label: 'Years Experience', value: '5+', icon: Zap },
  ];

  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-gaming font-bold text-primary glow-text mb-6">
            OUR TEAM
          </h2>
          <p className="text-xl text-muted-foreground font-display max-w-3xl mx-auto">
            Meet the elite roster behind S2PGGs' success. From leadership to competitive players, 
            we're united in our drive to achieve perfection.
          </p>
        </div>

        {/* Leadership Carousel */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Meet Our Leadership</h3>
            <p className="text-muted-foreground">The visionaries driving S2PGGs forward</p>
          </div>
          <TeamCarousel />
        </div>

        {/* Team Photo */}
        <div className="mb-16">
          <div className="gaming-card p-8 max-w-4xl mx-auto">
            <div className="relative rounded-xl overflow-hidden">
              <img 
                src={teamPhoto} 
                alt="S2PGGs Team" 
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <h4 className="text-2xl font-gaming font-bold text-primary glow-text mb-2">
                  S2PGGs ROSTER
                </h4>
                <p className="text-muted-foreground font-display">
                  Our competitive Fortnite team ready for action
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {teamStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={stat.label}
                className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-6 text-center">
                  <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-gaming font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-display">
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