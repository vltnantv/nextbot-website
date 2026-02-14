'use client'

import { useLanguage } from '@/lib/i18n'
import { motion } from 'framer-motion'
import { useState } from 'react'

function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group my-4">
      <pre className="bg-gray-950 text-gray-300 rounded-xl p-4 overflow-x-auto text-sm leading-relaxed border border-gray-800">
        <code>{children}</code>
      </pre>
      <button
        onClick={copy}
        className="absolute top-3 right-3 px-2 py-1 rounded-md bg-gray-800 text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-700 hover:text-white"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}

export default function APIPage() {
  const { lang } = useLanguage()

  const content = {
    bg: {
      title: 'API Документация',
      subtitle: 'Интегрирай Nextbot в твоята система',
      sections: [
        {
          title: 'Автентикация',
          description: 'Всички API заявки изискват API ключ в header-а. Вземи твоя API ключ от Dashboard → Settings → API Keys.',
          code: 'Authorization: Bearer YOUR_API_KEY'
        },
        {
          title: 'Base URL',
          description: 'Всички endpoints започват с този base URL.',
          code: 'https://api.nextbot.me/v1'
        },
        {
          title: 'Изпрати съобщение',
          description: 'POST /messages/send\n\nИзпраща съобщение от името на Neo.',
          code: `// Request
POST /messages/send
Content-Type: application/json

{
  "channel": "whatsapp",
  "recipient": "+359888123456",
  "message": "Здравей! Как мога да ти помогна?"
}

// Response - 200 OK
{
  "id": "msg_123abc",
  "status": "sent",
  "timestamp": "2025-02-14T15:30:00Z"
}`
        },
        {
          title: 'Получи съобщения',
          description: 'GET /messages\n\nВзема списък със съобщения.\n\nQuery Parameters:\n- channel - whatsapp, messenger, web\n- limit - max 100\n- offset - за pagination',
          code: `// Request
GET /messages?channel=whatsapp&limit=10

// Response - 200 OK
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
}`
        },
        {
          title: 'Webhooks',
          description: 'Регистрирай webhook за да получаваш real-time уведомления.\n\nPOST /webhooks',
          code: `// Register webhook
POST /webhooks
{
  "url": "https://yoursite.com/webhook",
  "events": ["message.received", "message.sent"]
}

// Webhook Payload (what you receive)
{
  "event": "message.received",
  "data": {
    "id": "msg_123",
    "channel": "whatsapp",
    "sender": "+359888123456",
    "message": "Hello",
    "timestamp": "2025-02-14T15:30:00Z"
  }
}`
        },
        {
          title: 'Rate Limits',
          description: 'Лимити:\n- 100 requests/минута\n- 10,000 requests/ден\n\nПри надвишаване: HTTP 429 Too Many Requests',
          code: `X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1644854400`
        },
        {
          title: 'Errors',
          description: 'Error Codes:\n- invalid_api_key - невалиден ключ\n- rate_limit_exceeded - превишен лимит\n- invalid_request - грешна заявка\n- server_error - сървър грешка',
          code: `{
  "error": {
    "code": "invalid_api_key",
    "message": "API key is invalid or expired"
  }
}`
        }
      ]
    },
    en: {
      title: 'API Documentation',
      subtitle: 'Integrate Nextbot into your system',
      sections: [
        {
          title: 'Authentication',
          description: 'All API requests require an API key in the header. Get your API key from Dashboard → Settings → API Keys.',
          code: 'Authorization: Bearer YOUR_API_KEY'
        },
        {
          title: 'Base URL',
          description: 'All endpoints start with this base URL.',
          code: 'https://api.nextbot.me/v1'
        },
        {
          title: 'Send Message',
          description: 'POST /messages/send\n\nSends a message on behalf of Neo.',
          code: `// Request
POST /messages/send
Content-Type: application/json

{
  "channel": "whatsapp",
  "recipient": "+359888123456",
  "message": "Hello! How can I help you?"
}

// Response - 200 OK
{
  "id": "msg_123abc",
  "status": "sent",
  "timestamp": "2025-02-14T15:30:00Z"
}`
        },
        {
          title: 'Get Messages',
          description: 'GET /messages\n\nRetrieves list of messages.\n\nQuery Parameters:\n- channel - whatsapp, messenger, web\n- limit - max 100\n- offset - for pagination',
          code: `// Request
GET /messages?channel=whatsapp&limit=10

// Response - 200 OK
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
}`
        },
        {
          title: 'Webhooks',
          description: 'Register webhook to receive real-time notifications.\n\nPOST /webhooks',
          code: `// Register webhook
POST /webhooks
{
  "url": "https://yoursite.com/webhook",
  "events": ["message.received", "message.sent"]
}

// Webhook Payload (what you receive)
{
  "event": "message.received",
  "data": {
    "id": "msg_123",
    "channel": "whatsapp",
    "sender": "+359888123456",
    "message": "Hello",
    "timestamp": "2025-02-14T15:30:00Z"
  }
}`
        },
        {
          title: 'Rate Limits',
          description: 'Limits:\n- 100 requests/minute\n- 10,000 requests/day\n\nWhen exceeded: HTTP 429 Too Many Requests',
          code: `X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1644854400`
        },
        {
          title: 'Errors',
          description: 'Error Codes:\n- invalid_api_key - invalid key\n- rate_limit_exceeded - limit exceeded\n- invalid_request - bad request\n- server_error - server error',
          code: `{
  "error": {
    "code": "invalid_api_key",
    "message": "API key is invalid or expired"
  }
}`
        }
      ]
    }
  }

  const t = content[lang as keyof typeof content]

  return (
    <main className="min-h-screen bg-white dark:bg-black pt-20">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-white dark:from-gray-950 dark:to-black border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              {t.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-12">
          {t.sections.map((section, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                {section.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line leading-relaxed mb-4">
                {section.description}
              </p>
              <CodeBlock>{section.code}</CodeBlock>
            </motion.article>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {lang === 'bg' ? 'Нужна ти е помощ с API?' : 'Need help with the API?'}
          </h2>
          <p className="text-xl mb-8 text-white/90">
            {lang === 'bg'
              ? 'Свържи се с нашия tech team'
              : 'Contact our tech team'}
          </p>
          <a
            href="mailto:api@nextbot.me"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-purple-600 font-semibold hover:scale-105 transition-transform"
          >
            api@nextbot.me
          </a>
        </div>
      </section>
    </main>
  )
}
