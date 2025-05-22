import {
  createSession,
  getSession,
  destroySession
} from './sessionStore.js';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Daftar pengguna statis
    const users = {
      "user01": "pass01",
      "michael": "Michael188",
      "dimasyorke": "asd123123"
    };

    if (users[username] && users[username] === password) {
      const sessionId = Date.now().toString();

      // Hapus sesi lama (logout otomatis)
      destroySession(username);
      createSession(username, sessionId);

      // Set cookie HttpOnly
      res.setHeader('Set-Cookie', `token=${sessionId}; Path=/; HttpOnly; Max-Age=3600; SameSite=Strict`);
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: "Username atau password salah" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
