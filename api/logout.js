import { getSessions, clearSession } from "./sessionStore";

export default function handler(req, res) {
  const cookies = req.headers.cookie || "";
  const token = cookies
    .split("; ")
    .find(row => row.startsWith("token="))
    ?.split("=")[1];

  if (token) {
    const sessions = getSessions();
    for (const [username, sessionToken] of Object.entries(sessions)) {
      if (sessionToken === token) {
        clearSession(username);
        break;
      }
    }
  }

  res.setHeader("Set-Cookie", "token=; Path=/; HttpOnly; Max-Age=0");
  res.status(200).json({ success: true });
}
