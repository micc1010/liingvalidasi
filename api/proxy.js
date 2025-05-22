export default async function handler(req, res) {
  const { rekening, bank } = req.query;
  const APIKEY = process.env.APIKEY; // Simpan APIKEY di Environment Variable Vercel

  if (!rekening || !bank) {
    return res.status(400).json({
      success: false,
      message: "Parameter rekening dan bank harus diisi",
    });
  }

  // Tentukan action API berdasarkan bank/ewallet
  // Misal ewallet: kode_bank bukan angka tapi string (DANA, OVO, dll)
  const isEwallet = isNaN(bank); // jika bank bukan angka maka ewallet

  // action yang akan dipakai:
  // Untuk bank: getAccount
  // Untuk ewallet: getEwallet (asumsi sesuai dokumentasi, sesuaikan jika beda)

  let action = "getAccount";
  if (isEwallet) {
    action = "getEwallet";
  }

  // Bangun URL endpoint
  const url = new URL("https://apidev.biz.id/api/checker");
  url.searchParams.append("action", action);
  url.searchParams.append("apikey", APIKEY);
  url.searchParams.append("kode_bank", bank);
  url.searchParams.append("nomor_rekening", rekening);

  try {
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
