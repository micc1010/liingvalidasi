// Sesi disimpan dalam memori (reset kalau server restart)
const sessionMap = new Map();

export function createSession(username) {
  const sessionId = generateRandomToken();
  sessionMap[username] = sessionId;
  console.log("Session created for", username, ":", sessionId);
  return sessionId;
}

export function isValidSession(username, sessionId) {
  const valid = sessionMap[username] === sessionId;
  console.log(`Validating session for ${username}:`, valid);
  return valid;
}

export function removeSession(username) {
  console.log("Session removed for", username);
  delete sessionMap[username];
}

