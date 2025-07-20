import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Play, Users, ExternalLink, Twitch as TwitchIcon } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const streamers = [
  {
    name: 'FrusiWIN',
    username: 'frusiwin',
    twitchUrl: 'https://twitch.tv/frusiwin',
    description: 'Competitive Fortnite player and content creator with exceptional building skills',
    specialties: ['Building Master', 'Competitive Play', 'Strategy'],
    avatar: '/placeholder-streamer1.png'
  },
  {
    name: 'Colin',
    username: 'colins2p',
    twitchUrl: 'https://twitch.tv/colins2p',
    description: 'High-energy streamer known for incredible gameplay and community engagement',
    specialties: ['Entertainment', 'Community', 'Highlights'],
    avatar: '/placeholder-streamer2.png'
  },
  {
    name: 'Misq',
    username: 'misqs2p',
    twitchUrl: 'https://twitch.tv/misqs2p',
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
      <div className="container mx-auto px-4">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Section Header */}
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
        <div className="streamers-container grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {streamers.map((streamer, index) => (
            <Card 
              key={streamer.name} 
              className="streamer-card bg-card/30 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-500 hover:scale-105 group overflow-hidden"
            >
              <CardContent className="p-0">
                {/* Streamer Header */}
                <div className="relative p-6 bg-gradient-to-br from-primary/10 to-secondary/10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg shadow-primary/25">
                      <TwitchIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {streamer.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">@{streamer.username}</p>
                    </div>
                  </div>
                  
                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {streamer.specialties.map((specialty, idx) => (
                      <Badge 
                        key={specialty} 
                        className="specialty-badge bg-primary/20 text-primary border-primary/30 text-xs"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {streamer.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      onClick={() => openStream(streamer)}
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg shadow-primary/25 transition-all duration-300"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Watch Stream
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => window.open(streamer.twitchUrl, '_blank')}
                      className="w-full border-purple-500/50 text-purple-500 hover:bg-purple-500/10 hover:border-purple-500 transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open on Twitch
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
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

        {/* Stream Modal */}
        {selectedStreamer && (
          <Dialog open={!!selectedStreamer} onOpenChange={() => setSelectedStreamer(null)}>
            <DialogContent className="max-w-4xl w-full p-0 bg-background border-primary/20">
              <div className="relative">
                <div className="p-4 border-b border-primary/20 bg-gradient-to-r from-primary/10 to-secondary/10">
                  <h3 className="text-lg font-bold text-foreground">{selectedStreamer.name}'s Stream</h3>
                  <p className="text-sm text-muted-foreground">Live on Twitch</p>
                </div>
                <div className="aspect-video bg-muted/20">
                  <iframe
                    src={`https://player.twitch.tv/?channel=${selectedStreamer.username}&parent=${window.location.hostname}&autoplay=false`}
                    height="100%"
                    width="100%"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                <div className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5">
                  <Button
                    onClick={() => window.open(selectedStreamer.twitchUrl, '_blank')}
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Watch Full Screen on Twitch
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
};

export default StreamersSection;