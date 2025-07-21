import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Scale, Shield, FileText, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Terms = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-primary/20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Scale className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold text-primary">Terms of Service</h1>
            </div>
            <p className="text-muted-foreground">
              Last updated: January 2025
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="border-primary/20">
            <CardContent className="p-8 space-y-8">
              
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Agreement to Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to S2PGGs ("we," "us," or "our"). These Terms of Service ("Terms") govern your use of our website, 
                  services, and any related content provided by S2PGGs Holding GmbH. By accessing or using our services, 
                  you agree to be bound by these Terms.
                </p>
              </section>

              {/* Use of Services */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Use of Our Services</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Our services include but are not limited to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Esports team information and content</li>
                    <li>Live streaming and video content</li>
                    <li>Merchandise sales</li>
                    <li>Community features and interactions</li>
                  </ul>
                </div>
              </section>

              {/* User Conduct */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">User Conduct</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  When using our services, you agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Respect other users and community members</li>
                  <li>Not engage in harassment, spam, or abusive behavior</li>
                  <li>Not attempt to interfere with our services or security</li>
                  <li>Not infringe on intellectual property rights</li>
                </ul>
              </section>

              {/* Intellectual Property */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content, trademarks, logos, and intellectual property on our website and services are owned by 
                  S2PGGs Holding GmbH or our licensors. You may not use, reproduce, or distribute our content without 
                  explicit written permission.
                </p>
              </section>

              {/* Disclaimers */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Disclaimers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are provided "as is" without any warranties. We do not guarantee uninterrupted access, 
                  accuracy of content, or that our services will meet your specific requirements. Use of our services 
                  is at your own risk.
                </p>
              </section>

              {/* Limitation of Liability */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To the maximum extent permitted by law, S2PGGs Holding GmbH shall not be liable for any indirect, 
                  incidental, special, or consequential damages arising from your use of our services.
                </p>
              </section>

              {/* Governing Law */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms are governed by and construed in accordance with the laws of Germany. Any disputes 
                  shall be resolved in the competent courts of Germany.
                </p>
              </section>

              {/* Contact */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-foreground font-medium">S2PGGs Holding GmbH</p>
                  <p className="text-muted-foreground">Email: legal@s2pggs.com</p>
                  <p className="text-muted-foreground">Location: Germany</p>
                </div>
              </section>

            </CardContent>
          </Card>

          {/* Back to Top */}
          <div className="text-center mt-8">
            <Button onClick={scrollToTop} variant="outline">
              Back to Top
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;