import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Play, Eye, Calendar, Youtube, Twitch, Users, ExternalLink } from 'lucide-react';
import { useYouTubeAPI } from '@/hooks/useYouTubeAPI';

// Top content creators for each platform
const topCreators = [
  {
    platform: 'YouTube',
    name: 'S2PGGs Main Channel',
    handle: '@S2PGGs',
    subscribers: '50K+',
    avatar: '/placeholder-avatar.png',
    channelUrl: 'https://youtube.com/@s2pggs',
    description: 'Main gaming content and highlights',
    icon: Youtube,
    gradient: 'from-red-500 to-red-600'
  },
  {
    platform: 'Twitch',
    name: 'S2PGGs Live',
    handle: 'S2PGGs_Official',
    followers: '25K+',
    avatar: '/placeholder-avatar.png',
    channelUrl: 'https://twitch.tv/s2pggs_official',
    description: 'Live gaming streams and tournaments',
    icon: Twitch,
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    platform: 'TikTok',
    name: 'Coming Soon',
    handle: '@S2PGGs',
    followers: 'Soon',
    avatar: '/placeholder-avatar.png',
    channelUrl: '#',
    description: 'Quick gaming clips and highlights',
    icon: Users,
    gradient: 'from-gray-400 to-gray-500'
  }
];

const ContentSection = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { videos, formatViewCount, formatDate } = useYouTubeAPI();

  const openVideo = (video: any) => {
    setSelectedVideo(video);
  };


  return (
    <section className="py-20 relative">
      {/* Floating background elements matching hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-blue-500/2 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-secondary/2 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Content & Creators</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Follow our journey across platforms and never miss the action
          </p>
        </div>


        {/* Top Content Creators */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">Top Creators by Platform</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {topCreators.map((creator) => {
              const Icon = creator.icon;
              return (
                <Card key={creator.platform} className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${creator.gradient} rounded-full flex items-center justify-center mb-3`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        {creator.platform}
                      </Badge>
                    </div>
                    <h4 className="text-xl font-semibold text-foreground mb-1">{creator.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{creator.handle}</p>
                    <p className="text-lg font-bold text-primary mb-3">{creator.followers}</p>
                    <p className="text-sm text-muted-foreground mb-4">{creator.description}</p>
                    <Button 
                      className="w-full" 
                      variant={creator.platform === 'TikTok' ? 'secondary' : 'default'}
                      disabled={creator.platform === 'TikTok'}
                      onClick={() => creator.channelUrl !== '#' && window.open(creator.channelUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {creator.platform === 'TikTok' ? 'Coming Soon' : `Watch on ${creator.platform}`}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Videos with YouTube API */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-foreground">Recent Videos</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Card key={video.id} className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 group">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg flex items-center justify-center">
                      <Button
                        size="lg"
                        className="bg-primary/90 hover:bg-primary text-white"
                        onClick={() => openVideo(video)}
                      >
                        <Play className="w-6 h-6 mr-2" />
                        Play Video
                      </Button>
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <Badge className="bg-red-600 text-white">
                        <Youtube className="w-3 h-3 mr-1" />
                        YouTube
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-foreground mb-2 line-clamp-2">{video.title}</h4>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{formatViewCount(video.viewCount)} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(video.publishedAt)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl bg-background rounded-xl overflow-hidden shadow-lg">
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-background/80 rounded-full hover:bg-background transition-colors"
              >
                <ExternalLink className="w-6 h-6" />
              </button>
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
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
        <div className="text-center">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">
                STAY CONNECTED
              </h3>
              <p className="text-muted-foreground mb-6">
                Subscribe to our channels and never miss epic content from S2PGGs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
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
                  <Users className="w-4 h-4 mr-2" />
                  Join Discord
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;