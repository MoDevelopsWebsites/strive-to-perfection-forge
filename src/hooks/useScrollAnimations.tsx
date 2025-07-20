import { useEffect, useRef, useState } from 'react';

interface AnimationState {
  isVisible: boolean;
  hasAnimated: boolean;
  progress: number;
}

export const useScrollAnimations = (currentSection: number, isScrolling: boolean) => {
  const [animations, setAnimations] = useState<Record<number, AnimationState>>({});
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    // Initialize animation states for all sections
    const sections = document.querySelectorAll('.scroll-snap-section');
    const initialAnimations: Record<number, AnimationState> = {};
    
    sections.forEach((_, index) => {
      initialAnimations[index] = {
        isVisible: index === 0, // First section is visible by default
        hasAnimated: index === 0,
        progress: index === 0 ? 1 : 0
      };
    });
    
    setAnimations(initialAnimations);
  }, []);

  useEffect(() => {
    // Create intersection observer for progressive animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionIndex = parseInt(entry.target.getAttribute('data-section-index') || '0');
          const isVisible = entry.isIntersecting;
          const progress = entry.intersectionRatio;

          setAnimations(prev => ({
            ...prev,
            [sectionIndex]: {
              ...prev[sectionIndex],
              isVisible,
              progress,
              hasAnimated: prev[sectionIndex]?.hasAnimated || isVisible
            }
          }));
        });
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100), // 0 to 1 in 0.01 increments
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    // Observe all sections
    const sections = document.querySelectorAll('.scroll-snap-section');
    sections.forEach((section, index) => {
      section.setAttribute('data-section-index', index.toString());
      observerRef.current?.observe(section);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // Update animations based on current section
  useEffect(() => {
    if (!isScrolling) {
      setAnimations(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(key => {
          const index = parseInt(key);
          const isCurrentOrPrevious = index <= currentSection;
          updated[index] = {
            ...updated[index],
            isVisible: index === currentSection,
            hasAnimated: isCurrentOrPrevious,
            progress: index === currentSection ? 1 : (index < currentSection ? 1 : 0)
          };
        });
        return updated;
      });
    }
  }, [currentSection, isScrolling]);

  const getSectionAnimationClass = (sectionIndex: number) => {
    const animation = animations[sectionIndex];
    if (!animation) return '';

    const { isVisible, hasAnimated, progress } = animation;
    
    if (isVisible && progress > 0.5) {
      return 'animate-slide-in-active';
    } else if (hasAnimated && !isVisible) {
      return 'animate-slide-out';
    } else if (isVisible) {
      return 'animate-slide-in-preparing';
    }
    
    return 'animate-slide-out';
  };

  const getElementAnimationClass = (sectionIndex: number, elementIndex: number = 0, delay: number = 0.1) => {
    const animation = animations[sectionIndex];
    if (!animation?.isVisible) return 'opacity-0 translate-y-8';

    const totalDelay = elementIndex * delay;
    return `animate-cascade-in animation-delay-${Math.min(Math.floor(totalDelay * 10), 20)}`;
  };

  return {
    getSectionAnimationClass,
    getElementAnimationClass,
    animations
  };
};