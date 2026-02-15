import { NextResponse } from 'next/server'
import { sendSignupNotification } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    console.log('New signup:', data)

    // Send emails (best-effort, don't block the response)
    try {
      await sendSignupNotification(data)
    } catch (emailError) {
      console.error('Email sending failed (non-blocking):', emailError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 })
  }
}
