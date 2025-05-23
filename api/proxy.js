import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { action, kode_bank, nomor_rekening } = req.query;
  const apikey = process.env.APIKEY;  // Ambil dari env variable

  if (!apikey) {
    return res.status(500).json({ success: false, message: "API key belum diset di environment variables." });
  }

  if (!action || !kode_bank || !nomor_rekening) {
    return res.status(400).json({ success: false, message: "Parameter kurang lengkap" });
  }

  if (action !== "getAccount") {
    return res.status(400).json({ success: false, message: "Action tidak dikenal atau tidak didukung oleh API" });
  }

  try {
    const apiUrl = `https://apidev.biz.id/api/checker?action=getAccount&kode_bank=${encodeURIComponent(kode_bank)}&nomor_rekening=${encodeURIComponent(nomor_rekening)}&apikey=${apikey}`;

    const apiRes = await fetch(apiUrl);
    const data = await apiRes.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server proxy." });
  }
}
