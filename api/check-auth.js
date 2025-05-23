import { isValidSession } from "./sessionStore.js";

export default function handler(req, res) {
  const cookies = parseCookies(req.headers.cookie || "");
  const username = cookies.username;
  const sessionId = cookies.sessionId;

  if (!username || !sessionId || !isValidSession(username, sessionId)) {
    return res.status(401).json({ authenticated: false });
  }

  return res.status(200).json({ authenticated: true });
}

function parseCookies(cookieString) {
  const cookies = {};
  cookieString.split(";").forEach(cookie => {
    const [name, ...rest] = cookie.trim().split("=");
    cookies[name] = rest.join("=");
  });
  return cookies;
}
