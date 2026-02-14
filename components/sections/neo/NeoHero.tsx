'use client'

import { useLanguage } from '@/lib/i18n'
import { t } from '@/lib/translations'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AnimatedNeoLogo } from '@/components/AnimatedNeoLogo'

export function NeoHero() {
  const { lang } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-black pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
                {t(lang, 'neo.hero.eyebrow')}
              </span>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="block text-gray-900 dark:text-white">{t(lang, 'neo.hero.headline')}</span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                  {t(lang, 'neo.hero.headlineAccent')}
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-xl">
                {t(lang, 'neo.hero.subheadline')}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
                {[
                  { value: '€120', label: lang === 'bg' ? 'от / месец' : 'from / month' },
                  { value: '<1s', label: lang === 'bg' ? 'Време за отговор' : 'Response time' },
                  { value: '24/7', label: lang === 'bg' ? 'Винаги наличен' : 'Always available' },
                  { value: '12+', label: lang === 'bg' ? 'Езика' : 'Languages' },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/early-access"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
                >
                  {t(lang, 'neo.hero.cta')}
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-full text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all"
                >
                  {t(lang, 'neo.hero.watchDemo')}
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right: Animated Neo Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative h-[500px] flex items-center justify-center"
          >
            <AnimatedNeoLogo />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
