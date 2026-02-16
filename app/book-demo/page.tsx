'use client'

import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'
import Link from 'next/link'
import { useState } from 'react'

const copy = {
  en: {
    label: 'Book a Demo',
    headline: 'See NextBot in action.',
    sub: 'Book a 20-minute call. We\'ll show you how our AI can automate your customer communication.',
    form: {
      name: 'Full name',
      email: 'Email',
      phone: 'Phone',
      company: 'Company',
      businessType: 'Business type',
      businessTypes: ['Hotel / Tourism', 'E-commerce', 'Restaurant', 'Services', 'Real Estate', 'Other'],
      preferredDate: 'Preferred date',
      preferredTime: 'Preferred time',
      message: 'What interests you the most?',
      submit: 'Book Demo',
      submitting: 'Submitting...',
    },
    timeSlots: ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'],
    benefits: [
      'Personalized for your business',
      '20 minutes — focused and efficient',
      'Concrete solutions, not generic talk',
      'Completely free, no commitment',
    ],
    success: {
      title: 'Demo booked.',
      message: 'You\'ll receive a confirmation email within 24 hours.',
      cta: 'Back to home',
    },
  },
  bg: {
    label: 'Запази демо',
    headline: 'Вижте NextBot в действие.',
    sub: 'Запазете 20-минутно обаждане. Ще ви покажем как нашият AI може да автоматизира комуникацията с клиенти.',
    form: {
      name: 'Име и фамилия',
      email: 'Email',
      phone: 'Телефон',
      company: 'Компания',
      businessType: 'Тип бизнес',
      businessTypes: ['Хотел / Туризъм', 'E-commerce', 'Ресторант', 'Услуги', 'Недвижими имоти', 'Друго'],
      preferredDate: 'Предпочитана дата',
      preferredTime: 'Предпочитан час',
      message: 'Какво ви интересува най-много?',
      submit: 'Запази демо',
      submitting: 'Изпращаме...',
    },
    timeSlots: ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'],
    benefits: [
      'Персонализирано за вашия бизнес',
      '20 минути — фокусирано и ефективно',
      'Конкретни решения, не общи приказки',
      'Напълно безплатно, без ангажимент',
    ],
    success: {
      title: 'Демо запазено.',
      message: 'Ще получите потвърждение на имейла си до 24 часа.',
      cta: 'Към начало',
    },
  },
}

export default function BookDemoPage() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', businessType: '',
    preferredDate: '', preferredTime: '', message: '',
  })
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('/api/book-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) setSuccess(true)
    } catch (error) {
      console.error('Booking error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <section className="min-h-[80svh] flex items-center justify-center">
        <div className="max-w-md mx-auto px-5 text-center">
          <AnimateIn>
            <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <svg className="w-7 h-7 text-emerald-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-[1.75rem] font-semibold text-white mb-3">{t.success.title}</h1>
            <p className="text-zinc-500 mb-8">{t.success.message}</p>
            <Link href="/" className="inline-flex items-center px-7 py-3.5 bg-white text-zinc-950 text-[0.9rem] font-medium rounded-lg hover:bg-zinc-100 transition-colors">
              {t.success.cta}
            </Link>
          </AnimateIn>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="pt-36 pb-28 sm:pt-44 sm:pb-36">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24">
            {/* Left — Info */}
            <div>
              <AnimateIn>
                <p className="text-[0.7rem] text-indigo-400/60 uppercase tracking-[0.2em] font-medium mb-5">{t.label}</p>
                <h1 className="text-[2rem] sm:text-[3rem] font-semibold leading-[1.08] tracking-[-0.035em] text-white">{t.headline}</h1>
                <p className="mt-5 text-[1.05rem] text-zinc-500 leading-[1.7]">{t.sub}</p>
              </AnimateIn>

              <AnimateIn delay={100}>
                <ul className="mt-12 space-y-4">
                  {t.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                      <svg className="w-3.5 h-3.5 mt-0.5 text-zinc-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
              </AnimateIn>
            </div>

            {/* Right — Form */}
            <AnimateIn delay={150}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-zinc-500 mb-2">{t.form.name} *</label>
                  <input
                    type="text" required value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-zinc-700 focus:outline-none focus:border-indigo-500/30 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-zinc-500 mb-2">{t.form.email} *</label>
                    <input
                      type="email" required value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-zinc-700 focus:outline-none focus:border-indigo-500/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-500 mb-2">{t.form.phone}</label>
                    <input
                      type="tel" value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-zinc-700 focus:outline-none focus:border-indigo-500/30 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-zinc-500 mb-2">{t.form.company}</label>
                  <input
                    type="text" value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-zinc-700 focus:outline-none focus:border-indigo-500/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-500 mb-3">{t.form.businessType}</label>
                  <div className="flex flex-wrap gap-2">
                    {t.form.businessTypes.map((type) => (
                      <button
                        key={type} type="button"
                        onClick={() => setFormData({ ...formData, businessType: type })}
                        className={`px-3.5 py-1.5 rounded-lg text-[0.82rem] font-medium transition-all ${
                          formData.businessType === type
                            ? 'bg-white text-zinc-950'
                            : 'bg-white/[0.04] text-zinc-500 border border-white/[0.08] hover:border-white/[0.14]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-zinc-500 mb-2">{t.form.preferredDate}</label>
                    <input
                      type="date" value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-indigo-500/30 transition-colors [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-500 mb-2">{t.form.preferredTime}</label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {t.timeSlots.map((slot) => (
                        <button
                          key={slot} type="button"
                          onClick={() => setFormData({ ...formData, preferredTime: slot })}
                          className={`px-2 py-2 rounded-lg text-[0.78rem] font-mono transition-all ${
                            formData.preferredTime === slot
                              ? 'bg-white text-zinc-950'
                              : 'bg-white/[0.04] text-zinc-600 border border-white/[0.08] hover:border-white/[0.14]'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-zinc-500 mb-2">{t.form.message}</label>
                  <textarea
                    rows={3} value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-zinc-700 focus:outline-none focus:border-indigo-500/30 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit" disabled={loading || !formData.name || !formData.email}
                  className="w-full px-7 py-3.5 bg-white text-zinc-950 text-[0.9rem] font-medium rounded-lg hover:bg-zinc-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {loading ? t.form.submitting : t.form.submit}
                </button>
              </form>
            </AnimateIn>
          </div>
        </div>
      </section>
    </>
  )
}
