import { getSessions, clearSession } from "./sessionStore";

export default function handler(req, res) {
  if (req.method === "POST") {
    const cookies = req.headers.cookie || "";
    const token = cookies
      .split("; ")
      .find(row => row.startsWith("token="))
      ?.split("=")[1];

    const sessions = getSessions();
    for (const [username, sessionToken] of Object.entries(sessions)) {
      if (sessionToken === token) {
        clearSession(username);
        break;
      }
    }

    res.setHeader("Set-Cookie", `token=deleted; Path=/; Max-Age=0`);
    return res.status(200).json({ success: true });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
