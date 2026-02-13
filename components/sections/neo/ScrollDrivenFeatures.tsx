'use client'

import { useRef, useEffect, useState } from 'react'
import { useLanguage } from '@/lib/i18n'
import { translations } from '@/lib/translations'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface Feature {
  id: string
  title: string
  description: string
  icon: string
  color: string
  phoneContent: React.ReactNode
}

export function ScrollDrivenFeatures() {
  const { lang } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Smooth spring animation for scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const features: Feature[] = [
    {
      id: 'realtime',
      title: lang === 'bg' ? 'Резервация в реално време' : 'Real-time booking',
      description:
        lang === 'bg'
          ? 'Neo разбира контекста, проверява наличността и резервира веднага.'
          : 'Neo understands context, checks availability and books instantly.',
      icon: '⚡',
      color: 'from-blue-500 to-cyan-500',
      phoneContent: <BookingChat />,
    },
    {
      id: 'multilingual',
      title: lang === 'bg' ? 'Говори на всеки език' : 'Speaks every language',
      description:
        lang === 'bg'
          ? 'Автоматично разпознава езика и отговаря на същия.'
          : 'Automatically detects language and responds in the same.',
      icon: '🌍',
      color: 'from-purple-500 to-pink-500',
      phoneContent: <MultilingualDemo />,
    },
    {
      id: 'integration',
      title: lang === 'bg' ? 'Интегрира се с всичко' : 'Integrates with everything',
      description:
        lang === 'bg'
          ? 'Един разговор → множество действия автоматично.'
          : 'One conversation → multiple actions automatically.',
      icon: '🔗',
      color: 'from-green-500 to-emerald-500',
      phoneContent: <IntegrationFlow />,
    },
  ]

  return (
    <section ref={containerRef} className="relative bg-black">
      {/* Sticky iPhone Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* iPhone Mockup - Always centered */}
        <div className="relative z-20">
          <div className="relative w-[280px] sm:w-[320px] md:w-[360px]">
            {/* Phone frame */}
            <div className="relative bg-[#1d1d1f] rounded-[3rem] p-2 shadow-2xl">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-30" />

              {/* Screen */}
              <div className="relative bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
                {/* Dynamic content based on scroll */}
                {features.map((feature, index) => (
                  <FeatureContent
                    key={feature.id}
                    feature={feature}
                    index={index}
                    totalFeatures={features.length}
                    progress={smoothProgress}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Background gradient that changes with scroll */}
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            background: useTransform(
              smoothProgress,
              [0, 0.33, 0.66, 1],
              [
                'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2), transparent 70%)',
                'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.2), transparent 70%)',
                'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.2), transparent 70%)',
                'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2), transparent 70%)',
              ]
            ),
          }}
        />
      </div>

      {/* Scroll Sections - These drive the animation */}
      <div className="relative">
        {features.map((feature, index) => (
          <ScrollSection key={feature.id} feature={feature} index={index} />
        ))}
      </div>
    </section>
  )
}

// Feature content that appears in phone based on scroll position
function FeatureContent({
  feature,
  index,
  totalFeatures,
  progress,
}: {
  feature: Feature
  index: number
  totalFeatures: number
  progress: any
}) {
  const start = index / totalFeatures
  const end = (index + 1) / totalFeatures

  const opacity = useTransform(progress, [start - 0.1, start, end, end + 0.1], [0, 1, 1, 0])

  const scale = useTransform(progress, [start - 0.1, start, end, end + 0.1], [0.8, 1, 1, 0.8])

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ opacity, scale }}
    >
      {feature.phoneContent}
    </motion.div>
  )
}

// Individual scroll section with side content
function ScrollSection({ feature, index }: { feature: Feature; index: number }) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  })

  const isLeft = index % 2 === 0

  return (
    <div ref={ref} className="h-screen flex items-center justify-center px-6 md:px-12">
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -100 : 100 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={isLeft ? 'lg:order-1' : 'lg:order-2'}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={inView ? { scale: 1 } : { scale: 0.8 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${feature.color} text-4xl mb-6`}
          >
            {feature.icon}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            {feature.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
            className="text-xl text-gray-400 max-w-xl"
          >
            {feature.description}
          </motion.p>
        </motion.div>

        {/* Spacer for phone (phone is sticky in center) */}
        <div className={isLeft ? 'lg:order-2' : 'lg:order-1'} />
      </div>
    </div>
  )
}

// Mini components for phone content
function BookingChat() {
  return (
    <div className="w-full h-full bg-[#E5DDD5] p-4 flex flex-col gap-2">
      <div className="ml-auto bg-[#DCF8C6] rounded-lg px-3 py-2 max-w-[70%]">
        <p className="text-xs">Do you have a room available?</p>
      </div>
      <div className="mr-auto bg-white rounded-lg px-3 py-2 max-w-[70%]">
        <p className="text-xs">Yes! Deluxe double with mountain view.</p>
      </div>
      <div className="mr-auto bg-white rounded-lg px-3 py-2 max-w-[70%]">
        <p className="text-xs">$90/night. Should I book it?</p>
      </div>
      <div className="ml-auto bg-[#DCF8C6] rounded-lg px-3 py-2 max-w-[70%]">
        <p className="text-xs">Yes please!</p>
      </div>
      <div className="mr-auto bg-white rounded-lg px-3 py-2 max-w-[70%]">
        <p className="text-xs">✓ Confirmed! Check your email.</p>
      </div>
    </div>
  )
}

function MultilingualDemo() {
  return (
    <div className="w-full h-full bg-white p-4 flex flex-col justify-center gap-3">
      <div className="bg-gray-100 rounded-lg p-2">
        <p className="text-[10px] text-gray-500">🇧🇬 Bulgarian</p>
        <p className="text-xs font-medium">Колко струва една нощувка?</p>
      </div>
      <div className="bg-gray-100 rounded-lg p-2">
        <p className="text-[10px] text-gray-500">🇬🇧 English</p>
        <p className="text-xs font-medium">How much is one night?</p>
      </div>
      <div className="bg-gray-100 rounded-lg p-2">
        <p className="text-[10px] text-gray-500">🇩🇪 German</p>
        <p className="text-xs font-medium">Was kostet eine Übernachtung?</p>
      </div>
      <div className="bg-gray-100 rounded-lg p-2">
        <p className="text-[10px] text-gray-500">🇷🇺 Russian</p>
        <p className="text-xs font-medium">Сколько стоит одна ночь?</p>
      </div>
    </div>
  )
}

function IntegrationFlow() {
  return (
    <div className="w-full h-full bg-white p-4 flex flex-col justify-center items-center gap-2">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-lg">💬</div>
        <div className="text-xs">→</div>
        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-lg">🤖</div>
      </div>
      <div className="text-xs text-center text-gray-400">↓</div>
      <div className="grid grid-cols-3 gap-2">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-base">📊</div>
        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-base">📧</div>
        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-base">📅</div>
      </div>
      <p className="text-[10px] text-center text-gray-500 mt-2">CRM • Email • Calendar</p>
    </div>
  )
}
