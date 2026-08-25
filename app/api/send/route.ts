import { google } from "googleapis";
import { NextResponse } from "next/server";

function encodeMessage(message: string) {
  const encoded = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  return encoded.replaceAll("=", "");
}

function cleanHeader(value: string) {
  return value.replace(/[\r\n]/g, " ").trim();
}

export async function POST(req: Request) {
  try {
    const clientId = process.env.GMAIL_CLIENT_ID;
    const clientSecret = process.env.GMAIL_CLIENT_SECRET;
    const refreshToken = process.env.GMAIL_REFRESH_TOKEN;
    const sender = process.env.GMAIL_USER;
    const recipient = process.env.GMAIL_TO;

    if (!clientId || !clientSecret || !refreshToken || !sender || !recipient) {
      return NextResponse.json(
        { error: "Gmail service is not configured" },
        { status: 503 },
      );
    }

    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const subject = `Portfolio Contact: ${cleanHeader(name)}`;
    const text = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const rawMessage = [
      `From: Portfolio Contact <${sender}>`,
      `To: ${recipient}`,
      `Reply-To: ${cleanHeader(email)}`,
      `Subject: ${subject}`,
      "Content-Type: text/plain; charset=UTF-8",
      "MIME-Version: 1.0",
      "",
      text,
    ].join("\r\n");

    const auth = new google.auth.OAuth2(clientId, clientSecret);
    auth.setCredentials({ refresh_token: refreshToken });

    const gmail = google.gmail({ version: "v1", auth });
    const result = await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw: encodeMessage(rawMessage) },
    });

    return NextResponse.json({ success: true, id: result.data.id });
  } catch (err) {
    console.error("Gmail send error:", err);
    return NextResponse.json(
      { error: "Unable to send email" },
      { status: 500 },
    );
  }
}
