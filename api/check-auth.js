import { isSessionValid } from "./sessionStore.js";

export default function handler(req, res) {
  const cookies = req.headers.cookie || "";
  const token = cookies
    .split("; ")
    .find(row => row.startsWith("token="))
    ?.split("=")[1];

  if (!token) return res.status(401).end();

  // Cek token terhadap semua session yang ada
  let valid = false;
  for (const [username, sessionToken] of global.sessions.entries()) {
    if (token === sessionToken) {
      valid = true;
      break;
    }
  }

  if (valid) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ success: false });
  }
}
