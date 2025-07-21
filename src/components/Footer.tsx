import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Youtube, Twitch, Users, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigationLinks = [
    { name: 'Home', action: () => scrollToSection('hero') },
    { name: 'Team', action: () => scrollToSection('team') },
    { name: 'Streamers', action: () => scrollToSection('streamers') },
    { name: 'Content', action: () => scrollToSection('content') },
    { name: 'Merch', action: () => scrollToSection('merch') },
    { name: 'Contact', action: () => scrollToSection('contact') },
  ];

  const socialLinks = [
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://youtube.com/@s2pggs',
      color: 'hover:text-red-500'
    },
    {
      name: 'Twitch',
      icon: Twitch,
      url: 'https://twitch.tv/s2pggs',
      color: 'hover:text-purple-500'
    },
    {
      name: 'Discord',
      icon: Users,
      url: 'https://discord.gg/Hyu6j4RFrp',
      color: 'hover:text-blue-500'
    }
  ];

  const legalLinks = [
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
  ];

  const contactInfo = [
    {
      icon: Mail,
      text: 'contact@s2pggs.com',
      action: () => window.open('mailto:contact@s2pggs.com')
    },
    {
      icon: MapPin,
      text: 'United Kingdom',
      action: null
    }
  ];

  return (
    <footer className="relative bg-background/95 backdrop-blur-xl border-t border-primary/10">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 left-1/4 w-64 h-64 bg-primary/2 rounded-full blur-3xl"></div>
        <div className="absolute -top-32 right-1/4 w-64 h-64 bg-secondary/2 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-primary p-0.5 purple-glow">
                  <img 
                    src="/lovable-uploads/6af2116b-6281-4072-b96b-cec7ad59b43a.png" 
                    alt="S2PGGs Logo" 
                    className="w-full h-full object-cover rounded-full bg-background"
                  />
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-bold text-primary">S2PGGs</h3>
                  <p className="text-xs lg:text-sm text-muted-foreground">Strive 2 Perfection</p>
                </div>
              </div>
              <p className="text-muted-foreground text-xs lg:text-sm leading-relaxed mb-4 lg:mb-6">
                Premier Fortnite esports team and content creators dedicated to excellence, 
                community building, and the relentless pursuit of perfection.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Button
                      key={social.name}
                      variant="ghost"
                      size="sm"
                      className={`text-muted-foreground transition-colors duration-300 ${social.color}`}
                      onClick={() => window.open(social.url, '_blank')}
                    >
                      <Icon className="w-5 h-5" />
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <h4 className="text-base lg:text-lg font-semibold text-foreground mb-4 lg:mb-6">Navigation</h4>
              <ul className="space-y-2 lg:space-y-3">
                {navigationLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={link.action}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 text-xs lg:text-sm"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal & Support */}
            <div>
              <h4 className="text-base lg:text-lg font-semibold text-foreground mb-4 lg:mb-6">Legal & Support</h4>
              <ul className="space-y-2 lg:space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 text-xs lg:text-sm flex items-center gap-1"
                    >
                      {link.name}
                      <ExternalLink className="w-2 h-2 lg:w-3 lg:h-3" />
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-xs lg:text-sm"
                  >
                    Contact Support
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="text-base lg:text-lg font-semibold text-foreground mb-4 lg:mb-6">Contact</h4>
              <ul className="space-y-2 lg:space-y-3">
                {contactInfo.map((contact, index) => {
                  const Icon = contact.icon;
                  return (
                    <li key={index}>
                      <div 
                        className={`flex items-center gap-2 lg:gap-3 text-xs lg:text-sm text-muted-foreground ${
                          contact.action ? 'cursor-pointer hover:text-primary transition-colors duration-300' : ''
                        }`}
                        onClick={contact.action || undefined}
                      >
                        <Icon className="w-3 h-3 lg:w-4 lg:h-4" />
                        <span>{contact.text}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
              
              {/* Partnership Inquiry */}
              <div className="mt-4 lg:mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300 text-xs lg:text-sm w-full sm:w-auto"
                  onClick={() => window.open('mailto:partnerships@s2pggs.com')}
                >
                  <Mail className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                  Partnership Inquiries
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="border-primary/10" />

        {/* Footer Bottom */}
        <div className="py-4 lg:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 lg:gap-4">
            <div className="text-xs lg:text-sm text-muted-foreground">
              © {currentYear} S2PGGs Holdings Ltd. All Rights Reserved.
            </div>
            
            <div className="flex items-center gap-4 lg:gap-6 text-xs text-muted-foreground">
              <span>Made with ❤️ for the gaming community</span>
              <span>United Kingdom 🇬🇧</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;