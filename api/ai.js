import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { inputText } = req.query;

    if (!inputText) {
      return res.status(400).json({ error: 'Missing inputText parameter' });
    }

    try {
      const apiUrl = `https://botfather.cloud/Apis/ImgGen/client.php?inputText=${encodeURIComponent(inputText)}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }

      const imageUrl = await response.text();
      return res.status(200).json({ imageUrl });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
