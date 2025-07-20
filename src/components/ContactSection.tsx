import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Users, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { name, email, subject, message } = formData;
    
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name",
        variant: "destructive"
      });
      return false;
    }
    
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Valid email required",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return false;
    }
    
    if (!subject.trim()) {
      toast({
        title: "Subject required",
        description: "Please enter a subject",
        variant: "destructive"
      });
      return false;
    }
    
    if (!message.trim() || message.trim().length < 10) {
      toast({
        title: "Message too short",
        description: "Please enter a message with at least 10 characters",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For now, create a mailto link as fallback
      const mailtoLink = `mailto:contact@strive2perfection.org?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      
      window.open(mailtoLink);
      
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      {/* Floating background elements matching hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/2 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-green-500/2 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-6xl font-gaming font-bold text-primary glow-text mb-6">
            GET IN TOUCH
          </h2>
          <p className="text-xl text-muted-foreground font-display max-w-3xl mx-auto">
            Ready to join the S2PGGs family or have questions? We'd love to hear from you. 
            Reach out and let's create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-card/30 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300">
            <CardContent className="p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">Send us a Message</h3>
                <p className="text-muted-foreground">Fill out the form below and we'll get back to you shortly.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-foreground font-medium">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-background/50 border-muted-foreground/20 focus:border-primary"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground font-medium">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-background/50 border-muted-foreground/20 focus:border-primary"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-foreground font-medium">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="bg-background/50 border-muted-foreground/20 focus:border-primary"
                    placeholder="What's this about?"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-foreground font-medium">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-background/50 border-muted-foreground/20 focus:border-primary min-h-[120px]"
                    placeholder="Tell us more about your inquiry..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg shadow-primary/25 transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>

                {isSuccess && (
                  <div className="flex items-center gap-2 text-green-500 bg-green-500/10 p-3 rounded-lg">
                    <CheckCircle className="w-5 h-5" />
                    <span>Message sent successfully!</span>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Contact Info & Discord */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card className="bg-card/30 backdrop-blur-sm border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <p className="text-muted-foreground">contact@strive2perfection.org</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Location</p>
                      <p className="text-muted-foreground">United Kingdom</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Discord Community */}
            <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-2">Join Our Discord</h3>
                  <p className="text-muted-foreground mb-6">
                    Connect with our community, get updates, and chat with fellow gamers in real-time.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                        • 1,500+ Members
                      </Badge>
                      <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">
                        • Active Community
                      </Badge>
                    </div>
                    
                    <Button
                      onClick={() => window.open('https://discord.gg/Hyu6j4RFrp', '_blank')}
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg shadow-purple-500/25"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Join Discord Server
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card className="bg-card/30 backdrop-blur-sm border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Quick Response</p>
                    <p className="text-sm text-muted-foreground">We typically respond within 24 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;