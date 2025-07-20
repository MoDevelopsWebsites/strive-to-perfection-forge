import { useState, useEffect } from 'react';

interface YouTubeVideo {
  id: string;
  title: string;
  publishedAt: string;
  viewCount: string;
  thumbnail: string;
}

const FALLBACK_VIDEOS = [
  {
    id: 'hQAA7k7aYY8',
    title: 'Latest S2PGGs Highlights',
    publishedAt: '2024-01-15T10:00:00Z',
    viewCount: '25000',
    thumbnail: 'https://img.youtube.com/vi/hQAA7k7aYY8/maxresdefault.jpg'
  },
  {
    id: '4AvT8Cn-FdE',
    title: 'Tournament Victory',
    publishedAt: '2024-01-10T14:30:00Z',
    viewCount: '18000',
    thumbnail: 'https://img.youtube.com/vi/4AvT8Cn-FdE/maxresdefault.jpg'
  },
  {
    id: 'FHEv_O8XgwI',
    title: 'Pro Tips & Strategy',
    publishedAt: '2024-01-05T16:45:00Z',
    viewCount: '12000',
    thumbnail: 'https://img.youtube.com/vi/FHEv_O8XgwI/maxresdefault.jpg'
  }
];

export const useYouTubeAPI = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>(FALLBACK_VIDEOS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = async (apiKey?: string, channelId?: string) => {
    if (!apiKey || !channelId) {
      console.log('Using fallback videos - API key or channel ID not provided');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // First, get the uploads playlist ID
      const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
      );
      
      if (!channelResponse.ok) {
        throw new Error('Failed to fetch channel data');
      }

      const channelData = await channelResponse.json();
      const uploadsPlaylistId = channelData.items[0]?.contentDetails?.relatedPlaylists?.uploads;

      if (!uploadsPlaylistId) {
        throw new Error('Could not find uploads playlist');
      }

      // Get the latest videos from the uploads playlist
      const videosResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=3&order=date&key=${apiKey}`
      );

      if (!videosResponse.ok) {
        throw new Error('Failed to fetch videos');
      }

      const videosData = await videosResponse.json();

      // Get detailed statistics for each video
      const videoIds = videosData.items.map((item: any) => item.snippet.resourceId.videoId).join(',');
      const statsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${apiKey}`
      );

      const statsData = await statsResponse.json();

      const formattedVideos: YouTubeVideo[] = videosData.items.map((item: any, index: number) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        publishedAt: item.snippet.publishedAt,
        viewCount: statsData.items[index]?.statistics?.viewCount || '0',
        thumbnail: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url
      }));

      setVideos(formattedVideos);
    } catch (err) {
      console.error('YouTube API error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      // Keep using fallback videos on error
    } finally {
      setIsLoading(false);
    }
  };

  const formatViewCount = (count: string): string => {
    const num = parseInt(count);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return count;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return {
    videos,
    isLoading,
    error,
    fetchVideos,
    formatViewCount,
    formatDate
  };
};
