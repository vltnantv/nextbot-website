import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
}

export async function POST(req: NextRequest) {
  try {
    const { messages, companyName } = await req.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ lead: null })
    }

    // Build conversation text
    const convo = messages
      .map((m: { role: string; text: string }) => `${m.role === 'user' ? 'Customer' : 'Bot'}: ${m.text}`)
      .join('\n')

    const openai = getOpenAI()

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You extract lead/contact information from chat conversations. Return ONLY valid JSON, no markdown.

If you find ANY contact details or the person identified themselves, return:
{
  "found": true,
  "name": "full name or null",
  "email": "email or null",
  "phone": "phone or null",
  "address": "address or null",
  "interest": "what they want in 5-10 words",
  "status": "new or qualified"
}

If no contact info was shared, return: {"found": false}

Rules:
- "name" = the CUSTOMER's name, not the bot or company name
- Only extract info the customer explicitly provided
- "address" = any address/location the customer provided (for on-site visits, deliveries, inspections etc.)
- "qualified" = they showed clear buying intent (wants to book, buy, schedule)
- "interest" = brief summary of what they need`,
        },
        {
          role: 'user',
          content: `Company: ${companyName || 'Unknown'}\n\nConversation:\n${convo}`,
        },
      ],
      max_tokens: 200,
      temperature: 0.1,
    })

    const raw = completion.choices[0]?.message?.content?.trim() || '{}'
    const cleaned = raw.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '')

    try {
      const data = JSON.parse(cleaned)
      return NextResponse.json({ lead: data })
    } catch {
      return NextResponse.json({ lead: null })
    }
  } catch (error) {
    console.error('Extract lead error:', error)
    return NextResponse.json({ lead: null })
  }
}
