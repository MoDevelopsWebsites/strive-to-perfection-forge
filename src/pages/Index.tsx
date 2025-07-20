import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import TeamSection from '@/components/TeamSection';
import StreamersSection from '@/components/StreamersSection';
import ContentSection from '@/components/ContentSection';
import { useScrollSnap } from '@/hooks/useScrollSnap';

const Index = () => {
  const containerRef = useScrollSnap();

  return (
    <div ref={containerRef} className="scroll-snap-container">
      <Navigation />
      <HeroSection />
      <TeamSection />
      <StreamersSection />
      <ContentSection />
    </div>
  );
};

export default Index;
