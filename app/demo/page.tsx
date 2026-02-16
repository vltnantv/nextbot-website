'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'
import Link from 'next/link'

const VOICEFLOW_PROJECT_ID = '6989fab0edb54740de5b4ea5'

export default function DemoPage() {
  const { lang } = useLanguage()
  const [chatReady, setChatReady] = useState(false)

  useEffect(() => {
    for (const key of Object.keys(localStorage)) {
      if (key.startsWith('voiceflow') || key.startsWith('vf_')) localStorage.removeItem(key)
    }
    for (const key of Object.keys(sessionStorage)) {
      if (key.startsWith('voiceflow') || key.startsWith('vf_')) sessionStorage.removeItem(key)
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
        render: { mode: 'embedded', target: document.getElementById('voiceflow-chat-embed') },
        autostart: true,
      }).then(() => {
        setChatReady(true)
        const hideHeader = () => {
          const embed = document.getElementById('voiceflow-chat-embed')
          if (!embed) return
          const shadowRoot = embed.querySelector('div')?.shadowRoot
          if (shadowRoot) {
            const style = document.createElement('style')
            style.textContent = `.vfrc-header, [class*="Header"], [class*="assistant-info"], [class*="AssistantInfo"] { display: none !important; }`
            shadowRoot.appendChild(style)
          }
        }
        setTimeout(hideHeader, 500)
        setTimeout(hideHeader, 1500)
        setTimeout(hideHeader, 3000)
      })
    }
    document.body.appendChild(script)
    return () => { script.remove() }
  }, [])

  const sendMessage = (text: string) => {
    // @ts-ignore
    window.voiceflow?.chat?.interact({ type: 'text', payload: text })
  }

  const suggestions = lang === 'bg'
    ? ['Имате ли свободни стаи?', 'Колко струва една нощувка?', 'На кои езици говорите?', 'Къде се намирате?']
    : ['Do you have rooms available?', 'How much is one night?', 'What languages do you speak?', 'Where are you located?']

  const t = {
    label: lang === 'bg' ? 'Демо' : 'Live Demo',
    headline: lang === 'bg' ? 'Опитайте Neo в действие.' : 'Try Neo in action.',
    sub: lang === 'bg'
      ? 'Попитайте каквото искате. Neo отговаря мигновено. Това е демо версия — реалният Neo е персонализиран за вашия бизнес.'
      : 'Ask anything. Neo responds instantly. This is a demo — the real Neo is personalized for your business.',
    suggestionsTitle: lang === 'bg' ? 'Опитайте с:' : 'Try asking:',
    features: lang === 'bg'
      ? ['Отговори под 1 секунда', 'Разбира контекста', 'Разпознава езика автоматично', 'Естествена комуникация']
      : ['Responses under 1 second', 'Understands context', 'Auto-detects language', 'Natural communication'],
    cta: lang === 'bg' ? 'Запазете демо за вашия бизнес' : 'Book a demo for your business',
  }

  return (
    <>
      <section className="pt-36 pb-8 sm:pt-44">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <AnimateIn>
            <p className="text-[0.7rem] text-indigo-400/60 uppercase tracking-[0.2em] font-medium mb-5">{t.label}</p>
            <h1 className="text-[2rem] sm:text-[3rem] font-semibold leading-[1.08] tracking-[-0.035em] text-white max-w-2xl">{t.headline}</h1>
            <p className="mt-5 text-[1rem] text-zinc-500 max-w-xl leading-[1.7]">{t.sub}</p>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
            {/* Chat */}
            <AnimateIn>
              <div className="rounded-2xl border border-white/[0.05] overflow-hidden relative" style={{ height: 680 }}>
                {/* Custom header */}
                <div className="absolute top-0 left-0 right-0 z-10 px-5 py-3 bg-[#09090b] border-b border-white/[0.04] flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-indigo-500/10 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-indigo-400/60" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Neo</div>
                    <div className="text-[0.65rem] text-zinc-600 flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-emerald-400/60 rounded-full" />
                      {lang === 'bg' ? 'Онлайн' : 'Online'}
                    </div>
                  </div>
                </div>

                <div id="voiceflow-chat-embed" style={{ width: '100%', height: '100%' }} />

                {/* Custom footer */}
                <div className="absolute bottom-0 left-0 right-0 z-10 bg-[#09090b] border-t border-white/[0.04] py-1.5 text-center">
                  <span className="text-[0.6rem] text-zinc-700">Powered by NextBot</span>
                </div>

                {!chatReady && (
                  <div className="absolute inset-0 bg-[#09090b] flex items-center justify-center z-20">
                    <div className="w-5 h-5 border-2 border-zinc-700 border-t-zinc-400 rounded-full animate-spin" />
                  </div>
                )}
              </div>
            </AnimateIn>

            {/* Sidebar */}
            <div className="space-y-6">
              <AnimateIn delay={100}>
                <div className="rounded-2xl border border-white/[0.05] p-6">
                  <h3 className="text-sm font-medium text-white mb-4">{t.suggestionsTitle}</h3>
                  <div className="space-y-2">
                    {suggestions.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(item)}
                        disabled={!chatReady}
                        className="w-full text-left px-4 py-2.5 rounded-lg text-[0.82rem] text-zinc-400 bg-white/[0.03] border border-white/[0.04] hover:border-white/[0.1] hover:text-zinc-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </AnimateIn>

              <AnimateIn delay={200}>
                <div className="rounded-2xl border border-white/[0.05] p-6">
                  <ul className="space-y-3">
                    {t.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[0.82rem] text-zinc-500">
                        <svg className="w-3.5 h-3.5 mt-0.5 text-zinc-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateIn>

              <AnimateIn delay={300}>
                <Link
                  href="/book-demo"
                  className="block w-full text-center px-6 py-3.5 bg-white text-zinc-950 text-[0.85rem] font-medium rounded-lg hover:bg-zinc-100 transition-colors"
                >
                  {t.cta}
                </Link>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
