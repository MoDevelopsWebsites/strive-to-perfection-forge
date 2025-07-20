import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import TeamSection from '@/components/TeamSection';
import StreamersSection from '@/components/StreamersSection';
import ContentSection from '@/components/ContentSection';
import ScrollIndicator from '@/components/ScrollIndicator';
import { useScrollSnap } from '@/hooks/useScrollSnap';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';

const Index = () => {
  const { currentSection, isScrolling, totalSections, scrollToSection } = useScrollSnap({
    threshold: 0.1,
    animationDuration: 1200,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  });

  const { getSectionAnimationClass, getElementAnimationClass } = useScrollAnimations(
    currentSection,
    isScrolling
  );

  // Disable body scroll and add scroll-snap classes to sections
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.scrollBehavior = 'auto';
    
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.scrollBehavior = 'smooth';
    };
  }, []);

  return (
    <div className="relative">
      {/* Fixed Navigation */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <Navigation />
      </div>

      {/* Scroll Container */}
      <div className="h-screen overflow-hidden">
        {/* Hero Section */}
        <section 
          className={`scroll-snap-section h-screen w-full ${getSectionAnimationClass(0)}`}
          data-section="hero"
        >
          <HeroSection />
        </section>

        {/* Team Section */}
        <section 
          className={`scroll-snap-section h-screen w-full ${getSectionAnimationClass(1)}`}
          data-section="team"
        >
          <TeamSection />
        </section>

        {/* Streamers Section */}
        <section 
          className={`scroll-snap-section h-screen w-full ${getSectionAnimationClass(2)}`}
          data-section="streamers"
        >
          <StreamersSection />
        </section>

        {/* Content Section */}
        <section 
          className={`scroll-snap-section h-screen w-full ${getSectionAnimationClass(3)}`}
          data-section="content"
        >
          <ContentSection />
        </section>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator
        currentSection={currentSection}
        totalSections={totalSections}
        onSectionClick={scrollToSection}
        isScrolling={isScrolling}
      />

      {/* Loading overlay during scroll transitions */}
      {isScrolling && (
        <div className="fixed inset-0 bg-background/20 backdrop-blur-sm z-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default Index;
