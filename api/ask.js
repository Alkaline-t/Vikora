import OpenAI from "openai";

export default async function handler(req, res) {
  return res.status(200).json({ reply: "AI chat functionality is disabled." });
}
