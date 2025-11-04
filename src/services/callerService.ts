import twilio from "twilio";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const accountSid = "YOUR_TWILIO_SID";
const authToken = "YOUR_TWILIO_AUTH_TOKEN";
const client = twilio(accountSid, authToken);

const twilioNumber = "+15672347826";
const twimlUrl = "https://handler.twilio.com/twiml/your-url-id";

export async function triggerCallAlert(phoneNumbers: string[], alertType: string) {
  if (!phoneNumbers.length) return;

  console.log(`📞 Calling ${phoneNumbers.length} users for ${alertType} alert`);

  await Promise.all(
    phoneNumbers.map(async (number) => {
      try {
        const call = await client.calls.create({
          to: number,
          from: twilioNumber,
          url: twimlUrl
        });
        console.log(`✅ Call to ${number} initiated: ${call.sid}`);
      } catch (err) {
        console.error(`❌ Failed to call ${number}:`, err);
      }
    })
  );
}