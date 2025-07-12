
import { Card, CardContent } from "@/components/ui/card";

const TechStack = () => {
  const technologies = [
    {
      category: "IoT & Sensors",
      items: [
        { name: "Seismic Sensors", description: "Accelerometers & Vibration detectors" },
        { name: "Water-level Sensors", description: "Ultrasonic & Pressure sensors" },
        { name: "Microcontrollers", description: "Arduino, ESP32, Raspberry Pi" }
      ],
      color: "border-blue-200 bg-blue-50 dark:bg-blue-900/10"
    },
    {
      category: "Data Communication",
      items: [
        { name: "MQTT Protocol", description: "Real-time sensor data streaming" },
        { name: "REST APIs", description: "HTTP-based data transmission" },
        { name: "WebSocket", description: "Live dashboard updates" }
      ],
      color: "border-green-200 bg-green-50 dark:bg-green-900/10"
    },
    {
      category: "Backend & Cloud",
      items: [
        { name: "Firebase", description: "Real-time database & hosting" },
        { name: "Node.js", description: "Server-side processing" },
        { name: "Python Flask", description: "ML model API endpoints" }
      ],
      color: "border-purple-200 bg-purple-50 dark:bg-purple-900/10"
    },
    {
      category: "AI & Machine Learning",
      items: [
        { name: "TensorFlow", description: "Deep learning models" },
        { name: "Anomaly Detection", description: "Pattern recognition algorithms" },
        { name: "Time Series Analysis", description: "Predictive modeling" }
      ],
      color: "border-orange-200 bg-orange-50 dark:bg-orange-900/10"
    },
    {
      category: "Alert Systems",
      items: [
        { name: "EmailJS", description: "Email notifications (Configured)" },
        { name: "Twilio/AWS SNS", description: "SMS alerts (Placeholder)" },
        { name: "FCM", description: "Push notifications (Optional)" }
      ],
      color: "border-red-200 bg-red-50 dark:bg-red-900/10"
    },
    {
      category: "Frontend & Visualization",
      items: [
        { name: "React.js", description: "Modern web interface" },
        { name: "Recharts", description: "Data visualization library" },
        { name: "Shadcn/UI", description: "Professional UI components" }
      ],
      color: "border-indigo-200 bg-indigo-50 dark:bg-indigo-900/10"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Technology Stack
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built with cutting-edge technologies to ensure reliability, scalability, and real-time performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <Card key={index} className={`${tech.color} border-2 hover:shadow-lg transition-shadow`}>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">{tech.category}</h3>
                <div className="space-y-3">
                  {tech.items.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h4 className="font-semibold text-foreground text-sm">{item.name}</h4>
                      <p className="text-muted-foreground text-xs">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">Cloud-First</div>
              <div className="text-blue-100">Scalable architecture designed for high availability and performance</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">Real-Time</div>
              <div className="text-blue-100">Live data processing and visualization with minimal latency</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">AI-Powered</div>
              <div className="text-blue-100">Advanced machine learning for accurate disaster prediction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
