import { useState, useEffect } from 'react';
import { Menu, X, Trophy, Users, Play, Calendar, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const navItems = [
    { name: 'Team', href: '#team', icon: Users },
    { name: 'Content', href: '#content', icon: Play },
    { name: 'Contact', href: '#contact', icon: MessageSquare },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md border-b border-border/50' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
        <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-primary p-0.5 purple-glow">
              <img 
                src="/lovable-uploads/6af2116b-6281-4072-b96b-cec7ad59b43a.png" 
                alt="S2PGGs Logo" 
                className="w-full h-full object-cover rounded-full bg-background"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-gaming font-bold text-xl text-primary glow-text">
                S2PGGs
              </h1>
              <p className="text-xs text-muted-foreground font-display">
                Strive 2 Perfection
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="nav-link flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-muted/50 transition-all duration-300"
              >
                <item.icon size={16} />
                <span className="font-display font-medium">{item.name}</span>
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              className="esports-button"
              onClick={() => window.open('https://discord.gg/Hyu6j4RFrp', '_blank')}
            >
              Join S2PGGs
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:bg-muted/50"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-slide-in-left">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card/95 backdrop-blur-md rounded-xl border border-border/50 mt-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    scrollToSection(item.href);
                    setIsMenuOpen(false);
                  }}
                  className="nav-link flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-muted/50 transition-all duration-300 w-full text-left"
                >
                  <item.icon size={18} />
                  <span className="font-display font-medium">{item.name}</span>
                </button>
              ))}
              <div className="pt-2">
                <Button 
                  className="esports-button w-full"
                  onClick={() => window.open('https://discord.gg/Hyu6j4RFrp', '_blank')}
                >
                  Join S2PGGs
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;