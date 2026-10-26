import { NextResponse } from 'next/server'
import { sendDemoNotification } from '@/lib/email'
import { FORM_DOWN } from '@/lib/company'

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

    // The email is the only place the request goes, so without it the visitor must not see success
    try {
      await sendDemoNotification(data)
    } catch (emailError) {
      console.error('Booking email failed, request not delivered:', emailError)
      return NextResponse.json({ error: FORM_DOWN }, { status: 503 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json({ error: 'Неуспешна заявка' }, { status: 500 })
  }
}
