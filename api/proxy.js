export default async function handler(req, res) {
  // Cek cookie token
  const cookies = req.headers.cookie || "";
  if (!cookies.includes("token=authenticated")) {
    return res.status(403).json({ error: "Akses ditolak. Silakan login." });
  }

  const { action, kode_bank, nomor_rekening } = req.query;
  const API_KEY = process.env.APIKEY;

  if (!action) {
    return res.status(400).json({ error: "Parameter action wajib diisi." });
  }

  if (!nomor_rekening) {
    return res.status(400).json({ error: "Parameter nomor_rekening wajib diisi." });
  }

  let apiUrl = "";

  if (action === "getAccount") {
    if (!kode_bank) {
      return res.status(400).json({ error: "Parameter kode_bank wajib diisi." });
    }
    apiUrl = `https://apidev.biz.id/api/checker?action=getAccount&kode_bank=${kode_bank}&nomor_rekening=${nomor_rekening}&apikey=${API_KEY}`;
  } else if (action === "getEwallet") {
    if (!kode_bank) {
      return res.status(400).json({ error: "Parameter tipe (kode_bank) wajib diisi." });
    }
    apiUrl = `https://apidev.biz.id/api/checker?action=getEwallet&tipe=${kode_bank}&nomor_rekening=${nomor_rekening}&apikey=${API_KEY}`;
  } else if (action === "getBankList") {
    apiUrl = `https://apidev.biz.id/api/checker?action=getBankList&apikey=${API_KEY}`;
  } else {
    return res.status(400).json({ error: "Action tidak ditemukan." });
  }

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Gagal memanggil API eksternal:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat menghubungi server eksternal." });
  }
}
