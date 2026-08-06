import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, email, subject, message } = req.body;

    const text = `New Contact Form Submission
Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}`;

    const whatsappRes = await fetch(
      `https://graph.facebook.com/v20.0/${process.env.WA_PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.WA_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: process.env.WA_RECIPIENT_NUMBER,
          type: "text",
          text: {
            body: text,
          },
        }),
      }
    );

    if (!whatsappRes.ok) {
      const error = await whatsappRes.text();
      return res.status(502).json({
        success: false,
        error,
      });
    }

    return res.status(200).json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
}