'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/i18n'
import { motion } from 'framer-motion'

const VOICEFLOW_PROJECT_ID = '6989fab0edb54740de5b4ea5'

export default function DemoPage() {
  const { lang } = useLanguage()
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
        // Hide Voiceflow's built-in header (inside shadow DOM)
        const hideHeader = () => {
          const embed = document.getElementById('voiceflow-chat-embed')
          if (!embed) return
          const shadowRoot = embed.querySelector('div')?.shadowRoot
          if (shadowRoot) {
            const style = document.createElement('style')
            style.textContent = `
              .vfrc-header, [class*="Header"], [class*="assistant-info"], [class*="AssistantInfo"] { display: none !important; }
            `
            shadowRoot.appendChild(style)
          }
          // Also try iframe approach
          const iframes = embed.querySelectorAll('iframe')
          iframes.forEach(iframe => {
            try {
              const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
              if (iframeDoc) {
                const style = iframeDoc.createElement('style')
                style.textContent = `
                  .vfrc-header, [class*="Header"], [class*="assistant-info"], [class*="AssistantInfo"] { display: none !important; }
                `
                iframeDoc.head.appendChild(style)
              }
            } catch {}
          })
        }
        // Retry a few times since widget renders async
        setTimeout(hideHeader, 500)
        setTimeout(hideHeader, 1500)
        setTimeout(hideHeader, 3000)
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
    <main className="min-h-screen bg-white dark:bg-black pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
            {lang === 'bg' ? 'Опитай Neo в действие' : 'Try Neo in action'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
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
            <div className="bg-gray-100 dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              {/* Voiceflow embedded chat */}
              <div className="relative" style={{ height: 750 }}>
                <div
                  id="voiceflow-chat-embed"
                  style={{ width: '100%', height: '100%' }}
                />
                {/* Overlay to cover Voiceflow's built-in footer */}
                <div className="absolute bottom-0 left-0 right-0 z-10 bg-gray-100 dark:bg-gray-900 flex items-center justify-center pt-0 pb-1" style={{ height: 30 }}>
                  <span className="text-[10px] text-gray-400">Powered by <span className="font-semibold text-gray-500 dark:text-gray-300">Nextbot</span></span>
                </div>
                {/* Overlay to cover Voiceflow's built-in header */}
                <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg">
                    🤖
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Neo</div>
                    <div className="text-white/70 text-xs flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                      {lang === 'bg' ? 'Онлайн • AI Асистент' : 'Online • AI Assistant'}
                    </div>
                  </div>
                </div>

                {!chatReady && (
                  <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400">
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
            <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                {lang === 'bg' ? 'Опитай с тези въпроси:' : 'Try these questions:'}
              </h3>
              <div className="space-y-2">
                {suggestions.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(item)}
                    disabled={!chatReady}
                    className="w-full text-left px-4 py-3 rounded-xl bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-950 border border-gray-200 dark:border-gray-700 hover:border-blue-500/50 transition-all text-sm text-gray-700 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    💬 {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
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
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </main>
  )
}
