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
          description: 'Premium quality with custom designs',
          image: '/lovable-uploads/6c6abcc5-cdb4-419a-9113-483835517d96.png',
          featured: true
        },
        { 
          name: 'Hoodies', 
          href: '/shop?category=hoodies', 
          icon: Package,
          description: 'Cozy & minimal styles',
          image: '/lovable-uploads/c31f789f-6d8e-4649-8de3-f34b037722b3.png'
        },
        { 
          name: 'Stickers', 
          href: '/shop?category=stickers', 
          icon: Sticker,
          description: 'Brand your space, gear, or tech'
        },
        { 
          name: 'Accessories', 
          href: '/shop?category=accessories', 
          icon: Target,
          description: 'Complete your gaming setup'
        }
      ]
    },
    { 
      name: 'Content', 
      href: '#content', 
      icon: Video,
      dropdown: [
        { 
          name: 'Latest Videos', 
          href: '#content', 
          icon: PlayCircle,
          description: 'Dynamic content about our journey',
          image: '/lovable-uploads/ab937607-6d1b-46b4-88b5-0eb8849ed32f.png',
          featured: true
        },
        { 
          name: 'Blog', 
          href: '/blog', 
          icon: BookOpen,
          description: 'Insights, updates, and behind-the-scenes'
        },
        { 
          name: 'Guides', 
          href: '/guides', 
          icon: FileText,
          description: 'Helpful how-tos and resources'
        },
        { 
          name: 'Live Streams', 
          href: '#streamers', 
          icon: Video,
          description: 'Watch our team compete live'
        }
      ]
    },
    { 
      name: 'Our Team', 
      href: '#team', 
      icon: Users,
      dropdown: [
        { 
          name: 'Leadership', 
          href: '#team', 
          icon: Users,
          description: 'Meet the faces behind the mission',
          image: '/lovable-uploads/1e954a14-b815-4254-94ed-9762e2ad8379.png',
          featured: true
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
        },
        { 
          name: 'Community', 
          href: '#contact', 
          icon: MessageSquare,
          description: 'Connect with fellow gamers'
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
                    className="nav-link flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-muted/50 transition-all duration-300"
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
                  
                  {/* Superside-Style Horizontal Multi-Column Mega Menu */}
                  {hasDropdown && hoveredItem === item.name && (
                    <div 
                      className="dropdown-menu absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white/98 backdrop-blur-xl border border-gray-200/60 rounded-2xl shadow-2xl z-50 overflow-hidden animate-fade-in"
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div className="p-8 min-w-[720px] max-w-5xl">
                        {/* Header Section */}
                        <div className="mb-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                          <p className="text-sm text-gray-600">
                            {item.name === 'Merch' && 'Premium branded merchandise designed for the S2PGGs community'}
                            {item.name === 'Content' && 'Stay updated with our latest content, streams, and insights'}
                            {item.name === 'Our Team' && 'Discover the talented people driving S2PGGs forward'}
                          </p>
                        </div>
                        
                        {/* Horizontal Multi-Column Grid */}
                        <div className="grid grid-cols-3 gap-6 mb-6">
                          {item.dropdown.map((dropdownItem, index) => {
                            const DropdownIcon = dropdownItem.icon;
                            const isFeatured = dropdownItem.featured;
                            
                            return (
                              <div
                                key={dropdownItem.name}
                                className={`group relative bg-gray-50/50 hover:bg-white border border-gray-200/60 hover:border-gray-300 rounded-xl p-5 transition-all duration-300 hover:shadow-lg cursor-pointer ${
                                  isFeatured ? 'col-span-2 row-span-1' : ''
                                }`}
                                onClick={() => {
                                  handleNavClick(dropdownItem.href);
                                  setHoveredItem(null);
                                }}
                              >
                                {/* Featured Card with Image */}
                                {isFeatured && dropdownItem.image ? (
                                  <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                      <img 
                                        src={dropdownItem.image}
                                        alt={dropdownItem.name}
                                        className="w-20 h-20 rounded-lg object-cover shadow-md"
                                      />
                                    </div>
                                    <div className="flex-grow">
                                      <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 bg-gray-200 group-hover:bg-primary/10 rounded-lg flex items-center justify-center transition-colors">
                                          <DropdownIcon className="w-4 h-4 text-gray-600 group-hover:text-primary" />
                                        </div>
                                        <h4 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                                          {dropdownItem.name}
                                        </h4>
                                        <span className="ml-auto text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                                          Featured
                                        </span>
                                      </div>
                                      <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                        {dropdownItem.description}
                                      </p>
                                      <span className="inline-flex items-center text-sm font-medium text-primary group-hover:text-primary/80 transition-colors">
                                        Learn more →
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  /* Regular Cards */
                                  <div className="text-center">
                                    <div className="w-12 h-12 bg-gray-200 group-hover:bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 transition-colors">
                                      <DropdownIcon className="w-6 h-6 text-gray-600 group-hover:text-primary" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors mb-2">
                                      {dropdownItem.name}
                                    </h4>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                      {dropdownItem.description}
                                    </p>
                                    <span className="inline-flex items-center text-sm font-medium text-primary group-hover:text-primary/80 transition-colors">
                                      Explore →
                                    </span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        
                        {/* Footer CTA Section */}
                        <div className="pt-4 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-1">
                                {item.name === 'Merch' && 'Ready to represent S2PGGs?'}
                                {item.name === 'Content' && 'Never miss an update'}
                                {item.name === 'Our Team' && 'Want to join our team?'}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {item.name === 'Merch' && 'Browse our complete collection of premium merchandise'}
                                {item.name === 'Content' && 'Subscribe to stay updated with all our latest content'}
                                {item.name === 'Our Team' && 'Connect with us and explore opportunities'}
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                if (item.name === 'Merch') {
                                  handleNavClick('/shop');
                                } else if (item.name === 'Content') {
                                  handleNavClick('#content');
                                } else if (item.name === 'Our Team') {
                                  window.open('https://discord.gg/Hyu6j4RFrp', '_blank');
                                }
                                setHoveredItem(null);
                              }}
                              className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-all duration-200 font-medium whitespace-nowrap hover:scale-[1.02]"
                            >
                              {item.name === 'Merch' && 'Shop Now'}
                              {item.name === 'Content' && 'View All'}
                              {item.name === 'Our Team' && 'Join Discord'}
                            </button>
                          </div>
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