import {
  createSession,
  getSession,
  destroySession,
  isSessionValid
} from './sessionStore.js';
import { nanoid } from "nanoid";

const users = [
  { username: process.env.LOGIN_USERNAME, password: process.env.LOGIN_PASSWORD },
  { username: "michael", password: "Michael188" },
  { username: "dimasyorke", password: "asd123123" },
];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      const sessionToken = nanoid();
      setSession(username, sessionToken);

      res.setHeader("Set-Cookie", `token=${sessionToken}; Path=/; HttpOnly; Max-Age=3600`);
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: "Username atau password salah" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
