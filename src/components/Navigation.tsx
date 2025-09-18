import { useState, useEffect } from 'react';
import { Menu, X, Search, User, ShoppingCart, ChevronDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState(0);
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

  const languages = [
    { code: 'EN', name: 'English', flag: '🇺🇸' },
    { code: 'ES', name: 'Español', flag: '🇪🇸' },
    { code: 'FR', name: 'Français', flag: '🇫🇷' },
    { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'IT', name: 'Italiano', flag: '🇮🇹' },
    { code: 'PT', name: 'Português', flag: '🇵🇹' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Here you would implement actual search functionality
      console.log('Searching for:', searchQuery);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleCartClick = () => {
    navigate('/shop');
  };

  return (
    <nav className={`fixed w-full z-30 transition-all duration-300 ${
      isScrolled 
        ? 'top-0 bg-white backdrop-blur-xl shadow-sm' 
        : 'top-8 bg-transparent hover:bg-white hover:backdrop-blur-xl hover:shadow-sm'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Navigation - Left Side */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div 
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="w-12 h-12">
                <img 
                  src="/assets/s2p-logo.png" 
                  alt="Strive 2 Perfection Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Desktop Navigation - Left aligned */}
            <div className="hidden lg:flex items-center space-x-16 ml-12">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-sm font-bold tracking-wide transition-colors duration-200 uppercase ${
                    isScrolled ? 'text-gray-900 hover:text-gray-600' : 'text-gray-900 hover:text-gray-600'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                  isScrolled ? 'text-gray-900 hover:text-gray-600' : 'text-gray-900 hover:text-gray-600'
                }`}>
                  <Globe size={16} />
                  <span>{selectedLanguage}</span>
                  <ChevronDown size={14} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang.code)}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search Button */}
            <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <DialogTrigger asChild>
                <button className={`transition-colors p-2 ${
                  isScrolled ? 'text-gray-900 hover:text-gray-600' : 'text-gray-900 hover:text-gray-600'
                }`}>
                  <Search size={18} />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Search</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSearch} className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Search products, teams, content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsSearchOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Search</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            {/* User Account */}
            <button 
              onClick={() => navigate('/account')}
              className={`transition-colors p-2 ${
                isScrolled ? 'text-gray-900 hover:text-gray-600' : 'text-gray-900 hover:text-gray-600'
              }`}
            >
              <User size={18} />
            </button>

            {/* Shopping Cart */}
            <button 
              onClick={handleCartClick}
              className={`relative transition-colors p-2 ${
                isScrolled ? 'text-gray-900 hover:text-gray-600' : 'text-gray-900 hover:text-gray-600'
              }`}
            >
              <ShoppingCart size={18} />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center space-x-1 text-gray-900 text-sm font-medium w-full justify-start">
                      <Globe size={16} />
                      <span>{selectedLanguage}</span>
                      <ChevronDown size={14} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-40">
                    {languages.map((lang) => (
                      <DropdownMenuItem
                        key={lang.code}
                        onClick={() => setSelectedLanguage(lang.code)}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <div className="flex items-center space-x-4 pt-2">
                  <button onClick={() => setIsSearchOpen(true)}>
                    <Search size={18} className="text-gray-900" />
                  </button>
                  <button onClick={() => navigate('/account')}>
                    <User size={18} className="text-gray-900" />
                  </button>
                  <button onClick={handleCartClick} className="relative">
                    <ShoppingCart size={18} className="text-gray-900" />
                    {cartItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                        {cartItems}
                      </span>
                    )}
                  </button>
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