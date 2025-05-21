export default async function handler(req, res) {
  const { rekening, bank } = req.query;

  if (!rekening || !bank) {
    return res.status(400).json({ error: 'rekening dan bank wajib diisi' });
  }

  const apiKey = process.env.APIKEY; // Tambahkan API key sebagai variabel environment

  const response = await fetch(`https://api.apidev.biz.id/cekrekening?rekening=${rekening}&bank=${bank}`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  });

  const data = await response.json();
  res.status(response.status).json(data);
}