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
    
    // Hero section background that fades as we scroll
    const heroIntensity = Math.max(0.8 - scrollProgress * 0.6, 0.2);
    const gradientOpacity = Math.max(0.6 - scrollProgress * 0.4, 0.1);
    
    return {
      background: `
        radial-gradient(ellipse at top left, hsl(var(--primary) / ${heroIntensity * 0.06}) 0%, transparent 50%),
        radial-gradient(ellipse at bottom right, hsl(var(--secondary) / ${heroIntensity * 0.05}) 0%, transparent 60%),
        radial-gradient(ellipse at center, hsl(var(--accent) / ${heroIntensity * 0.04}) 0%, transparent 40%),
        linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--muted) / ${gradientOpacity * 0.3}) 100%)
      `,
      transition: 'background 0.3s ease-out',
    };
  };

  return {
    backgroundStyle: getBackgroundStyle(),
    scrollProgress: scrollY
  };
};