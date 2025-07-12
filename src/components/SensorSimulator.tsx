
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Activity, Waves, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SensorSimulatorProps {
  onSensorUpdate: (waterLevel: number, earthquakeIntensity: number) => void;
  onTestAlert: () => void;
  isSubscribed: boolean;
}

const SensorSimulator = ({ onSensorUpdate, onTestAlert, isSubscribed }: SensorSimulatorProps) => {
  const { toast } = useToast();
  const [waterLevel, setWaterLevel] = useState([85]);
  const [earthquakeIntensity, setEarthquakeIntensity] = useState([2.1]);

  const handleWaterLevelChange = (value: number[]) => {
    setWaterLevel(value);
    onSensorUpdate(value[0], earthquakeIntensity[0]);
  };

  const handleEarthquakeChange = (value: number[]) => {
    setEarthquakeIntensity(value);
    onSensorUpdate(waterLevel[0], value[0]);
  };

  const handleTestAlert = () => {
    if (!isSubscribed) {
      toast({
        title: "Subscription Required",
        description: "Please subscribe first to receive alerts.",
        variant: "destructive"
      });
      return;
    }

    // Set test values
    setWaterLevel([160]);
    setEarthquakeIntensity([5.5]);
    onSensorUpdate(160, 5.5);
    
    // Trigger test alert
    onTestAlert();
    
    toast({
      title: "🚨 Test Alert Triggered",
      description: "Check your email for the alert notification.",
    });
  };

  const getWaterLevelStatus = () => {
    if (waterLevel[0] > 150) return { level: "High Risk", color: "bg-red-500", textColor: "text-red-500" };
    if (waterLevel[0] > 120) return { level: "Warning", color: "bg-orange-500", textColor: "text-orange-500" };
    return { level: "Normal", color: "bg-green-500", textColor: "text-green-500" };
  };

  const getEarthquakeStatus = () => {
    if (earthquakeIntensity[0] > 4) return { level: "High Risk", color: "bg-red-500", textColor: "text-red-500" };
    if (earthquakeIntensity[0] > 2.5) return { level: "Warning", color: "bg-orange-500", textColor: "text-orange-500" };
    return { level: "Normal", color: "bg-green-500", textColor: "text-green-500" };
  };

  const waterStatus = getWaterLevelStatus();
  const earthquakeStatus = getEarthquakeStatus();

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-blue-600" />
          <span>Sensor Simulator</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Water Level Simulator */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Waves className="h-4 w-4 text-blue-600" />
              <span className="font-medium">Water Level</span>
            </div>
            <Badge variant={waterStatus.level === "High Risk" ? "destructive" : waterStatus.level === "Warning" ? "default" : "secondary"}>
              {waterStatus.level}
            </Badge>
          </div>
          <div className="space-y-2">
            <Slider
              value={waterLevel}
              onValueChange={handleWaterLevelChange}
              max={200}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>0%</span>
              <span className="font-medium text-foreground">{waterLevel[0]}%</span>
              <span>200%</span>
            </div>
          </div>
        </div>

        {/* Earthquake Intensity Simulator */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-blue-600" />
              <span className="font-medium">Earthquake Intensity</span>
            </div>
            <Badge variant={earthquakeStatus.level === "High Risk" ? "destructive" : earthquakeStatus.level === "Warning" ? "default" : "secondary"}>
              {earthquakeStatus.level}
            </Badge>
          </div>
          <div className="space-y-2">
            <Slider
              value={earthquakeIntensity}
              onValueChange={handleEarthquakeChange}
              max={10}
              min={0}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>0.0</span>
              <span className="font-medium text-foreground">{earthquakeIntensity[0].toFixed(1)}</span>
              <span>10.0</span>
            </div>
          </div>
        </div>

        {/* Test Alert Button */}
        <Button 
          onClick={handleTestAlert}
          className="w-full bg-red-600 hover:bg-red-700 text-white"
          disabled={!isSubscribed}
        >
          {isSubscribed ? "🚨 Test Alert" : "Subscribe First to Test Alerts"}
        </Button>

        {/* Threshold Info */}
        <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
          <div className="font-medium mb-2">Alert Thresholds:</div>
          <div>• Water Level: Alert when &gt; 150%</div>
          <div>• Earthquake: Alert when &gt; 4.0 Richter</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SensorSimulator;
