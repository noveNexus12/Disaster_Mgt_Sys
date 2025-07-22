// import emailjs from '@emailjs/browser';
// import { db } from "@/lib/firebase"; // Adjust path if needed
// import { collection, getDocs } from "firebase/firestore";

// export interface AlertLocation {
//   lat: number;
//   lng: number;
//   type: "flood" | "earthquake";
//   intensity: number;
//   timestamp: Date;
// }

// // Global lock to prevent alert spamming
// let alertSent = false;

// export const checkThresholds = (waterLevel: number, earthquakeIntensity: number): boolean => {
//   return waterLevel > 150 || earthquakeIntensity > 4.0;
// };

// export const sendAlert = async (
//   waterLevel: number,
//   earthquakeIntensity: number
// ): Promise<void> => {
//   if (alertSent) {
//     console.warn("🔁 Alert already sent recently. Skipping...");
//     return;
//   }

//   const isFloodAlert = waterLevel > 150;
//   const isEarthquakeAlert = earthquakeIntensity > 4.0;

//   if (!isFloodAlert && !isEarthquakeAlert) return;

//   alertSent = true;
//   setTimeout(() => {
//     alertSent = false;
//     console.info("✅ Alert lock reset.");
//   }, 5 * 60 * 1000); // 5 minutes

//   const location = {
//     lat: 18.5204 + (Math.random() - 0.5) * 0.1,
//     lng: 73.8567 + (Math.random() - 0.5) * 0.1,
//   };

//   let subject = "";
//   let alertType = "";
//   let triggeredValue = "";

//   if (isFloodAlert && isEarthquakeAlert) {
//     subject = "🚨 CRITICAL: Flood & Earthquake Alert";
//     alertType = "Combined Disaster";
//     triggeredValue = `Water Level: ${waterLevel}%, Earthquake: ${earthquakeIntensity} Richter`;
//   } else if (isFloodAlert) {
//     subject = "⚠️ Flood Alert";
//     alertType = "Flood Warning";
//     triggeredValue = `Water Level: ${waterLevel}%`;
//   } else {
//     subject = "⚠️ Earthquake Detected";
//     alertType = "Seismic Activity";
//     triggeredValue = `Earthquake Magnitude: ${earthquakeIntensity} Richter`;
//   }

//   const timestamp = new Date().toLocaleString();

//   // 🔁 Fetch all registered user emails from Firestore
//   const snapshot = await getDocs(collection(db, "subscribers"));
//   const emails = snapshot.docs.map(doc => doc.data().email).filter(Boolean);

//   if (emails.length === 0) {
//     console.warn("⚠️ No subscribers found in Firestore.");
//     return;
//   }

//   console.log(`📧 Sending alerts to ${emails.length} subscriber(s)...`);

//   const alertPromises = emails.map(email => {
//     const templateParams = {
//       user_email: email,
//       subject,
//       alert_type: alertType,
//       triggered_value: triggeredValue,
//       timestamp,
//       latitude: location.lat.toFixed(4),
//       longitude: location.lng.toFixed(4),
//       message: `
//         DISASTER ALERT NOTIFICATION

//         Alert Type: ${alertType}
//         Triggered Value: ${triggeredValue}
//         Time: ${timestamp}
//         Location: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}

//         Please take immediate safety precautions and follow local emergency guidelines.

//         This is an automated alert from the DisasterGuard AI System.
//       `,
//     };

//     return emailjs.send(
//       'service_vzlfeat',
//       'template_rzuftlj',
//       templateParams,
//       '6k-kCYEoje5LFKwjq'
//     );
//   });

//   try {
//     await Promise.all(alertPromises);
//     console.log("✅ All alerts sent successfully");
//   } catch (error) {
//     console.error("❌ Some alerts failed to send:", error);
//     throw error;
//   }
// };

// export const createAlertLocation = (
//   waterLevel: number,
//   earthquakeIntensity: number
// ): AlertLocation => {
//   const isFloodAlert = waterLevel > 150;
//   const isEarthquakeAlert = earthquakeIntensity > 4.0;

//   let alertType: "flood" | "earthquake" = "earthquake";
//   let intensity = earthquakeIntensity;

//   if (isFloodAlert && (!isEarthquakeAlert || waterLevel > earthquakeIntensity * 20)) {
//     alertType = "flood";
//     intensity = waterLevel;
//   }

//   return {
//     lat: 18.5204 + (Math.random() - 0.5) * 0.1,
//     lng: 73.8567 + (Math.random() - 0.5) * 0.1,
//     type: alertType,
//     intensity,
//     timestamp: new Date(),
//   };
// };

// import emailjs from '@emailjs/browser';
// import { db } from "@/lib/firebase";
// import { collection, getDocs } from "firebase/firestore";

// export interface AlertLocation {
//   lat: number;
//   lng: number;
//   type: "flood" | "earthquake";
//   intensity: number;
//   timestamp: Date;
// }

// let lastCallTime: Date | null = null;
// let sendingInProgress = false; // 🚫 Prevent duplicate sends

// export const checkThresholds = (waterLevel: number, earthquakeIntensity: number): boolean => {
//   return waterLevel >= 150 || earthquakeIntensity >= 4.0;
// };

// export const sendAlert = async (
//   waterLevel: number,
//   earthquakeIntensity: number
// ): Promise<void> => {
//   if (sendingInProgress) {
//     console.warn("🚫 Alert already in progress, skipping...");
//     return;
//   }

//   const isFloodAlert = waterLevel >= 150;
//   const isEarthquakeAlert = earthquakeIntensity >= 4.0;

//   if (!isFloodAlert && !isEarthquakeAlert) return;

//   sendingInProgress = true; // ✅ Start lock
//   const now = new Date();
//   const shouldCall =
//     !lastCallTime || now.getTime() - lastCallTime.getTime() > 30 * 60 * 1000;

//   if (!shouldCall) {
//     console.warn("⏳ Phone call skipped (30 min cooldown active)");
//   } else {
//     lastCallTime = now;
//   }

//   const location = {
//     lat: 18.5204 + (Math.random() - 0.5) * 0.1,
//     lng: 73.8567 + (Math.random() - 0.5) * 0.1,
//   };

//   let subject = "";
//   let alertType = "";
//   let triggeredValue = "";

//   if (isFloodAlert && isEarthquakeAlert) {
//     subject = "🚨 CRITICAL: Flood & Earthquake Alert";
//     alertType = "Combined Disaster";
//     triggeredValue = `Water Level: ${waterLevel}%, Earthquake: ${earthquakeIntensity} Richter`;
//   } else if (isFloodAlert) {
//     subject = "⚠️ Flood Alert";
//     alertType = "Flood Warning";
//     triggeredValue = `Water Level: ${waterLevel}%`;
//   } else {
//     subject = "⚠️ Earthquake Detected";
//     alertType = "Seismic Activity";
//     triggeredValue = `Earthquake Magnitude: ${earthquakeIntensity} Richter`;
//   }

//   const timestamp = now.toLocaleString();

//   try {
//     const snapshot = await getDocs(collection(db, "subscribers"));
//     const subscribers = snapshot.docs
//       .map(doc => doc.data())
//       .filter(data => data.email);

//     if (subscribers.length === 0) {
//       console.warn("⚠️ No subscribers found in Firestore.");
//       return;
//     }

//     console.log(`📧 Sending email alerts to ${subscribers.length} subscriber(s)...`);

//     const alertPromises = subscribers.map(sub => {
//       const templateParams = {
//         user_email: sub.email,
//         subject,
//         alert_type: alertType,
//         triggered_value: triggeredValue,
//         timestamp,
//         latitude: location.lat.toFixed(4),
//         longitude: location.lng.toFixed(4),
//         message: `
//           DISASTER ALERT NOTIFICATION

//           Alert Type: ${alertType}
//           Triggered Value: ${triggeredValue}
//           Time: ${timestamp}
//           Location: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}

//           Please take immediate safety precautions and follow local emergency guidelines.

//           This is an automated alert from the DisasterGuard AI System.
//         `,
//       };

//       return emailjs.send(
//         'service_yoggzze',
//         'template_lgg6tdr',
//         templateParams,
//         'jlQpoCUVRZ5CfHBZ-'
//       );
//     });

//     const results = await Promise.allSettled(alertPromises);
//     const failed = results.filter(r => r.status === "rejected");

//     if (failed.length > 0) {
//       console.warn(`⚠️ ${failed.length} email(s) failed to send.`);
//       failed.forEach((f, idx) => console.warn(`❌ Email ${idx + 1} failed:`, f));
//     } else {
//       console.log("✅ All email alerts sent successfully");
//     }

//     // 🔔 Call via Twilio if needed
//     if (shouldCall) {
//       const phoneNumbers = subscribers
//         .map(sub => sub.phone)
//         .filter((phone: string | undefined): phone is string => !!phone && phone.startsWith('+'));

//       if (phoneNumbers.length > 0) {
//         console.log(`📞 Triggering Twilio calls for ${phoneNumbers.length} user(s)...`);
//         try {
//           const response = await fetch("http://localhost:3001/api/trigger-call", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ phoneNumbers, alertType }),
//           });

//           if (!response.ok) {
//             throw new Error(`Server responded with status ${response.status}`);
//           }

//           const data = await response.json();
//           console.log("✅ Twilio server response:", data);
//         } catch (err) {
//           console.error("❌ Call trigger failed:", err);
//         }
//       } else {
//         console.warn("⚠️ No valid phone numbers found for calling.");
//       }
//     }
//   } catch (error) {
//     console.error("❌ Unexpected alert sending error:", error);
//   } finally {
//     sendingInProgress = false; // 🔓 Unlock when done
//   }
// };

// export const createAlertLocation = (
//   waterLevel: number,
//   earthquakeIntensity: number
// ): AlertLocation => {
//   const isFloodAlert = waterLevel >= 150;
//   const isEarthquakeAlert = earthquakeIntensity >= 4.0;

//   let alertType: "flood" | "earthquake" = "earthquake";
//   let intensity = earthquakeIntensity;

//   if (isFloodAlert && (!isEarthquakeAlert || waterLevel > earthquakeIntensity * 20)) {
//     alertType = "flood";
//     intensity = waterLevel;
//   }

//   return {
//     lat: 18.5204 + (Math.random() - 0.5) * 0.1,
//     lng: 73.8567 + (Math.random() - 0.5) * 0.1,
//     type: alertType,
//     intensity,
//     timestamp: new Date(),
//   };
// };


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
import emailjs from '@emailjs/browser';
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export interface AlertLocation {
  lat: number;
  lng: number;
  type: "flood" | "earthquake";
  intensity: number;
  timestamp: Date;
}

// Helper functions to persist alert flags
const getAlertSent = (type: 'flood' | 'earthquake'): boolean =>
  localStorage.getItem(`${type}AlertSent`) === 'true';

const setAlertSent = (type: 'flood' | 'earthquake', value: boolean): void =>
  localStorage.setItem(`${type}AlertSent`, value.toString());

export const checkThresholds = (waterLevel: number, earthquakeIntensity: number): boolean => {
  return waterLevel >= 150 || earthquakeIntensity >= 4.0;
};

export const sendAlert = async (
  waterLevel: number,
  earthquakeIntensity: number
): Promise<void> => {
  const isFloodAlert = waterLevel >= 150;
  const isEarthquakeAlert = earthquakeIntensity >= 4.0;

  const floodAlertAlreadySent = getAlertSent('flood');
  const earthquakeAlertAlreadySent = getAlertSent('earthquake');

  // Reset flags when values drop below threshold
  if (waterLevel < 140) setAlertSent('flood', false);
  if (earthquakeIntensity < 3.5) setAlertSent('earthquake', false);

  // Prevent repeated alerts
  if ((isFloodAlert && floodAlertAlreadySent) && (isEarthquakeAlert && earthquakeAlertAlreadySent)) {
    console.warn("🔁 Suppressing repeated alerts (already sent).");
    return;
  }

  const now = new Date();

  const location = {
    lat: 18.5204 + (Math.random() - 0.5) * 0.1,
    lng: 73.8567 + (Math.random() - 0.5) * 0.1,
  };

  let subject = "";
  let alertType = "";
  let triggeredValue = "";

  if (isFloodAlert && !floodAlertAlreadySent && isEarthquakeAlert && !earthquakeAlertAlreadySent) {
    subject = "🚨 CRITICAL: Flood & Earthquake Alert";
    alertType = "Combined Disaster";
    triggeredValue = `Water Level: ${waterLevel}%, Earthquake: ${earthquakeIntensity} Richter`;
  } else if (isFloodAlert && !floodAlertAlreadySent) {
    subject = "⚠️ Flood Alert";
    alertType = "Flood Warning";
    triggeredValue = `Water Level: ${waterLevel}%`;
  } else if (isEarthquakeAlert && !earthquakeAlertAlreadySent) {
    subject = "⚠️ Earthquake Detected";
    alertType = "Seismic Activity";
    triggeredValue = `Earthquake Magnitude: ${earthquakeIntensity} Richter`;
  } else {
    return;
  }

  const timestamp = now.toLocaleString();

  const snapshot = await getDocs(collection(db, "subscribers"));
  const subscribers = snapshot.docs
    .map(doc => doc.data())
    .filter(data => data.email);

  if (subscribers.length === 0) {
    console.warn("⚠️ No subscribers found in Firestore.");
    return;
  }

  const emailList = subscribers.map(sub => sub.email).join(',');
  const phoneNumbers = subscribers
    .map(sub => sub.phone)
    .filter((phone: string | undefined): phone is string => !!phone && phone.startsWith('+'));

  const templateParams = {
    user_email: emailList,
    subject,
    alert_type: alertType,
    triggered_value: triggeredValue,
    timestamp,
    latitude: location.lat.toFixed(4),
    longitude: location.lng.toFixed(4),
    message: `
      DISASTER ALERT NOTIFICATION

      Alert Type: ${alertType}
      Triggered Value: ${triggeredValue}
      Time: ${timestamp}
      Location: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}

      Please take immediate safety precautions and follow local emergency guidelines.

      This is an automated alert from the DisasterGuard AI System.
    `,
  };

  try {
    const emailResponse = await emailjs.send(
      'service_yoggzze',
      'template_lgg6tdr',
      templateParams,
      'jlQpoCUVRZ5CfHBZ-'
    );
    console.log("✅ Email sent:", emailResponse.status);

    if (phoneNumbers.length > 0) {
      console.log(`📞 Triggering Twilio calls to ${phoneNumbers.length} user(s)...`);
      const res = await fetch("http://localhost:3001/api/trigger-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumbers, alertType }),
      });

      if (!res.ok) {
        throw new Error(`Twilio call failed with status ${res.status}`);
      }

      console.log("✅ Twilio calls triggered");
    } else {
      console.warn("⚠️ No valid phone numbers found for Twilio calls.");
    }

    // Update alert flags
    if (isFloodAlert) setAlertSent('flood', true);
    if (isEarthquakeAlert) setAlertSent('earthquake', true);

  } catch (error) {
    console.error("❌ Alert failed:", error);
    throw error;
  }
};

export const createAlertLocation = (
  waterLevel: number,
  earthquakeIntensity: number
): AlertLocation => {
  const isFloodAlert = waterLevel >= 150;
  const isEarthquakeAlert = earthquakeIntensity >= 4.0;

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
    intensity,
    timestamp: new Date(),
  };
};
