import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Users, TrendingUp, Shield, BarChart3, Globe } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const leadership = [
  {
    name: 'Helix',
    role: 'CEO',
    icon: Crown,
    description: 'Visionary leader driving S2PGGs to new heights',
    achievements: ['5+ years gaming industry', 'Built 3 successful teams', '50K+ community growth'],
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    name: 'Stunna',
    role: 'COO',
    icon: Users,
    description: 'Operations mastermind ensuring smooth daily operations',
    achievements: ['Expert team coordinator', 'Process optimization', 'Strategic planning'],
    gradient: 'from-blue-500 to-purple-500',
    image: '/lovable-uploads/1e954a14-b815-4254-94ed-9762e2ad8379.png'
  },
  {
    name: 'Cowen',
    role: 'COO',
    icon: TrendingUp,
    description: 'Growth strategist and operational excellence leader',
    achievements: ['Business development', 'Partnership management', 'Revenue growth'],
    gradient: 'from-green-500 to-teal-500',
    image: '/lovable-uploads/e2314c74-14eb-4023-bfe4-3df1fa93feb0.png'
  },
  {
    name: 'Bando',
    role: 'COS',
    icon: Shield,
    description: 'Security and compliance specialist',
    achievements: ['Platform security', 'Risk management', 'Compliance oversight'],
    gradient: 'from-red-500 to-pink-500',
    image: '/lovable-uploads/dd9b3d57-c970-4261-8013-2f539e311295.png'
  },
  {
    name: 'Clxud',
    role: 'CAO',
    icon: BarChart3,
    description: 'Analytics and optimization expert',
    achievements: ['Data-driven insights', 'Performance optimization', 'Growth metrics'],
    gradient: 'from-purple-500 to-indigo-500',
    image: '/lovable-uploads/1389390b-6946-4880-829e-6c7b433bc757.png'
  },
  {
    name: 'Medo',
    role: 'CSO',
    icon: Globe,
    description: 'Strategic partnerships and growth initiatives',
    achievements: ['Strategic partnerships', 'Market expansion', 'Community relations'],
    gradient: 'from-cyan-500 to-blue-500'
  }
];

export const TeamCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    // Entrance animation
    const cards = document.querySelectorAll('.team-card');
    
    gsap.fromTo(cards, 
      { 
        opacity: 0, 
        y: 100,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.team-carousel',
          start: 'top 80%',
        }
      }
    );
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % leadership.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % leadership.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + leadership.length) % leadership.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="team-carousel w-full max-w-6xl mx-auto px-4">
      <div className="relative overflow-hidden rounded-2xl">
        {/* Main carousel container */}
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {leadership.map((member, index) => {
            const Icon = member.icon;
            return (
              <div key={member.name} className="w-full flex-shrink-0">
                <Card className="team-card bg-gradient-to-br from-card/50 to-background/30 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-6">
                      {/* Avatar with Profile Picture */}
                      <div className="relative">
                        <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.gradient} p-1 shadow-lg shadow-primary/25`}>
                          {member.image ? (
                            <img 
                              src={member.image} 
                              alt={member.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <div className={`w-full h-full rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center`}>
                              <Icon className="w-12 h-12 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="absolute -bottom-2 -right-2">
                          <Badge className={`bg-gradient-to-r ${member.gradient} text-white border-0 shadow-lg`}>
                            {member.role}
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-foreground mb-2">{member.name}</h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed">{member.description}</p>
                        
                        {/* Achievements */}
                        <div className="space-y-2">
                          {member.achievements.map((achievement, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-primary/60"></div>
                              <span className="text-sm text-muted-foreground">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-primary/20 flex items-center justify-center hover:bg-primary/10 transition-all duration-300 z-10"
        >
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-primary/20 flex items-center justify-center hover:bg-primary/10 transition-all duration-300 z-10"
        >
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {leadership.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary shadow-lg shadow-primary/50 scale-125' 
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/60'
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-muted/30 rounded-full h-1 mt-4 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ease-out"
          style={{ 
            width: `${((currentIndex + 1) / leadership.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};