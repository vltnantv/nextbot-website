'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Sparkles } from 'lucide-react'

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
  onConversationStart?: (conversationId: string) => void
}

export function ChatWidget({
  industry = 'hotel',
  tone = 'professional',
  language = 'en',
  botName = 'Neo',
  welcomeMessage,
  quickActions = [],
  accentColor = '#6366f1',
  position = 'bottom-right',
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [hasGreeted, setHasGreeted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const defaultWelcome = welcomeMessage || (language === 'bg'
    ? `Здравейте! Аз съм ${botName}, вашият AI асистент. Как мога да ви помогна? 😊`
    : `Hi! I'm ${botName}, your AI assistant. How can I help you today? 😊`)

  const defaultQuickActions = quickActions.length > 0 ? quickActions : (
    language === 'bg'
      ? ['Цени и наличност', 'Направи резервация', 'Говори с човек']
      : ['Check pricing', 'Book appointment', 'Talk to a human']
  )

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
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
    if (isOpen) {
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
          ? { ...m, content: language === 'bg' ? 'Съжалявам, възникна грешка. Моля, опитайте отново.' : 'Sorry, something went wrong. Please try again.' }
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

  return (
    <>
      {/* Chat bubble button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className={`fixed ${positionClasses} z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95`}
            style={{ backgroundColor: accentColor }}
          >
            <MessageSquare className="size-6 text-white" />
            {/* Pulse ring */}
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-20"
              style={{ backgroundColor: accentColor }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className={`fixed ${positionClasses} z-50 w-[380px] h-[560px] max-h-[80vh] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden`}
          >
            {/* Header */}
            <div
              className="px-4 py-3 flex items-center gap-3 shrink-0"
              style={{ backgroundColor: accentColor }}
            >
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="size-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">{botName}</div>
                <div className="text-xs text-white/70 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  {language === 'bg' ? 'Онлайн' : 'Online'}
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="size-4 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'rounded-2xl rounded-tr-md text-white'
                      : 'bg-muted rounded-2xl rounded-tl-md text-foreground'
                  }`}
                    style={msg.role === 'user' ? { backgroundColor: accentColor } : undefined}
                  >
                    <p className="whitespace-pre-wrap">{msg.content || (
                      <span className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                    )}</p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick actions (only show when no user messages yet) */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {defaultQuickActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(action)}
                    className="px-3 py-1.5 rounded-full border border-border text-xs font-medium text-muted-foreground hover:bg-muted transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-border shrink-0">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={language === 'bg' ? 'Напишете съобщение...' : 'Type a message...'}
                  disabled={isStreaming}
                  className="flex-1 bg-muted rounded-full px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isStreaming}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
                  style={{ backgroundColor: input.trim() && !isStreaming ? accentColor : undefined }}
                >
                  <Send className={`size-4 ${input.trim() && !isStreaming ? 'text-white' : 'text-muted-foreground'}`} />
                </button>
              </div>
            </form>

            {/* Powered by */}
            <div className="px-4 pb-2 text-center">
              <span className="text-[10px] text-muted-foreground">Powered by NextBot AI</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
