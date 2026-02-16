'use client'

import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'

const copy = {
  en: {
    label: 'The Problem',
    headline: 'Most businesses lose customers before the conversation even starts.',
    sub: 'Leads contact you with buying intent. When you respond hours later — or never — they\'ve already moved on. This isn\'t a marketing problem. It\'s an operational failure.',
    items: [
      {
        metric: '78%',
        title: 'Leads choose the first responder',
        body: 'Speed determines who wins the deal. The first company to respond converts the majority of leads — regardless of price or product quality.',
      },
      {
        metric: '5 min',
        title: 'After five minutes, the lead is cold',
        body: 'Contact rates drop 400% after the first five minutes. Most sales teams average 4+ hours. By then, the opportunity is gone.',
      },
      {
        metric: '60%',
        title: 'Of inquiries receive no follow-up',
        body: 'Without automated systems, leads fall through the cracks. No response means no revenue — and wasted acquisition spend.',
      },
      {
        metric: '€0',
        title: 'ROI on leads you never answered',
        body: 'You\'re paying for traffic, ads, and referrals. Every unanswered lead is money spent with zero return.',
      },
    ],
  },
  bg: {
    label: 'Проблемът',
    headline: 'Повечето бизнеси губят клиенти преди разговорът изобщо да е започнал.',
    sub: 'Лийдовете ви се свързват с намерение за покупка. Когато отговорите часове по-късно — или изобщо не отговорите — те вече са преминали нататък. Това не е маркетингов проблем. Това е оперативен провал.',
    items: [
      {
        metric: '78%',
        title: 'От лийдовете избират първия, който отговори',
        body: 'Скоростта определя кой печели сделката. Първата компания, която отговори, конвертира повечето лийдове.',
      },
      {
        metric: '5 мин',
        title: 'След пет минути лийдът е изстинал',
        body: 'Процентът на контакт пада с 400% след първите пет минути. Повечето екипи отговарят средно за 4+ часа.',
      },
      {
        metric: '60%',
        title: 'От запитванията не получават follow-up',
        body: 'Без автоматизирани системи, лийдовете се губят. Без отговор означава без приходи.',
      },
      {
        metric: '€0',
        title: 'ROI от лийдове, на които не сте отговорили',
        body: 'Плащате за трафик, реклами и препоръки. Всеки неотговорен лийд е пари, изхарчени с нулева възвръщаемост.',
      },
    ],
  },
}

export function NewProblemSection() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section className="py-28 sm:py-36">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <AnimateIn>
          <div className="max-w-3xl">
            <p className="text-[0.7rem] text-zinc-600 uppercase tracking-[0.2em] font-medium mb-5">{t.label}</p>
            <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white text-balance">
              {t.headline}
            </h2>
            <p className="mt-5 text-[1.05rem] text-zinc-500 leading-[1.7] max-w-2xl">{t.sub}</p>
          </div>
        </AnimateIn>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
          {t.items.map((item, i) => (
            <AnimateIn key={i} delay={i * 80}>
              <div className="bg-[#09090b] p-8 sm:p-10 h-full">
                <span className="text-[1.75rem] sm:text-[2rem] font-semibold tracking-tight text-white/20">
                  {item.metric}
                </span>
                <h3 className="mt-4 text-[1.05rem] font-medium text-white leading-snug">{item.title}</h3>
                <p className="mt-3 text-sm text-zinc-600 leading-relaxed">{item.body}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
