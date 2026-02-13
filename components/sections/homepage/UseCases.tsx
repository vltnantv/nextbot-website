'use client'

import { useLanguage } from '@/lib/i18n'
import { motion } from 'framer-motion'

const cases = {
  bg: [
    {
      industry: 'Хотели',
      icon: '🏨',
      headline: '"Имате ли свободна стая?"',
      result: 'Neo резервира автоматично. 0 пропуснати резервации.',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      industry: 'Е-търговия',
      icon: '🛒',
      headline: '"Къде е пратката ми?"',
      result: 'Neo проверява статуса и отговаря мигновено.',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      industry: 'Услуги',
      icon: '💼',
      headline: '"Кога имате свободен час?"',
      result: 'Neo проверява календара и записва час.',
      color: 'from-purple-500 to-pink-600',
    },
  ],
  en: [
    {
      industry: 'Hotels',
      icon: '🏨',
      headline: '"Do you have a room available?"',
      result: 'Neo books automatically. 0 missed reservations.',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      industry: 'E-commerce',
      icon: '🛒',
      headline: '"Where is my order?"',
      result: 'Neo checks the status and responds instantly.',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      industry: 'Services',
      icon: '💼',
      headline: '"When is your next available slot?"',
      result: 'Neo checks the calendar and books the appointment.',
      color: 'from-purple-500 to-pink-600',
    },
  ],
}

export function UseCases() {
  const { lang } = useLanguage()
  const items = cases[lang]

  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-[980px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            {lang === 'bg' ? 'Neo работи за всеки бизнес.' : 'Neo works for every business.'}
          </h2>
          <p className="text-lg text-gray-400">
            {lang === 'bg'
              ? 'Един AI. Всякакви индустрии.'
              : 'One AI. Any industry.'}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative overflow-hidden rounded-3xl p-8 text-white"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color}`} />
              <div className="relative z-10">
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <div className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-2">
                  {item.industry}
                </div>
                <p className="text-lg font-semibold italic mb-4 opacity-90">{item.headline}</p>
                <p className="text-sm opacity-80">{item.result}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
