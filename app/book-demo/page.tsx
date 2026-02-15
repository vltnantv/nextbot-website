'use client'

import { useLanguage } from '@/lib/i18n'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

export default function BookDemoPage() {
  const { lang } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
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

      if (response.ok) {
        setSuccess(true)
      }
    } catch (error) {
      console.error('Booking error:', error)
    } finally {
      setLoading(false)
    }
  }

  const content = {
    bg: {
      title: 'Запази персонално demo',
      subtitle: '20-минутен разговор със специалист',

      form: {
        name: 'Име и фамилия',
        email: 'Email',
        phone: 'Телефон',
        company: 'Компания',
        preferredDate: 'Предпочитана дата',
        preferredTime: 'Предпочитан час',
        message: 'Допълнителна информация (optional)',
        submit: 'Изпрати заявка',
        submitting: 'Изпращаме...'
      },

      success: {
        title: 'Заявката е изпратена!',
        message: 'Ще се свържем с вас до 24 часа за потвърждение на часа.',
        cta: 'Обратно към начало'
      },

      timeSlots: [
        '09:00 - 10:00',
        '10:00 - 11:00',
        '11:00 - 12:00',
        '13:00 - 14:00',
        '14:00 - 15:00',
        '15:00 - 16:00',
        '16:00 - 17:00'
      ]
    },

    en: {
      title: 'Book a personal demo',
      subtitle: '20-minute call with a specialist',

      form: {
        name: 'Full name',
        email: 'Email',
        phone: 'Phone',
        company: 'Company',
        preferredDate: 'Preferred date',
        preferredTime: 'Preferred time',
        message: 'Additional information (optional)',
        submit: 'Submit request',
        submitting: 'Submitting...'
      },

      success: {
        title: 'Request sent!',
        message: "We'll contact you within 24 hours to confirm the time.",
        cta: 'Back to home'
      },

      timeSlots: [
        '09:00 - 10:00',
        '10:00 - 11:00',
        '11:00 - 12:00',
        '13:00 - 14:00',
        '14:00 - 15:00',
        '15:00 - 16:00',
        '16:00 - 17:00'
      ]
    }
  }

  const t = content[lang as keyof typeof content]

  if (success) {
    return (
      <main className="min-h-screen bg-white dark:bg-black pt-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto px-4 text-center"
        >
          <div className="text-6xl mb-6">{'\u2705'}</div>
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            {t.success.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t.success.message}
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            {t.success.cta}
          </Link>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black pt-20 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t.subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-8">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
              {t.form.name} *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                {t.form.email} *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                {t.form.phone}
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
              {t.form.company}
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                {t.form.preferredDate} *
              </label>
              <input
                type="date"
                required
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                {t.form.preferredTime} *
              </label>
              <select
                required
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">{lang === 'bg' ? 'Избери...' : 'Select...'}</option>
                {t.timeSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
              {t.form.message}
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`
              w-full px-8 py-4 rounded-full font-semibold transition-colors text-lg
              ${loading
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
              }
            `}
          >
            {loading ? t.form.submitting : t.form.submit}
          </button>
        </form>

        {/* Neo Banner */}
        <div className="mt-16 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 p-8 sm:p-12 text-center text-white">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3">
            {lang === 'bg' ? 'Готов за AI асистент който никога не спи?' : 'Ready for an AI assistant that never sleeps?'}
          </h3>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            {lang === 'bg'
              ? 'Neo отговаря на клиентите ти 24/7, на всеки език, на всяка платформа.'
              : 'Neo answers your customers 24/7, in any language, on any platform.'}
          </p>
          <Link
            href="/neo"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-blue-600 font-semibold hover:scale-105 transition-transform text-lg"
          >
            {lang === 'bg' ? 'Виж Neo' : 'Get Neo'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  )
}
