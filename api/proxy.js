export default async function handler(req, res) {
  const { action, kode_bank, nomor_rekening } = req.query;

  const url = `https://api.apidev.biz.id/cekrekening?nomor_rekening=${nomor_rekening}&kode_bank=${kode_bank}&action=${action}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Gagal mengambil data dari API:", error);
    res.status(500).json({ success: false, message: "Gagal terhubung ke server API." });
  }
}
