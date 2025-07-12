
import { Waves, Activity, Smartphone, Database } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const features = [
    {
      icon: Activity,
      title: "Seismic Monitoring",
      description: "Advanced vibration sensors detect earthquake precursors and ground motion patterns in real-time."
    },
    {
      icon: Waves,
      title: "Flood Detection",
      description: "Water-level sensors and rainfall monitoring provide early flood warnings for vulnerable areas."
    },
    {
      icon: Smartphone,
      title: "Instant Alerts",
      description: "Multi-channel notification system delivers warnings via SMS, email, and push notifications."
    },
    {
      icon: Database,
      title: "AI Analysis",
      description: "Machine learning algorithms analyze sensor data patterns to predict disaster risks with high accuracy."
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            About the Project
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive disaster detection system combines cutting-edge IoT sensor networks with artificial intelligence to provide life-saving early warnings for natural calamities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-muted rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                How Our System Works
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Data Collection</h4>
                    <p className="text-muted-foreground">Sensor nodes collect vibration and water-level data via MQTT or REST protocols.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-foreground">AI Analysis</h4>
                    <p className="text-muted-foreground">Machine learning models analyze patterns and detect anomalies indicating disaster risks.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Alert System</h4>
                    <p className="text-muted-foreground">Automated notifications sent through email, SMS, and push notifications to warn communities.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-orange-100 dark:from-blue-900/20 dark:to-orange-900/20 rounded-xl p-8 text-center">
              <div className="text-4xl md:text-6xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-lg font-semibold text-foreground mb-2">Prediction Accuracy</div>
              <p className="text-muted-foreground">Our AI models achieve exceptional accuracy in predicting natural disasters, giving communities crucial time to prepare and evacuate.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
