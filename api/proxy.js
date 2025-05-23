export default async function handler(req, res) {
  // Cek cookie token
  const cookies = req.headers.cookie || "";
  if (!cookies.includes("token=authenticated")) {
    return res.status(403).json({ error: "Akses ditolak. Silakan login." });
  }

  // Proses proxy seperti biasa
  try {
    const { action, kode_bank, nomor_rekening } = req.query;
    const API_KEY = process.env.APIKEY;

    if (!action) {
      return res.status(400).json({ error: "Parameter action wajib diisi." });
    }

    if (!kode_bank) {
      return res.status(400).json({ error: "Parameter kode_bank wajib diisi." });
    }

    if (!nomor_rekening) {
      return res.status(400).json({ error: "Parameter nomor_rekening wajib diisi." });
    }

    let apiUrl = "";

    if (action === "getAccount") {
      apiUrl = `https://apidev.biz.id/api/checker?action=getAccount&kode_bank=${kode_bank}&nomor_rekening=${nomor_rekening}&apikey=${API_KEY}`;
    } else if (action === "getEwallet") {
      apiUrl = `https://apidev.biz.id/api/checker?action=getEwallet&tipe=${kode_bank}&nomor_rekening=${nomor_rekening}&apikey=${API_KEY}`;
    } else {
      return res.status(400).json({ error: "Action tidak ditemukan" });
    }

    const response = await fetch(apiUrl);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}