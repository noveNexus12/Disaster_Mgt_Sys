import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // adjust if path differs

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    alertType: 'earthquake',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const templateParams = {
      name: formData.name,
      user_email: formData.email, // ✅ Fix this name
      phone: formData.phone,
      organization: formData.organization,
      alert_type: formData.alertType,
      message: formData.message,
      email: formData.email, // optional: if used in `{{email}}` or "Reply To"
      time: new Date().toLocaleString(),
      title: "Alert Request from Contact Form"
};


      await emailjs.send(
        'service_yoggzze',
        'template_lgg6tdr',
        templateParams,
        'jlQpoCUVRZ5CfHBZ-'
      );

      // Save email to Firestore
      await addDoc(collection(db, "subscribers"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone, // ✅ store the phone number
        organization: formData.organization, // optional but useful
        alertType: formData.alertType,
        message: formData.message,
        timestamp: new Date()
    });


      toast({
        title: "Alert Subscription Successful!",
        description: "You've been registered for disaster alerts. We'll notify you of any threats in your area.",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        alertType: 'earthquake',
        message: ''
      });
    } catch (error) {
      console.error('EmailJS error:', error);
      toast({
        title: "Subscription Failed",
        description: "There was an error setting up your alerts. Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Support",
      details: "alerts@disasterguard.ai",
      description: "24/7 Emergency Response"
    },
    {
      icon: Phone,
      title: "Emergency Hotline",
      details: "+1-800-DISASTER",
      description: "Immediate assistance available"
    },
    {
      icon: MapPin,
      title: "Emergency Coordination",
      details: "Global Coverage",
      description: "Monitoring stations worldwide"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get Emergency Alerts
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay protected with real-time disaster alerts. Register to receive immediate notifications about earthquakes, floods, and other natural disasters in your area.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-blue-600" />
                <span>Alert Registration Form</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization</Label>
                    <Input
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      placeholder="Company, School, Government Agency"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alertType">Alert Preferences</Label>
                  <select
                    id="alertType"
                    name="alertType"
                    value={formData.alertType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  >
                    <option value="earthquake">Earthquake Alerts</option>
                    <option value="flood">Flood Warnings</option>
                    <option value="all">All Disaster Types</option>
                    <option value="critical">Critical Alerts Only</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Additional Information</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Specific location, special requirements, or additional context..."
                    rows={4}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Setting Up Alerts..." : "Register for Emergency Alerts"}
                </Button>

                <div className="text-xs text-muted-foreground text-center">
                  By registering, you agree to receive emergency notifications. You can unsubscribe at any time.
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-orange-600 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Emergency Response Center</h3>
              <p className="text-blue-100 mb-6">
                Our 24/7 monitoring center uses advanced AI and sensor networks to detect disasters and send immediate alerts to keep communities safe.
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm text-blue-100">Active Monitoring</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">&lt; 5s</div>
                  <div className="text-sm text-blue-100">Alert Speed</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <Card key={index} className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 dark:bg-blue-900/20 rounded-lg p-3">
                        <info.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{info.title}</h4>
                        <p className="text-blue-600 font-medium">{info.details}</p>
                        <p className="text-sm text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Bell className="h-5 w-5 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Important Notice</h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                    This system provides early warnings but should not replace official emergency services. 
                    In case of immediate danger, contact local emergency services (911 in the US).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
