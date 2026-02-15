'use client'
import { useLanguage } from '@/lib/i18n'
import { t } from '@/lib/translations'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const APPLE_EASE = [0.22, 1, 0.36, 1] as const

export function NeoHero() {
  const { lang } = useLanguage()
  const ref = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const smoothTiltX = useSpring(tiltX, { stiffness: 80, damping: 25 })
  const smoothTiltY = useSpring(tiltY, { stiffness: 80, damping: 25 })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Gyroscope for mobile
  useEffect(() => {
    if (!isMobile) return

    const handleOrientation = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0
      const beta = e.beta ?? 0
      tiltX.set(gamma / 4)
      tiltY.set(Math.max(-30, Math.min(30, beta - 45)) / 4)
    }

    const requestPermission = async () => {
      const DOE = DeviceOrientationEvent as any
      if (typeof DOE.requestPermission === 'function') {
        try {
          const permission = await DOE.requestPermission()
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation)
          }
        } catch {
          // Permission denied
        }
      } else {
        window.addEventListener('deviceorientation', handleOrientation)
      }
    }

    requestPermission()
    return () => window.removeEventListener('deviceorientation', handleOrientation)
  }, [isMobile, tiltX, tiltY])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0])

  // Mouse effect for desktop
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    tiltX.set((e.clientX - centerX) / 25)
    tiltY.set((e.clientY - centerY) / 25)
  }

  const handleMouseLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  const stats = [
    { value: '€59', label: lang === 'bg' ? 'от/месец' : 'from/mo' },
    { value: '<1s', label: lang === 'bg' ? 'отговор' : 'response' },
    { value: '24/7', label: lang === 'bg' ? 'активен' : 'active' },
    { value: '12+', label: lang === 'bg' ? 'езика' : 'languages' }
  ]

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Static background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-black dark:via-blue-950 dark:to-purple-950" />

      {/* Static decorative orbs — no animation, just CSS */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 dark:bg-blue-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 dark:bg-purple-400/20 rounded-full blur-3xl" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full"
        style={!isMobile ? { opacity } : {}}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: APPLE_EASE }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6"
            >
              <span>💬</span>
              <span>{t(lang, 'neo.hero.eyebrow')}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: APPLE_EASE }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="text-gray-900 dark:text-white">{t(lang, 'neo.hero.headline')}</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                {t(lang, 'neo.hero.headlineAccent')}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: APPLE_EASE }}
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              {t(lang, 'neo.hero.subheadline')}
            </motion.p>

            {/* Stats — simple fade in */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: APPLE_EASE }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.07 }}
                  className="text-center lg:text-left p-4 rounded-2xl bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800"
                >
                  <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-purple-600">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: APPLE_EASE }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="#pricing"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-200"
              >
                {t(lang, 'neo.hero.watchDemo')}
              </a>
              <a
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-semibold hover:border-gray-400 dark:hover:border-gray-600 transition-colors duration-200"
              >
                {lang === 'bg' ? 'Виж demo' : 'Watch demo'}
              </a>
            </motion.div>
          </div>

          {/* Right: Interactive Neo visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: APPLE_EASE }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative h-[350px] sm:h-[450px] lg:h-[550px] flex items-center justify-center cursor-pointer select-none"
          >
            {/* Static glow — no infinite animation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl" />
            </div>

            {/* Neo letters with tilt */}
            <motion.div
              className="relative flex gap-3 sm:gap-5"
              style={{ x: smoothTiltX, y: smoothTiltY }}
            >
              {['N', 'E', 'O'].map((letter, i) => (
                <motion.span
                  key={letter}
                  className="text-8xl sm:text-[10rem] font-black bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
                  style={{
                    WebkitTextStroke: '2px rgba(255,255,255,0.1)',
                    lineHeight: 1,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4 + i * 0.1,
                    ease: APPLE_EASE,
                  }}
                  whileHover={!isMobile ? { scale: 1.08, transition: { duration: 0.2 } } : undefined}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator — CSS animation only */}
      {!isMobile && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-gray-400 dark:border-gray-600 flex items-start justify-center p-2">
            <div className="w-1 h-3 rounded-full bg-gray-400 dark:bg-gray-600" />
          </div>
        </div>
      )}
    </section>
  )
}
