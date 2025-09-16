import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface SupportChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const SupportChatbot: React.FC<SupportChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Sarah, a moderator from S2PGGs. How can I assist you today? I'm here to help with questions about our team, tournaments, content, and more!",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Removed exposed API key for security
  // Now using AI-powered responses via Supabase Edge Function

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // Remove the predefined responses as we now use AI
  // Keeping this structure for potential fallbacks

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { message: userMessage }
      });

      if (error) {
        console.error('Supabase function error:', error);
        return "I'm having some trouble right now, but I'm here to help! For immediate assistance, please join our Discord community where the team can help you out. 🎮";
      }

      if (data?.response) {
        return data.response;
      }

      // Fallback if no response
      return "Thanks for reaching out! For the best help, I'd recommend joining our Discord community where you can chat with the team and other players directly. 🎮";
      
    } catch (error) {
      console.error('Error calling AI chat:', error);
      return "I'm experiencing some technical difficulties right now. Please try again in a moment, or join our Discord for immediate help! 🎮";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const botResponse = await generateAIResponse(inputValue);
      
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          isBot: true,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000 + Math.random() * 1000); // Simulate typing delay
    } catch (error) {
      setIsTyping(false);
      toast.error('Sorry, I encountered an error. Please try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-end p-4 z-50">
      <div className="bg-background border border-border rounded-lg shadow-xl w-full max-w-md h-[600px] flex flex-col animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-primary/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">S2PGGs Support</h3>
              <p className="text-sm text-muted-foreground">Sarah - Moderator</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isBot
                      ? 'bg-muted text-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground rounded-lg p-3 max-w-[80%]">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-75"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Discord Link */}
        <div className="px-4 py-2 border-t border-border bg-muted/30">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <a href="#contact" onClick={onClose}>
              <ExternalLink className="w-3 h-3 mr-2" />
              Join our Discord Community
            </a>
          </Button>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={isTyping}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              size="sm"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportChatbot;