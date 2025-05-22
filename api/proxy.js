export default async function handler(req, res) {
  const { rekening, kode } = req.query;
  const APIKEY = process.env.APIKEY;

  if (!kode) {
    return res.status(400).json({
      success: false,
      message: "Parameter kode (bank atau ewallet) harus diisi",
    });
  }

  try {
    // Tentukan apakah kode adalah e-wallet atau bank
    // Misal kode e-wallet biasanya huruf semua (bisa buat list validasi)
    const ewalletList = ["DANA", "OVO", "GOPAY", "LINKAJA", "SAKUKU"];

    if (rekening && !rekening.trim() && !ewalletList.includes(kode.toUpperCase())) {
      return res.status(400).json({
        success: false,
        message: "Nomor rekening harus diisi",
      });
    }

    let url = new URL("https://apidev.biz.id/api/checker");

    if (ewalletList.includes(kode.toUpperCase())) {
      // Jika e-wallet, misal pakai action getAccount (sesuaikan dokumentasi)
      url.searchParams.append("action", "getAccount");
      url.searchParams.append("apikey", APIKEY);
      url.searchParams.append("kode_bank", kode.toUpperCase());
      url.searchParams.append("nomor_rekening", rekening);
    } else {
      // Bank biasa
      url.searchParams.append("action", "getAccount");
      url.searchParams.append("apikey", APIKEY);
      url.searchParams.append("kode_bank", kode);
      url.searchParams.append("nomor_rekening", rekening);
    }

    const response = await fetch(url.toString());
    const data = await response.json();

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server proxy",
      error: error.message,
    });
  }
}
