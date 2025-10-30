// api/ask.js  (for Vercel serverless functions)
export default async function handler(req, res) {
  return res.status(200).json({ answer: "AI chat functionality is disabled." });
}
  