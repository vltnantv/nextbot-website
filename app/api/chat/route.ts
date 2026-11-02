import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { parseChatMessages } from '@/lib/chat-input'
import { clientIp, createRateLimiter, HOUR } from '@/lib/rate-limit'

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
}

const toneInstructions: Record<string, string> = {
  professional: 'Maintain a professional, courteous tone. Be clear and precise.',
  friendly: 'Be warm and friendly while remaining helpful and informative.',
  casual: 'Be casual and conversational, like chatting with a friend.',
}

const industryContexts: Record<string, string> = {
  hotel: 'You work for a hotel. Help guests with room availability, pricing, amenities, check-in/check-out, spa & wellness, restaurant, parking, and local attractions.',
  restaurant: 'You work for a restaurant. Help customers with reservations, menu items, dietary accommodations, hours, location, and special events.',
  dental: 'You work for a dental clinic. Help patients with appointment scheduling, services offered, insurance questions, emergency care, and general dental information.',
  realestate: 'You work for a real estate agency. Help clients with property listings, viewings, pricing, neighborhoods, mortgage info, and buying/selling processes.',
  education: 'You work for an educational institution. Help students and parents with enrollment, courses, schedules, tuition, campus info, and admissions.',
  ecommerce: 'You work for an online store. Help customers with products, orders, shipping, returns, sizing, and recommendations.',
  services: 'You work for a services company. Help clients with service offerings, pricing, scheduling, and general inquiries. If the business offers on-site services (repairs, inspections, estimates, cleaning, installations), always ask for the client\'s address when they want to schedule a visit.',
  autodealer: 'You work for a car dealership with a service centre. Help customers with cars in stock, leasing and financing options, test drives and viewings, trade-ins, and booking service appointments.',
  custom: 'Help users with their inquiries based on the provided knowledge base.',
}

const languageInstructions: Record<string, string> = {
  bg: 'Respond in Bulgarian (Български). Always use Bulgarian unless the user writes in another language.',
  en: 'Respond in English.',
  de: 'Respond in German (Deutsch). Always use German unless the user writes in another language.',
  ru: 'Respond in Russian (Русский). Always use Russian unless the user writes in another language.',
}

// 20 chat requests per visitor IP per hour (each answer is one request to OpenAI)
const limit = createRateLimiter({ limit: 20, windowMs: HOUR })

// The site demo chat (components/demo/ChatWidget.tsx). No database: the old dashboard options
// (botId, saveToDb) are gone, so a visitor cannot read or write any stored data through here.
export async function POST(req: NextRequest) {
  try {
    const rl = limit(clientIp(req.headers))
    if (!rl.ok) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429, headers: { 'Retry-After': String(rl.retryAfterSec) } },
      )
    }

    const body = await req.json().catch(() => null)
    const parsed = parseChatMessages(body?.messages)
    if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 })
    const { industry, tone, language } = body as Record<string, unknown>

    const openai = getOpenAI()

    // only known keys pick a text; anything else falls back to the default
    const pick = (map: Record<string, string>, key: unknown, fallback: string) =>
      typeof key === 'string' && Object.prototype.hasOwnProperty.call(map, key) ? map[key] : map[fallback]

    let systemPrompt = `You are Neo, an AI assistant.\n`
    systemPrompt += pick(toneInstructions, tone, 'professional')
    systemPrompt += '\n' + pick(industryContexts, industry ?? 'hotel', 'custom')
    systemPrompt += '\n' + pick(languageInstructions, language, 'bg') // the site is Bulgarian only (BRAND.md)

    systemPrompt += '\n\nIMPORTANT RULES:\n'
    systemPrompt += '- Keep responses concise (2-4 sentences unless more detail is requested)\n'
    systemPrompt += '- If a user wants to book or schedule, collect: name, date/time, and contact info (phone or email)\n'
    systemPrompt += '- If the service requires an on-site visit (repairs, inspections, estimates, deliveries, installations, cleaning, etc.), ALWAYS ask for the ADDRESS where the visit should happen\n'
    systemPrompt += '- If a user seems interested in services, try to capture their contact details as a lead\n'
    systemPrompt += '- Be helpful and proactive in suggesting relevant information\n'
    systemPrompt += '- Never make up specific prices, hours, or details unless provided in the knowledge base\n'

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...parsed.messages,
      ],
      stream: true,
      max_tokens: 500,
      temperature: 0.7,
    })

    const encoder = new TextEncoder()

    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content
          if (content) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`))
          }
        }

        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 },
    )
  }
}
