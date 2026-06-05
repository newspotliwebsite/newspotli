import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_key')

interface ContactBody {
  name: string
  email: string
  number?: string
  question?: string
  subject?: string
  message?: string
}

export async function POST(request: Request) {
  try {
    const body: ContactBody = await request.json()
    const name = (body.name || '').trim()
    const email = (body.email || '').trim()
    const number = (body.number || '').trim()
    const message = (body.question || body.message || '').trim()
    const subject = (body.subject || 'Footer Contact Form').trim()

    if (name.length < 2) {
      return NextResponse.json({ error: 'Name is required (min 2 chars)' }, { status: 400 })
    }
    if (!email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }
    if (message.length < 5) {
      return NextResponse.json({ error: 'Message must be at least 5 characters' }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'your_resend_api_key') {
      await new Promise((r) => setTimeout(r, 300))
      return NextResponse.json({ success: true, simulated: true })
    }

    await resend.emails.send({
      from: 'News Potli Contact <noreply@newspotli.com>',
      to: 'hello@newspotli.com',
      subject: `[Contact] ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${number ? `<p><strong>Phone:</strong> ${number}</p>` : ''}
        <hr/>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
      replyTo: email,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
