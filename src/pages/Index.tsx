import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import TeamSection from '@/components/TeamSection';
import StreamersSection from '@/components/StreamersSection';
import ContentSection from '@/components/ContentSection';
import { ScrollDots } from '@/components/ScrollDots';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const Index = () => {
  // Initialize smooth scrolling
  useSmoothScroll();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      <ScrollDots />
      
      <main className="scroll-smooth">
        <section id="hero" className="min-h-screen">
          <HeroSection />
        </section>
        
        <section id="team" className="min-h-screen">
          <TeamSection />
        </section>
        
        <section id="streamers" className="min-h-screen">
          <StreamersSection />
        </section>
        
        <section id="content" className="min-h-screen">
          <ContentSection />
        </section>
      </main>
    </div>
  );
};

export default Index;
