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
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Removed exposed API key for security

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
      "Hey! Welcome to the S2PGGs community! I'm Sarah, and I'm here to help with any questions you have.",
      "Hi! Thanks for visiting S2PGGs. I'm Sarah, a team moderator. What would you like to know about us?",
    ],
    team: [
      "S2PGGs (Strive 2 Perfection Gaming Guild) is a premier Fortnite esports team with incredibly talented competitive players and content creators. We compete at the highest level in tournaments and championships!",
      "Our team consists of elite Fortnite professionals who compete in major tournaments and create amazing content. Each member brings unique skills and personality to our community!",
      "We're passionate about competitive Fortnite and building a strong community. Our players are dedicated to perfecting their craft and entertaining our fans!",
      "S2PGGs represents the best in competitive gaming - from our tournament performances to our engaging content creators, we're all about excellence!",
    ],
    tournaments: [
      "We actively participate in FNCS, Cash Cups, and various major Fortnite tournaments. Our players compete for prize pools and championship titles regularly!",
      "Our competitive roster competes in tournaments weekly! For live updates on matches, results, and upcoming events, join our Discord where we post everything in real-time.",
      "Tournament season is always exciting for us! We compete in both solo and team events. Check our Discord for the latest match schedules and results!",
      "From FNCS to community tournaments, we're always competing. Our players have achieved great placements in major events - follow our socials for updates!",
    ],
    content: [
      "Our content creators stream daily on Twitch and upload highlights to YouTube. You'll find educational gameplay, entertaining commentary, and community interactions!",
      "We have talented streamers who create both educational and entertaining Fortnite content. From pro gameplay analysis to fun community games, there's something for everyone!",
      "Check out our content section to see who's live right now! Our streamers offer everything from competitive gameplay to chill community sessions.",
      "Our creators produce high-quality content including tutorials, tournament highlights, and interactive streams. Each has their unique style and community!",
    ],
    merch: [
      "Our exclusive S2PGGs merchandise features premium quality designs that represent our team's commitment to excellence. From apparel to accessories, show your support in style!",
      "We offer a variety of team gear including t-shirts, hoodies, and gaming accessories. All designed with our signature S2PGGs branding and made with quality materials!",
      "Support the team with our official merch! We have comfortable gaming apparel and stylish accessories. Perfect for representing S2PGGs at tournaments or daily gaming!",
      "Our merchandise collection is designed by and for gamers. Quality materials, comfortable fits, and designs that show your S2PGGs pride!",
    ],
    discord: [
      "Our Discord is the heart of our community! Join for live tournament updates, direct chat with players, community events, and exclusive behind-the-scenes content.",
      "Discord is where the real S2PGGs community lives! Chat with team members, get tournament notifications, participate in community games, and make new gaming friends!",
      "For the full S2PGGs experience, join our Discord! It's where we announce everything first - tournaments, streams, community events, and more!",
      "Our Discord community is amazing - active discussions, player interactions, tournament watch parties, and so much more. You'll love being part of it!",
    ],
    gameplay: [
      "Looking for gameplay tips? Our players regularly share strategies and techniques. Check out their streams for live coaching and educational content!",
      "Our team members are always happy to share Fortnite strategies! Join our Discord for gameplay discussions and tips from competitive players.",
      "For Fortnite advice, our streamers often do educational content during their streams. They cover everything from building techniques to game sense!",
    ],
    schedule: [
      "Stream schedules vary by creator, but someone's usually live! Check our streamers section to see who's currently broadcasting.",
      "Our streamers have different schedules throughout the week. The best way to stay updated is through our Discord notifications!",
      "For the most current streaming schedule, check our website's streamers section or join our Discord for real-time notifications!",
    ],
    support: [
      "I'm here to help with any questions about S2PGGs! Whether it's about our team, tournaments, content, or community - just ask!",
      "Need specific help? I can answer questions about our team, streamers, tournaments, and community. For technical issues, our Discord community can help too!",
      "Feel free to ask me anything about S2PGGs! From general info to specific questions about our players or events - I'm here to help!",
    ],
  };

  const getKeywords = (text: string): string[] => {
    return text.toLowerCase().split(/\s+/);
  };

  const findBestResponse = (userMessage: string): string => {
    const keywords = getKeywords(userMessage);
    const message = userMessage.toLowerCase();
    
    // Greeting patterns
    if (keywords.some(word => ['hi', 'hello', 'hey', 'greetings', 'sup', 'yo'].includes(word))) {
      return predefinedResponses.greeting[Math.floor(Math.random() * predefinedResponses.greeting.length)];
    }
    
    // Team and player questions
    if (keywords.some(word => ['team', 'players', 'roster', 'members', 'who', 'about'].includes(word))) {
      return predefinedResponses.team[Math.floor(Math.random() * predefinedResponses.team.length)];
    }
    
    // Tournament and competitive questions
    if (keywords.some(word => ['tournament', 'competition', 'compete', 'events', 'fncs', 'cash', 'cup', 'champion'].includes(word))) {
      return predefinedResponses.tournaments[Math.floor(Math.random() * predefinedResponses.tournaments.length)];
    }
    
    // Content and streaming questions
    if (keywords.some(word => ['stream', 'content', 'video', 'youtube', 'twitch', 'live', 'watch', 'broadcast'].includes(word))) {
      return predefinedResponses.content[Math.floor(Math.random() * predefinedResponses.content.length)];
    }
    
    // Merchandise questions
    if (keywords.some(word => ['merch', 'merchandise', 'shop', 'buy', 'clothing', 'shirt', 'hoodie', 'gear'].includes(word))) {
      return predefinedResponses.merch[Math.floor(Math.random() * predefinedResponses.merch.length)];
    }
    
    // Discord and community questions
    if (keywords.some(word => ['discord', 'community', 'chat', 'server', 'join'].includes(word))) {
      return predefinedResponses.discord[Math.floor(Math.random() * predefinedResponses.discord.length)];
    }
    
    // Gameplay and strategy questions
    if (keywords.some(word => ['tips', 'strategy', 'gameplay', 'help', 'improve', 'build', 'advice', 'guide'].includes(word))) {
      return predefinedResponses.gameplay[Math.floor(Math.random() * predefinedResponses.gameplay.length)];
    }
    
    // Schedule questions
    if (keywords.some(word => ['schedule', 'when', 'time', 'live', 'streaming', 'online'].includes(word))) {
      return predefinedResponses.schedule[Math.floor(Math.random() * predefinedResponses.schedule.length)];
    }
    
    // Support and help questions
    if (keywords.some(word => ['help', 'support', 'question', 'info', 'information'].includes(word))) {
      return predefinedResponses.support[Math.floor(Math.random() * predefinedResponses.support.length)];
    }
    
    // More specific pattern matching
    if (message.includes('what is') || message.includes('what are')) {
      return predefinedResponses.team[Math.floor(Math.random() * predefinedResponses.team.length)];
    }
    
    if (message.includes('how to') || message.includes('how can')) {
      return predefinedResponses.support[Math.floor(Math.random() * predefinedResponses.support.length)];
    }
    
    // Default responses - more variety
    const defaultResponses = [
      "That's an interesting question! For detailed information, our Discord community is the best place to get comprehensive answers from our team and fellow fans.",
      "Great question! I'd recommend joining our Discord server where you can get more specific help from our community and team members.",
      "I want to make sure you get the best answer! Our Discord community has lots of knowledgeable members who can help with more specific questions.",
      "For the most up-to-date and detailed information, our Discord server is your best resource. Our community and team members are very active there!",
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // For security, we use local responses instead of external API calls
    // This provides consistent, helpful responses while keeping the app secure
    return findBestResponse(userMessage);
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