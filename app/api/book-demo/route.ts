import { NextResponse } from 'next/server'
import { sendDemoNotification } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    console.log('New demo request:', data)

    // Send emails (notification to team + confirmation to customer)
    await sendDemoNotification(data)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Demo booking error:', error)
    return NextResponse.json({ error: 'Booking failed' }, { status: 500 })
  }
}
