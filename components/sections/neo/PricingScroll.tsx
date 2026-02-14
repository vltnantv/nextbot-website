'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/lib/i18n'
import { translations } from '@/lib/translations'

export function PricingScroll() {
  const { lang } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const baseY = useTransform(scrollYProgress, [0, 0.3, 0.85, 1], [100, 0, -30, -80])
  const baseOpacity = useTransform(scrollYProgress, [0, 0.2, 0.7, 0.9], [0, 1, 1, 0])

  const pricing = translations[lang].pricing

  return (
    <div ref={containerRef} className="relative min-h-[120vh] bg-black text-white py-20 sm:py-32">

      {/* Sticky container */}
      <div className="sticky top-20 h-screen flex items-center justify-center">
        {/* Background glow */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[150px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              {lang === 'bg' ? 'Построй своя Neo' : 'Build your Neo'}
            </h2>
            <p className="text-xl text-gray-400">
              {lang === 'bg'
                ? 'База €120 + добави само това което ти трябва'
                : 'Base €120 + add only what you need'}
            </p>
          </motion.div>

          {/* Cards stack */}
          <div className="relative h-[500px] flex items-center justify-center">
            {/* Base card */}
            <motion.div
              style={{ y: baseY, opacity: baseOpacity }}
              className="absolute w-full max-w-md"
            >
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-700 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-semibold border border-blue-500/30">
                    Base
                  </span>
                  <div className="text-right">
                    <div className="text-4xl font-bold">€120</div>
                    <div className="text-sm text-gray-400">
                      {lang === 'bg' ? '/месец' : '/month'}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {pricing.base.features.map((feature: string, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Addon cards */}
            <AddonCard
              scrollProgress={scrollYProgress}
              icon="💬"
              category={lang === 'bg' ? 'Канали' : 'Channels'}
              name="WhatsApp Business"
              price={40}
              color="from-green-500 to-emerald-600"
              startAt={0.3}
              stackOffset={1}
              lang={lang}
            />
            <AddonCard
              scrollProgress={scrollYProgress}
              icon="📊"
              category={lang === 'bg' ? 'Интеграции' : 'Integrations'}
              name="CRM Integration"
              price={50}
              color="from-blue-500 to-cyan-600"
              startAt={0.5}
              stackOffset={2}
              lang={lang}
            />
            <AddonCard
              scrollProgress={scrollYProgress}
              icon="🌍"
              category={lang === 'bg' ? 'Езици' : 'Languages'}
              name={lang === 'bg' ? 'Всички езици' : 'All languages'}
              price={80}
              color="from-purple-500 to-pink-600"
              startAt={0.7}
              stackOffset={3}
              lang={lang}
            />
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <a
              href="#calculator"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition-all shadow-lg hover:scale-105"
            >
              {lang === 'bg' ? 'Изчисли точната цена' : 'Calculate exact price'}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// Each addon is its own component so useTransform hooks are valid
function AddonCard({
  scrollProgress,
  icon,
  category,
  name,
  price,
  color,
  startAt,
  stackOffset,
  lang,
  popular,
}: {
  scrollProgress: any
  icon: string
  category: string
  name: string
  price: number
  color: string
  startAt: number
  stackOffset: number
  lang: string
  popular?: boolean
}) {
  const y = useTransform(scrollProgress, [startAt, startAt + 0.2], [100, 0])
  const opacity = useTransform(scrollProgress, [startAt, startAt + 0.2], [0, 1])
  const scale = useTransform(scrollProgress, [startAt, startAt + 0.2], [0.8, 1])
  const rotate = useTransform(scrollProgress, [startAt, startAt + 0.2], [10, 0])

  return (
    <motion.div
      style={{
        y,
        opacity,
        scale,
        rotate,
        x: `${stackOffset * 20}px`,
        zIndex: 10 + stackOffset,
      }}
      className="absolute w-full max-w-[280px] right-0"
    >
      <div className={`bg-gradient-to-br ${color} rounded-2xl p-6 shadow-2xl border border-white/10 relative`}>
        {/* Popular badge - top left */}
        {popular && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold z-10">
            {lang === 'bg' ? 'Популярно' : 'Popular'}
          </span>
        )}

        {/* Icon - with top margin if badge exists */}
        <div className={`text-4xl mb-3 ${popular ? 'mt-6' : ''}`}>{icon}</div>
        <div className="text-xs text-white/60 uppercase tracking-wider mb-1">{category}</div>
        <div className="text-lg font-bold text-white mb-2">{name}</div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-white">+€{price}</span>
          <span className="text-sm text-white/60">{lang === 'bg' ? '/месец' : '/month'}</span>
        </div>
      </div>
    </motion.div>
  )
}
