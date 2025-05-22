let sessions = {};

export function getSessions() {
  return sessions;
}

export function setSession(username, token) {
  sessions[username] = token;
}

export function clearSession(username) {
  delete sessions[username];
}

export function isSessionValid(username, token) {
  return sessions[username] === token;
}
