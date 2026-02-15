import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        to: 'valentinantov03@gmail.com',
        subject: '🎤 New Aria Waitlist Signup',
        from_name: 'Nextbot Website',
        email,
        message: `New Aria waitlist signup: ${email}`,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Web3Forms submission failed');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Aria waitlist error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit waitlist signup' },
      { status: 500 }
    );
  }
}
