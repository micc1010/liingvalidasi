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

  console.log("Login attempt:", { username, password });
  console.log("Token created:", token);
  res.setHeader("Set-Cookie", [
    `username=${username}; Path=/; SameSite=Strict`,
    `sessionId=${token}; Path=/; SameSite=Strict`
  ]);
  console.log("Set-Cookie header sent:", [
    `username=${username}; Path=/; SameSite=Strict`,
    `sessionId=${token}; Path=/; SameSite=Strict`
  ]);
}
