import fetch from "node-fetch";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const { action, query, url } = req.query;

  try {
    let apiUrl = "";
    if (action === "search") {
      apiUrl = `https://api.princetechn.com/api/search/yts?apikey=prince&query=${encodeURIComponent(query)}`;
    } else if (action === "download") {
      apiUrl = `https://api.princetechn.com/api/download/ytdlv2?apikey=prince&url=${encodeURIComponent(url)}`;
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }

    const response = await fetch(apiUrl);
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
