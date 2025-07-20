import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'team', label: 'Team' },
  { id: 'streamers', label: 'Streamers' },
  { id: 'content', label: 'Videos' },
];

export const ScrollDots = () => {
  const [activeSection, setActiveSection] = useState(0);
  const { scrollToSection } = useSmoothScroll();

  useEffect(() => {
    // Create scroll triggers for each section
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: `#${section.id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(index),
        onEnterBack: () => setActiveSection(index),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleDotClick = (index: number) => {
    scrollToSection(`#${sections[index].id}`);
    setActiveSection(index);
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => handleDotClick(index)}
          className={`group relative w-3 h-3 rounded-full border-2 transition-all duration-300 hover:scale-125 ${
            activeSection === index
              ? 'bg-primary border-primary shadow-lg shadow-primary/50'
              : 'bg-transparent border-muted-foreground/50 hover:border-primary'
          }`}
          aria-label={`Go to ${section.label} section`}
        >
          <span
            className={`absolute right-6 top-1/2 -translate-y-1/2 px-2 py-1 text-xs font-medium rounded bg-background/90 backdrop-blur-sm border transition-all duration-300 whitespace-nowrap ${
              activeSection === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
          >
            {section.label}
          </span>
        </button>
      ))}
    </div>
  );
};