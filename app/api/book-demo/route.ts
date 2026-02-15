import { NextResponse } from 'next/server'
import { sendDemoNotification } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    console.log('New demo request:', data)

    // Send emails (best-effort, don't block the response)
    try {
      await sendDemoNotification(data)
    } catch (emailError) {
      console.error('Email sending failed (non-blocking):', emailError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Demo booking error:', error)
    return NextResponse.json({ error: 'Booking failed' }, { status: 500 })
  }
}
