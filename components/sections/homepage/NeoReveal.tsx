'use client'

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useLanguage } from '@/lib/i18n'
import Link from 'next/link'

export function NeoReveal() {
  const { lang } = useLanguage()
  const ref = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [gyroEnabled, setGyroEnabled] = useState(false)
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const smoothTiltX = useSpring(tiltX, { stiffness: 100, damping: 20 })
  const smoothTiltY = useSpring(tiltY, { stiffness: 100, damping: 20 })

  const isInView = useInView(ref, {
    once: true,
    margin: '-50px'
  })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Gyroscope handler
  useEffect(() => {
    if (!gyroEnabled) return

    const handleOrientation = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0
      const beta = e.beta ?? 0
      tiltX.set(gamma / 2)
      tiltY.set(Math.max(-30, Math.min(30, beta - 40)) / 2)
    }

    window.addEventListener('deviceorientation', handleOrientation)
    return () => window.removeEventListener('deviceorientation', handleOrientation)
  }, [gyroEnabled, tiltX, tiltY])

  // Request gyroscope on tap (iOS requires user gesture)
  const enableGyro = async () => {
    if (gyroEnabled) return
    const DOE = DeviceOrientationEvent as any
    if (typeof DOE.requestPermission === 'function') {
      try {
        const permission = await DOE.requestPermission()
        if (permission === 'granted') setGyroEnabled(true)
      } catch {
        // denied
      }
    } else {
      setGyroEnabled(true)
    }
  }

  // Auto-enable on Android
  useEffect(() => {
    if (!isMobile) return
    const DOE = DeviceOrientationEvent as any
    if (typeof DOE.requestPermission !== 'function') {
      setGyroEnabled(true)
    }
  }, [isMobile])

  // Mouse for desktop — tracked on section level
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    tiltX.set((e.clientX - centerX) / 15)
    tiltY.set((e.clientY - centerY) / 15)
  }

  const handleMouseLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  return (
    <section ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="relative py-32 text-white">
      {/* Subtle glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-blue-500/[0.06] blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[400px] rounded-full bg-purple-500/[0.04] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text reveal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.1 }}
              className="text-cyan-400 text-sm uppercase tracking-wider mb-4"
            >
              {lang === 'bg' ? 'Представяме' : 'Introducing'}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 px-4"
            >
              Nextbot{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                Neo
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 px-4"
            >
              {lang === 'bg'
                ? 'AI който отговаря вместо теб. Навсякъде. Винаги. Перфектно.'
                : 'AI that answers for you. Everywhere. Always. Perfectly.'}
            </motion.p>

            {/* Features list */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="space-y-4 mb-8"
            >
              {[
                lang === 'bg' ? 'Отговор под 1 секунда' : 'Response under 1 second',
                lang === 'bg' ? '24/7, без почивен ден' : '24/7, no days off',
                lang === 'bg' ? 'На 12+ езика' : 'In 12+ languages',
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.05 }}
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
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="/neo"
                scroll={true}
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

          {/* Right: Animated Neo bubble letters with tilt */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={enableGyro}
            className="relative h-[400px] flex items-center justify-center select-none cursor-pointer"
          >
            <motion.div
              className="flex gap-3 sm:gap-5"
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
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
