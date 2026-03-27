import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Fallback for development if no key is provided
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_key')

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      )
    }

    // In local dev without a real key, simulate success
    if (process.env.RESEND_API_KEY === 'your_resend_api_key' || !process.env.RESEND_API_KEY) {
      console.log('Simulating newsletter subscription for:', email)
      await new Promise(resolve => setTimeout(resolve, 800)) // delay simulation
      return NextResponse.json({ success: true, message: 'Subscribed successfully (Simulated)' })
    }

    const data = await resend.contacts.create({
      email: email,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
      unsubscribed: false,
    });

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Internal server error while subscribing.' },
      { status: 500 }
    )
  }
}
