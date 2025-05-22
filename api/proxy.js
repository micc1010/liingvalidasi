export default async function handler(req, res) {
  const { rekening, bank } = req.query;

  if (!rekening || !bank) {
    return res.status(400).json({ error: 'rekening dan bank wajib diisi' });
  }

  const url = `https://apidev.biz.id/api/checker?action=getAccount&kode_bank=${bank}&nomor_rekening=${rekening}&apikey=${process.env.APIKEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Gagal memproses permintaan.' });
  }
}
