
import emailjs from '@emailjs/browser';

export interface AlertLocation {
  lat: number;
  lng: number;
  type: "flood" | "earthquake";
  intensity: number;
  timestamp: Date;
}

export const checkThresholds = (waterLevel: number, earthquakeIntensity: number): boolean => {
  return waterLevel > 150 || earthquakeIntensity > 4.0;
};

export const sendAlert = async (
  waterLevel: number, 
  earthquakeIntensity: number, 
  userEmail: string,
  mapImageData?: string
): Promise<void> => {
  const isFloodAlert = waterLevel > 150;
  const isEarthquakeAlert = earthquakeIntensity > 4.0;
  
  // Sample location (Pune area with slight variation)
  const location = {
    lat: 18.5204 + (Math.random() - 0.5) * 0.1,
    lng: 73.8567 + (Math.random() - 0.5) * 0.1
  };

  let subject = "";
  let alertType = "";
  let triggeredValue = "";

  if (isFloodAlert && isEarthquakeAlert) {
    subject = "🚨 CRITICAL: Flood & Earthquake Alert";
    alertType = "Combined Disaster";
    triggeredValue = `Water Level: ${waterLevel}%, Earthquake: ${earthquakeIntensity} Richter`;
  } else if (isFloodAlert) {
    subject = "⚠️ Flood Alert";
    alertType = "Flood Warning";
    triggeredValue = `Water Level: ${waterLevel}%`;
  } else {
    subject = "⚠️ Earthquake Detected";
    alertType = "Seismic Activity";
    triggeredValue = `Earthquake Magnitude: ${earthquakeIntensity} Richter`;
  }

  const timestamp = new Date().toLocaleString();
  
  // Prepare email template parameters
  const templateParams = {
    to_email: userEmail,
    subject: subject,
    alert_type: alertType,
    triggered_value: triggeredValue,
    timestamp: timestamp,
    latitude: location.lat.toFixed(4),
    longitude: location.lng.toFixed(4),
    map_image: mapImageData || '',
    message: `
      DISASTER ALERT NOTIFICATION
      
      Alert Type: ${alertType}
      Triggered Value: ${triggeredValue}
      Time: ${timestamp}
      Location: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}
      
      Please take immediate safety precautions and follow local emergency guidelines.
      
      This is an automated alert from the DisasterGuard AI System.
    `
  };

  try {
    await emailjs.send(
      'service_oi9vnuc',
      'template_t2pqnse',
      templateParams,
      '64mjTCo0st8WIug8G'
    );
    console.log('Alert sent successfully');
  } catch (error) {
    console.error('Failed to send alert:', error);
    throw error;
  }
};

export const createAlertLocation = (
  waterLevel: number, 
  earthquakeIntensity: number
): AlertLocation => {
  const isFloodAlert = waterLevel > 150;
  const isEarthquakeAlert = earthquakeIntensity > 4.0;
  
  // Determine primary alert type
  let alertType: "flood" | "earthquake" = "earthquake";
  let intensity = earthquakeIntensity;
  
  if (isFloodAlert && (!isEarthquakeAlert || waterLevel > earthquakeIntensity * 20)) {
    alertType = "flood";
    intensity = waterLevel;
  }

  return {
    lat: 18.5204 + (Math.random() - 0.5) * 0.1,
    lng: 73.8567 + (Math.random() - 0.5) * 0.1,
    type: alertType,
    intensity: intensity,
    timestamp: new Date()
  };
};
