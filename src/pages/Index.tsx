import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import TeamSection from '@/components/TeamSection';
import StreamersSection from '@/components/StreamersSection';
import ContentSection from '@/components/ContentSection';
import MerchSection from '@/components/MerchSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Fixed background gradient for entire page */}
      <div className="fixed inset-0 hero-gradient -z-50"></div>
      
      <Navigation />
      
      <main>
        <HeroSection />
        <TeamSection />
        <StreamersSection />
        <ContentSection />
        <MerchSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
