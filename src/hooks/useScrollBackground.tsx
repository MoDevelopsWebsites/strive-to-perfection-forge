import { useState, useEffect } from 'react';

export const useScrollBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate background gradient based on scroll position
  const getBackgroundStyle = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = Math.min(scrollY / maxScroll, 1);
    
    // Define gradient stops for different sections
    const gradients = [
      'radial-gradient(ellipse at top, hsl(var(--primary) / 0.05) 0%, hsl(var(--background)) 50%)',
      'radial-gradient(ellipse at center, hsl(var(--secondary) / 0.08) 0%, hsl(var(--background)) 60%)',
      'radial-gradient(ellipse at bottom, hsl(var(--accent) / 0.06) 0%, hsl(var(--background)) 55%)',
      'radial-gradient(ellipse at top left, hsl(var(--primary) / 0.04) 0%, hsl(var(--background)) 50%)',
      'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--muted) / 0.3) 100%)'
    ];

    // Smooth transition between gradients
    const sectionProgress = scrollProgress * (gradients.length - 1);
    const currentSection = Math.floor(sectionProgress);
    const nextSection = Math.min(currentSection + 1, gradients.length - 1);
    const sectionBlend = sectionProgress - currentSection;

    return {
      background: gradients[currentSection],
      transition: 'background 0.3s ease-out',
    };
  };

  return {
    backgroundStyle: getBackgroundStyle(),
    scrollProgress: scrollY
  };
};