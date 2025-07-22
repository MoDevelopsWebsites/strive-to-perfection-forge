import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import TeamSection from '@/components/TeamSection';
import StreamersSection from '@/components/StreamersSection';
import ContentSection from '@/components/ContentSection';
import BrandCarousel from '@/components/BrandCarousel';
import MerchSection from '@/components/MerchSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import SupportButton from '@/components/SupportButton';

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
        <BrandCarousel />
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
