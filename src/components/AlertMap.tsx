
import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import html2canvas from "html2canvas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";

interface AlertLocation {
  lat: number;
  lng: number;
  type: "flood" | "earthquake";
  intensity: number;
  timestamp: Date;
}

interface AlertMapProps {
  alerts: AlertLocation[];
  onMapCapture?: (imageData: string) => void;
}

const AlertMap = ({ alerts, onMapCapture }: AlertMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);

  // Pune coordinates as center
  const centerPosition: [number, number] = [18.5204, 73.8567];

  const captureMap = async () => {
    if (mapRef.current && onMapCapture) {
      try {
        const canvas = await html2canvas(mapRef.current, {
          useCORS: true,
          allowTaint: true,
          scale: 1,
          width: 400,
          height: 300,
        });
        const imageData = canvas.toDataURL("image/png");
        onMapCapture(imageData);
      } catch (error) {
        console.error("Failed to capture map:", error);
      }
    }
  };

  useEffect(() => {
    if (alerts.length > 0 && mapReady) {
      // Capture map after new alert is added
      setTimeout(() => {
        captureMap();
      }, 1000);
    }
  }, [alerts, mapReady, onMapCapture]);

  const getAlertColor = (type: string) => {
    return type === "flood" ? "#3b82f6" : "#ef4444";
  };

  const getAlertLabel = (alert: AlertLocation) => {
    if (alert.type === "flood") {
      return `⚠️ Flood Risk - ${alert.intensity}%`;
    } else {
      return `⚠️ Earthquake Zone - ${alert.intensity} Richter`;
    }
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          <span>Live Alert Map</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={mapRef} className="h-64 w-full rounded-lg overflow-hidden border border-border">
          <MapContainer
            center={centerPosition}
            zoom={10}
            style={{ height: "100%", width: "100%" }}
            whenReady={() => setMapReady(true)}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />
            
            {alerts.map((alert, index) => (
              <CircleMarker
                key={`${alert.lat}-${alert.lng}-${index}`}
                center={[alert.lat, alert.lng]}
                radius={15}
                pathOptions={{
                  fillColor: getAlertColor(alert.type),
                  color: getAlertColor(alert.type),
                  weight: 3,
                  opacity: 0.8,
                  fillOpacity: 0.6,
                }}
              >
                <Popup>
                  <div className="text-sm">
                    <div className="font-semibold">{getAlertLabel(alert)}</div>
                    <div className="text-muted-foreground">
                      {alert.timestamp.toLocaleString()}
                    </div>
                    <div className="text-xs">
                      Lat: {alert.lat.toFixed(4)}, Lng: {alert.lng.toFixed(4)}
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
        
        <div className="mt-2 text-xs text-muted-foreground">
          © OpenStreetMap contributors
        </div>
        
        {alerts.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded-lg">
            <div className="text-center text-muted-foreground">
              <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <div className="text-sm">No active alerts</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AlertMap;
