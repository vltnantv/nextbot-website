import { NextResponse } from 'next/server'
import { sendSignupNotification } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    console.log('New signup:', data)

    // Send emails (notification to team + welcome to customer)
    await sendSignupNotification(data)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 })
  }
}
