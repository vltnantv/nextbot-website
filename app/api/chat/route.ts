import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { createClient } from '@supabase/supabase-js'

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
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
  custom: 'Help users with their inquiries based on the provided knowledge base.',
}

const languageInstructions: Record<string, string> = {
  bg: 'Respond in Bulgarian (Български). Always use Bulgarian unless the user writes in another language.',
  en: 'Respond in English.',
  de: 'Respond in German (Deutsch). Always use German unless the user writes in another language.',
  ru: 'Respond in Russian (Русский). Always use Russian unless the user writes in another language.',
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { messages, botId, industry, tone, language, conversationId, saveToDb, channel, customerName, customerEmail } = body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 })
    }

    const openai = getOpenAI()
    const supabase = getSupabase()

    // Optionally create or use existing conversation
    let convId = conversationId
    if (saveToDb && !convId) {
      try {
        const { data: conv } = await supabase
          .from('conversations')
          .insert({
            channel: channel || 'web',
            customer_name: customerName || 'Website Visitor',
            customer_email: customerEmail || null,
            status: 'active',
          })
          .select('id')
          .single()
        if (conv) convId = conv.id
      } catch {
        // Table may not exist yet — continue without persistence
      }
    }

    // Save the user message
    const lastUserMessage = messages[messages.length - 1]
    if (saveToDb && convId && lastUserMessage?.role === 'user') {
      try {
        await supabase.from('messages').insert({
          conversation_id: convId,
          role: 'user',
          content: lastUserMessage.content,
        })
      } catch { /* ignore */ }
    }

    // Build system prompt
    let systemPrompt = 'You are Neo, an AI assistant.'

    // If botId provided, fetch bot config and knowledge from DB
    if (botId) {
      try {
        const { data: bot } = await supabase.from('bots').select('*').eq('id', botId).single()
        if (bot) {
          systemPrompt = `You are ${bot.name || 'Neo'}, an AI assistant.\n`
          systemPrompt += toneInstructions[bot.tone] || toneInstructions.professional
          systemPrompt += '\n' + (industryContexts[bot.industry] || industryContexts.custom)
          systemPrompt += '\n' + (languageInstructions[bot.language] || languageInstructions.en)

          if (bot.welcome_message) {
            systemPrompt += `\n\nWhen greeting users for the first time, use something similar to: "${bot.welcome_message}"`
          }

          const { data: knowledge } = await supabase
            .from('knowledge')
            .select('title, content, type')
            .eq('bot_id', botId)

          if (knowledge && knowledge.length > 0) {
            systemPrompt += '\n\n--- KNOWLEDGE BASE ---\nUse the following information to answer questions accurately:\n\n'
            knowledge.forEach((k) => {
              systemPrompt += `[${k.type.toUpperCase()}] ${k.title}:\n${k.content}\n\n`
            })
            systemPrompt += '--- END KNOWLEDGE BASE ---\nAlways prefer information from the knowledge base. If you don\'t have the answer, say so honestly.'
          }
        }
      } catch {
        // Bot lookup failed — use demo mode
      }
    } else {
      // Demo mode — use passed params
      const t = tone || 'professional'
      const ind = industry || 'hotel'
      const lang = language || 'en'

      systemPrompt = `You are Neo, an AI assistant.\n`
      systemPrompt += toneInstructions[t] || toneInstructions.professional
      systemPrompt += '\n' + (industryContexts[ind] || industryContexts.custom)
      systemPrompt += '\n' + (languageInstructions[lang] || languageInstructions.en)
    }

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
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role as 'user' | 'assistant' | 'system',
          content: m.content,
        })),
      ],
      stream: true,
      max_tokens: 500,
      temperature: 0.7,
    })

    const encoder = new TextEncoder()
    let fullResponse = ''

    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content
          if (content) {
            fullResponse += content
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`))
          }
        }

        // Send conversation ID back if created
        if (convId) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ conversationId: convId })}\n\n`))
        }

        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()

        // Save assistant response to DB after stream completes
        if (saveToDb && convId && fullResponse) {
          try {
            await supabase.from('messages').insert({
              conversation_id: convId,
              role: 'assistant',
              content: fullResponse,
            })
          } catch { /* ignore */ }
        }
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
