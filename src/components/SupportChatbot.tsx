import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

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
  const [apiKey, setApiKey] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const predefinedResponses = {
    greeting: [
      "Hi there! Welcome to S2PGGs. I'm Sarah, one of the moderators. How can I help you today?",
      "Hello! Great to see you here. I'm Sarah from the S2PGGs mod team. What can I assist you with?",
    ],
    team: [
      "S2PGGs is a premier Fortnite esports team with incredibly talented players and content creators. We compete at the highest level and create amazing content for our community!",
      "Our team consists of elite Fortnite players who compete professionally and stream regularly. We're always striving for perfection in everything we do!",
    ],
    tournaments: [
      "We participate in various Fortnite tournaments and competitions. For the latest tournament schedule and results, I'd recommend checking our Discord server where we post all updates!",
      "Our team competes in major Fortnite tournaments regularly. For specific tournament information and schedules, our Discord community has all the latest updates!",
    ],
    content: [
      "Our content creators stream regularly and produce high-quality Fortnite content. You can find links to all their channels on our website!",
      "We have amazing streamers who create entertaining and educational Fortnite content. Check out our streamers section to see who's live!",
    ],
    merch: [
      "We have exclusive S2PGGs merchandise available! Check out our merch section on the website to see our latest designs and place orders.",
      "Our merch collection features premium quality items with our team branding. Visit the merch section to browse and purchase!",
    ],
    discord: [
      "For more detailed discussions, community events, and direct interaction with our team and other fans, I highly recommend joining our Discord server! You'll find the link in our contact section.",
      "Our Discord community is the best place to connect with other fans, get real-time updates, and chat with our team members. Join us there for the full S2PGGs experience!",
    ],
  };

  const getKeywords = (text: string): string[] => {
    return text.toLowerCase().split(/\s+/);
  };

  const findBestResponse = (userMessage: string): string => {
    const keywords = getKeywords(userMessage);
    
    if (keywords.some(word => ['hi', 'hello', 'hey', 'greetings'].includes(word))) {
      return predefinedResponses.greeting[Math.floor(Math.random() * predefinedResponses.greeting.length)];
    }
    
    if (keywords.some(word => ['team', 'players', 'roster', 'members'].includes(word))) {
      return predefinedResponses.team[Math.floor(Math.random() * predefinedResponses.team.length)];
    }
    
    if (keywords.some(word => ['tournament', 'competition', 'compete', 'events'].includes(word))) {
      return predefinedResponses.tournaments[Math.floor(Math.random() * predefinedResponses.tournaments.length)];
    }
    
    if (keywords.some(word => ['stream', 'content', 'video', 'youtube', 'twitch'].includes(word))) {
      return predefinedResponses.content[Math.floor(Math.random() * predefinedResponses.content.length)];
    }
    
    if (keywords.some(word => ['merch', 'merchandise', 'shop', 'buy', 'clothing'].includes(word))) {
      return predefinedResponses.merch[Math.floor(Math.random() * predefinedResponses.merch.length)];
    }
    
    if (keywords.some(word => ['discord', 'community', 'chat', 'server'].includes(word))) {
      return predefinedResponses.discord[Math.floor(Math.random() * predefinedResponses.discord.length)];
    }
    
    // Default response for unknown questions
    return "That's a great question! For more detailed information and to get help from our community, I'd recommend joining our Discord server where our team and community members can assist you further. You can find the Discord link in our contact section!";
  };

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    if (!apiKey) {
      return findBestResponse(userMessage);
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `You are Sarah, a professional and friendly moderator for S2PGGs, a premier Fortnite esports team. You should:
              - Be helpful, professional, and personable
              - Answer questions about the team, tournaments, content creators, and merchandise
              - For complex or specific questions you can't answer, politely redirect users to join the Discord server
              - Keep responses concise but informative
              - Always maintain a friendly, moderator-like tone
              - Never break character - you are a real person, not an AI`
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          max_tokens: 150,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error('AI service unavailable');
      }

      const data = await response.json();
      return data.choices[0].message.content || findBestResponse(userMessage);
    } catch (error) {
      console.error('AI API Error:', error);
      return findBestResponse(userMessage);
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
    <div className="fixed inset-0 bg-black/50 flex items-end justify-end p-4 z-50 md:items-center md:justify-center">
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

        {/* API Key Input (if not set) */}
        {!apiKey && (
          <div className="p-4 bg-muted/50 border-b border-border">
            <p className="text-sm text-muted-foreground mb-2">
              Optional: Add OpenAI API key for enhanced AI responses
            </p>
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="text-xs"
              />
              <Button
                size="sm"
                onClick={() => toast.success('API key saved!')}
                disabled={!apiKey}
              >
                Save
              </Button>
            </div>
          </div>
        )}

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