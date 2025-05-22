export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Ambil kredensial dari environment variable
    const USERNAME = process.env.LOGIN_USERNAME;
    const PASSWORD = process.env.LOGIN_PASSWORD;

    if (username === USERNAME && password === PASSWORD) {
      // Set cookie sederhana
      res.setHeader('Set-Cookie', `token=authenticated; Path=/; HttpOnly; Max-Age=3600`);
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: 'Username atau password salah' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
