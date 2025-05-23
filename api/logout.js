import { removeSession } from "./sessionStore.js";

export default function handler(req, res) {
  const cookies = parseCookies(req.headers.cookie || "");
  const username = cookies.username;

  if (username) {
    removeSession(username);
  }

  res.setHeader("Set-Cookie", [
    `username=deleted; Path=/; Max-Age=0`,
    `sessionId=deleted; Path=/; Max-Age=0`
  ]);

  return res.status(200).json({ success: true });
}

function parseCookies(cookieString) {
  const cookies = {};
  cookieString.split(";").forEach(cookie => {
    const [name, ...rest] = cookie.trim().split("=");
    cookies[name] = rest.join("=");
  });
  return cookies;
}
