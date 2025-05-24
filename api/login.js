import jwt from "jsonwebtoken";

// Simpel session store di memory (key: username, value: token)
const sessionStore = {};

// Secret JWT dari env variable
const JWT_SECRET = process.env.JWT_SECRET || "ini_rahasia";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { username, password } = req.body;

  // Daftar user (bisa di env atau db)
  const users = {
    michael: "micc1010",
    dimasyorke: "asd123123",
    // tambah user lain di sini
  };

  if (!(username in users) || users[username] !== password) {
    return res.status(401).json({ success: false, message: "Username atau password salah" });
  }

  // Generate JWT token
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

  // Simpan token di sessionStore (invalidate token lama)
  sessionStore[username] = token;

  // Set cookie HttpOnly dengan JWT
  res.setHeader(
    "Set-Cookie",
    `token=${token}; Path=/; HttpOnly; Max-Age=3600; SameSite=Strict`
  );

  return res.status(200).json({ success: true });
}

// Ekspor sessionStore agar bisa dipakai di check-auth.js dan logout.js
export { sessionStore, JWT_SECRET };
