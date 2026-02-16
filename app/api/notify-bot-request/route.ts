import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        subject: 'New Bot Request - Nextbot',
        from_name: 'Nextbot Platform',
        to: 'valentinantov03@gmail.com',
        message: `
NEW BOT REQUEST

User Email: ${data.userEmail}
Business Type: ${data.businessType}
Channels: ${data.channels.join(', ')}
Expected Volume: ${data.expectedVolume}

Use Cases:
${data.useCases}

Additional Info:
${data.additionalInfo || 'N/A'}

ACTION: Setup bot for this customer within 24h
        `.trim()
      })
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Notification error:', error)
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 })
  }
}
