import { useEffect, useRef, useState, useCallback } from 'react';

interface ScrollSnapOptions {
  threshold?: number;
  animationDuration?: number;
  easing?: string;
}

export const useScrollSnap = (options: ScrollSnapOptions = {}) => {
  const {
    threshold = 0.1,
    animationDuration = 1000,
    easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  } = options;

  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [sections, setSections] = useState<Element[]>([]);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const isAnimatingRef = useRef(false);

  // Initialize sections
  useEffect(() => {
    const sectionElements = Array.from(document.querySelectorAll('.scroll-snap-section'));
    setSections(sectionElements);
    
    if (sectionElements.length > 0) {
      setCurrentSection(0);
    }
  }, []);

  // Smooth scroll to section with custom easing
  const scrollToSection = useCallback((index: number) => {
    if (index < 0 || index >= sections.length || isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    setIsScrolling(true);
    setCurrentSection(index);

    const targetSection = sections[index];
    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
    
    // Custom smooth scroll animation
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      
      // Custom easing function
      const easedProgress = cubicBezier(progress, 0.25, 0.46, 0.45, 0.94);
      const currentPosition = startPosition + (distance * easedProgress);
      
      window.scrollTo(0, currentPosition);
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        isAnimatingRef.current = false;
        setIsScrolling(false);
      }
    };

    requestAnimationFrame(animateScroll);
  }, [sections, animationDuration]);

  // Custom cubic bezier implementation
  const cubicBezier = (t: number, x1: number, y1: number, x2: number, y2: number) => {
    const cx = 3 * x1;
    const bx = 3 * (x2 - x1) - cx;
    const ax = 1 - cx - bx;
    const cy = 3 * y1;
    const by = 3 * (y2 - y1) - cy;
    const ay = 1 - cy - by;
    
    return ((ay * t + by) * t + cy) * t;
  };

  // Handle wheel events
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isAnimatingRef.current || sections.length === 0) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSection = currentSection + direction;
      
      if (nextSection >= 0 && nextSection < sections.length) {
        scrollToSection(nextSection);
      }
    };

    // Add wheel listener with passive: false to prevent default
    document.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, [currentSection, sections, scrollToSection]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimatingRef.current) return;

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          if (currentSection < sections.length - 1) {
            scrollToSection(currentSection + 1);
          }
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          if (currentSection > 0) {
            scrollToSection(currentSection - 1);
          }
          break;
        case 'Home':
          e.preventDefault();
          scrollToSection(0);
          break;
        case 'End':
          e.preventDefault();
          scrollToSection(sections.length - 1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, sections, scrollToSection]);

  // Handle touch events for mobile
  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimatingRef.current) return;
      
      touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      const threshold = 50;

      if (Math.abs(deltaY) > threshold) {
        const direction = deltaY > 0 ? 1 : -1;
        const nextSection = currentSection + direction;
        
        if (nextSection >= 0 && nextSection < sections.length) {
          scrollToSection(nextSection);
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, sections, scrollToSection]);

  return {
    currentSection,
    isScrolling,
    totalSections: sections.length,
    scrollToSection,
    sections
  };
};