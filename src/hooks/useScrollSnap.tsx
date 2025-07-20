import { useEffect, useRef } from 'react';

export const useScrollSnap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const currentSectionRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll('.snap-section');
    const sectionCount = sections.length;

    const scrollToSection = (index: number) => {
      if (index < 0 || index >= sectionCount || isScrollingRef.current) return;
      
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
      }, 1000);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrollingRef.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSection = currentSectionRef.current + direction;
      
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
      
      currentSectionRef.current = newCurrentSection;
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
    };
  }, []);

  return containerRef;
};