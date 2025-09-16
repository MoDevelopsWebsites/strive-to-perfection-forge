import { useState, useEffect } from 'react';
import { Menu, X, Home, Users, Video, MessageSquare, ChevronDown, ShoppingBag, Shirt, Package, Sticker, BookOpen, PlayCircle, FileText, Heart, Briefcase, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
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
      navigate(href);
      setIsMenuOpen(false);
    } else if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/' + href);
      } else {
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
    { name: 'Home', href: '/', icon: Home },
    { 
      name: 'Team', 
      href: '#team', 
      icon: Users,
      dropdown: [
        { name: 'Leadership', href: '#team', description: 'Meet our core team' },
        { name: 'Community', href: '#contact', description: 'Join our community' },
      ]
    },
    { 
      name: 'Content', 
      href: '#content', 
      icon: Video,
      dropdown: [
        { name: 'Latest Videos', href: '#content', description: 'Watch our highlights' },
        { name: 'Live Streams', href: '#streamers', description: 'Live gaming sessions' },
      ]
    },
    { 
      name: 'Merch', 
      href: '#merch', 
      icon: ShoppingBag,
      dropdown: [
        { name: 'T-Shirts', href: '/shop?category=tshirts', description: 'Premium S2P apparel' },
        { name: 'Hoodies', href: '/shop?category=hoodies', description: 'Cozy gaming gear' },
        { name: 'Accessories', href: '/shop?category=accessories', description: 'Complete your setup' },
      ]
    },
    { name: 'Shop', href: '/shop', icon: Target },
    { name: 'Contact', href: '#contact', icon: MessageSquare },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-primary p-0.5 shadow-lg group-hover:shadow-xl transition-all duration-300">
              <img 
                src="/lovable-uploads/6af2116b-6281-4072-b96b-cec7ad59b43a.png" 
                alt="S2PGGs Logo" 
                className="w-full h-full object-cover rounded-full bg-white"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors">
                S2PGGs
              </h1>
              <p className="text-xs text-gray-500 -mt-0.5">
                Strive 2 Perfection
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => {
              const hasDropdown = item.dropdown && item.dropdown.length > 0;
              
              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => hasDropdown && setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button
                    onClick={() => !hasDropdown && handleNavClick(item.href)}
                    className="flex items-center space-x-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 text-gray-700 hover:text-gray-900 hover:bg-gray-100/80"
                  >
                    <span>{item.name}</span>
                    {hasDropdown && (
                      <ChevronDown 
                        size={14} 
                        className={`transition-transform duration-200 ${
                          hoveredItem === item.name ? 'rotate-180' : ''
                        }`} 
                      />
                    )}
                  </button>
                  
                  {/* Minimalist Dropdown */}
                  {hasDropdown && hoveredItem === item.name && (
                    <div 
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white/95 backdrop-blur-xl border border-gray-200/60 rounded-2xl shadow-xl z-50 overflow-hidden animate-fade-in min-w-[280px]"
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div className="p-6">
                        <div className="space-y-1">
                          {item.dropdown.map((dropdownItem) => (
                            <button
                              key={dropdownItem.name}
                              onClick={() => {
                                handleNavClick(dropdownItem.href);
                                setHoveredItem(null);
                              }}
                              className="group w-full text-left p-3 rounded-xl hover:bg-gray-50 transition-all duration-200"
                            >
                              <div className="font-semibold text-gray-900 group-hover:text-primary transition-colors mb-1">
                                {dropdownItem.name}
                              </div>
                              <div className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                                {dropdownItem.description}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              variant="ghost"
              size="sm"
              className="rounded-full px-4 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              Login
            </Button>
            <Button 
              className="rounded-full px-6 bg-gray-900 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.open('https://discord.gg/Hyu6j4RFrp', '_blank')}
            >
              Join S2PGGs
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-full text-gray-700 hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden animate-fade-in">
            <div className="px-4 py-6 bg-white/95 backdrop-blur-xl rounded-2xl border border-gray-200/50 mt-4 shadow-xl mb-4">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const hasDropdown = item.dropdown && item.dropdown.length > 0;
                  
                  return (
                    <div key={item.name} className="space-y-1">
                      <button
                        onClick={() => !hasDropdown && handleNavClick(item.href)}
                        className="flex items-center justify-between w-full px-4 py-3 rounded-xl hover:bg-gray-50 transition-all duration-200 text-left"
                      >
                        <span className="font-medium text-gray-900">{item.name}</span>
                        {hasDropdown && (
                          <ChevronDown size={16} className="text-gray-400" />
                        )}
                      </button>
                      
                      {hasDropdown && (
                        <div className="ml-4 space-y-1">
                          {item.dropdown.map((dropdownItem) => (
                            <button
                              key={dropdownItem.name}
                              onClick={() => handleNavClick(dropdownItem.href)}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
                            >
                              {dropdownItem.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="pt-4 mt-6 border-t border-gray-200 space-y-2">
                <Button 
                  variant="ghost"
                  className="w-full justify-start rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  Login
                </Button>
                <Button 
                  className="w-full rounded-xl bg-gray-900 hover:bg-gray-800 text-white"
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