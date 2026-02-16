'use client'

import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'
import Link from 'next/link'

const copy = {
  en: {
    label: 'About',
    headline: 'We build AI systems that automate business communication.',
    sub: 'NextBot is an AI technology company based in Sofia, Bulgaria. We develop intelligent assistants that help businesses respond faster, convert more leads, and operate 24/7.',
    stats: [
      { value: '2024', label: 'Founded' },
      { value: '100+', label: 'Businesses served' },
      { value: '1M+', label: 'Messages processed' },
      { value: '99.9%', label: 'Uptime' },
    ],
    storyLabel: 'Our Story',
    storyHeadline: 'Built to solve a simple problem.',
    storyText: 'In 2024, we saw businesses across Bulgaria losing customers for one reason: they couldn\'t respond fast enough. A hotel in Bansko missed a booking because the owner saw the message the next morning. A restaurant in Sofia lost an order because it was Saturday night. An e-commerce store lost a sale because a customer asked something at 11 PM.\n\nAll these problems have one solution: AI that responds instantly, in any language, on any channel, at any hour.',
    missionLabel: 'Mission',
    missionHeadline: 'Make AI communication accessible to every business.',
    missionText: 'From small family hotels to large e-commerce operations — every business deserves intelligent, always-on customer communication. We build the technology that makes this possible.',
    valuesLabel: 'Values',
    valuesHeadline: 'How we operate.',
    values: [
      { title: 'Simplicity', desc: 'AI should be simple to deploy. No complex setup, no technical overhead. It just works.' },
      { title: 'Trust', desc: 'Your data is yours. Your customers are yours. We\'re the infrastructure that helps you serve them better.' },
      { title: 'Performance', desc: 'Every response under 1 second. Every system 99.9% available. We measure everything and optimize constantly.' },
    ],
    teamLabel: 'Team',
    teamText: 'A focused team of engineers, AI specialists, and entrepreneurs based in Sofia, Bulgaria. We build, ship, and iterate — fast.',
    ctaHeadline: 'See what we\'ve built.',
    ctaSub: 'Explore our AI products or book a call to discuss your use case.',
    cta1: 'View Products',
    cta2: 'Book a Call',
  },
  bg: {
    label: 'За нас',
    headline: 'Създаваме AI системи, които автоматизират бизнес комуникацията.',
    sub: 'NextBot е AI технологична компания, базирана в София, България. Разработваме интелигентни асистенти, които помагат на бизнесите да отговарят по-бързо, да конвертират повече лийдове и да работят 24/7.',
    stats: [
      { value: '2024', label: 'Основана' },
      { value: '100+', label: 'Обслужени бизнеси' },
      { value: '1M+', label: 'Обработени съобщения' },
      { value: '99.9%', label: 'Uptime' },
    ],
    storyLabel: 'Нашата история',
    storyHeadline: 'Създадена да реши прост проблем.',
    storyText: 'През 2024 видяхме как бизнеси в България губят клиенти по една причина: не могат да отговорят достатъчно бързо. Хотел в Банско пропусна резервация, защото собственикът видя съобщението на следващата сутрин. Ресторант в София пропусна поръчка, защото беше събота вечерта. E-commerce магазин загуби продажба, защото клиентът попита нещо в 23:00.\n\nВсички тези проблеми имат едно решение: AI, който отговаря мигновено, на всеки език, по всеки канал, по всяко време.',
    missionLabel: 'Мисия',
    missionHeadline: 'Правим AI комуникацията достъпна за всеки бизнес.',
    missionText: 'От малки семейни хотели до големи e-commerce операции — всеки бизнес заслужава интелигентна, винаги налична комуникация с клиенти. Ние изграждаме технологията, която прави това възможно.',
    valuesLabel: 'Ценности',
    valuesHeadline: 'Как работим.',
    values: [
      { title: 'Простота', desc: 'AI трябва да е лесен за внедряване. Без сложни настройки, без техническо натоварване. Просто работи.' },
      { title: 'Доверие', desc: 'Вашите данни са ваши. Вашите клиенти са ваши. Ние сме инфраструктурата, която ви помага да ги обслужвате по-добре.' },
      { title: 'Производителност', desc: 'Всеки отговор под 1 секунда. Всяка система 99.9% налична. Измерваме всичко и оптимизираме постоянно.' },
    ],
    teamLabel: 'Екип',
    teamText: 'Фокусиран екип от инженери, AI специалисти и предприемачи, базирани в София, България. Изграждаме, доставяме и итерираме — бързо.',
    ctaHeadline: 'Вижте какво сме създали.',
    ctaSub: 'Разгледайте нашите AI продукти или запазете обаждане, за да обсъдим вашия случай.',
    cta1: 'Вижте продуктите',
    cta2: 'Запазете обаждане',
  },
}

export default function AboutPage() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-28 sm:pt-44 sm:pb-36 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <AnimateIn>
            <p className="text-[0.7rem] text-indigo-400/60 uppercase tracking-[0.2em] font-medium mb-5">{t.label}</p>
            <h1 className="text-[2rem] sm:text-[3rem] lg:text-[3.75rem] font-semibold leading-[1.08] tracking-[-0.035em] text-white max-w-3xl text-balance">{t.headline}</h1>
            <p className="mt-7 text-[1.1rem] text-zinc-400 max-w-xl leading-[1.7] font-light">{t.sub}</p>
          </AnimateIn>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-white/[0.04]">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {t.stats.map((stat, i) => (
              <AnimateIn key={i} delay={i * 80}>
                <div className="border-l border-white/[0.06] pl-5">
                  <div className="text-[1.75rem] sm:text-[2rem] font-semibold tracking-tight text-white leading-none font-mono">{stat.value}</div>
                  <div className="mt-1.5 text-sm text-zinc-600">{stat.label}</div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-28 sm:py-36">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <AnimateIn>
            <p className="text-[0.7rem] text-zinc-600 uppercase tracking-[0.2em] font-medium mb-5">{t.storyLabel}</p>
            <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white max-w-2xl">{t.storyHeadline}</h2>
          </AnimateIn>
          <AnimateIn delay={100}>
            <p className="mt-10 text-[1rem] text-zinc-400 max-w-2xl leading-[1.8] whitespace-pre-line">{t.storyText}</p>
          </AnimateIn>
        </div>
      </section>

      {/* Mission */}
      <section className="py-28 sm:py-36 border-y border-white/[0.04]">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <AnimateIn>
            <p className="text-[0.7rem] text-indigo-400/60 uppercase tracking-[0.2em] font-medium mb-5">{t.missionLabel}</p>
            <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white max-w-2xl">{t.missionHeadline}</h2>
          </AnimateIn>
          <AnimateIn delay={100}>
            <p className="mt-8 text-[1.05rem] text-zinc-500 max-w-2xl leading-[1.7]">{t.missionText}</p>
          </AnimateIn>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 sm:py-36">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <AnimateIn>
            <p className="text-[0.7rem] text-zinc-600 uppercase tracking-[0.2em] font-medium mb-5">{t.valuesLabel}</p>
            <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white max-w-2xl">{t.valuesHeadline}</h2>
          </AnimateIn>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
            {t.values.map((v, i) => (
              <AnimateIn key={i} delay={i * 80}>
                <div className="bg-[#09090b] p-8 sm:p-10 h-full">
                  <span className="text-[0.65rem] text-zinc-700 font-mono block mb-4">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-[1.05rem] font-medium text-white mb-3">{v.title}</h3>
                  <p className="text-sm text-zinc-600 leading-[1.7]">{v.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 border-t border-white/[0.04]">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <AnimateIn>
            <p className="text-[0.7rem] text-zinc-600 uppercase tracking-[0.2em] font-medium mb-5">{t.teamLabel}</p>
            <p className="text-[1.05rem] text-zinc-500 max-w-2xl leading-[1.7]">{t.teamText}</p>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 sm:py-36 border-t border-white/[0.04]">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 text-center">
          <AnimateIn>
            <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white">{t.ctaHeadline}</h2>
            <p className="mt-5 text-[1.05rem] text-zinc-500 max-w-lg mx-auto leading-[1.7]">{t.ctaSub}</p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/#products" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-zinc-950 text-[0.9rem] font-medium rounded-lg hover:bg-zinc-100 transition-colors">
                {t.cta1}
              </Link>
              <Link href="/book-demo" className="inline-flex items-center gap-2 px-7 py-3.5 text-zinc-400 text-[0.9rem] font-medium rounded-lg border border-white/[0.08] hover:border-white/[0.14] hover:text-zinc-300 transition-all">
                {t.cta2}
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Legal info */}
      <div className="border-t border-white/[0.04] py-12">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <p className="text-xs text-zinc-700">
            Nextbot EOOD / {lang === 'bg' ? 'ЕИК' : 'UIC'}: 207218192 / Sofia, Bulgaria
          </p>
        </div>
      </div>
    </>
  )
}
