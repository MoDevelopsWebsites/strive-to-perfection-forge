import { useState, useEffect } from 'react';
import { Menu, X, Search, User, ShoppingCart, ChevronDown } from 'lucide-react';
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
    { name: 'SHOP', href: '/shop' },
    { name: 'TEAMS', href: '#team' },
    { name: 'S2P.HIVE', href: '#content' },
    { name: 'PARTNERS', href: '#contact' },
    { name: 'ABOUT', href: '#team' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm' 
        : 'bg-white/80 backdrop-blur-sm border-b border-gray-200/30'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8">
              <img 
                src="/lovable-uploads/6af2116b-6281-4072-b96b-cec7ad59b43a.png" 
                alt="S2PGGs Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-900 text-sm font-medium tracking-wide hover:text-primary transition-colors duration-200 uppercase"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-900 text-sm font-medium hover:text-primary transition-colors">
              <span>ENGLISH</span>
              <ChevronDown size={14} />
            </button>
            <button className="text-gray-900 hover:text-primary transition-colors p-2">
              <Search size={18} />
            </button>
            <button className="text-gray-900 hover:text-primary transition-colors p-2">
              <User size={18} />
            </button>
            <button className="text-gray-900 hover:text-primary transition-colors p-2">
              <ShoppingCart size={18} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-900 p-2"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200 py-4">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className="block w-full text-left px-4 py-3 text-gray-900 hover:text-primary transition-colors text-sm font-medium tracking-wide uppercase"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              
              <div className="pt-4 mt-4 border-t border-gray-200 px-4 space-y-2">
                <button className="flex items-center space-x-1 text-gray-900 text-sm font-medium">
                  <span>ENGLISH</span>
                  <ChevronDown size={14} />
                </button>
                <div className="flex items-center space-x-4 pt-2">
                  <Search size={18} className="text-gray-900" />
                  <User size={18} className="text-gray-900" />
                  <ShoppingCart size={18} className="text-gray-900" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;