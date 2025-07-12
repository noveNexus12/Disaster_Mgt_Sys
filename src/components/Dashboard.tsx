
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Waves, AlertTriangle, TrendingUp, MapPin } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { useToast } from "@/hooks/use-toast";
import SensorSimulator from "./SensorSimulator";
import { checkThresholds, sendAlert, createAlertLocation, AlertLocation } from "../services/alertService";

const Dashboard = () => {
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [seismicData, setSeismicData] = useState<number>(2.1);
  const [waterLevel, setWaterLevel] = useState<number>(85);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [alerts, setAlerts] = useState<AlertLocation[]>([]);
  const [userEmail, setUserEmail] = useState<string>("");
  
  // Check subscription status on mount
  useEffect(() => {
    const subscribed = localStorage.getItem('alertSubscribed') === 'true';
    const email = localStorage.getItem('userEmail') || "";
    setIsSubscribed(subscribed);
    setUserEmail(email);
  }, []);

  // Listen for subscription updates
  useEffect(() => {
    const handleStorageChange = () => {
      const subscribed = localStorage.getItem('alertSubscribed') === 'true';
      const email = localStorage.getItem('userEmail') || "";
      setIsSubscribed(subscribed);
      setUserEmail(email);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Simulated real-time data updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Only update if not manually controlled by simulator
      if (!document.querySelector('[data-simulator-active]')) {
        setSeismicData(prev => Math.max(0, prev + (Math.random() - 0.5) * 0.5));
        setWaterLevel(prev => Math.max(0, Math.min(200, prev + (Math.random() - 0.5) * 5)));
      }
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  // Check thresholds and trigger alerts
  useEffect(() => {
    if (checkThresholds(waterLevel, seismicData) && isSubscribed && userEmail) {
      handleThresholdAlert();
    }
  }, [waterLevel, seismicData, isSubscribed, userEmail]);

  const handleSensorUpdate = (newWaterLevel: number, newEarthquakeIntensity: number) => {
    setWaterLevel(newWaterLevel);
    setSeismicData(newEarthquakeIntensity);
    
    // Mark as manually controlled
    document.body.setAttribute('data-simulator-active', 'true');
    setTimeout(() => {
      document.body.removeAttribute('data-simulator-active');
    }, 5000);
  };

  const handleThresholdAlert = async () => {
    try {
      // Create alert location
      const alertLocation = createAlertLocation(waterLevel, seismicData);
      setAlerts(prev => [...prev, alertLocation]);

      // Send email alert
      await sendAlert(waterLevel, seismicData, userEmail);
      
      // Flash effect for threshold crossing
      document.body.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
      setTimeout(() => {
        document.body.style.backgroundColor = '';
      }, 500);

    } catch (error) {
      console.error('Alert failed:', error);
      toast({
        title: "Alert Failed",
        description: "Unable to send alert notification. Please check your connection.",
        variant: "destructive"
      });
    }
  };

  const handleTestAlert = () => {
    if (isSubscribed && userEmail) {
      handleThresholdAlert();
    }
  };

  const getRiskLevel = () => {
    if (seismicData > 4 || waterLevel > 150) return { level: "High", color: "bg-red-500", textColor: "text-red-500" };
    if (seismicData > 2.5 || waterLevel > 120) return { level: "Medium", color: "bg-orange-500", textColor: "text-orange-500" };
    return { level: "Low", color: "bg-green-500", textColor: "text-green-500" };
  };

  const riskInfo = getRiskLevel();

  // Sample historical data
  const historicalData = [
    { time: "00:00", seismic: 1.8, water: 80 },
    { time: "04:00", seismic: 2.1, water: 82 },
    { time: "08:00", seismic: 1.9, water: 85 },
    { time: "12:00", seismic: 2.3, water: 90 },
    { time: "16:00", seismic: 2.0, water: 88 },
    { time: "20:00", seismic: seismicData, water: waterLevel },
  ];

  const regions = [
    { name: "Downtown District", risk: "Low", sensors: 12, status: "Active" },
    { name: "Riverside Area", risk: "Medium", sensors: 8, status: "Active" },
    { name: "Mountain Valley", risk: "Low", sensors: 6, status: "Active" },
    { name: "Industrial Zone", risk: "High", sensors: 15, status: "Alert" },
  ];

  return (
    <section id="dashboard" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Live Monitoring Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time disaster monitoring with AI-powered risk assessment and early warning system.
          </p>
          <div className="mt-4 flex justify-center items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Live Data - Updated {currentTime.toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
              <AlertTriangle className={`h-4 w-4 ${riskInfo.textColor}`} />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${riskInfo.color}`}></div>
                <div className="text-2xl font-bold">{riskInfo.level}</div>
              </div>
              <p className="text-xs text-muted-foreground">Based on current sensor readings</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Seismic Activity</CardTitle>
              <Activity className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{seismicData.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">Richter Scale</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Water Level</CardTitle>
              <Waves className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{waterLevel.toFixed(0)}%</div>
              <p className="text-xs text-muted-foreground">Flood threshold at 150%</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Sensors</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">41</div>
              <p className="text-xs text-muted-foreground">Online monitoring stations</p>
            </CardContent>
          </Card>
        </div>

        {/* Sensor Simulator Section */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-12">
          <SensorSimulator 
            onSensorUpdate={handleSensorUpdate}
            onTestAlert={handleTestAlert}
            isSubscribed={isSubscribed}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-blue-600" />
                <span>Seismic Activity Trend</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="seismic" stroke="#2563eb" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Waves className="h-5 w-5 text-blue-600" />
                <span>Water Level Monitoring</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="water" stroke="#059669" fill="#34d399" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Regional Status */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span>Regional Monitoring Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {regions.map((region, index) => (
                <div key={index} className="bg-muted rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{region.name}</h4>
                    <Badge 
                      variant={region.risk === "High" ? "destructive" : region.risk === "Medium" ? "default" : "secondary"}
                    >
                      {region.risk}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Sensors: {region.sensors}</div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${region.status === "Alert" ? "bg-red-500" : "bg-green-500"}`}></div>
                      <span>{region.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-orange-50 dark:from-blue-900/10 dark:to-orange-900/10 rounded-xl p-8 border border-border">
            <h3 className="text-xl font-bold text-foreground mb-4">Emergency Response Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-green-600">24/7</div>
                <div className="text-sm text-muted-foreground">Monitoring Coverage</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">&lt; 30s</div>
                <div className="text-sm text-muted-foreground">Alert Response Time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">1000+</div>
                <div className="text-sm text-muted-foreground">Lives Protected Daily</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
