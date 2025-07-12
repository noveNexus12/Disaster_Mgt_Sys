
import { Activity, Wifi, Cloud, Brain, Bell, Monitor } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Architecture = () => {
  const components = [
    {
      icon: Activity,
      title: "Sensor Network",
      description: "Seismic & Water-level Sensors",
      color: "bg-blue-600",
      position: "sensors"
    },
    {
      icon: Wifi,
      title: "Data Transmission",
      description: "MQTT / REST APIs",
      color: "bg-green-600",
      position: "transmission"
    },
    {
      icon: Cloud,
      title: "Cloud Platform",
      description: "Firebase / AWS",
      color: "bg-purple-600",
      position: "cloud"
    },
    {
      icon: Brain,
      title: "AI/ML Engine",
      description: "Anomaly Detection",
      color: "bg-orange-600",
      position: "ai"
    },
    {
      icon: Bell,
      title: "Alert System",
      description: "SMS, Email, Push",
      color: "bg-red-600",
      position: "alerts"
    },
    {
      icon: Monitor,
      title: "Dashboard",
      description: "Real-time Visualization",
      color: "bg-indigo-600",
      position: "dashboard"
    }
  ];

  return (
    <section id="architecture" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            System Architecture
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive overview of our disaster detection system's architecture and data flow.
          </p>
        </div>

        {/* Architecture Flow Diagram */}
        <div className="mb-16">
          <div className="relative">
            {/* Desktop Flow */}
            <div className="hidden lg:flex items-center justify-between mb-8">
              {components.map((component, index) => (
                <div key={index} className="flex flex-col items-center">
                  <Card className="w-32 h-32 flex items-center justify-center border-2 hover:shadow-lg transition-shadow">
                    <CardContent className="p-4 text-center">
                      <div className={`${component.color} rounded-full p-3 mb-2 mx-auto w-fit`}>
                        <component.icon className="h-6 w-6 text-white" />
                      </div>
                    </CardContent>
                  </Card>
                  <h4 className="font-semibold text-sm mt-2 text-center">{component.title}</h4>
                  <p className="text-xs text-muted-foreground text-center">{component.description}</p>
                  {index < components.length - 1 && (
                    <div className="absolute top-16 w-8 h-0.5 bg-gray-300" style={{ left: `${(index + 1) * 16.66}%` }}></div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile/Tablet Flow */}
            <div className="lg:hidden grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {components.map((component, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className={`${component.color} rounded-full p-3 mb-3 mx-auto w-fit`}>
                      <component.icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{component.title}</h4>
                    <p className="text-xs text-muted-foreground">{component.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Architecture Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-muted rounded-xl p-8">
            <h3 className="text-xl font-bold text-foreground mb-4">Data Collection Layer</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Activity className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground">Seismic Sensors</h4>
                  <p className="text-sm text-muted-foreground">Accelerometers and vibration sensors detect ground motion and seismic activity.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Activity className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground">Water-level Sensors</h4>
                  <p className="text-sm text-muted-foreground">Ultrasonic and pressure sensors monitor water levels in rivers and flood-prone areas.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted rounded-xl p-8">
            <h3 className="text-xl font-bold text-foreground mb-4">Processing & Intelligence</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Brain className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground">AI/ML Analysis</h4>
                  <p className="text-sm text-muted-foreground">Real-time anomaly detection using machine learning algorithms for pattern recognition.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Cloud className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground">Cloud Processing</h4>
                  <p className="text-sm text-muted-foreground">Scalable cloud infrastructure processes data streams and triggers appropriate responses.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-orange-50 dark:from-blue-900/10 dark:to-orange-900/10 rounded-xl p-8 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-2">End-to-End Response Time</h3>
            <div className="text-3xl font-bold text-blue-600 mb-2">&lt; 5 seconds</div>
            <p className="text-muted-foreground">From sensor detection to alert delivery, ensuring rapid emergency response.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Architecture;
