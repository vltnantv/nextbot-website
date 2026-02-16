'use client'

import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'

const copy = {
  en: {
    label: 'Channels',
    headline: 'One AI. Every platform your customers use.',
    sub: 'Neo operates across all major communication channels with a unified conversation context.',
    channels: [
      { name: 'Website Chat', desc: 'Embedded widget on your site. Engages visitors, captures leads, qualifies in real time.', status: 'Live' },
      { name: 'WhatsApp Business', desc: 'Official WhatsApp Business API integration. Full conversation automation.', status: 'Live' },
      { name: 'Facebook Messenger', desc: 'Automated responses on your Facebook page. Handles inquiries and routes leads.', status: 'Live' },
      { name: 'Instagram DM', desc: 'Respond to Instagram direct messages automatically. Capture leads from social.', status: 'Live' },
      { name: 'Email', desc: 'AI-composed email responses to inbound inquiries. Automatic follow-up sequences.', status: 'Coming Soon' },
      { name: 'Telegram', desc: 'Full Telegram bot integration with conversation memory and context awareness.', status: 'Live' },
    ],
  },
  bg: {
    label: 'Канали',
    headline: 'Един AI. Всяка платформа, която клиентите ви използват.',
    sub: 'Neo работи по всички основни комуникационни канали с единен контекст на разговора.',
    channels: [
      { name: 'Уебсайт чат', desc: 'Вграден уиджет на сайта ви. Ангажира посетители, улавя лийдове.', status: 'Live' },
      { name: 'WhatsApp Business', desc: 'Официална WhatsApp Business API интеграция. Пълна автоматизация.', status: 'Live' },
      { name: 'Facebook Messenger', desc: 'Автоматични отговори на Facebook. Управлява запитвания и насочва лийдове.', status: 'Live' },
      { name: 'Instagram DM', desc: 'Отговаряйте на Instagram съобщения автоматично. Улавяйте лийдове от социалните мрежи.', status: 'Live' },
      { name: 'Email', desc: 'AI-създадени имейл отговори на входящи запитвания. Автоматични follow-up секвенции.', status: 'Скоро' },
      { name: 'Telegram', desc: 'Пълна Telegram бот интеграция с памет на разговора и контекстна осъзнатост.', status: 'Live' },
    ],
  },
}

export function NeoChannels() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section className="py-28 sm:py-36">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <AnimateIn>
          <div className="max-w-3xl">
            <p className="text-[0.7rem] text-zinc-600 uppercase tracking-[0.2em] font-medium mb-5">{t.label}</p>
            <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white text-balance">{t.headline}</h2>
            <p className="mt-5 text-[1.05rem] text-zinc-500 leading-[1.7] max-w-2xl">{t.sub}</p>
          </div>
        </AnimateIn>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
          {t.channels.map((ch, i) => (
            <AnimateIn key={i} delay={i * 60}>
              <div className="bg-[#09090b] p-8 h-full">
                <div className="flex items-center gap-2.5 mb-4">
                  <h3 className="text-[0.95rem] font-medium text-white">{ch.name}</h3>
                  <span className={`text-[0.58rem] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded ${ch.status === 'Live' ? 'bg-emerald-500/10 text-emerald-400/70' : 'bg-zinc-800 text-zinc-500'}`}>{ch.status}</span>
                </div>
                <p className="text-sm text-zinc-600 leading-[1.7]">{ch.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
