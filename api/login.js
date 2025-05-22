import { setSession, clearSession } from "./sessionStore";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    const users = {
      user01: "pass01",
      michael: "Michael188",
      dimasyorke: "asd123123",
    };

    if (!users[username] || users[username] !== password) {
      return res.status(401).json({ success: false, message: "Username atau password salah" });
    }

    // Buat token unik
    const token = `${username}-${Date.now()}-${Math.random().toString(36).substr(2)}`;

    // Logout sesi lama jika ada
    clearSession(username);

    // Simpan sesi baru
    setSession(username, token);

    res.setHeader("Set-Cookie", `token=${token}; Path=/; HttpOnly; Max-Age=3600`);
    return res.status(200).json({ success: true });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
