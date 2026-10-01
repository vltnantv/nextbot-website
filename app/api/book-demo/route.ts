import { NextResponse } from 'next/server'
import { sendDemoNotification } from '@/lib/email'

// /razgovor form: име, телефон, имейл (по желание), бизнес и бранш, удобен час, consent.
export async function POST(request: Request) {
  try {
    const body = await request.json()
    // values go into an HTML email: trim, cap and escape them
    const clean = (v: unknown, max = 200) =>
      (typeof v === 'string' ? v.trim().slice(0, max) : '').replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)
    const data = {
      name: clean(body.name),
      phone: clean(body.phone, 40),
      email: clean(body.email),
      company: clean(body.company),
      preferredDate: clean(body.preferredDate, 40),
      preferredTime: clean(body.preferredTime, 80),
      message: clean(body.message, 600),
    }

    if (!data.name || !data.phone || body.consent !== true) {
      return NextResponse.json({ error: 'Име, телефон и съгласие са задължителни' }, { status: 400 })
    }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) data.email = ''

    // Emails are best-effort and must not block the answer to the visitor
    try {
      await sendDemoNotification(data)
    } catch (emailError) {
      console.error('Email sending failed (non-blocking):', emailError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json({ error: 'Неуспешна заявка' }, { status: 500 })
  }
}
