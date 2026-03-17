import { NextRequest, NextResponse } from 'next/server'
import { sendHotelOutreachBg } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const { emails, secret } = await req.json()

    // Simple secret to prevent accidental sends
    if (secret !== process.env.EMAIL_SEND_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json({ error: 'emails array is required' }, { status: 400 })
    }

    const results: { email: string; status: 'sent' | 'failed'; error?: string }[] = []

    for (const email of emails) {
      try {
        await sendHotelOutreachBg({ recipientEmail: email })
        results.push({ email, status: 'sent' })
        // Small delay between sends to avoid rate limits
        await new Promise(r => setTimeout(r, 500))
      } catch (err) {
        results.push({ email, status: 'failed', error: String(err) })
      }
    }

    const sent = results.filter(r => r.status === 'sent').length
    const failed = results.filter(r => r.status === 'failed').length

    return NextResponse.json({ sent, failed, total: emails.length, results })
  } catch (error) {
    console.error('Hotel outreach error:', error)
    return NextResponse.json({ error: 'Failed to send emails' }, { status: 500 })
  }
}
