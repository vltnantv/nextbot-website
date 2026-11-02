import { NextResponse } from 'next/server'
import { clientIp, createRateLimiter, HOUR } from '@/lib/rate-limit'

// ARIA waiting list (form on /aria): name, phone or email, business. Delivered by email via Web3Forms
// to the address the WEB3FORMS_ACCESS_KEY belongs to.

// 5 sign-ups per visitor IP per hour
const limit = createRateLimiter({ limit: 5, windowMs: HOUR })

export async function POST(request: Request) {
  const rl = limit(clientIp(request.headers))
  if (!rl.ok) {
    return NextResponse.json(
      { success: false, error: 'Твърде много опити. Опитайте по-късно.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSec) } },
    )
  }
  try {
    const { name, contact, business } = await request.json()
    const clean = (v: unknown) => (typeof v === 'string' ? v.trim().slice(0, 200) : '')
    const data = { name: clean(name), contact: clean(contact), business: clean(business) }

    if (!data.name || !data.contact) {
      return NextResponse.json({ success: false, error: 'Име и телефон или имейл са задължителни' }, { status: 400 })
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        subject: `ARIA — нов в списъка: ${data.name}`,
        from_name: 'NextBot сайт',
        name: data.name,
        message: `Име: ${data.name}\nТелефон или имейл: ${data.contact}\nБизнес: ${data.business || '—'}`,
      }),
    })

    const result = await response.json()
    if (!result.success) throw new Error(result.message || 'Web3Forms submission failed')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Aria waitlist error:', error)
    return NextResponse.json({ success: false, error: 'Неуспешно записване' }, { status: 500 })
  }
}
