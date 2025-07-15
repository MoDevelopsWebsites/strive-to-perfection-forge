import { Play, Youtube, Twitch, Camera, TrendingUp, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContentSection = () => {
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

  const recentContent = [
    {
      title: 'Championship Victory Montage',
      type: 'Highlight Reel',
      views: '125K',
      duration: '8:42'
    },
    {
      title: 'Advanced Building Techniques',
      type: 'Tutorial',
      views: '89K',
      duration: '12:15'
    },
    {
      title: 'Behind the Scenes: Tournament Prep',
      type: 'Documentary',
      views: '67K',
      duration: '15:30'
    },
    {
      title: 'Team Scrimmage Highlights',
      type: 'Gameplay',
      views: '45K',
      duration: '6:28'
    }
  ];

  return (
    <section id="content" className="py-20 bg-background">
      <div className="container mx-auto px-4">
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
              RECENT CONTENT
            </h3>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              View All Content
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentContent.map((video, index) => (
              <div 
                key={video.title}
                className="group cursor-pointer hover-lift animate-slide-in-right"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative bg-muted/30 rounded-lg p-6 h-40 flex items-center justify-center mb-4 overflow-hidden">
                  <Play className="w-12 h-12 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute top-3 right-3 bg-background/80 rounded px-2 py-1 text-xs font-display">
                    {video.duration}
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
              <Button className="esports-button">
                <Youtube className="w-4 h-4 mr-2" />
                Subscribe on YouTube
              </Button>
              <Button variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white">
                <Twitch className="w-4 h-4 mr-2" />
                Follow on Twitch
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;