import { useState } from 'react';
import { Play, Youtube, Twitch, Camera, TrendingUp, Eye, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContentSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const contentTypes = [
    {
      icon: Youtube,
      title: 'YouTube Content',
      description: 'Epic gameplay highlights, tutorials, and behind-the-scenes content',
      stats: '500K+ Views',
      color: 'text-red-500'
    },
    {
      icon: Twitch,
      title: 'Live Streaming',
      description: 'Watch our team compete live in tournaments and scrimmages',
      stats: '10K+ Followers',
      color: 'text-purple-500'
    },
    {
      icon: Camera,
      title: 'Content Creation',
      description: 'Professional video production and social media content',
      stats: '1M+ Impressions',
      color: 'text-primary'
    }
  ];

  const recentVideos = [
    {
      id: 'hQAA7k7aYY8',
      title: 'Latest S2PGGs Highlights',
      type: 'Highlight Reel',
      views: '15K',
      thumbnail: `https://img.youtube.com/vi/hQAA7k7aYY8/maxresdefault.jpg`
    },
    {
      id: '4AvT8Cn-FdE',
      title: 'Tournament Performance',
      type: 'Competition',
      views: '12K',
      thumbnail: `https://img.youtube.com/vi/4AvT8Cn-FdE/maxresdefault.jpg`
    },
    {
      id: 'FHEv_O8XgwI',
      title: 'Team Strategy Breakdown',
      type: 'Analysis',
      views: '8K',
      thumbnail: `https://img.youtube.com/vi/FHEv_O8XgwI/maxresdefault.jpg`
    }
  ];

  return (
    <section id="content" className="relative h-screen flex items-center justify-center bg-background overflow-hidden parallax-bg">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-accent/5 rounded-full blur-3xl animate-float-medium"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-gaming font-bold text-primary glow-text mb-6">
            CONTENT CREATORS
          </h2>
          <p className="text-xl text-muted-foreground font-display max-w-3xl mx-auto">
            Beyond competitive play, S2PGGs produces top-tier content across multiple platforms. 
            From epic highlights to educational tutorials, we share our passion with the community.
          </p>
        </div>

        {/* Content Types */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
          {contentTypes.map((content, index) => (
            <div 
              key={content.title}
              className="gaming-card p-8 hover-lift animate-slide-in-left"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center">
                  <content.icon className={`w-8 h-8 ${content.color}`} />
                </div>
              </div>
              <h3 className="text-xl font-gaming font-bold text-primary mb-3 text-center">
                {content.title}
              </h3>
              <p className="text-muted-foreground mb-4 font-display text-center">
                {content.description}
              </p>
              <div className="text-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/20 text-primary font-display font-semibold">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {content.stats}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Content */}
        <div className="gaming-card p-8 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-gaming font-bold text-accent">
              RECENT VIDEOS
            </h3>
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => window.open('https://www.youtube.com/@S2PGGs', '_blank')}
            >
              View Channel
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {recentVideos.map((video, index) => (
              <div 
                key={video.id}
                className="group cursor-pointer hover-lift animate-slide-in-right"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedVideo(video.id)}
              >
                <div className="relative bg-muted/30 rounded-lg overflow-hidden mb-4">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="w-12 h-12 text-primary" fill="currentColor" />
                  </div>
                </div>
                <h4 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {video.title}
                </h4>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{video.type}</span>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{video.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 modal-enter">
            <div className="relative w-full max-w-4xl bg-background rounded-xl overflow-hidden shadow-elevated">
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-background/80 rounded-full hover:bg-background transition-colors hover:scale-110"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="gaming-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-gaming font-bold text-primary mb-4">
              STAY CONNECTED
            </h3>
            <p className="text-muted-foreground mb-6 font-display">
              Subscribe to our channels and never miss epic content from S2PGGs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="esports-button"
                onClick={() => window.open('https://www.youtube.com/@S2PGGs', '_blank')}
              >
                <Youtube className="w-4 h-4 mr-2" />
                Subscribe on YouTube
              </Button>
              <Button 
                variant="outline" 
                className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
                onClick={() => window.open('https://discord.gg/Hyu6j4RFrp', '_blank')}
              >
                <Twitch className="w-4 h-4 mr-2" />
                Join Discord
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;