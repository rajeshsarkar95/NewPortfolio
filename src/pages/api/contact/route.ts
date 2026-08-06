export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();

  const text = `New Contact Form Submission
Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}`;

  const res = await fetch(
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
        text: { body: text },
      }),
    }
  );

  if (!res.ok) return Response.json({ error: "Failed" }, { status: 502 });
  return Response.json({ success: true });
}