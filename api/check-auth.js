import { isValidSession } from "./sessionStore.js";

export default function handler(req, res) {
  const cookies = parseCookies(req.headers.cookie || "");
  console.log("Raw cookies:", req.headers.cookie);
  console.log("Parsed cookies:", cookies);

  const username = cookies.username;
  const sessionId = cookies.sessionId;

  console.log("Checking session for", username, sessionId);

  if (!username || !sessionId || !isValidSession(username, sessionId)) {
    console.log("Authentication failed");
    return res.status(401).json({ authenticated: false });
  }

  console.log("User is authenticated:", username);
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
