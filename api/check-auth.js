import { getSession } from "./sessionStore.js";

export default function handler(req, res) {
  const cookies = req.headers.cookie || "";
  const tokenMatch = cookies.match(/token=authenticated;?\s*sessionId=([\w-]+)/);
  const sessionId = tokenMatch ? tokenMatch[1] : null;

  console.log("Token dari cookie:", cookies);
  console.log("Session ID yang diterima:", sessionId);

  if (!sessionId) {
    return res.status(401).json({ authenticated: false });
  }

  let username;
  for (const [user, sess] of Object.entries(sessionMap)) {
    if (sess === sessionId) {
      username = user;
      break;
    }
  }

  if (username) {
    res.status(200).json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false });
  }
}
