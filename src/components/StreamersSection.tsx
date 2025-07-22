import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Play, Users, ExternalLink, Twitch as TwitchIcon } from 'lucide-react';
import TypewriterEffect from './TypewriterEffect';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const streamers = [
  {
    name: 'Rinzy',
    username: 'rinzy10',
    twitchUrl: 'https://twitch.tv/rinzy10',
    description: 'Competitive Fortnite player and content creator with exceptional building skills',
    specialties: ['Building Master', 'Competitive Play', 'Strategy'],
    avatar: '/placeholder-streamer1.png'
  },
  {
    name: 'Colin',
    username: 's2pcolin',
    twitchUrl: 'https://twitch.tv/s2pcolin',
    description: 'High-energy streamer known for incredible gameplay and community engagement',
    specialties: ['Entertainment', 'Community', 'Highlights'],
    avatar: '/placeholder-streamer2.png'
  },
  {
    name: 'Misq',
    username: 'misqiwnl',
    twitchUrl: 'https://twitch.tv/misqiwnl',
    description: 'Strategic mastermind with years of competitive gaming experience',
    specialties: ['Strategy', 'Analysis', 'Teaching'],
    avatar: '/placeholder-streamer3.png'
  }
];

const StreamersSection = () => {
  const [selectedStreamer, setSelectedStreamer] = useState(null);

  useEffect(() => {
    // Entrance animations for streamer cards
    const cards = document.querySelectorAll('.streamer-card');
    
    gsap.fromTo(cards, 
      { 
        opacity: 0, 
        y: 100,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.streamers-container',
          start: 'top 80%',
        }
      }
    );

    // Floating animation for specialty badges
    gsap.to('.specialty-badge', {
      y: -5,
      duration: 2,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.1
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const openStream = (streamer: any) => {
    setSelectedStreamer(streamer);
  };

  return (
    <section id="streamers" className="py-20 relative">
      {/* Floating background elements matching hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary/2 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-6xl font-gaming font-bold text-primary glow-text mb-6">
            LIVE STREAMERS
          </h2>
          <p className="text-xl text-muted-foreground font-display max-w-3xl mx-auto">
            Watch our elite streamers dominate the competition live on Twitch. 
            Experience the action, learn from the best, and join our community.
          </p>
        </div>

        {/* Streamers Grid */}
        <div className="streamers-container space-y-8 lg:space-y-12 max-w-7xl mx-auto mb-8 lg:mb-12">
          {streamers.map((streamer, index) => (
            <div key={streamer.username} className="streamer-card">
              <Card className="gaming-card border-primary/30 overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-3 gap-0">
                    {/* Stream Embed */}
                    <div className="lg:col-span-2 aspect-video bg-muted/20">
                      <iframe
                        src={`https://player.twitch.tv/?channel=${streamer.username}&parent=${window.location.hostname}&autoplay=false&muted=true`}
                        height="100%"
                        width="100%"
                        allowFullScreen
                        className="w-full h-full"
                        title={`${streamer.name}'s Twitch Stream`}
                      ></iframe>
                    </div>
                    
                    {/* Streamer Info */}
                    <div className="p-4 lg:p-6 bg-gradient-to-br from-primary/10 to-secondary/10 flex flex-col">
                      <div className="flex items-center gap-3 lg:gap-4 mb-3 lg:mb-4">
                        <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg shadow-primary/25">
                          <TwitchIcon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg lg:text-xl font-bold text-foreground">
                            {streamer.name}
                          </h3>
                          <p className="text-xs lg:text-sm text-muted-foreground">@{streamer.username}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1.5 lg:gap-2 mb-3 lg:mb-4">
                        {streamer.specialties.map((specialty) => (
                          <Badge key={specialty} className="specialty-badge bg-primary/20 text-primary border-primary/30 text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      
                      <TypewriterEffect
                        text={streamer.description}
                        speed={30}
                        delay={1000 + (index * 800)}
                        className="text-xs lg:text-sm text-muted-foreground leading-relaxed mb-4 lg:mb-6 flex-grow"
                      />

                      <Button
                        onClick={() => window.open(streamer.twitchUrl, '_blank')}
                        className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg shadow-purple-500/25 transition-all duration-300 text-sm lg:text-base"
                      >
                        <ExternalLink className="w-3 h-3 lg:w-4 lg:h-4 mr-2" />
                        Open on Twitch
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center relative z-10">
          <Card className="bg-card/30 backdrop-blur-sm border-primary/20 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">
                Join the Community
              </h3>
              <p className="text-muted-foreground mb-6">
                Follow our streamers and become part of the S2PGGs family
              </p>
              <Button 
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg shadow-purple-500/25"
                onClick={() => window.open('https://twitch.tv/directory/category/fortnite', '_blank')}
              >
                <TwitchIcon className="w-4 h-4 mr-2" />
                Browse More on Twitch
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default StreamersSection;