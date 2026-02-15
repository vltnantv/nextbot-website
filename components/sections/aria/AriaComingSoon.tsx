'use client'

import { useLanguage } from '@/lib/i18n'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

const content = {
  bg: {
    badge: 'Скоро',
    title: 'Aria: Гласов AI Асистент',
    subtitle: 'Aria отговаря на телефонни обаждания автоматично с естествен глас. Разбира български и още 12+ езика.',
    waitlistTitle: 'Бъдете първите, които ще опитат Aria',
    waitlistDescription: 'Оставете имейла си и ще ви уведомим, когато Aria е готова.',
    emailPlaceholder: 'вашият@имейл.com',
    submitButton: 'Запиши ме',
    submitting: 'Изпращане...',
    successMessage: 'Благодарим! Ще ви уведомим, когато Aria стартира.',
    errorMessage: 'Възникна грешка. Моля, опитайте отново.',
    demoTitle: 'Как работи Aria',
    demoSteps: [
      { icon: '📞', label: 'Клиент се обажда', description: 'Входящо обаждане на вашия номер' },
      { icon: '🤖', label: 'Aria отговаря', description: 'С естествен глас на български' },
      { icon: '💬', label: 'Разбира нуждата', description: 'AI анализира и разбира контекста' },
      { icon: '✅', label: 'Решава задачата', description: 'Резервация, информация или пренасочване' },
    ],
    featuresTitle: 'Възможности',
    features: [
      { icon: '🗣️', title: 'Естествен български глас', description: 'Aria говори на перфектен български с естествена интонация и темпо.' },
      { icon: '🧠', title: 'Разбира контекста', description: 'Напреднал AI, който разбира намерението зад въпросите на клиентите.' },
      { icon: '📝', title: 'Записва разговорите', description: 'Всяко обаждане се записва и транскрибира автоматично за преглед.' },
      { icon: '🔗', title: 'Интеграции', description: 'Свързва се с Google Calendar, CRM системи и вашите вътрешни инструменти.' },
      { icon: '📱', title: 'Неограничени линии', description: 'Мащабирайте до колкото линии ви трябват без забавяне.' },
      { icon: '🌍', title: '12+ езика', description: 'Освен български, Aria поддържа английски, немски, испански и още.' },
    ],
    useCasesTitle: 'Примери за употреба',
    useCases: [
      { icon: '🍽️', title: 'Приемане на резервации', description: 'Aria приема и потвърждава резервации за ресторанти и хотели автоматично.' },
      { icon: '❓', title: 'Често задавани въпроси', description: 'Отговаря на повтарящи се въпроси без да натоварва екипа ви.' },
      { icon: '📅', title: 'Записване за часове', description: 'Букира часове за клиники, салони и сервизи директно в календара.' },
      { icon: '📋', title: 'Събиране на информация', description: 'Събира данни от обаждащите се и ги изпраща структурирано.' },
      { icon: '🔀', title: 'Пренасочване към отдели', description: 'Разбира нуждата и пренасочва към правилния отдел или служител.' },
      { icon: '🕐', title: '24/7 телефонна линия', description: 'Aria никога не спи - отговаря денонощно, включително празници.' },
    ],
    pricingTitle: 'Предварителни цени',
    pricingSubtitle: 'Окончателните цени може да се променят при стартиране.',
    plans: [
      {
        name: 'Voice Starter',
        price: '€99',
        period: '/мес',
        features: ['200 минути разговори', '1 телефонна линия', 'Български глас', 'Базово пренасочване'],
        highlighted: false,
      },
      {
        name: 'Voice Pro',
        price: '€249',
        period: '/мес',
        features: ['1000 минути разговори', '5 телефонни линии', 'Всички гласове', 'Напреднало пренасочване', 'CRM интеграция', 'Аналитика'],
        highlighted: true,
      },
    ],
    launchLabel: 'Очаквана дата на стартиране',
    launchDate: 'Q2 2026',
    ctaTitle: 'Междувременно, опитайте Neo',
    ctaDescription: 'Neo е нашият текстов AI асистент за уебсайтове - наличен днес.',
    ctaButton: 'Разгледайте Neo',
  },
  en: {
    badge: 'Coming Soon',
    title: 'Aria: Voice AI Assistant',
    subtitle: 'Aria answers phone calls automatically with a natural voice. Understands Bulgarian and 12+ languages.',
    waitlistTitle: 'Be the first to try Aria',
    waitlistDescription: 'Leave your email and we\'ll notify you when Aria is ready.',
    emailPlaceholder: 'your@email.com',
    submitButton: 'Join Waitlist',
    submitting: 'Submitting...',
    successMessage: 'Thank you! We\'ll notify you when Aria launches.',
    errorMessage: 'An error occurred. Please try again.',
    demoTitle: 'How Aria Works',
    demoSteps: [
      { icon: '📞', label: 'Customer calls', description: 'Incoming call to your number' },
      { icon: '🤖', label: 'Aria answers', description: 'With a natural voice in Bulgarian' },
      { icon: '💬', label: 'Understands the need', description: 'AI analyzes and understands context' },
      { icon: '✅', label: 'Resolves the task', description: 'Reservation, info, or routing' },
    ],
    featuresTitle: 'Features',
    features: [
      { icon: '🗣️', title: 'Natural Bulgarian Voice', description: 'Aria speaks perfect Bulgarian with natural intonation and pacing.' },
      { icon: '🧠', title: 'Understands Context', description: 'Advanced AI that understands the intent behind customer questions.' },
      { icon: '📝', title: 'Records Conversations', description: 'Every call is recorded and transcribed automatically for review.' },
      { icon: '🔗', title: 'Integrations', description: 'Connects with Google Calendar, CRM systems, and your internal tools.' },
      { icon: '📱', title: 'Unlimited Lines', description: 'Scale to as many lines as you need without delays.' },
      { icon: '🌍', title: '12+ Languages', description: 'Besides Bulgarian, Aria supports English, German, Spanish, and more.' },
    ],
    useCasesTitle: 'Use Cases',
    useCases: [
      { icon: '🍽️', title: 'Taking Reservations', description: 'Aria accepts and confirms reservations for restaurants and hotels automatically.' },
      { icon: '❓', title: 'FAQ', description: 'Answers repetitive questions without burdening your team.' },
      { icon: '📅', title: 'Appointment Booking', description: 'Books appointments for clinics, salons, and services directly in the calendar.' },
      { icon: '📋', title: 'Information Gathering', description: 'Collects data from callers and sends it in a structured format.' },
      { icon: '🔀', title: 'Department Routing', description: 'Understands the need and routes to the right department or employee.' },
      { icon: '🕐', title: '24/7 Phone Line', description: 'Aria never sleeps - answers around the clock, including holidays.' },
    ],
    pricingTitle: 'Preliminary Pricing',
    pricingSubtitle: 'Final pricing may change at launch.',
    plans: [
      {
        name: 'Voice Starter',
        price: '€99',
        period: '/mo',
        features: ['200 minutes of calls', '1 phone line', 'Bulgarian voice', 'Basic routing'],
        highlighted: false,
      },
      {
        name: 'Voice Pro',
        price: '€249',
        period: '/mo',
        features: ['1000 minutes of calls', '5 phone lines', 'All voices', 'Advanced routing', 'CRM integration', 'Analytics'],
        highlighted: true,
      },
    ],
    launchLabel: 'Expected Launch Date',
    launchDate: 'Q2 2026',
    ctaTitle: 'Meanwhile, try Neo',
    ctaDescription: 'Neo is our text-based AI assistant for websites - available today.',
    ctaButton: 'Explore Neo',
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

export function AriaComingSoon() {
  const { lang } = useLanguage()
  const t = content[lang] || content.bg
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/aria-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-purple-950/20 to-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-purple-600/10 blur-[120px]" />
          <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-pink-600/10 blur-[100px]" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {t.badge}
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t.title}
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.subtitle}
          </motion.p>

          {/* Waitlist Form */}
          <motion.div
            className="max-w-lg mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-white mb-2">{t.waitlistTitle}</h3>
            <p className="text-gray-400 text-sm mb-4">{t.waitlistDescription}</p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-purple-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {status === 'loading' ? t.submitting : t.submitButton}
              </button>
            </form>
            {status === 'success' && (
              <p className="mt-3 text-sm text-green-400">{t.successMessage}</p>
            )}
            {status === 'error' && (
              <p className="mt-3 text-sm text-red-400">{t.errorMessage}</p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Demo Visualization */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            {t.demoTitle}
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {t.demoSteps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-sm"
              >
                {i < t.demoSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
                )}
                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="text-xs font-semibold text-purple-400 mb-1">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{step.label}</h3>
                <p className="text-sm text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            {t.featuresTitle}
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {t.features.map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-2xl bg-white/5 border border-purple-500/15 hover:border-purple-500/40 transition-colors group"
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            {t.useCasesTitle}
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {t.useCases.map((useCase, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/15 hover:border-pink-500/40 transition-colors"
              >
                <div className="text-3xl mb-4">{useCase.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{useCase.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{useCase.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.pricingTitle}
            </h2>
            <p className="text-gray-400">{t.pricingSubtitle}</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {t.plans.map((plan, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className={`relative p-8 rounded-2xl border ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/50'
                    : 'bg-white/5 border-purple-500/20'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  <span className="text-gray-400 ml-1">{plan.period}</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center text-sm text-gray-300">
                      <svg
                        className="w-4 h-4 mr-3 text-purple-400 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Launch Date */}
      <section className="py-16 px-4">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-3">
            {t.launchLabel}
          </p>
          <p className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {t.launchDate}
          </p>
        </motion.div>
      </section>

      {/* CTA - Try Neo */}
      <section className="py-20 px-4">
        <motion.div
          className="max-w-2xl mx-auto text-center p-10 rounded-3xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-white mb-4">{t.ctaTitle}</h2>
          <p className="text-gray-400 mb-8">{t.ctaDescription}</p>
          <Link
            href="/neo"
            className="inline-block px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all hover:scale-105"
          >
            {t.ctaButton}
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
