import express from "express";

const app = express();

// 🏠 Root Route
app.get("/", (req, res) => {
  res.send("⚡ Bunny Broken 💔 SIM Database API is working!");
});

// 🔍 Search Route
app.get("/api/search", async (req, res) => {
  try {
    const phone = req.query.phone;
    if (!phone) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    // ✅ External API call
    const response = await fetch(`https://api.impossible-world.xyz/api/data?phone=${phone}`);
    const data = await response.json();

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: "Server Error", details: err.message });
  }
});

// 🚀 Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`⚡ Bunny Broken 💔 SIM Database running on http://localhost:${PORT}`);
});

export default app;
