const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const OTP_API_URL = "https://damp-resonance-12e3.ilyasbhai869.workers.dev/";
const ACTIVATE_API_URL = "https://royal-voice-9675.ilyasbhai869.workers.dev/";

// 🟢 Request OTP
app.post("/api/request-otp", async (req, res) => {
  const { number } = req.body;
  if (!number) return res.status(400).json({ success: false, message: "Number required" });

  try {
    const resp = await fetch(OTP_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number }),
    });

    const data = await resp.json();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

// 🟢 Activate package
app.post("/api/activate", async (req, res) => {
  const { msisdn, otp, package_id } = req.body;
  if (!msisdn || !otp || !package_id)
    return res.status(400).json({ success: false, message: "All fields required" });

  try {
    const resp = await fetch(ACTIVATE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ msisdn, otp, package_id }),
    });

    const data = await resp.json();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Activation failed" });
  }
});

// Start server
app.listen(3000, () => console.log("✅ Node.js server running on port 3000"));
