'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X } from 'lucide-react'
import { LiveDot } from '@/components/brand/LiveDot'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

type ChatWidgetProps = {
  industry?: string
  tone?: string
  language?: string
  botName?: string
  welcomeMessage?: string
  quickActions?: string[]
  accentColor?: string
  position?: 'bottom-right' | 'bottom-left'
  /** floating: launcher button + window in the corner. inline: always-open chat inside the page. */
  variant?: 'floating' | 'inline'
  /** Shown in the header instead of the bot name (e.g. „Дентален кабинет „Усмивка“"). */
  businessName?: string
  onConversationStart?: (conversationId: string) => void
}

export function ChatWidget({
  industry = 'hotel',
  tone = 'professional',
  language = 'bg',
  botName = 'Neo',
  welcomeMessage,
  quickActions = [],
  accentColor = '#6366f1',
  position = 'bottom-right',
  variant = 'floating',
  businessName,
}: ChatWidgetProps) {
  const inline = variant === 'inline'
  const [isOpen, setIsOpen] = useState(inline)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [hasGreeted, setHasGreeted] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const defaultWelcome = welcomeMessage || `Здравейте! Аз съм ${botName}. С какво мога да помогна?`

  const defaultQuickActions = quickActions.length > 0 ? quickActions : ['Цени и наличност', 'Записване на час', 'Връзка с човек']

  // Scroll only the message list - never the page (the inline chat sits in the middle of the homepage).
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, isStreaming])

  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setHasGreeted(true)
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: defaultWelcome,
        timestamp: new Date(),
      }])
    }
    // Inline chat must not grab focus (and scroll the page) on load.
    if (isOpen && !inline) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isStreaming) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsStreaming(true)

    const assistantId = `assistant-${Date.now()}`
    setMessages(prev => [...prev, {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    }])

    try {
      abortControllerRef.current = new AbortController()

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.filter(m => m.id !== 'welcome').map(m => ({
            role: m.role,
            content: m.content,
          })),
          industry,
          tone,
          language,
        }),
        signal: abortControllerRef.current.signal,
      })

      if (!res.ok) throw new Error('Chat request failed')

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) throw new Error('No reader')

      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') break

            try {
              const parsed = JSON.parse(data)
              if (parsed.content) {
                accumulated += parsed.content
                setMessages(prev => prev.map(m =>
                  m.id === assistantId ? { ...m, content: accumulated } : m
                ))
              }
            } catch {
              // skip malformed chunks
            }
          }
        }
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return
      setMessages(prev => prev.map(m =>
        m.id === assistantId
          ? { ...m, content: 'Съжалявам, възникна грешка. Моля, опитайте отново.' }
          : m
      ))
    } finally {
      setIsStreaming(false)
    }
  }, [messages, isStreaming, industry, tone, language])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const positionClasses = position === 'bottom-right' ? 'right-6 bottom-6' : 'left-6 bottom-6'
  const title = businessName || botName

  const panel = (
    <>
      {/* Header */}
      <div className="flex shrink-0 items-center gap-2.5 border-b border-[#F0EAE0] px-5 py-4">
        <LiveDot className="h-2 w-2" />
        <span className="truncate text-[15px] font-semibold text-ink">{title}</span>
        <span className="ml-auto shrink-0 text-[12px] text-stone">{botName} · чат в сайта</span>
        {!inline && (
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Затвори чата"
            className="-mr-1 ml-1 flex h-8 w-8 items-center justify-center rounded-full text-stone hover:bg-cream-deep hover:text-ink"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className={`flex flex-col gap-2.5 overflow-y-auto bg-[#FCFAF7] px-5 py-5 ${inline ? 'h-[300px]' : 'flex-1'}`}
        aria-live="polite"
      >
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={
                msg.role === 'user'
                  ? 'max-w-[80%] rounded-[18px_18px_4px_18px] bg-cream-deep px-3.5 py-2.5 text-[15px] leading-relaxed text-ink'
                  : 'max-w-[84%] rounded-[18px_18px_18px_4px] border border-line bg-white px-3.5 py-2.5 text-[15px] leading-relaxed text-ink'
              }
            >
              <p className="whitespace-pre-wrap">
                {msg.content || (
                  <span className="flex gap-1 py-1" aria-label="Пише…">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-stone/50" style={{ animationDelay: '0ms' }} />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-stone/50" style={{ animationDelay: '150ms' }} />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-stone/50" style={{ animationDelay: '300ms' }} />
                  </span>
                )}
              </p>
            </div>
          </motion.div>
        ))}

        {/* Suggestions until the visitor writes something */}
        {messages.length <= 1 && defaultQuickActions.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-2">
            {defaultQuickActions.map((action) => (
              <button
                key={action}
                type="button"
                onClick={() => sendMessage(action)}
                className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[14px] text-ink transition-colors hover:border-ink/30"
              >
                {action}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex shrink-0 gap-2.5 border-t border-[#F0EAE0] px-4 py-3.5">
        <label htmlFor={`chat-input-${variant}`} className="sr-only">
          Вашето съобщение
        </label>
        <input
          id={`chat-input-${variant}`}
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Напишете съобщение…"
          disabled={isStreaming}
          className="min-w-0 flex-1 rounded-full border border-line bg-cream px-4 py-2.5 text-[15px] text-ink outline-none placeholder:text-stone focus:border-ink/40 disabled:opacity-60"
        />
        <button
          type="submit"
          aria-label="Изпрати"
          disabled={!input.trim() || isStreaming}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-cream transition-[transform,opacity] hover:-translate-y-px disabled:opacity-40"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </form>
    </>
  )

  if (inline) {
    return <div className="flex flex-col overflow-hidden">{panel}</div>
  }

  return (
    <>
      {/* Launcher */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            type="button"
            aria-label="Отвори чата"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className={`fixed ${positionClasses} z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-soft transition-transform hover:-translate-y-0.5`}
            style={{ backgroundColor: accentColor }}
          >
            <MessageSquare className="size-6 text-cream" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label={`Чат с ${botName}`}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`fixed ${positionClasses} z-50 flex h-[560px] max-h-[80vh] w-[380px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-[24px] border border-line bg-white shadow-soft`}
          >
            {panel}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
