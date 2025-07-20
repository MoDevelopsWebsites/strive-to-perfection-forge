import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ScrollIndicatorProps {
  currentSection: number;
  totalSections: number;
  onSectionClick: (index: number) => void;
  isScrolling: boolean;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  currentSection,
  totalSections,
  onSectionClick,
  isScrolling
}) => {
  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center space-y-4">
      {/* Navigation dots */}
      <div className="flex flex-col space-y-3">
        {Array.from({ length: totalSections }).map((_, index) => (
          <button
            key={index}
            onClick={() => !isScrolling && onSectionClick(index)}
            disabled={isScrolling}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-500 hover:scale-125 ${
              index === currentSection
                ? 'bg-primary border-primary shadow-lg shadow-primary/50 scale-125'
                : 'bg-transparent border-primary/40 hover:border-primary/80'
            } ${isScrolling ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress indicator */}
      <div className="w-0.5 h-20 bg-border rounded-full overflow-hidden">
        <div 
          className="w-full bg-gradient-to-b from-primary to-accent rounded-full transition-all duration-1000 ease-out"
          style={{ 
            height: `${((currentSection + 1) / totalSections) * 100}%`,
            transform: isScrolling ? 'scaleY(1.1)' : 'scaleY(1)'
          }}
        />
      </div>

      {/* Navigation arrows */}
      <div className="flex flex-col space-y-2">
        <button
          onClick={() => !isScrolling && currentSection > 0 && onSectionClick(currentSection - 1)}
          disabled={isScrolling || currentSection === 0}
          className={`p-2 rounded-full transition-all duration-300 ${
            currentSection === 0 || isScrolling
              ? 'opacity-30 cursor-not-allowed'
              : 'opacity-70 hover:opacity-100 hover:bg-primary/10 hover:scale-110'
          }`}
          aria-label="Previous section"
        >
          <ChevronUp className="w-4 h-4 text-primary" />
        </button>
        
        <button
          onClick={() => !isScrolling && currentSection < totalSections - 1 && onSectionClick(currentSection + 1)}
          disabled={isScrolling || currentSection === totalSections - 1}
          className={`p-2 rounded-full transition-all duration-300 ${
            currentSection === totalSections - 1 || isScrolling
              ? 'opacity-30 cursor-not-allowed'
              : 'opacity-70 hover:opacity-100 hover:bg-primary/10 hover:scale-110'
          }`}
          aria-label="Next section"
        >
          <ChevronDown className="w-4 h-4 text-primary" />
        </button>
      </div>

      {/* Section counter */}
      <div className="text-xs text-muted-foreground font-mono bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full border border-border/50">
        {String(currentSection + 1).padStart(2, '0')} / {String(totalSections).padStart(2, '0')}
      </div>
    </div>
  );
};

export default ScrollIndicator;