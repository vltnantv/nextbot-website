'use client'

import { useLanguage } from '@/lib/i18n'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

const STEPS = ['info', 'schedule', 'confirm'] as const
type Step = typeof STEPS[number]

export default function BookDemoPage() {
  const { lang } = useLanguage()
  const [step, setStep] = useState<Step>('info')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    businessType: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
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
        body: JSON.stringify(formData)
      })
      if (response.ok) setSuccess(true)
    } catch (error) {
      console.error('Booking error:', error)
    } finally {
      setLoading(false)
    }
  }

  const content = {
    bg: {
      title: 'Запази персонално demo',
      subtitle: 'Ще ти покажем как Neo може да трансформира бизнеса ти за 20 минути',
      steps: ['Информация', 'Час', 'Потвърди'],
      form: {
        name: 'Име и фамилия',
        email: 'Email',
        phone: 'Телефон',
        company: 'Компания',
        businessType: 'Тип бизнес',
        businessTypes: ['Хотел / Туризъм', 'E-commerce', 'Ресторант / Кафене', 'Услуги', 'Друго'],
        preferredDate: 'Предпочитана дата',
        preferredTime: 'Предпочитан час',
        message: 'Какво те интересува най-много?',
        next: 'Продължи',
        back: 'Назад',
        submit: 'Потвърди записването',
        submitting: 'Изпращаме...'
      },
      benefits: [
        { icon: '🎯', text: 'Персонализирано demo за твоя бизнес' },
        { icon: '⏱', text: '20 минути — без загуба на време' },
        { icon: '💡', text: 'Конкретни решения, не общи приказки' },
        { icon: '🆓', text: 'Напълно безплатно, без ангажимент' },
      ],
      success: {
        title: 'Записан си!',
        message: 'Ще получиш потвърждение на имейла си до 24 часа.',
        cta: 'Обратно към начало'
      },
      timeSlots: [
        '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00',
        '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00'
      ]
    },
    en: {
      title: 'Book a personal demo',
      subtitle: "We'll show you how Neo can transform your business in 20 minutes",
      steps: ['Info', 'Schedule', 'Confirm'],
      form: {
        name: 'Full name',
        email: 'Email',
        phone: 'Phone',
        company: 'Company',
        businessType: 'Business type',
        businessTypes: ['Hotel / Tourism', 'E-commerce', 'Restaurant / Cafe', 'Services', 'Other'],
        preferredDate: 'Preferred date',
        preferredTime: 'Preferred time',
        message: 'What interests you the most?',
        next: 'Continue',
        back: 'Back',
        submit: 'Confirm booking',
        submitting: 'Submitting...'
      },
      benefits: [
        { icon: '🎯', text: 'Personalized demo for your business' },
        { icon: '⏱', text: '20 minutes — no time wasted' },
        { icon: '💡', text: 'Concrete solutions, not generic talk' },
        { icon: '🆓', text: 'Completely free, no commitment' },
      ],
      success: {
        title: "You're booked!",
        message: "You'll receive a confirmation email within 24 hours.",
        cta: 'Back to home'
      },
      timeSlots: [
        '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00',
        '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00'
      ]
    }
  }

  const t = content[lang as keyof typeof content]
  const stepIndex = STEPS.indexOf(step)

  const canProceedToSchedule = formData.name && formData.email
  const canSubmit = formData.preferredDate && formData.preferredTime

  if (success) {
    return (
      <main className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="max-w-md mx-auto px-4 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 400 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
          >
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <h1 className="text-3xl font-bold mb-4 text-white">{t.success.title}</h1>
          <p className="text-gray-400 mb-8">{t.success.message}</p>
          <Link href="/" className="inline-block px-8 py-4 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
            {t.success.cta}
          </Link>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black pt-20 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white">{t.title}</h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left side — Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 hidden lg:block"
          >
            <div className="sticky top-28 space-y-6">
              {t.benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10"
                >
                  <span className="text-2xl">{benefit.icon}</span>
                  <span className="text-gray-300 text-sm leading-relaxed">{benefit.text}</span>
                </motion.div>
              ))}

              {/* Trust indicators */}
              <div className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex -space-x-2">
                    {['bg-blue-500', 'bg-purple-500', 'bg-cyan-500'].map((c, i) => (
                      <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-black flex items-center justify-center text-white text-xs font-bold`}>
                        {['M', 'G', 'A'][i]}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">
                    {lang === 'bg' ? '50+ бизнеса ни се довериха' : '50+ businesses trust us'}
                  </span>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-xs text-gray-500">5.0</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side — Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-8">
              {STEPS.map((s, i) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-all ${
                    i <= stepIndex ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-500'
                  }`}>
                    {i < stepIndex ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </div>
                  <span className={`text-sm hidden sm:block ${i <= stepIndex ? 'text-white' : 'text-gray-600'}`}>
                    {t.steps[i]}
                  </span>
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-px ${i < stepIndex ? 'bg-blue-600' : 'bg-white/10'}`} />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="bg-white/[0.03] backdrop-blur-sm rounded-3xl border border-white/10 p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  {/* Step 1: Info */}
                  {step === 'info' && (
                    <motion.div
                      key="info"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-5"
                    >
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">{t.form.name} *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                          placeholder={lang === 'bg' ? 'Иван Иванов' : 'John Smith'}
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-300">{t.form.email} *</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                            placeholder="email@company.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-300">{t.form.phone}</label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                            placeholder="+359 ..."
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">{t.form.company}</label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">{t.form.businessType}</label>
                        <div className="flex flex-wrap gap-2">
                          {t.form.businessTypes.map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setFormData({ ...formData, businessType: type })}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                formData.businessType === type
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/30'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Schedule */}
                  {step === 'schedule' && (
                    <motion.div
                      key="schedule"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-5"
                    >
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">{t.form.preferredDate} *</label>
                        <input
                          type="date"
                          required
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors [color-scheme:dark]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-3 text-gray-300">{t.form.preferredTime} *</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {t.timeSlots.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setFormData({ ...formData, preferredTime: slot })}
                              className={`px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                                formData.preferredTime === slot
                                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                  : 'bg-white/5 text-gray-400 border border-white/10 hover:border-blue-500/50'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">{t.form.message}</label>
                        <textarea
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors resize-none"
                          placeholder={lang === 'bg' ? 'Напр. Искам да видя как работи с booking системи...' : 'E.g. I want to see how it works with booking systems...'}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Confirm */}
                  {step === 'confirm' && (
                    <motion.div
                      key="confirm"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold text-white mb-4">
                        {lang === 'bg' ? 'Преглед на записването' : 'Booking summary'}
                      </h3>

                      {[
                        { label: t.form.name, value: formData.name },
                        { label: t.form.email, value: formData.email },
                        { label: t.form.phone, value: formData.phone },
                        { label: t.form.company, value: formData.company },
                        { label: t.form.businessType, value: formData.businessType },
                        { label: t.form.preferredDate, value: formData.preferredDate },
                        { label: t.form.preferredTime, value: formData.preferredTime },
                      ].filter(item => item.value).map((item, i) => (
                        <div key={i} className="flex justify-between items-center py-3 border-b border-white/5">
                          <span className="text-sm text-gray-500">{item.label}</span>
                          <span className="text-sm text-white font-medium">{item.value}</span>
                        </div>
                      ))}

                      {formData.message && (
                        <div className="pt-3">
                          <span className="text-sm text-gray-500">{t.form.message}</span>
                          <p className="text-sm text-gray-300 mt-1">{formData.message}</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-white/5">
                  {stepIndex > 0 ? (
                    <button
                      type="button"
                      onClick={() => setStep(STEPS[stepIndex - 1])}
                      className="px-6 py-3 rounded-full text-sm font-semibold text-gray-400 hover:text-white transition-colors"
                    >
                      {t.form.back}
                    </button>
                  ) : <div />}

                  {step === 'confirm' ? (
                    <button
                      type="submit"
                      disabled={loading}
                      className={`px-8 py-3.5 rounded-full font-semibold transition-all text-base ${
                        loading
                          ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30 hover:scale-105'
                      }`}
                    >
                      {loading ? t.form.submitting : t.form.submit}
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={step === 'info' && !canProceedToSchedule}
                      onClick={() => setStep(STEPS[stepIndex + 1])}
                      className={`px-8 py-3.5 rounded-full font-semibold transition-all text-base ${
                        (step === 'info' && !canProceedToSchedule) || (step === 'schedule' && !canSubmit)
                          ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30 hover:scale-105'
                      }`}
                    >
                      {t.form.next}
                    </button>
                  )}
                </div>
              </div>
            </form>

            {/* Mobile benefits */}
            <div className="lg:hidden mt-8 grid grid-cols-2 gap-3">
              {t.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-lg">{benefit.icon}</span>
                  <span className="text-gray-400 text-xs leading-relaxed">{benefit.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Neo Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/20 p-8 sm:p-12 text-center"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white">
            {lang === 'bg' ? 'Готов за AI асистент който никога не спи?' : 'Ready for an AI assistant that never sleeps?'}
          </h3>
          <p className="text-gray-400 max-w-lg mx-auto">
            {lang === 'bg'
              ? 'Neo отговаря на клиентите ти 24/7, на всеки език, на всяка платформа.'
              : 'Neo answers your customers 24/7, in any language, on any platform.'}
          </p>
        </motion.div>
      </div>
    </main>
  )
}
