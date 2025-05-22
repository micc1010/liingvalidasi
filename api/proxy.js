import fetch from "node-fetch";

export default async function handler(req, res) {
  const { rekening, bank } = req.query;

  if (!rekening || !bank) {
    return res.status(400).json({ success: false, message: "Parameter rekening dan bank wajib diisi." });
  }

  // Daftar e-wallet yang didukung
  const ewallets = ["DANA", "OVO", "GOPAY", "LINKAJA", "SAKUKU"];

  // Base URL API
  const baseUrl = "https://apidev.biz.id/api/checker";

  let url = "";
  let apikey = process.env.APIKEY; // pastikan APIKEY sudah di set di environment variable

  if (ewallets.includes(bank.toUpperCase())) {
    // Jika bank termasuk e-wallet
    // API e-wallet biasanya tidak butuh kode_bank, hanya nomor dan provider
    // Sesuaikan parameter API-nya sesuai dokumentasi e-wallet, contoh:
    url = `${baseUrl}?action=ewallet&provider=${bank.toLowerCase()}&nomor_hp=${rekening}&apikey=${apikey}`;
  } else {
    // Untuk bank biasa, wajib kode_bank dan nomor_rekening
    url = `${baseUrl}?action=getAccount&kode_bank=${bank}&nomor_rekening=${rekening}&apikey=${apikey}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Sukses, kirim data dari API langsung
    if (data.success) {
      res.status(200).json(data);
    } else {
      // Jika error dari API, teruskan pesan error
      res.status(400).json({ success: false, message: data.message || "API error", error: data.error || {} });
    }
  } catch (error) {
    console.error("Fetch API error:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
}
