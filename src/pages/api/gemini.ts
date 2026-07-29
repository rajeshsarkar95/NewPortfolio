import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed. Use POST." });
  }

  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Prompt is required." });
    }

    if (!apiKey || !ai) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is missing from .env.local file.",
      });
    }

    // Updated active model
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    return res.status(200).json({ text: response.text });
  } catch (error: any) {
    console.error("Error in /api/gemini:", error);

    // Specific handling for Rate Limit (429) errors
    if (error?.status === 429 || error?.message?.includes("RESOURCE_EXHAUSTED")) {
      return res.status(429).json({
        error: "Rate limit reached! Please wait ~30 seconds before sending another message.",
      });
    }

    return res.status(500).json({
      error: error?.message || "An unexpected error occurred on the server.",
    });
  }
}