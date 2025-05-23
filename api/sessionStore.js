// Sesi disimpan dalam memori (reset kalau server restart)
const sessionMap = new Map();

export function createSession(username) {
  const sessionId = `${username}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  sessionMap.set(username, sessionId);
  return sessionId;
}

export function getSession(username) {
  return sessionMap.get(username);
}

export function isValidSession(username, sessionId) {
  return sessionMap.get(username) === sessionId;
}

export function removeSession(username) {
  sessionMap.delete(username);
}
