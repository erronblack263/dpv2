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

    console.log('Sending email with API key:', process.env.RESEND_API_KEY ? 'SET' : 'NOT SET')

    const result = await resend.emails.send({
      from: 'Portfolio <contact@sage.highspec.dpdns.org>',
      to: ['musonzahw@gmail.com'],
      subject: `New message from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6d28d9;">New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Reply to:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr style="border: 1px solid #e5e7eb;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
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
