import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function GET() {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)

    const result = await resend.emails.send({
      from: 'Nextbot <noreply@nextbot.me>',
      to: 'valentinantov03@gmail.com',
      subject: 'Test Email from Nextbot',
      html: '<p>This is a test email.</p>'
    })

    return NextResponse.json({ success: true, result })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
