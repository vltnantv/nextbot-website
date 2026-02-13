'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/lib/i18n'
import Link from 'next/link'
import { AnimatedNeoLogo } from '@/components/AnimatedNeoLogo'

export function NeoReveal() {
  const { lang } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="relative py-32 text-white">
      {/* Subtle glow — no hard edges, blends with page gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-blue-500/[0.06] blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[400px] rounded-full bg-purple-500/[0.04] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text reveal */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-cyan-400 text-sm uppercase tracking-wider mb-4"
            >
              {lang === 'bg' ? 'Представяме' : 'Introducing'}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
            >
              Nextbot{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                Neo
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="text-xl text-gray-400 mb-8"
            >
              {lang === 'bg'
                ? 'AI който отговаря вместо теб. Навсякъде. Винаги. Перфектно.'
                : 'AI that answers for you. Everywhere. Always. Perfectly.'}
            </motion.p>

            {/* Features list */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="space-y-4 mb-8"
            >
              {[
                lang === 'bg' ? 'Отговор под 1 секунда' : 'Response under 1 second',
                lang === 'bg' ? '24/7, без почивен ден' : '24/7, no days off',
                lang === 'bg' ? 'На 12+ езика' : 'In 12+ languages',
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <svg
                    className="w-6 h-6 text-green-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-lg">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.3 }}
            >
              <Link
                href="/neo"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition-all shadow-2xl hover:scale-105"
              >
                {lang === 'bg' ? 'Виж как работи' : 'See how it works'}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Animated Neo logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative h-[400px]"
          >
            <AnimatedNeoLogo />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
