// api/sessionStore.js
const sessions = new Map();

export function createSession(username, sessionId) {
  sessions.set(username, sessionId);
}

export function getSession(username) {
  return sessions.get(username);
}

export function destroySession(username) {
  sessions.delete(username);
}

export function isSessionValid(username, sessionId) {
  return sessions.get(username) === sessionId;
}
