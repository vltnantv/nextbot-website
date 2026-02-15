'use client'

import { useLanguage } from '@/lib/i18n'
import { motion } from 'framer-motion'

const stats = {
  bg: [
    { value: '<1s', label: 'Средно време за отговор' },
    { value: '24/7', label: 'Винаги наличен' },
    { value: '12+', label: 'Поддържани езика' },
    { value: '€120', label: 'от / месец' },
  ],
  en: [
    { value: '<1s', label: 'Average response time' },
    { value: '24/7', label: 'Always available' },
    { value: '12+', label: 'Languages supported' },
    { value: '€120', label: 'from / month' },
  ],
}

const testimonials = {
  bg: [
    {
      quote: 'Neo отговаря на гостите ни по-бързо от рецепцията. Резервациите ни нараснаха с 30%.',
      name: 'Мария К.',
      role: '',
    },
    {
      quote: 'Спестихме 20+ часа седмично от customer support. Neo се справя перфектно.',
      name: 'Георги Д.',
      role: '',
    },
  ],
  en: [
    {
      quote: 'Neo responds to our guests faster than the front desk. Bookings increased by 30%.',
      name: 'Maria K.',
      role: '',
    },
    {
      quote: 'We saved 20+ hours per week on customer support. Neo handles it perfectly.',
      name: 'George D.',
      role: '',
    },
  ],
}

export function SocialProof() {
  const { lang } = useLanguage()

  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-[980px] mx-auto px-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-20">
          {stats[lang].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            {lang === 'bg' ? 'Какво казват клиентите' : 'What customers say'}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {testimonials[lang].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10"
            >
              <svg className="w-8 h-8 text-blue-500/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-base text-gray-300 mb-6 italic">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div>
                <div className="font-semibold text-sm text-white">{item.name}</div>
                <div className="text-xs text-gray-400">{item.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
