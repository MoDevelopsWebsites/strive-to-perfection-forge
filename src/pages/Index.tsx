import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import TeamSection from '@/components/TeamSection';
import StreamersSection from '@/components/StreamersSection';
import ContentSection from '@/components/ContentSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <TeamSection />
      <StreamersSection />
      <ContentSection />
    </div>
  );
};

export default Index;
