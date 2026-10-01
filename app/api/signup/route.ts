import { NextResponse } from 'next/server'

// No accounts at this stage (Valentin, 01.10.2026): sign-up is switched off and sends no emails.
// The route stays so it can come back; it answers 410 Gone.
export async function POST() {
  return NextResponse.json({ error: 'Регистрацията не е активна' }, { status: 410 })
}
