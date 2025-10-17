import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static("public")); // serve HTML from 'public' folder

app.get("/api/imggen", async (req, res) => {
  const { input } = req.query;
  if (!input) return res.status(400).send("Missing input");

  const url = `https://botfather.cloud/Apis/ImgGen/client.php?inputText=${encodeURIComponent(input)}`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    res.send(text);
  } catch (err) {
    console.error(err);
    res.status(500).send("⚠️ Network or API error");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
