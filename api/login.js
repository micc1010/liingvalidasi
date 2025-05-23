import { createSession } from "./sessionStore.js";

const USERS = {
  dimasyorke: "asd123123",
  michael: "micc1010",
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }
  const body = JSON.parse(Buffer.concat(buffers).toString());
  const { username, password } = body;

  const validPassword = USERS[username];
  if (!validPassword || password !== validPassword) {
    return res.status(401).json({ success: false, message: "Username atau password salah" });
  }

  const sessionId = createSession(username);

  res.setHeader("Set-Cookie", [
    `username=${username}; Path=/; HttpOnly; SameSite=Strict`,
    `sessionId=${sessionId}; Path=/; HttpOnly; SameSite=Strict`
  ]);

  return res.status(200).json({ success: true });
}
