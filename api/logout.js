export default function handler(req, res) {
  if (req.method === 'POST') {
    // Menghapus cookie token
    res.setHeader('Set-Cookie', 'token=; Path=/; HttpOnly; Max-Age=0');
    return res.status(200).json({ success: true, message: 'Logout berhasil' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}