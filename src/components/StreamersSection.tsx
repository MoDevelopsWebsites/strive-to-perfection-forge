import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink, Users, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const streamers = [
  {
    name: "S2P frusiWIN",
    username: "frusiwin",
    twitchUrl: "https://www.twitch.tv/frusiwin",
    description: "Competitive Fortnite player and content creator",
    specialties: ["Build Fights", "Zone Wars", "Creative"]
  },
  {
    name: "S2P Colin",
    username: "s2pcolin", 
    twitchUrl: "https://www.twitch.tv/s2pcolin",
    description: "High-level gameplay and educational content",
    specialties: ["Pro Scrims", "Coaching", "VOD Reviews"]
  },
  {
    name: "S2P Misq",
    username: "misqiwnl",
    twitchUrl: "https://www.twitch.tv/misqiwnl", 
    description: "Entertainment focused streams with skilled gameplay",
    specialties: ["Variety Gaming", "Community Events", "Fun Challenges"]
  }
];

const StreamersSection = () => {
  const [selectedStreamer, setSelectedStreamer] = useState(null);
  const [streamStatuses, setStreamStatuses] = useState({});

  // Simulate stream status (in real app, you'd use Twitch API)
  useEffect(() => {
    const simulateStreamStatus = () => {
      const statuses = {};
      streamers.forEach(streamer => {
        // Randomly assign online/offline status for demo
        statuses[streamer.username] = Math.random() > 0.6 ? 'live' : 'offline';
      });
      setStreamStatuses(statuses);
    };

    simulateStreamStatus();
    // Update every 30 seconds for demo
    const interval = setInterval(simulateStreamStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const openStream = (streamer) => {
    setSelectedStreamer(streamer);
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary to-purple-400 bg-clip-text text-transparent mb-6">
            LIVE STREAMERS
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Watch our content creators live on Twitch. Click to view streams directly on our website.
          </p>
        </div>

        {/* Streamers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {streamers.map((streamer, index) => {
            const isLive = streamStatuses[streamer.username] === 'live';
            
            return (
              <Card key={streamer.username} className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group animate-fade-in relative overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>
                {/* Live/Offline Overlay */}
                <div className="absolute top-4 right-4 z-10">
                  <Badge 
                    variant={isLive ? "default" : "secondary"} 
                    className={`${isLive ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-gray-500'} text-white border-0`}
                  >
                    {isLive ? (
                      <>
                        <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                        LIVE
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3 mr-1" />
                        OFFLINE
                      </>
                    )}
                  </Badge>
                </div>

                <CardContent className="p-6">
                  <div className="mb-4 relative">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-2 text-center">{streamer.name}</h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed text-center">
                    {streamer.description}
                  </p>
                  
                  <div className="mb-4 flex flex-wrap gap-1 justify-center">
                    {streamer.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-primary/30 text-primary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="gaming" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => openStream(streamer)}
                          disabled={!isLive}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          {isLive ? 'Watch Stream' : 'Stream Offline'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl w-full">
                        <DialogHeader>
                          <DialogTitle className="text-center text-xl font-bold">
                            {streamer.name} - Live Stream
                          </DialogTitle>
                        </DialogHeader>
                        <div className="aspect-video w-full">
                          <iframe
                            src={`https://player.twitch.tv/?channel=${streamer.username}&parent=${window.location.hostname}`}
                            height="100%"
                            width="100%" 
                            frameBorder="0"
                            scrolling="no"
                            allowFullScreen
                            className="rounded-lg"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="outline" size="sm" asChild>
                      <a href={streamer.twitchUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="esports" size="lg" asChild>
            <a href="https://www.twitch.tv/directory/category/fortnite" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-5 h-5 mr-2" />
              Browse More S2P Content on Twitch
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StreamersSection;