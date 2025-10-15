import fetch from "node-fetch";

export default async function handler(req, res) {
  const { query } = req.query;
  const response = await fetch(`https://api.princetechn.com/api/search/yts?apikey=prince&query=${encodeURIComponent(query)}`);
  const data = await response.json();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(data);
}
