// tamasha.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // Serve your HTML

const OTP_API_URL = "https://damp-resonance-12e3.ilyasbhai869.workers.dev/";
const ACTIVATE_API_URL = "https://royal-voice-9675.ilyasbhai869.workers.dev/";

// ✅ Request OTP
app.post("/api/request-otp", async (req, res) => {
  const { number } = req.body;
  if (!number) return res.status(400).json({ success: false, message: "Number required" });

  try {
    const response = await fetch(OTP_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number }),
    });

    // Try to parse JSON safely
    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    if (response.ok) {
      res.json({ success: true, data });
    } else {
      res.status(response.status).json({ success: false, data });
    }
  } catch (error) {
    console.error("OTP API Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

// ✅ Activate Package
app.post("/api/activate", async (req, res) => {
  const { msisdn, otp, package_id } = req.body;
  if (!msisdn || !otp || !package_id)
    return res.status(400).json({ success: false, message: "All fields required" });

  try {
    const response = await fetch(ACTIVATE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ msisdn, otp, package_id }),
    });

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    if (response.ok) {
      res.json({ success: true, data });
    } else {
      res.status(response.status).json({ success: false, data });
    }
  } catch (error) {
    console.error("Activation Error:", error.message);
    res.status(500).json({ success: false, message: "Activation failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Node.js server running: http://localhost:${PORT}`));
