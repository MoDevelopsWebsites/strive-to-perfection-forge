import { useState, useEffect } from 'react';
import { Menu, X, Home, Users, Video, Gamepad2, MessageSquare, ChevronDown } from 'lucide-react';
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
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { name: 'Home', href: '#hero', icon: Home },
    { 
      name: 'Team', 
      href: '#team', 
      icon: Users,
      dropdown: [
        { 
          name: 'Leadership', 
          href: '#team', 
          icon: Users,
          description: 'Meet our core leadership team and executives driving S2PGGs forward'
        },
        { 
          name: 'Live Streamers', 
          href: '#streamers', 
          icon: Video,
          description: 'Watch our talented content creators compete and entertain live on Twitch'
        },
        { 
          name: 'Community', 
          href: '#contact', 
          icon: MessageSquare,
          description: 'Join our growing community and connect with fellow gamers and fans'
        }
      ]
    },
    { name: 'Content', href: '#content', icon: Video },
    { name: 'Merch', href: '#merch', icon: Gamepad2 },
    { name: 'Contact', href: '#contact', icon: MessageSquare },
  ];

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

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
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const hasDropdown = item.dropdown && item.dropdown.length > 0;
              
              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => hasDropdown && setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="nav-link flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-muted/50 transition-all duration-300"
                  >
                    <IconComponent size={16} />
                    <span className="font-display font-medium">{item.name}</span>
                    {hasDropdown && (
                      <ChevronDown 
                        size={14} 
                        className={`transition-transform duration-200 ${
                          hoveredItem === item.name ? 'rotate-180' : ''
                        }`} 
                      />
                    )}
                  </button>
                  
                  {/* Enhanced Professional Dropdown Menu - Stripe Style */}
                  {hasDropdown && hoveredItem === item.name && (
                    <div className="dropdown-menu absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-96 bg-card/98 backdrop-blur-2xl border border-border/60 rounded-2xl shadow-2xl shadow-primary/10 z-50 overflow-hidden">
                      <div className="p-6">
                        <div className="mb-4">
                          <h3 className="text-lg font-gaming font-bold text-primary mb-2">Our Team</h3>
                          <p className="text-sm text-muted-foreground">Explore different aspects of the S2PGGs organization</p>
                        </div>
                        <div className="space-y-2">
                          {item.dropdown.map((dropdownItem) => {
                            const DropdownIcon = dropdownItem.icon;
                            return (
                              <button
                                key={dropdownItem.name}
                                onClick={() => scrollToSection(dropdownItem.href)}
                                className="w-full text-left group p-4 rounded-xl hover:bg-primary/10 transition-all duration-300 border border-transparent hover:border-primary/20"
                              >
                                <div className="flex items-start gap-4">
                                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                                    <DropdownIcon className="w-5 h-5 text-primary" />
                                  </div>
                                  <div className="flex-grow min-w-0">
                                    <h4 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-200 mb-1">
                                      {dropdownItem.name}
                                    </h4>
                                    <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-200 leading-relaxed">
                                      {dropdownItem.description}
                                    </p>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                        <div className="mt-6 pt-4 border-t border-border/50">
                          <button
                            onClick={() => window.open('https://discord.gg/Hyu6j4RFrp', '_blank')}
                            className="w-full p-3 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl font-medium"
                          >
                            Join Our Community
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
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
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="nav-link flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-muted/50 transition-all duration-300 w-full text-left"
                  >
                    <IconComponent size={18} />
                    <span className="font-display font-medium">{item.name}</span>
                  </button>
                );
              })}
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