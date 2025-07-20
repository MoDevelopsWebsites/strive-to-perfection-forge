import { useEffect, useRef } from 'react';

export const useScrollSnap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const currentSectionRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = document.querySelectorAll('.snap-section');
    const sectionCount = sections.length;

    console.log('ScrollSnap initialized with', sectionCount, 'sections');

    const scrollToSection = (index: number) => {
      if (index < 0 || index >= sectionCount || isScrollingRef.current) {
        console.log('ScrollToSection blocked:', { index, sectionCount, isScrolling: isScrollingRef.current });
        return;
      }
      
      console.log('Scrolling to section', index);
      isScrollingRef.current = true;
      currentSectionRef.current = index;
      
      const section = sections[index] as HTMLElement;
      const targetY = section.offsetTop;

      // Smooth scroll to section
      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });

      // Reset scrolling flag after animation
      setTimeout(() => {
        isScrollingRef.current = false;
        console.log('Scroll animation completed');
      }, 1000);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrollingRef.current) {
        console.log('Wheel event blocked - already scrolling');
        return;
      }

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSection = currentSectionRef.current + direction;
      
      console.log('Wheel event:', { direction, currentSection: currentSectionRef.current, nextSection });
      scrollToSection(nextSection);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrollingRef.current) return;

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          scrollToSection(currentSectionRef.current + 1);
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          scrollToSection(currentSectionRef.current - 1);
          break;
        case 'Home':
          e.preventDefault();
          scrollToSection(0);
          break;
        case 'End':
          e.preventDefault();
          scrollToSection(sectionCount - 1);
          break;
      }
    };

    // Detect which section is currently in view
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      let newCurrentSection = 0;
      sections.forEach((section, index) => {
        const element = section as HTMLElement;
        const sectionTop = element.offsetTop;
        const sectionHeight = element.offsetHeight;
        
        if (scrollY >= sectionTop - windowHeight / 2 && 
            scrollY < sectionTop + sectionHeight - windowHeight / 2) {
          newCurrentSection = index;
        }
      });
      
      if (newCurrentSection !== currentSectionRef.current) {
        console.log('Current section changed from', currentSectionRef.current, 'to', newCurrentSection);
        currentSectionRef.current = newCurrentSection;
      }
    };

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll);

    // Initial scroll detection
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
      console.log('ScrollSnap cleanup');
    };
  }, []);

  return containerRef;
};