'use client'
import { useLanguage } from '@/lib/i18n'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { PRICING } from '@/lib/pricing'
import { useState, useRef, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

export function SimplePricing() {
  const { lang } = useLanguage()
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly')
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, top: 0, width: 0, height: 0 })
  const [mobileCard, setMobileCard] = useState(1) // start on Pro
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handleMouseEnter = (i: number, e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const grid = gridRef.current
    if (!grid) return
    const gridRect = grid.getBoundingClientRect()
    const cardRect = card.getBoundingClientRect()
    setHighlightStyle({
      left: cardRect.left - gridRect.left,
      top: cardRect.top - gridRect.top,
      width: cardRect.width,
      height: cardRect.height,
    })
    setHoveredIndex(i)
  }

  const content = {
    bg: {
      title: 'Прости, ясни цени',
      subtitle: 'Избери пакета който ти трябва',
      monthly: 'Месечно',
      annual: 'Годишно',
      save: 'Спести',
      perMonth: '/месец',
      messagesMonth: 'съобщения/месец',
      channels: 'канала',
      channel: 'канал',
      languages: 'езика',
      getStarted: 'Започни',
      contactUs: 'Свържи се',
      popular: 'Популярен',
      faq: {
        title: 'Често задавани въпроси',
        q1: 'Какво се случва ако надхвърля лимита?',
        a1: '€0.08/съобщение за Starter, €0.05 за Pro, €0.02 за Enterprise. Ще получиш нотификация на 80% usage.',
        q2: 'Мога ли да сменя плана?',
        a2: 'Да, по всяко време. Upgrade е веднага, downgrade важи от следващия месец.',
        q3: 'Колко време отнема setup?',
        a3: '1 час за Starter, 2-3 часа за Pro. Всичко е включено в цената.',
        q4: 'Има ли договор за период?',
        a4: 'Не, месечният план е без ангажимент. Годишният е 12 месеца но спестяваш 2 месеца.'
      }
    },
    en: {
      title: 'Simple, clear pricing',
      subtitle: 'Choose the package you need',
      monthly: 'Monthly',
      annual: 'Annual',
      save: 'Save',
      perMonth: '/month',
      messagesMonth: 'messages/month',
      channels: 'channels',
      channel: 'channel',
      languages: 'languages',
      getStarted: 'Get Started',
      contactUs: 'Contact us',
      popular: 'Popular',
      faq: {
        title: 'Frequently asked questions',
        q1: 'What happens if I exceed the limit?',
        a1: "€0.08/message for Starter, €0.05 for Pro, €0.02 for Enterprise. You'll get notified at 80% usage.",
        q2: 'Can I change plans?',
        a2: 'Yes, anytime. Upgrade is immediate, downgrade takes effect next month.',
        q3: 'How long does setup take?',
        a3: '1 hour for Starter, 2-3 hours for Pro. Everything included in the price.',
        q4: 'Is there a contract?',
        a4: 'No, monthly plan is no commitment. Annual is 12 months but you save 2 months.'
      }
    }
  }

  const t = content[lang as keyof typeof content]

  const plans = [
    {
      ...PRICING.starter,
      description: lang === 'bg' ? 'Perfect entry point' : 'Perfect entry point',
      featuresText: [
        `${PRICING.starter.messages} ${t.messagesMonth}`,
        `1 ${t.channel}`,
        `2 ${t.languages}`,
        lang === 'bg' ? '15-20 FAQ въпроса' : '15-20 FAQ questions',
        'Basic analytics',
        lang === 'bg' ? 'Email (48h)' : 'Email (48h)'
      ],
      notIncluded: ['Google Calendar', 'Email notifications', 'CRM integration']
    },
    {
      ...PRICING.pro,
      description: lang === 'bg' ? 'Най-популярен избор' : 'Most popular choice',
      featuresText: [
        `${PRICING.pro.messages} ${t.messagesMonth}`,
        `3 ${t.channels}`,
        `5 ${t.languages}`,
        lang === 'bg' ? 'Неограничени FAQ' : 'Unlimited FAQ',
        'Google Calendar',
        'Email notifications',
        'Advanced analytics',
        lang === 'bg' ? 'Priority (24h)' : 'Priority (24h)',
        'Custom branding'
      ],
      notIncluded: ['White-label', 'Phone support']
    },
    {
      ...PRICING.enterprise,
      description: lang === 'bg' ? 'За растящи компании' : 'For growing companies',
      featuresText: [
        `10,000 ${t.messagesMonth}`,
        lang === 'bg' ? 'Всички канали' : 'All channels',
        `12+ ${t.languages}`,
        lang === 'bg' ? 'Неограничени FAQ' : 'Unlimited FAQ',
        'Google Calendar',
        'Premium CRM',
        'Advanced analytics',
        lang === 'bg' ? 'Телефонна поддръжка' : 'Phone support',
        'White-label',
        'Dedicated model'
      ],
      notIncluded: []
    }
  ]

  return (
    <section id="pricing" className="py-20 sm:py-32 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">{t.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">{t.subtitle}</p>

          <div className="inline-flex items-center gap-4 p-1 rounded-full bg-gray-100 dark:bg-gray-800">
            <button onClick={() => setBillingPeriod('monthly')} className={`px-6 py-2 rounded-full font-semibold transition-all ${billingPeriod === 'monthly' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow' : 'text-gray-600 dark:text-gray-400'}`}>{t.monthly}</button>
            <button onClick={() => setBillingPeriod('annual')} className={`px-6 py-2 rounded-full font-semibold transition-all ${billingPeriod === 'annual' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow' : 'text-gray-600 dark:text-gray-400'}`}>
              {t.annual}
              <span className="ml-2 px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs">{t.save} 17%</span>
            </button>
          </div>
        </motion.div>

        {/* Desktop: 3-column grid with hover highlight */}
        <div ref={gridRef} className="relative hidden md:grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20" onMouseLeave={() => setHoveredIndex(null)}>
          {/* Animated highlight border — only visible on hover */}
          {hoveredIndex !== null && (
            <motion.div
              className="absolute rounded-3xl pointer-events-none z-20"
              initial={false}
              animate={{
                left: highlightStyle.left - 2,
                top: highlightStyle.top - 2,
                width: highlightStyle.width + 4,
                height: highlightStyle.height + 4,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              style={{
                background: 'transparent',
                border: '2px solid rgba(37,99,235,0.6)',
                boxShadow: '0 0 20px rgba(37,99,235,0.15), inset 0 0 20px rgba(37,99,235,0.03)',
              }}
            />
          )}
          {plans.map((plan, i) => {
            const displayPrice = billingPeriod === 'annual' ? Math.round(plan.annual / 12) : plan.price
            const monthlySavings = billingPeriod === 'annual' ? plan.annualSavings : 0
            const isActive = hoveredIndex === null ? (plan as any).popular : hoveredIndex === i
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                onMouseEnter={(e) => handleMouseEnter(i, e)}
                className={`relative z-10 p-8 pt-10 rounded-3xl border-2 transition-all duration-200 ${(plan as any).popular && hoveredIndex === null ? 'border-blue-600/40' : hoveredIndex === i ? 'border-transparent' : 'border-gray-200 dark:border-gray-800'} bg-white dark:bg-gray-900`}>
                {/* Popular badge — follows the active card */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30"
                    >
                      <div className="px-4 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 whitespace-nowrap">
                        {(plan as any).popular ? t.popular : plan.name}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <PlanCardContent plan={plan} displayPrice={displayPrice} monthlySavings={monthlySavings} billingPeriod={billingPeriod} t={t} lang={lang} />
              </motion.div>
            )
          })}
        </div>

        {/* Mobile: swipeable carousel left/right */}
        <div className="md:hidden mb-20 max-w-6xl mx-auto">
          <div className="relative pt-4">
            <AnimatePresence mode="wait" custom={mobileCard}>
              <motion.div
                key={mobileCard}
                custom={mobileCard}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                style={{ touchAction: 'pan-y' }}
                onDragEnd={(_e, info) => {
                  const threshold = 50
                  if (info.offset.x < -threshold && mobileCard < plans.length - 1) {
                    setMobileCard(mobileCard + 1)
                  } else if (info.offset.x > threshold && mobileCard > 0) {
                    setMobileCard(mobileCard - 1)
                  }
                }}
                className={`relative p-8 rounded-3xl border-2 ${(plans[mobileCard] as any).popular ? 'border-blue-600 shadow-2xl' : 'border-gray-200 dark:border-gray-800'} bg-white dark:bg-gray-900`}
              >
                {(plans[mobileCard] as any).popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-blue-600 text-white text-sm font-semibold shadow-lg shadow-blue-600/30 z-10">{t.popular}</div>
                )}
                <PlanCardContent
                  plan={plans[mobileCard]}
                  displayPrice={billingPeriod === 'annual' ? Math.round(plans[mobileCard].annual / 12) : plans[mobileCard].price}
                  monthlySavings={billingPeriod === 'annual' ? plans[mobileCard].annualSavings : 0}
                  billingPeriod={billingPeriod}
                  t={t}
                  lang={lang}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot indicators + arrows */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <button
              onClick={() => setMobileCard(Math.max(0, mobileCard - 1))}
              disabled={mobileCard === 0}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${mobileCard === 0 ? 'opacity-30' : 'bg-gray-100 dark:bg-gray-800 active:scale-90'}`}
            >
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className="flex gap-2">
              {plans.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMobileCard(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === mobileCard ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300 dark:bg-gray-700'}`}
                />
              ))}
            </div>
            <button
              onClick={() => setMobileCard(Math.min(plans.length - 1, mobileCard + 1))}
              disabled={mobileCard === plans.length - 1}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${mobileCard === plans.length - 1 ? 'opacity-30' : 'bg-gray-100 dark:bg-gray-800 active:scale-90'}`}
            >
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto" id="faq">
          <h3 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white">{t.faq.title}</h3>
          <div className="space-y-6">
            {[{q: t.faq.q1, a: t.faq.a1}, {q: t.faq.q2, a: t.faq.a2}, {q: t.faq.q3, a: t.faq.a3}, {q: t.faq.q4, a: t.faq.a4}].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{item.q}</h4>
                <p className="text-gray-600 dark:text-gray-400">{item.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function PlanCardContent({ plan, displayPrice, monthlySavings, billingPeriod, t, lang }: {
  plan: any
  displayPrice: number
  monthlySavings: number
  billingPeriod: string
  t: any
  lang: string
}) {
  return (
    <>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{plan.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>
        <div className="mb-2">
          <span className="text-5xl font-bold text-gray-900 dark:text-white">€{displayPrice}</span>
          <span className="text-gray-600 dark:text-gray-400">{t.perMonth}</span>
        </div>
        {billingPeriod === 'annual' && monthlySavings > 0 && (
          <p className="text-sm text-green-600 dark:text-green-400">{t.save} €{monthlySavings}/{lang === 'bg' ? 'год' : 'yr'}</p>
        )}
        {billingPeriod === 'annual' && (
          <p className="text-xs text-gray-500 mt-1">€{plan.annual} {lang === 'bg' ? 'годишно' : 'annually'}</p>
        )}
      </div>
      <ul className="space-y-3 mb-8">
        {plan.featuresText.map((feature: string, j: number) => (
          <li key={j} className="flex items-start gap-3">
            <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
          </li>
        ))}
        {plan.notIncluded.map((feature: string, j: number) => (
          <li key={`not-${j}`} className="flex items-start gap-3">
            <svg className="w-5 h-5 text-gray-300 dark:text-gray-700 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
            <span className="text-sm text-gray-400 dark:text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      <Link href="/book-demo"
        className={`block w-full px-6 py-4 rounded-full text-center font-semibold transition-all ${(plan as any).popular ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
        {t.getStarted}
      </Link>
    </>
  )
}
