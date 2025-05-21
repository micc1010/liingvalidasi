import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const { rekening, bank } = req.query;

    if (!rekening || !bank) {
      return res.status(400).json({ error: 'rekening dan bank wajib diisi' });
    }

    const apiKey = process.env.APIKEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'API key belum diatur di environment variables' });
    }

    const response = await fetch(`https://apidev.biz.id/cekrekening?rekening=${rekening}&bank=${bank}`, {
     headers: {
      Authorization: `Bearer ${apiKey}`
      }
    });


    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: `API error: ${text}` });
    }

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    console.error('Error in proxy:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
