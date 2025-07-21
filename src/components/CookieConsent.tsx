import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Cookie } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Show banner after a short delay
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
  };

  const handlePreferences = () => {
    // For now, just accept - could be expanded later
    localStorage.setItem('cookieConsent', 'preferences');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-in-right">
      <Card className="max-w-5xl mx-auto bg-card/95 backdrop-blur-xl border border-primary/20 shadow-2xl shadow-primary/10">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            {/* Cookie Icon */}
            <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <Cookie className="w-6 h-6 text-primary" />
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <p className="text-foreground font-medium mb-2">
                    This website uses cookies to ensure you get the best experience on our website.{' '}
                    <button 
                      className="text-primary hover:text-primary/80 underline transition-colors"
                      onClick={() => navigate('/privacy')}
                    >
                      Privacy Policy
                    </button>
                  </p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreferences}
                    className="border-muted-foreground/30 text-muted-foreground hover:bg-muted-foreground/10"
                  >
                    Preferences
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReject}
                    className="border-muted-foreground/30 text-muted-foreground hover:bg-muted-foreground/10"
                  >
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleAccept}
                    className="bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    Accept
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Close Button */}
            <button
              onClick={handleReject}
              className="flex-shrink-0 p-2 hover:bg-muted-foreground/10 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieConsent;