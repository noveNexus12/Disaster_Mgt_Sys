import express from 'express';
import dotenv from 'dotenv';
import pkg from 'twilio';
import bodyParser from 'body-parser';
import cors from 'cors';

const { Twilio } = pkg;

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.post('/api/trigger-call', async (req, res) => {
  try {
    const { phoneNumbers, alertType } = req.body;

    if (!Array.isArray(phoneNumbers) || phoneNumbers.length === 0) {
      return res.status(400).json({ error: 'No valid phone numbers provided.' });
    }

    const callPromises = phoneNumbers.map(number => {
      return client.calls.create({
        url: `https://handler.twilio.com/twiml/EH97d4b943a860436f7e9b5d95b0a5b320`, // or replace with your own TwiML if needed
        to: number,
        from: process.env.TWILIO_PHONE_NUMBER,
      });
    });

    const results = await Promise.allSettled(callPromises);
    const failed = results.filter(r => r.status === "rejected");

    if (failed.length > 0) {
      return res.status(500).json({
        message: "Some calls failed",
        errors: failed.map(e => e.reason),
      });
    }

    res.status(200).json({ message: "All calls triggered successfully" });
  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Twilio Call Server running at http://localhost:${PORT}`);
});
