import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 503 })
    }

    const resend = new Resend(apiKey)
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const result = await resend.emails.send({
      from: 'Witness Portfolio <contact@sage.highspec.dpdns.org>',
      to: ['wmusonzah1@outlook.com'],
      subject: `Portfolio Contact: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;max-width:600px;width:100%;">
        <tr><td style="background:#6d28d9;padding:24px 32px;">
          <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">New Portfolio Message</h1>
        </td></tr>
        <tr><td style="padding:32px;">
          <p style="margin:0 0 16px;color:#374151;font-size:14px;">You received a new message from your portfolio contact form.</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;border-radius:8px;padding:16px;margin-bottom:16px;">
            <tr><td style="padding:4px 0;"><span style="color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;">Name</span></td></tr>
            <tr><td style="padding:0 0 12px;"><span style="color:#111827;font-size:15px;font-weight:500;">${name}</span></td></tr>
            <tr><td style="padding:4px 0;"><span style="color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;">Email</span></td></tr>
            <tr><td style="padding:0 0 12px;"><span style="color:#111827;font-size:15px;">${email}</span></td></tr>
            <tr><td style="padding:4px 0;"><span style="color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;">Message</span></td></tr>
            <tr><td style="padding:0;"><span style="color:#111827;font-size:15px;white-space:pre-wrap;">${message}</span></td></tr>
          </table>
          <p style="margin:0;color:#6b7280;font-size:12px;">Sent via sage.highspec.dpdns.org portfolio</p>
        </td></tr>
        <tr><td style="background:#f3f4f6;padding:20px 32px;border-top:1px solid #e5e7eb;text-align:center;">
          <img src="https://sage.highspec.dpdns.org/sage-logo.png" alt="Sage" style="height:32px;width:auto;margin-bottom:8px;display:block;margin-left:auto;margin-right:auto;" />
          <p style="margin:0;color:#6b7280;font-size:11px;">Powered by <strong style="color:#6d28d9;">Sage</strong> — Portfolio Platform</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    })

    console.log('Resend result:', JSON.stringify(result))

    if (result.error) {
      console.error('Resend error:', result.error)
      return NextResponse.json({ error: result.error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: result.data?.id })
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 })
  }
}
