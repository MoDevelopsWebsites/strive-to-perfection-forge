import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SupportChatbot from './SupportChatbot';

const SupportButton: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* Floating Support Button */}
      <div className="fixed bottom-6 right-6 z-40 group">
        <Button
          onClick={() => setIsChatOpen(true)}
          className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-primary hover:bg-primary/90 relative overflow-hidden"
          size="lg"
        >
          <MessageCircle className="w-5 h-5" />
          
          {/* Subtle indicator dot */}
          <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </Button>
        
        {/* Hover tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-foreground text-background text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Need help? Chat with us!
        </div>
      </div>

      {/* Chatbot Modal */}
      <SupportChatbot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </>
  );
};

export default SupportButton;