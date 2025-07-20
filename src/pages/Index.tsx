import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import TeamSection from '@/components/TeamSection';
import StreamersSection from '@/components/StreamersSection';
import ContentSection from '@/components/ContentSection';
import ContactSection from '@/components/ContactSection';
import { useScrollBackground } from '@/hooks/useScrollBackground';

const Index = () => {
  // Initialize scroll background effects
  const { backgroundStyle } = useScrollBackground();

  return (
    <div className="min-h-screen overflow-x-hidden" style={backgroundStyle}>
      <Navigation />
      
      <main>
        <HeroSection />
        <TeamSection />
        <StreamersSection />
        <ContentSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
