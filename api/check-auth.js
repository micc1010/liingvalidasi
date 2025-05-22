// /api/check-auth.js
export default function handler(req, res) {
  const cookies = req.headers.cookie || "";
  const isAuthenticated = cookies.includes("token=authenticated");

  if (isAuthenticated) {
    res.status(200).json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false });
  }
}
