import { NextResponse } from 'next/server'
import { sendDemoNotification } from '@/lib/email'
import { clientIp, createRateLimiter, HOUR } from '@/lib/rate-limit'

// /razgovor form: име, телефон, имейл (по желание), бизнес и бранш, удобен час, consent.
// The request is only delivered by email, so if the email to the team does not go out the visitor gets an
// error and can try again or call (the form shows „Не успяхме да изпратим“).

// 5 requests per visitor IP per hour
const limit = createRateLimiter({ limit: 5, windowMs: HOUR })

export async function POST(request: Request) {
  const rl = limit(clientIp(request.headers))
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'Твърде много заявки. Опитайте по-късно.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSec) } },
    )
  }
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

    await sendDemoNotification(data)

    return NextResponse.json({ success: true })
  } catch (error) {
    // no personal data in the log: only the error message
    console.error('Booking error:', error instanceof Error ? error.message : 'unknown')
    return NextResponse.json({ error: 'Неуспешна заявка' }, { status: 500 })
  }
}
