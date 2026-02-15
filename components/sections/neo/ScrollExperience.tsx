'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, animate, type PanInfo } from 'framer-motion'
import { useLanguage } from '@/lib/i18n'

const SCENES_DATA = (lang: string) => [
  {
    title: lang === 'bg' ? 'Клиентът пита' : 'Customer asks',
    subtitle: lang === 'bg' ? 'Навсякъде, по всяко време' : 'Anywhere, anytime',
    emoji: '💬',
    theme: 'from-green-500 to-emerald-600',
    bg: 'from-white to-white dark:from-black dark:to-black',
    mobileBg: 'from-white via-blue-50 to-blue-100 dark:from-black dark:via-blue-950 dark:to-blue-900',
  },
  {
    title: lang === 'bg' ? 'Neo разбира' : 'Neo understands',
    subtitle: lang === 'bg' ? 'Анализира контекста' : 'Analyzes context',
    emoji: '🧠',
    theme: 'from-blue-500 to-indigo-600',
    bg: 'from-white via-blue-50 to-blue-50 dark:from-black dark:via-blue-950 dark:to-blue-950',
    mobileBg: 'from-blue-100 via-purple-50 to-purple-100 dark:from-blue-900 dark:via-purple-950 dark:to-purple-900',
  },
  {
    title: lang === 'bg' ? 'Отговаря моментално' : 'Responds instantly',
    subtitle: lang === 'bg' ? '< 1 секунда' : '< 1 second',
    emoji: '⚡',
    theme: 'from-purple-500 to-pink-600',
    bg: 'from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950',
    mobileBg: 'from-purple-100 via-pink-50 to-pink-100 dark:from-purple-900 dark:via-pink-950 dark:to-pink-900',
  },
  {
    title: lang === 'bg' ? 'Автоматизира' : 'Automates',
    subtitle: lang === 'bg' ? 'Календар • CRM • Email' : 'Calendar • CRM • Email',
    emoji: '🔗',
    theme: 'from-orange-500 to-red-600',
    bg: 'from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950',
    mobileBg: 'from-pink-100 via-orange-50 to-orange-100 dark:from-pink-900 dark:via-orange-950 dark:to-orange-900',
  },
  {
    title: lang === 'bg' ? 'Многоезичен' : 'Multilingual',
    subtitle: lang === 'bg' ? '12+ езика' : '12+ languages',
    emoji: '🌍',
    theme: 'from-cyan-500 to-blue-600',
    bg: 'from-pink-50 via-gray-600 to-black dark:from-pink-950 dark:via-gray-800 dark:to-black',
    mobileBg: 'from-orange-100 via-gray-600 to-black dark:from-orange-900 dark:via-gray-800 dark:to-black',
  },
]

export function ScrollExperience() {
  const { lang } = useLanguage()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const scenes = SCENES_DATA(lang)

  if (isMobile) {
    return <MobileCarousel scenes={scenes} lang={lang} />
  }

  return <DesktopScrollExperience scenes={scenes} lang={lang} />
}

// ─── Mobile: Swipeable carousel with spring physics ────────────────────────

function MobileCarousel({ scenes, lang }: { scenes: any[]; lang: string }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const x = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth)
    }
    const handleResize = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (containerWidth > 0) {
      animate(x, -activeIndex * containerWidth, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      })
    }
  }, [activeIndex, containerWidth])

  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipe = Math.abs(info.offset.x) * Math.abs(info.velocity.x)
    if (swipe > 100 || Math.abs(info.offset.x) > 50) {
      if (info.offset.x < 0 && activeIndex < scenes.length - 1) {
        setActiveIndex(activeIndex + 1)
      } else if (info.offset.x > 0 && activeIndex > 0) {
        setActiveIndex(activeIndex - 1)
      } else {
        animate(x, -activeIndex * containerWidth, {
          type: 'spring',
          stiffness: 300,
          damping: 30,
        })
      }
    } else {
      animate(x, -activeIndex * containerWidth, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      })
    }
  }

  return (
    <section className="py-16 bg-white dark:bg-black overflow-hidden">
      <div className="mb-6 px-4 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {lang === 'bg' ? 'Swipe за да разгледаш' : 'Swipe to explore'}
        </p>
      </div>

      <div ref={containerRef} className="relative overflow-hidden">
        <motion.div
          className="flex"
          style={{ x, touchAction: 'pan-y' }}
          drag="x"
          dragConstraints={{
            left: -(scenes.length - 1) * containerWidth,
            right: 0,
          }}
          dragElastic={0.12}
          onDragEnd={handleDragEnd}
        >
          {scenes.map((scene, i) => {
            const isLast = i === scenes.length - 1
            return (
              <div
                key={i}
                className="flex-shrink-0 px-4"
                style={{ width: containerWidth }}
              >
                <div
                  className={`min-h-[65vh] flex items-center justify-center rounded-3xl bg-gradient-to-br ${scene.mobileBg} px-6 py-16`}
                >
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0.5 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      className="text-7xl mb-6"
                    >
                      {scene.emoji}
                    </motion.div>
                    <h3
                      className={`text-3xl font-bold mb-4 ${
                        isLast ? 'text-white' : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      {scene.title}
                    </h3>
                    <p
                      className={`text-lg ${
                        isLast ? 'text-gray-300' : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {scene.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mt-8">
        {scenes.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === activeIndex
                ? 'w-8 bg-blue-600'
                : 'w-2 bg-gray-300 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

// ─── Desktop: Scroll-driven experience (unchanged logic) ───────────────────

function DesktopScrollExperience({ scenes, lang }: { scenes: any[]; lang: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end start'],
  })

  const bgOpacity = useTransform(scrollYProgress, [0, 0.15, 0.4, 1], [0, 0, 1, 1])

  const scene1Progress = useTransform(scrollYProgress, [0, 0.15, 0.25], [0, 1, 0])
  const scene2Progress = useTransform(scrollYProgress, [0.2, 0.35, 0.45], [0, 1, 0])
  const scene3Progress = useTransform(scrollYProgress, [0.4, 0.55, 0.65], [0, 1, 0])
  const scene4Progress = useTransform(scrollYProgress, [0.6, 0.72, 0.82], [0, 1, 0])
  const scene5Progress = useTransform(scrollYProgress, [0.7, 0.78, 1], [0, 1, 1])

  const progressArr = [scene1Progress, scene2Progress, scene3Progress, scene4Progress, scene5Progress]

  return (
    <div ref={containerRef} className="relative min-h-[450vh]">
      <motion.div className="absolute inset-0 bg-black" style={{ opacity: bgOpacity }} />

      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px]"
            style={{ background: 'linear-gradient(to bottom right, var(--tw-gradient-stops))' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              {scenes.map((scene, index) => (
                <SceneText key={index} scene={scene} progress={progressArr[index]} />
              ))}
            </div>

            <div className="flex items-center justify-center">
              <div className="relative w-[280px] sm:w-[320px] h-[570px] sm:h-[650px]">
                <div className="absolute inset-0 bg-gray-900 rounded-[3rem] shadow-2xl border-[14px] border-gray-900">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-10" />
                  <div className="relative w-full h-full bg-white dark:bg-gray-950 rounded-[2.3rem] overflow-hidden">
                    <PhoneContent
                      scene1Progress={scene1Progress}
                      scene2Progress={scene2Progress}
                      scene3Progress={scene3Progress}
                      scene4Progress={scene4Progress}
                      scene5Progress={scene5Progress}
                      lang={lang}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SceneText({ scene, progress }: { scene: any; progress: any }) {
  const opacity = progress
  const y = useTransform(progress, [0, 0.5, 1], [30, 0, -30])

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
      <div className="text-5xl sm:text-6xl mb-6 drop-shadow-2xl">{scene.emoji}</div>
      <motion.h2
        className="text-3xl sm:text-4xl lg:text-5xl mb-4"
        style={{
          fontWeight: 800,
          letterSpacing: '-0.02em',
          color: '#ffffff',
          textShadow: '0 2px 12px rgba(0,0,0,0.4), 0 4px 24px rgba(0,0,0,0.2)',
        }}
      >
        {scene.title}
      </motion.h2>
      <motion.p
        className="text-lg sm:text-xl"
        style={{
          fontWeight: 600,
          color: '#ffffff',
          textShadow: '0 1px 8px rgba(0,0,0,0.3), 0 2px 16px rgba(0,0,0,0.15)',
        }}
      >
        {scene.subtitle}
      </motion.p>
    </motion.div>
  )
}

function PhoneContent({
  scene1Progress,
  scene2Progress,
  scene3Progress,
  scene4Progress,
  scene5Progress,
  lang,
}: any) {
  return (
    <div className="h-full flex items-center justify-center p-6 sm:p-8">
      <motion.div style={{ opacity: scene1Progress }} className="absolute text-center w-full px-6">
        <div className="space-y-4">
          <div className="bg-green-100 dark:bg-green-900 rounded-2xl p-4 text-left">
            <p className="text-sm text-gray-800 dark:text-gray-200">
              {lang === 'bg' ? 'Имате ли свободни стаи?' : 'Do you have rooms available?'}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>WhatsApp</span>
          </div>
        </div>
      </motion.div>

      <motion.div style={{ opacity: scene2Progress }} className="absolute text-center w-full px-6">
        <div className="space-y-3">
          <div className="text-4xl">🧠</div>
          <div className="space-y-2">
            {[
              lang === 'bg' ? 'Анализира...' : 'Analyzing...',
              lang === 'bg' ? 'Проверява наличност' : 'Checking availability',
              lang === 'bg' ? 'Изчислява цена' : 'Calculating price',
            ].map((text, i) => (
              <div key={i} className="flex items-center justify-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div style={{ opacity: scene3Progress }} className="absolute text-center w-full px-6">
        <div className="space-y-4">
          <div className="bg-blue-500 rounded-2xl p-4 text-left text-white">
            <p className="text-sm">
              {lang === 'bg'
                ? 'Да! Имаме налични стаи за вашите дати. Цена: 120€/нощ.'
                : 'Yes! We have rooms available for your dates. Price: 120€/night.'}
            </p>
          </div>
          <div className="text-xs text-gray-500">
            {lang === 'bg' ? 'Отговорено за 0.8s' : 'Responded in 0.8s'}
          </div>
        </div>
      </motion.div>

      <motion.div style={{ opacity: scene4Progress }} className="absolute text-center w-full px-6">
        <div className="space-y-3">
          {[
            { icon: '📅', text: lang === 'bg' ? 'Календар' : 'Calendar' },
            { icon: '💼', text: 'CRM' },
            { icon: '📧', text: 'Email' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-xl p-3">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{item.text}</span>
              <svg className="w-4 h-4 ml-auto text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div style={{ opacity: scene5Progress }} className="absolute text-center w-full px-6">
        <div className="grid grid-cols-3 gap-3">
          {['🇧🇬', '🇬🇧', '🇩🇪', '🇷🇺', '🇫🇷', '🇪🇸'].map((flag, i) => (
            <div key={i} className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-3xl">
              {flag}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
