// Checks the messages the site chat sends to /api/chat before anything goes to OpenAI.

/** what a visitor may type in one message */
export const MAX_MESSAGE_CHARS = 1000
/** earlier answers of the chat come back in the history (max_tokens 500 is about 2000 Cyrillic characters) */
export const MAX_ANSWER_CHARS = 4000
/** only the last messages of the conversation are sent on (keeps the OpenAI cost per request small) */
export const MAX_MESSAGES = 20

export type ChatMessage = { role: 'user' | 'assistant'; content: string }

export function parseChatMessages(input: unknown): { ok: true; messages: ChatMessage[] } | { ok: false; error: string } {
  if (!Array.isArray(input) || input.length === 0) return { ok: false, error: 'Messages are required' }
  if (input.length > 200) return { ok: false, error: 'Too many messages' }

  const messages: ChatMessage[] = []
  for (const m of input) {
    const role = (m as { role?: unknown })?.role
    const content = (m as { content?: unknown })?.content
    // "system" is set only by the server
    if (role !== 'user' && role !== 'assistant') return { ok: false, error: 'Invalid message' }
    if (typeof content !== 'string') return { ok: false, error: 'Invalid message' }
    if (content.length > (role === 'user' ? MAX_MESSAGE_CHARS : MAX_ANSWER_CHARS)) return { ok: false, error: 'Message is too long' }
    messages.push({ role, content })
  }

  const last = messages.slice(-MAX_MESSAGES)
  const lastMsg = last[last.length - 1]
  if (lastMsg.role !== 'user' || !lastMsg.content.trim()) return { ok: false, error: 'Invalid message' }
  return { ok: true, messages: last }
}
