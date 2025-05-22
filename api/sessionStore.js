const sessions = global.sessions || new Map();
if (!global.sessions) {
  global.sessions = sessions;
}

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
