// /api/login.js
import { createSession } from "./sessionStore.js";

const USERS = {
  dimasyorke: "asd123123",
  michael: "micc1010",
};

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { username, password } = req.body;
  const validPassword = USERS[username];

  if (!validPassword || password !== validPassword) {
    return res.status(401).json({ success: false, message: "Username atau password salah" });
  }

  const token = createSession(username);
  const cookieValue = `token=${token}; Path=/; HttpOnly; Max-Age=3600; SameSite=Strict; Secure; username=${username}`;

  res.setHeader("Set-Cookie", cookieValue);
  return res.status(200).json({ success: true });
}
