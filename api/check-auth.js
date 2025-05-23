// /api/check-auth.js
import { isSessionValid } from "./sessionStore.js";

export default function handler(req, res) {
  const cookies = req.headers.cookie || "";
  const tokenMatch = cookies.match(/token=([^;]+)/);
  const usernameMatch = cookies.match(/username=([^;]+)/);

  if (!tokenMatch || !usernameMatch) {
    return res.status(401).json({ authenticated: false });
  }

  const token = tokenMatch[1];
  const username = usernameMatch[1];

  if (isSessionValid(username, token)) {
    res.status(200).json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false });
  }
}
