import jwt from "jsonwebtoken";
import { sessionStore, JWT_SECRET } from "./login.js";

export default function handler(req, res) {
  const cookies = req.headers.cookie || "";
  const match = cookies.match(/token=([^;]+)/);
  if (!match) {
    return res.status(401).json({ authenticated: false });
  }
  const token = match[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Cek apakah token ini masih aktif di sessionStore (single session)
    if (sessionStore[decoded.username] !== token) {
      return res.status(401).json({ authenticated: false });
    }

    return res.status(200).json({ authenticated: true, username: decoded.username });
  } catch (e) {
    return res.status(401).json({ authenticated: false });
  }
}
