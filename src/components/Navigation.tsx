import { useState, useEffect } from 'react';
import { Menu, X, Home, Users, Video, Gamepad2, MessageSquare, ChevronDown, ShoppingBag, Shirt, Package, Sticker, BookOpen, PlayCircle, FileText, Heart, Briefcase, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string, external?: boolean) => {
    if (external) {
      window.open(href, '_blank');
      setIsMenuOpen(false);
    } else if (href.startsWith('/')) {
      // It's a route, use React Router navigation
      navigate(href);
      setIsMenuOpen(false);
    } else if (href.startsWith('#')) {
      // It's an anchor link
      if (location.pathname !== '/') {
        // If not on home page, navigate to home first then scroll
        navigate('/' + href);
      } else {
        // If on home page, just scroll to element
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { name: 'Home', href: '/', icon: Home, route: true },
    { 
      name: 'Merch', 
      href: '#merch', 
      icon: ShoppingBag,
      dropdown: [
        { 
          name: 'T-Shirts', 
          href: '/shop?category=tshirts', 
          icon: Shirt,
          description: 'Premium quality with custom designs'
        },
        { 
          name: 'Hoodies', 
          href: '/shop?category=hoodies', 
          icon: Package,
          description: 'Cozy & minimal styles'
        },
        { 
          name: 'Stickers', 
          href: '/shop?category=stickers', 
          icon: Sticker,
          description: 'Brand your space, gear, or tech'
        }
      ]
    },
    { 
      name: 'Content', 
      href: '#content', 
      icon: Video,
      dropdown: [
        { 
          name: 'Blog', 
          href: '/blog', 
          icon: BookOpen,
          description: 'Insights, updates, and behind-the-scenes'
        },
        { 
          name: 'Videos', 
          href: '#content', 
          icon: PlayCircle,
          description: 'Dynamic content about our journey'
        },
        { 
          name: 'Guides', 
          href: '/guides', 
          icon: FileText,
          description: 'Helpful how-tos and resources'
        }
      ]
    },
    { 
      name: 'Our Team', 
      href: '#team', 
      icon: Users,
      dropdown: [
        { 
          name: 'About Us', 
          href: '#team', 
          icon: Users,
          description: 'Meet the faces behind the mission'
        },
        { 
          name: 'Culture', 
          href: '/culture', 
          icon: Heart,
          description: 'What drives us every day'
        },
        { 
          name: 'Careers', 
          href: '/careers', 
          icon: Briefcase,
          description: 'Join our growing team'
        }
      ]
    },
    { name: 'Shop', href: '/shop', icon: Target, route: true },
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
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
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
                    onClick={() => handleNavClick(item.href, (item as any).external)}
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
                  
                  {/* Modern Mega Menu Dropdown - Superside Inspired */}
                  {hasDropdown && hoveredItem === item.name && (
                    <div className="dropdown-menu absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white/98 backdrop-blur-xl border border-gray-200/60 rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
                      <div className="p-8 min-w-[400px]">
                        {/* Header */}
                        <div className="mb-6">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                          <p className="text-sm text-gray-600">
                            {item.name === 'Merch' && 'Premium branded merchandise for the S2PGGs community'}
                            {item.name === 'Content' && 'Stay updated with our latest content and insights'}
                            {item.name === 'Our Team' && 'Learn more about the people driving S2PGGs forward'}
                          </p>
                        </div>
                        
                        {/* Menu Items Grid */}
                        <div className="grid grid-cols-1 gap-1">
                          {item.dropdown.map((dropdownItem) => {
                            const DropdownIcon = dropdownItem.icon;
                            return (
                              <button
                                key={dropdownItem.name}
                                onClick={() => handleNavClick(dropdownItem.href)}
                                className="group p-4 rounded-lg hover:bg-gray-50 transition-all duration-200 text-left w-full"
                              >
                                <div className="flex items-start gap-4">
                                  <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-200">
                                    <DropdownIcon className="w-5 h-5 text-gray-600 group-hover:text-primary" />
                                  </div>
                                  <div className="flex-grow">
                                    <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors duration-200 mb-1">
                                      {dropdownItem.name}
                                    </h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                      {dropdownItem.description}
                                    </p>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                        
                        {/* Footer CTA */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                          <button
                            onClick={() => {
                              if (item.name === 'Merch') {
                                handleNavClick('/shop');
                              } else if (item.name === 'Content') {
                                handleNavClick('#content');
                              } else if (item.name === 'Our Team') {
                                window.open('https://discord.gg/Hyu6j4RFrp', '_blank');
                              }
                            }}
                            className="w-full px-4 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-all duration-200 font-medium text-sm"
                          >
                            {item.name === 'Merch' && 'Browse All Products'}
                            {item.name === 'Content' && 'View All Content'}
                            {item.name === 'Our Team' && 'Join Our Community'}
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

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-xl border border-gray-200/50 mt-2 shadow-lg">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const hasDropdown = item.dropdown && item.dropdown.length > 0;
                
                return (
                  <div key={item.name} className="space-y-1">
                    <button
                      onClick={() => !hasDropdown && handleNavClick(item.href, (item as any).external)}
                      className="nav-link flex items-center justify-between space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-all duration-300 w-full text-left"
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent size={18} className="text-gray-600" />
                        <span className="font-medium text-gray-900">{item.name}</span>
                      </div>
                      {hasDropdown && (
                        <ChevronDown size={16} className="text-gray-400" />
                      )}
                    </button>
                    
                    {/* Mobile Dropdown Items */}
                    {hasDropdown && (
                      <div className="ml-4 space-y-1">
                        {item.dropdown.map((dropdownItem) => {
                          const DropdownIcon = dropdownItem.icon;
                          return (
                            <button
                              key={dropdownItem.name}
                              onClick={() => handleNavClick(dropdownItem.href)}
                              className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                            >
                              <div className="flex items-start gap-3">
                                <DropdownIcon className="w-4 h-4 text-gray-500 mt-0.5" />
                                <div>
                                  <div className="font-medium text-gray-900 text-sm">{dropdownItem.name}</div>
                                  <div className="text-xs text-gray-600 mt-1">{dropdownItem.description}</div>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
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