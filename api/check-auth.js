import { getSessions } from "./sessionStore";

export default function handler(req, res) {
  const cookies = req.headers.cookie || "";
  const token = cookies
    .split("; ")
    .find(row => row.startsWith("token="))
    ?.split("=")[1];

  if (!token) return res.status(401).end();

  const sessions = getSessions();
  const valid = Object.values(sessions).includes(token);

  if (valid) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ success: false });
  }
}
