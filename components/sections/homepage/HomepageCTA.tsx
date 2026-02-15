'use client'

import { useLanguage } from '@/lib/i18n'
import { translations } from '@/lib/translations'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function HomepageCTA() {
  const { lang } = useLanguage()
  const f = translations[lang].footer

  return (
    <section className="py-24 sm:py-32 bg-black text-white">
      <div className="max-w-[980px] mx-auto px-6 text-center">
        {/* Animated glow */}
        <div className="relative inline-block mb-8">
          <motion.div
            className="absolute -inset-8 bg-blue-500/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <span className="relative text-6xl">🤖</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4"
        >
          {lang === 'bg'
            ? 'Готов ли си да не губиш повече клиенти?'
            : 'Ready to stop losing customers?'}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-400 mb-10 max-w-xl mx-auto"
        >
          {lang === 'bg'
            ? '20-минутен demo call. Виж Neo в действие с твоите реални сценарии.'
            : '20-minute demo call. See Neo in action with your real scenarios.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={f.cta.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {f.cta.button}
          </a>
          <Link
            href="/learn-more"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all"
          >
            {lang === 'bg' ? 'Научи повече' : 'Learn more'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-sm text-gray-500 mt-8"
        >
          {lang === 'bg'
            ? 'Setup за 2-3 дни • Поддръжка на български • от €120/месец'
            : 'Setup in 2-3 days • Bulgarian support • from €120/month'}
        </motion.p>
      </div>
    </section>
  )
}
