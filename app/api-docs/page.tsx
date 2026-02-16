'use client'

import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'
import { useState } from 'react'

function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group mt-4">
      <pre className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-5 overflow-x-auto text-[0.78rem] leading-[1.7] font-mono">
        <code className="text-zinc-400">{children}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 px-2 py-1 rounded text-[0.65rem] text-zinc-600 bg-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity hover:text-zinc-400"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}

const copy = {
  en: {
    label: 'API',
    headline: 'Integrate NextBot into your systems.',
    sub: 'REST API with full documentation for custom integrations.',
    sections: [
      {
        title: 'Authentication',
        desc: 'All API requests require an API key in the header. Get your key from Dashboard > Settings > API Keys.',
        code: 'Authorization: Bearer YOUR_API_KEY',
      },
      {
        title: 'Base URL',
        desc: 'All endpoints start with this base URL.',
        code: 'https://api.nextbot.me/v1',
      },
      {
        title: 'Send Message',
        desc: 'POST /messages/send — Sends a message on behalf of Neo.',
        code: `// Request
POST /messages/send
Content-Type: application/json

{
  "channel": "whatsapp",
  "recipient": "+359888123456",
  "message": "Hello! How can I help you?"
}

// Response — 200 OK
{
  "id": "msg_123abc",
  "status": "sent",
  "timestamp": "2025-02-14T15:30:00Z"
}`,
      },
      {
        title: 'Get Messages',
        desc: 'GET /messages — Retrieves list of messages.\n\nQuery params: channel, limit (max 100), offset.',
        code: `// Request
GET /messages?channel=whatsapp&limit=10

// Response — 200 OK
{
  "messages": [
    {
      "id": "msg_123",
      "channel": "whatsapp",
      "sender": "+359888123456",
      "message": "Do you have rooms available?",
      "timestamp": "2025-02-14T15:30:00Z",
      "replied": true
    }
  ],
  "total": 1,
  "hasMore": false
}`,
      },
      {
        title: 'Webhooks',
        desc: 'POST /webhooks — Register webhook for real-time notifications.',
        code: `// Register webhook
POST /webhooks
{
  "url": "https://yoursite.com/webhook",
  "events": ["message.received", "message.sent"]
}

// Webhook Payload
{
  "event": "message.received",
  "data": {
    "id": "msg_123",
    "channel": "whatsapp",
    "sender": "+359888123456",
    "message": "Hello",
    "timestamp": "2025-02-14T15:30:00Z"
  }
}`,
      },
      {
        title: 'Rate Limits',
        desc: '100 requests/minute, 10,000 requests/day. Exceeding returns HTTP 429.',
        code: `X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1644854400`,
      },
      {
        title: 'Errors',
        desc: 'Error codes: invalid_api_key, rate_limit_exceeded, invalid_request, server_error.',
        code: `{
  "error": {
    "code": "invalid_api_key",
    "message": "API key is invalid or expired"
  }
}`,
      },
    ],
    ctaTitle: 'Need help with the API?',
    ctaEmail: 'api@nextbot.me',
  },
  bg: {
    label: 'API',
    headline: 'Интегрирайте NextBot в системите си.',
    sub: 'REST API с пълна документация за custom интеграции.',
    sections: [
      {
        title: 'Автентикация',
        desc: 'Всички API заявки изискват API ключ в header-а. Вземете ключа от Dashboard > Settings > API Keys.',
        code: 'Authorization: Bearer YOUR_API_KEY',
      },
      {
        title: 'Base URL',
        desc: 'Всички endpoints започват с този base URL.',
        code: 'https://api.nextbot.me/v1',
      },
      {
        title: 'Изпрати съобщение',
        desc: 'POST /messages/send — Изпраща съобщение от името на Neo.',
        code: `// Request
POST /messages/send
Content-Type: application/json

{
  "channel": "whatsapp",
  "recipient": "+359888123456",
  "message": "Здравей! Как мога да ти помогна?"
}

// Response — 200 OK
{
  "id": "msg_123abc",
  "status": "sent",
  "timestamp": "2025-02-14T15:30:00Z"
}`,
      },
      {
        title: 'Получи съобщения',
        desc: 'GET /messages — Взема списък със съобщения.\n\nQuery params: channel, limit (max 100), offset.',
        code: `// Request
GET /messages?channel=whatsapp&limit=10

// Response — 200 OK
{
  "messages": [
    {
      "id": "msg_123",
      "channel": "whatsapp",
      "sender": "+359888123456",
      "message": "Имате ли свободни стаи?",
      "timestamp": "2025-02-14T15:30:00Z",
      "replied": true
    }
  ],
  "total": 1,
  "hasMore": false
}`,
      },
      {
        title: 'Webhooks',
        desc: 'POST /webhooks — Регистрирайте webhook за real-time уведомления.',
        code: `// Register webhook
POST /webhooks
{
  "url": "https://yoursite.com/webhook",
  "events": ["message.received", "message.sent"]
}

// Webhook Payload
{
  "event": "message.received",
  "data": {
    "id": "msg_123",
    "channel": "whatsapp",
    "sender": "+359888123456",
    "message": "Hello",
    "timestamp": "2025-02-14T15:30:00Z"
  }
}`,
      },
      {
        title: 'Rate Limits',
        desc: '100 заявки/минута, 10,000 заявки/ден. При превишаване: HTTP 429.',
        code: `X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1644854400`,
      },
      {
        title: 'Грешки',
        desc: 'Error codes: invalid_api_key, rate_limit_exceeded, invalid_request, server_error.',
        code: `{
  "error": {
    "code": "invalid_api_key",
    "message": "API key is invalid or expired"
  }
}`,
      },
    ],
    ctaTitle: 'Нужна ви е помощ с API?',
    ctaEmail: 'api@nextbot.me',
  },
}

export default function APIPage() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <>
      <section className="pt-36 pb-0 sm:pt-44">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <AnimateIn>
            <p className="text-[0.7rem] text-indigo-400/60 uppercase tracking-[0.2em] font-medium mb-5">{t.label}</p>
            <h1 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white max-w-2xl">{t.headline}</h1>
            <p className="mt-5 text-[1.05rem] text-zinc-500 max-w-xl leading-[1.7]">{t.sub}</p>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <div className="max-w-3xl space-y-12">
            {t.sections.map((section, i) => (
              <AnimateIn key={i} delay={i * 40}>
                <div className="rounded-2xl border border-white/[0.05] p-6 sm:p-8">
                  <h2 className="text-[1.05rem] font-medium text-white mb-3">{section.title}</h2>
                  <p className="text-sm text-zinc-500 leading-[1.7] whitespace-pre-line">{section.desc}</p>
                  <CodeBlock>{section.code}</CodeBlock>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 sm:py-36 border-t border-white/[0.04]">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 text-center">
          <AnimateIn>
            <h2 className="text-[1.75rem] sm:text-[2rem] font-semibold text-white mb-6">{t.ctaTitle}</h2>
            <a href={`mailto:${t.ctaEmail}`} className="inline-flex items-center px-7 py-3.5 bg-white text-zinc-950 text-[0.9rem] font-medium rounded-lg hover:bg-zinc-100 transition-colors">
              {t.ctaEmail}
            </a>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
