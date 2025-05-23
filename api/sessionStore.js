// /api/sessionStore.js
const sessions = new Map(); // username -> token

export function createSession(username) {
  const token = crypto.randomUUID();
  sessions.set(username, token);
  return token;
}

export function getSession(username) {
  return sessions.get(username);
}

export function isSessionValid(username, token) {
  return sessions.get(username) === token;
}

export function invalidateSession(username) {
  sessions.delete(username);
}
