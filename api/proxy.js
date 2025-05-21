import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const { rekening, bank } = req.query;

    if (!rekening || !bank) {
      return res.status(400).json({ error: 'Parameter rekening dan bank wajib diisi' });
    }

    const apiKey = process.env.APIKEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key belum diset di environment variables' });
    }

    const response = await fetch('https://apidev.biz.id//api/checker', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      },
      body: JSON.stringify({ rekening, bank })
    });

    const text = await response.text();

    // Coba parse JSON response, jika gagal kirim raw response error
    try {
      const data = JSON.parse(text);
      res.status(response.status).json(data);
    } catch {
      res.status(response.status).json({ error: `API error: ${text}` });
    }

  } catch (error) {
    console.error('Error in proxy handler:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

