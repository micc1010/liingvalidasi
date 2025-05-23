export default async function handler(req, res) {
  const cookies = req.headers.cookie || "";
  if (!cookies.includes("token=authenticated")) {
    return res.status(403).json({ success: false, message: "Akses ditolak. Silakan login." });
  }

  const { action, kode_bank, nomor_rekening } = req.query;
  const API_KEY = process.env.APIKEY;

  if (!action) return res.status(400).json({ success: false, message: "Parameter action wajib diisi." });
  if (!nomor_rekening) return res.status(400).json({ success: false, message: "Parameter nomor_rekening wajib diisi." });

  let apiUrl = "";

  try {
    if (action === "getAccount") {
      if (!kode_bank) return res.status(400).json({ success: false, message: "Parameter kode_bank wajib diisi." });

      apiUrl = `https://apidev.biz.id/api/checker?action=getAccount&kode_bank=${kode_bank}&nomor_rekening=${nomor_rekening}&apikey=${API_KEY}`;
    } else if (action === "getEwallet") {
      if (!kode_bank) return res.status(400).json({ success: false, message: "Parameter tipe wajib diisi." });

      apiUrl = `https://apidev.biz.id/api/checker?action=getEwallet&tipe=${kode_bank}&nomor_rekening=${nomor_rekening}&apikey=${API_KEY}`;
    } else if (action === "getBankList") {
      apiUrl = `https://apidev.biz.id/api/checker?action=getBankList&apikey=${API_KEY}`;
    } else {
      return res.status(400).json({ success: false, message: "Action tidak dikenali." });
    }

    const response = await fetch(apiUrl);
    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error("Gagal mengambil data:", error);
    return res.status(500).json({ success: false, message: "Gagal mengambil data dari server eksternal." });
  }
}
