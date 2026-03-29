import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_key')

interface PartnerBody {
  name: string
  organisation: string
  email: string
  budget: string
  message: string
}

export async function POST(request: Request) {
  try {
    const body: PartnerBody = await request.json()
    const { name, organisation, email, budget, message } = body

    // Validate
    if (!name || name.trim().length < 2) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }
    if (!message || message.trim().length < 10) {
      return NextResponse.json({ error: 'Message must be at least 10 characters' }, { status: 400 })
    }

    // Dev fallback
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'your_resend_api_key') {
      await new Promise((r) => setTimeout(r, 500))
      return NextResponse.json({ success: true, simulated: true })
    }

    await resend.emails.send({
      from: 'News Potli Partnerships <noreply@newspotli.com>',
      to: 'hello@newspotli.com',
      subject: `[Partnership] ${organisation || name} — ${budget || 'Budget TBD'}`,
      html: `
        <h2>New Partnership Enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Organisation:</strong> ${organisation || 'N/A'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
        <hr/>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
      replyTo: email,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Partnership form error:', error)
    return NextResponse.json({ error: 'Failed to send enquiry' }, { status: 500 })
  }
}
