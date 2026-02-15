'use client'

import { useLanguage } from '@/lib/i18n'
import { t } from '@/lib/translations'
import { motion, useScroll, useTransform } from 'framer-motion'
import { AnimatedNeoLogo } from '@/components/AnimatedNeoLogo'
import { useState, useEffect, useRef } from 'react'

const APPLE_EASE = [0.22, 1, 0.36, 1] as const

export function NeoHero() {
  const { lang } = useLanguage()
  const [isMobile, setIsMobile] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024)
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const fadeOut = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.7, 0])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 0.95])

  const stats = [
    { value: '€120', label: lang === 'bg' ? 'от / месец' : 'from / month' },
    { value: '<1s', label: lang === 'bg' ? 'Време за отговор' : 'Response time' },
    { value: '24/7', label: lang === 'bg' ? 'Винаги наличен' : 'Always available' },
    { value: '12+', label: lang === 'bg' ? 'Езика' : 'Languages' },
  ]

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Parallax background + glows */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ y: parallaxY, scale: bgScale }}
        >
          <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 right-10 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[80px]" />
        </motion.div>
      )}

      {/* Content with fade-out on scroll */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full"
        style={!isMobile ? { opacity: fadeOut } : {}}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: APPLE_EASE }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-sm font-semibold">
                {t(lang, 'neo.hero.eyebrow')}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: APPLE_EASE }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              <span className="block text-gray-900 dark:text-white">
                {t(lang, 'neo.hero.headline')}
              </span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                {t(lang, 'neo.hero.headlineAccent')}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: APPLE_EASE }}
              className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              {t(lang, 'neo.hero.subheadline')}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: APPLE_EASE }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.4 + i * 0.1,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  className="text-center sm:text-left"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs with magnetic effect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <MagneticLink
                href="#calculator"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
              >
                {t(lang, 'neo.hero.cta')}
              </MagneticLink>
              <MagneticLink
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-full text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
              >
                {t(lang, 'neo.hero.watchDemo')}
              </MagneticLink>
            </motion.div>
          </div>

          {/* Right: Animated Neo Logo */}
          {isMobile ? (
            <div className="relative h-[300px] flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600">
                  Neo
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-4 tracking-wider uppercase">
                  AI Assistant
                </div>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: APPLE_EASE }}
              className="relative h-[500px] flex items-center justify-center"
            >
              <AnimatedNeoLogo />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 rounded-full border-2 border-gray-400 dark:border-gray-600 flex items-start justify-center p-2"
          >
            <div className="w-1 h-3 rounded-full bg-gray-400 dark:bg-gray-600" />
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

function MagneticLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    setPosition({
      x: clientX - (left + width / 2),
      y: clientY - (top + height / 2),
    })
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={{ x: position.x * 0.2, y: position.y * 0.2 }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.a>
  )
}
