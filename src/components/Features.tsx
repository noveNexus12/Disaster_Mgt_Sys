
import { Shield, Zap, Globe, Smartphone, TrendingUp, Cog, Monitor, Wifi } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: Monitor,
      title: "Live Sensor Data Monitoring",
      description: "Real-time visualization of sensor readings from seismic and water-level monitoring stations.",
      color: "text-blue-600"
    },
    {
      icon: Shield,
      title: "AI-Based Early Warning System",
      description: "Advanced machine learning algorithms detect patterns and provide early disaster warnings.",
      color: "text-orange-600"
    },
    {
      icon: Zap,
      title: "Real-Time Alerts",
      description: "Instant notifications via SMS, email, and push notifications when threats are detected.",
      color: "text-green-600"
    },
    {
      icon: TrendingUp,
      title: "Power BI-Style Dashboard",
      description: "Interactive, dynamic dashboard with charts, graphs, and real-time data visualization.",
      color: "text-purple-600"
    },
    {
      icon: Globe,
      title: "Historical Trend Analytics",
      description: "Comprehensive analysis of historical data to identify patterns and improve predictions.",
      color: "text-red-600"
    },
    {
      icon: Cog,
      title: "Scalable Cloud Architecture",
      description: "Cloud-first design ensuring system reliability, scalability, and 99.9% uptime.",
      color: "text-indigo-600"
    },
    {
      icon: Smartphone,
      title: "Mobile-Friendly Design",
      description: "Responsive interface accessible on all devices for emergency management on-the-go.",
      color: "text-pink-600"
    },
    {
      icon: Wifi,
      title: "Simulation Mode",
      description: "Demo and testing capabilities with simulated disaster scenarios for training purposes.",
      color: "text-teal-600"
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Key Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive disaster detection and management capabilities powered by advanced technology and AI-driven insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-background"
            >
              <CardContent className="p-6">
                <feature.icon className={`h-12 w-12 ${feature.color} mb-4`} />
                <h3 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-orange-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Protect Your Community?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of communities already using our disaster detection system to stay safe and prepared.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started Today
            </button>
            <button 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Live Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
