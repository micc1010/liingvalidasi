import { sessionStore } from "./login.js";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const cookies = req.headers.cookie || "";
  const match = cookies.match(/token=([^;]+)/);
  if (!match) {
    // kalau ga ada token di cookie, tetap anggap sukses logout
    return res.status(200).json({ success: true, message: "Logout berhasil" });
  }

  const token = match[1];

  // Cari username dari token di sessionStore dan hapus
  for (const [username, storedToken] of Object.entries(sessionStore)) {
    if (storedToken === token) {
      delete sessionStore[username];
      break;
    }
  }

  // Hapus cookie di browser
  res.setHeader("Set-Cookie", "token=; Path=/; HttpOnly; Max-Age=0");

  return res.status(200).json({ success: true, message: "Logout berhasil" });
}
