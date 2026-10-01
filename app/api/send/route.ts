import { NextResponse } from "next/server";

function encodeMessage(message: string) {
  const bytes = new TextEncoder().encode(message);
  let binary = "";

  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    binary += String.fromCodePoint(...bytes.subarray(offset, offset + 0x8000));
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function cleanHeader(value: string) {
  return value.replace(/[\r\n]/g, " ").trim();
}

export async function POST(req: Request) {
  try {
    const clientId = process.env.GMAIL_CLIENT_ID?.trim();
    const clientSecret = process.env.GMAIL_CLIENT_SECRET?.trim();
    const refreshToken = process.env.GMAIL_REFRESH_TOKEN?.trim();
    const sender = process.env.GMAIL_USER?.trim();
    const recipient = process.env.GMAIL_TO?.trim();

    if (!clientId || !clientSecret || !refreshToken || !sender || !recipient) {
      return NextResponse.json(
        { error: "Gmail service is not configured" },
        { status: 503 },
      );
    }

    const body = await req.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message =
      typeof body.message === "string" ? body.message.trim() : "";

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

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      console.error("Gmail OAuth token exchange failed:", tokenResponse.status, error);
      return NextResponse.json(
        { error: "Email service authentication failed" },
        { status: 502 },
      );
    }

    const tokenData = (await tokenResponse.json()) as {
      access_token?: string;
    };

    if (!tokenData.access_token) {
      console.error("Gmail OAuth token response did not include an access token");
      return NextResponse.json(
        { error: "Email service authentication failed" },
        { status: 502 },
      );
    }

    const gmailResponse = await fetch(
      "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ raw: encodeMessage(rawMessage) }),
      },
    );

    if (!gmailResponse.ok) {
      const error = await gmailResponse.text();
      console.error("Gmail API send failed:", gmailResponse.status, error);
      return NextResponse.json(
        { error: "Unable to send email" },
        { status: 502 },
      );
    }

    const result = (await gmailResponse.json()) as { id?: string };

    return NextResponse.json({ success: true, id: result.id });
  } catch (err) {
    console.error("Gmail send error:", err);
    return NextResponse.json(
      { error: "Unable to send email" },
      { status: 500 },
    );
  }
}
