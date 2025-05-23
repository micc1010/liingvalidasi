// /api/logout.js
import { invalidateSession } from "./sessionStore.js";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const cookies = req.headers.cookie || "";
  const usernameMatch = cookies.match(/username=([^;]+)/);
  if (usernameMatch) invalidateSession(usernameMatch[1]);

  // Hapus cookie
  res.setHeader("Set-Cookie", [
    "token=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict",
    "username=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict"
  ]);

  return res.status(200).json({ success: true, message: "Logout berhasil" });
}
