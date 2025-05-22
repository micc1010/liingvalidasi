export default async function handler(req, res) {
  const { rekening, bank } = req.query;
  const apiKey = process.env.APIKEY;

  if (!rekening || !bank) {
    return res.status(400).json({ error: "rekening dan bank harus diisi" });
  }

  const isEwallet = ["DANA", "OVO", "GOPAY", "LINKAJA", "SAKUKU"].includes(bank.toUpperCase());

  const url = `https://apidev.biz.id/api/checker?action=getAccount` +
    `&${isEwallet ? "ewallet" : "kode_bank"}=${bank}` +
    `&nomor_rekening=${rekening}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.success) {
      return res.status(500).json({ error: "API error", message: data.message });
    }

    const result = isEwallet
      ? {
          nama: data.data.nama_pemilik || "Tidak tersedia",
          bank: data.data.nama_ewallet || bank,
          nomor_rekening: data.data.nomor_hp || rekening
        }
      : {
          nama: data.data.nama_pemilik || "Tidak tersedia",
          bank: data.data.nama_bank || bank,
          nomor_rekening: data.data.nomor_rekening || rekening
        };

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
