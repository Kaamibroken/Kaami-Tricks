import fetch from "node-fetch";

export default async function handler(req, res) {
  const { url } = req.query;
  const response = await fetch(`https://api.princetechn.com/api/download/ytdlv2?apikey=prince&url=${encodeURIComponent(url)}`);
  const data = await response.json();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(data);
}
