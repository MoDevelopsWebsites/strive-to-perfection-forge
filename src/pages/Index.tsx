import Navigation from '@/components/Navigation';
import AnnouncementBanner from '@/components/AnnouncementBanner';
import VitalityHeroSection from '@/components/VitalityHeroSection';
import SponsorsSection from '@/components/SponsorsSection';
import TeamSection from '@/components/TeamSection';
import StreamersSection from '@/components/StreamersSection';
import ContentSection from '@/components/ContentSection';
import MerchSection from '@/components/MerchSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import SupportButton from '@/components/SupportButton';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnnouncementBanner />
      <Navigation />
      
      <main>
        <VitalityHeroSection />
        <SponsorsSection />
        <TeamSection />
        <StreamersSection />
        <ContentSection />
        <MerchSection />
        <ContactSection />
      </main>
      
      <Footer />
      
      {/* 24/7 Support Button */}
      <SupportButton />
    </div>
  );
};

export default Index;
