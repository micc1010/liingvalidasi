import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const { rekening, bank } = req.query;
    const apiKey = process.env.APIKEY;

    if (!rekening || !bank) {
      return res.status(400).json({ error: 'Parameter rekening dan bank wajib diisi' });
    }
    if (!apiKey) {
      return res.status(500).json({ error: 'API key belum diset di environment variables' });
    }

    // Sesuaikan parameter sesuai dokumentasi
    // Pastikan kamu punya mapping bank ke kode_bank yang benar
    const kode_bank = bank.toLowerCase(); // contoh sederhana, kamu bisa buat mapping lebih detail

    const url = `https://apidev.biz.id/api/checker?action=getAccount&kode_bank=${encodeURIComponent(kode_bank)}&nomor_rekening=${encodeURIComponent(rekening)}&apikey=${encodeURIComponent(apiKey)}`;

    const response = await fetch(url);
    const data = await response.json();

    res.status(response.status).json(data);

  } catch (error) {
    console.error('Error proxy:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
