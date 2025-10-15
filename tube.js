// /api/tube.js
// Kami Flex Tube proxy for search & download
// - Fixes CORS
// - Server side fetch from princetechn APIs

import fetch from "node-fetch";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const { mode, q, url } = req.query;

    if (mode === "search") {
      const api = `https://api.princetechn.com/api/search/yts?apikey=prince&query=${encodeURIComponent(q || "")}`;
      const r = await fetch(api);
      const data = await r.json();
      return res.status(200).json(data);
    }

    if (mode === "download") {
      const api = `https://api.princetechn.com/api/download/ytdlv2?apikey=prince&url=${encodeURIComponent(url || "")}`;
      const r = await fetch(api);
      const data = await r.json();
      return res.status(200).json(data);
    }

    res.status(400).json({ error: "Invalid mode" });
  } catch (err) {
    console.error("Tube proxy error:", err);
    res.status(500).json({ error: "Internal server error", detail: err.message });
  }
}
