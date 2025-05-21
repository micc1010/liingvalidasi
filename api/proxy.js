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

    const bankCodes = {
      bca: '014',
      mandiri: '008',
      bri: '002',
      bni: '009',
      cimb: '022',
      // tambahkan kode bank lain di sini
    };

    const kode_bank = bankCodes[bank.toLowerCase()];
    if (!kode_bank) {
      return res.status(400).json({ error: 'Bank tidak dikenal. Pastikan nama bank benar dan sudah didaftarkan di mapping kode bank.' });
    }

    const url = `https://apidev.biz.id/api/checker?action=getAccount&kode_bank=${kode_bank}&nomor_rekening=${encodeURIComponent(rekening)}&apikey=${encodeURIComponent(apiKey)}`;

    const response = await fetch(url);
    const data = await response.json();

    res.status(response.status).json(data);

  } catch (error) {
    console.error('Error proxy:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
