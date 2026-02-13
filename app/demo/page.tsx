'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/i18n'
import { translations } from '@/lib/translations'
import { motion } from 'framer-motion'

const VOICEFLOW_PROJECT_ID = '6989fab0edb54740de5b4ea5'

export default function DemoPage() {
  const { lang } = useLanguage()
  const f = translations[lang].footer
  const [chatReady, setChatReady] = useState(false)

  useEffect(() => {
    // Clear Voiceflow chat history so every visit starts fresh
    for (const key of Object.keys(localStorage)) {
      if (key.startsWith('voiceflow') || key.startsWith('vf_')) {
        localStorage.removeItem(key)
      }
    }
    for (const key of Object.keys(sessionStorage)) {
      if (key.startsWith('voiceflow') || key.startsWith('vf_')) {
        sessionStorage.removeItem(key)
      }
    }

    const target = document.getElementById('voiceflow-chat-embed')
    if (!target) return

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://cdn.voiceflow.com/widget/bundle.mjs'
    script.onload = () => {
      // @ts-ignore
      window.voiceflow?.chat?.load({
        verify: { projectID: VOICEFLOW_PROJECT_ID },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
        render: {
          mode: 'embedded',
          target: document.getElementById('voiceflow-chat-embed'),
        },
        autostart: true,
      }).then(() => {
        setChatReady(true)
      })
    }
    document.body.appendChild(script)

    return () => {
      script.remove()
    }
  }, [])

  const sendMessage = (text: string) => {
    // @ts-ignore
    if (window.voiceflow?.chat) {
      // @ts-ignore
      window.voiceflow.chat.interact({ type: 'text', payload: text })
    }
  }

  const suggestions =
    lang === 'bg'
      ? [
          'Имате ли свободни стаи?',
          'Колко струва една нощувка?',
          'На кои езици говорите?',
          'Къде се намирате?',
        ]
      : [
          'Do you have rooms available?',
          'How much is one night?',
          'What languages do you speak?',
          'Where are you located?',
        ]

  return (
    <main className="min-h-screen bg-black pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-white">
            {lang === 'bg' ? 'Опитай Neo в действие' : 'Try Neo in action'}
          </h1>
          <p className="text-xl text-gray-400 mb-4">
            {lang === 'bg'
              ? 'Попитай каквото искаш. Neo отговаря мигновено.'
              : 'Ask anything. Neo responds instantly.'}
          </p>
          <p className="text-sm text-gray-500">
            {lang === 'bg'
              ? 'Това е демо версия. Реалният Neo е персонализиран за твоя бизнес.'
              : 'This is a demo version. Real Neo is personalized for your business.'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat embed — 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-gray-900 rounded-3xl shadow-2xl border border-gray-800 overflow-hidden">
              {/* Chat header */}
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
                  🤖
                </div>
                <div>
                  <div className="text-white font-semibold">Neo</div>
                  <div className="text-white/70 text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full inline-block" />
                    {lang === 'bg' ? 'Онлайн • AI Асистент' : 'Online • AI Assistant'}
                  </div>
                </div>
              </div>

              {/* Voiceflow embedded chat */}
              <div className="relative" style={{ height: 700 }}>
                <div
                  id="voiceflow-chat-embed"
                  style={{ width: '100%', height: '100%' }}
                />

                {!chatReady && (
                  <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-gray-400">
                        {lang === 'bg' ? 'Зарежда се...' : 'Loading...'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Suggestions */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="font-semibold text-white mb-4">
                {lang === 'bg' ? 'Опитай с тези въпроси:' : 'Try these questions:'}
              </h3>
              <div className="space-y-2">
                {suggestions.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(item)}
                    disabled={!chatReady}
                    className="w-full text-left px-4 py-3 rounded-xl bg-gray-800 hover:bg-blue-950 border border-gray-700 hover:border-blue-500/50 transition-all text-sm text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    💬 {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="font-semibold text-white mb-4">
                {lang === 'bg' ? 'Това което виждаш:' : "What you're seeing:"}
              </h3>
              <div className="space-y-3">
                {[
                  { icon: '⚡', text: lang === 'bg' ? 'Instant отговори (< 1 секунда)' : 'Instant responses (< 1 second)' },
                  { icon: '🧠', text: lang === 'bg' ? 'Разбира контекста' : 'Understands context' },
                  { icon: '🌍', text: lang === 'bg' ? 'Автоматично разпознава език' : 'Auto-detects language' },
                  { icon: '💬', text: lang === 'bg' ? 'Естествена комуникация' : 'Natural communication' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-sm text-gray-400">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="font-semibold mb-2">
                {lang === 'bg' ? 'Искаш Neo за твоя бизнес?' : 'Want Neo for your business?'}
              </h3>
              <p className="text-sm text-white/80 mb-4">
                {lang === 'bg' ? '20 минути. Без ангажименти.' : '20 minutes. No commitment.'}
              </p>
              <a
                href={f.cta.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full gap-2 px-6 py-3 rounded-full border border-white/30 text-white text-sm font-semibold hover:bg-white/10 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {f.cta.button}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
