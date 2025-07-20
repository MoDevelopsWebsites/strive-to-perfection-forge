import { Crown, Star, Users, Trophy, Shield, Settings, BarChart3, Briefcase } from 'lucide-react';
import teamPhoto from '@/assets/team-photo.jpg';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const TeamSection = () => {
  const leadership = [
    {
      name: 'Helix',
      role: 'CEO & Founder',
      icon: Crown,
      description: 'Visionary leader driving S2PGGs to new heights in competitive esports.',
      achievements: ['4 Years Leadership', 'Strategic Partnerships', 'Team Growth']
    },
    {
      name: 'Stunna',
      role: 'COO',
      icon: Shield,
      description: 'Operations mastermind ensuring peak performance across all divisions.',
      achievements: ['Tournament Coordination', 'Team Development', 'Performance Analytics']
    },
    {
      name: 'Cowen',
      role: 'COO',
      icon: Users,
      description: 'Strategic operations leader focused on competitive excellence.',
      achievements: ['Tactical Analysis', 'Player Coordination', 'Content Strategy']
    },
    {
      name: 'Bando',
      role: 'COS',
      icon: Settings,
      description: 'Chief Operating Strategist overseeing daily operations and team coordination.',
      achievements: ['Strategic Planning', 'Workflow Optimization', 'Team Management']
    },
    {
      name: 'Clxud',
      role: 'CAO',
      icon: BarChart3,
      description: 'Chief Analytics Officer driving data-driven decisions and performance metrics.',
      achievements: ['Performance Analytics', 'Data Insights', 'Growth Metrics']
    },
    {
      name: 'Medo',
      role: 'CSO',
      icon: Briefcase,
      description: 'Chief Strategy Officer leading competitive initiatives and market expansion.',
      achievements: ['Strategic Vision', 'Competitive Analysis', 'Market Expansion']
    }
  ];

  const teamStats = [
    { label: 'Active Players', value: '50+', icon: Users },
    { label: 'Tournament Wins', value: '75+', icon: Trophy },
    { label: 'Content Creators', value: '25+', icon: Star },
    { label: 'Years Experience', value: '4', icon: Crown }
  ];

  return (
    <section id="team" className="relative h-screen flex items-center justify-center bg-secondary/20 overflow-hidden parallax-bg">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-accent/5 rounded-full blur-3xl animate-float-medium"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
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

        {/* Leadership Team Carousel */}
        <div className="mb-16">
          <h3 className="text-2xl font-gaming font-bold text-center mb-8 text-accent">
            LEADERSHIP
          </h3>
          <div className="max-w-6xl mx-auto px-4">
            <Carousel className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {leadership.map((leader, index) => (
                  <CarouselItem key={leader.name} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <div 
                      className="gaming-card p-8 hover-lift text-center animate-slide-in-left h-full"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 purple-glow">
                        <leader.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h4 className="text-2xl font-gaming font-bold text-primary mb-2">
                        {leader.name}
                      </h4>
                      <p className="text-accent font-display font-semibold mb-4">
                        {leader.role}
                      </p>
                      <p className="text-muted-foreground mb-6 font-display">
                        {leader.description}
                      </p>
                      <div className="space-y-2">
                        {leader.achievements.map((achievement, idx) => (
                          <div key={idx} className="text-sm bg-muted/30 rounded-lg px-3 py-1">
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
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
          {teamStats.map((stat, index) => (
            <div 
              key={stat.label}
              className="gaming-card p-6 text-center hover-lift animate-slide-in-right"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-gaming font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-display">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;