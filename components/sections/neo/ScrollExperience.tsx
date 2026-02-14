'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/lib/i18n'

export function ScrollExperience() {
  const { lang } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end start"]  // Start animation when section is 80% visible
  })

  // Background color transition - pure white to pure black
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 1],
    [
      'rgb(255, 255, 255)',  // Start: pure white
      'rgb(30, 30, 30)',     // Early middle: dark gray
      'rgb(0, 0, 0)',        // Late middle: pure black
      'rgb(0, 0, 0)'         // End: pure black (stays black)
    ]
  )

  const backgroundColorDark = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 1],
    [
      'rgb(0, 0, 0)',        // Start: pure black
      'rgb(15, 15, 15)',     // Early middle: slightly lighter
      'rgb(0, 0, 0)',        // Late middle: pure black
      'rgb(0, 0, 0)'         // End: pure black (stays black)
    ]
  )

  // Text color for better contrast
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    [
      'rgb(17, 24, 39)',    // Dark text for light background
      'rgb(243, 244, 246)',  // Light text for mid-transition
      'rgb(255, 255, 255)'   // White text for black background
    ]
  )

  // Scene progress values - extended ranges for longer visibility
  const scene1Progress = useTransform(scrollYProgress, [0, 0.15, 0.25], [0, 1, 0])
  const scene2Progress = useTransform(scrollYProgress, [0.2, 0.35, 0.45], [0, 1, 0])
  const scene3Progress = useTransform(scrollYProgress, [0.4, 0.55, 0.65], [0, 1, 0])
  const scene4Progress = useTransform(scrollYProgress, [0.6, 0.72, 0.82], [0, 1, 0])
  const scene5Progress = useTransform(scrollYProgress, [0.7, 0.78, 1], [0, 1, 1]) // Multilingual stays much longer

  const scenes = [
    {
      title: lang === 'bg' ? 'Клиентът пита' : 'Customer asks',
      subtitle: lang === 'bg' ? 'Навсякъде, по всяко време' : 'Anywhere, anytime',
      emoji: '💬',
      theme: 'from-green-500 to-emerald-600'
    },
    {
      title: lang === 'bg' ? 'Neo разбира' : 'Neo understands',
      subtitle: lang === 'bg' ? 'Анализира контекста' : 'Analyzes context',
      emoji: '🧠',
      theme: 'from-blue-500 to-indigo-600'
    },
    {
      title: lang === 'bg' ? 'Отговаря моментално' : 'Responds instantly',
      subtitle: lang === 'bg' ? '< 1 секунда' : '< 1 second',
      emoji: '⚡',
      theme: 'from-purple-500 to-pink-600'
    },
    {
      title: lang === 'bg' ? 'Автоматизира всичко' : 'Automates everything',
      subtitle: lang === 'bg' ? 'Календар • CRM • Email' : 'Calendar • CRM • Email',
      emoji: '🔗',
      theme: 'from-orange-500 to-red-600'
    },
    {
      title: lang === 'bg' ? 'Многоезичен' : 'Multilingual',
      subtitle: lang === 'bg' ? '12+ езика автоматично' : '12+ languages automatically',
      emoji: '🌍',
      theme: 'from-cyan-500 to-blue-600'
    }
  ]

  return (
    <div ref={containerRef} className="relative min-h-[450vh] -mt-32">
      {/* Background - Light mode */}
      <motion.div
        className="dark:hidden absolute inset-0 -top-32"
        style={{ backgroundColor }}
      />

      {/* Background - Dark mode */}
      <motion.div
        className="hidden dark:block absolute inset-0 -top-32"
        style={{ backgroundColor: backgroundColorDark }}
      />

      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Gradient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px]"
            style={{
              background: 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="text-center lg:text-left">
              {scenes.map((scene, index) => (
                <SceneText
                  key={index}
                  scene={scene}
                  progress={
                    index === 0 ? scene1Progress :
                    index === 1 ? scene2Progress :
                    index === 2 ? scene3Progress :
                    index === 3 ? scene4Progress :
                    scene5Progress
                  }
                  textColor={textColor}
                />
              ))}
            </div>

            {/* Right: iPhone mockup */}
            <div className="flex items-center justify-center">
              <div className="relative w-[280px] sm:w-[320px] h-[570px] sm:h-[650px]">
                {/* iPhone frame */}
                <div className="absolute inset-0 bg-gray-900 rounded-[3rem] shadow-2xl border-[14px] border-gray-900">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-10" />

                  {/* Screen */}
                  <div className="relative w-full h-full bg-white dark:bg-gray-950 rounded-[2.3rem] overflow-hidden">
                    {/* Dynamic content for each scene */}
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

// Scene text component
function SceneText({ scene, progress, textColor }: { scene: any; progress: any; textColor: any }) {
  // Longer hold at full opacity
  const opacity = progress
  const y = useTransform(progress, [0, 0.5, 1], [30, 0, -30])

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      {/* Emoji - REDUCED SIZE with shadow */}
      <div className="text-5xl sm:text-6xl mb-6 drop-shadow-2xl">
        {scene.emoji}
      </div>

      {/* Title - Bold rounded font with subtle shadows */}
      <motion.h2
        className="text-3xl sm:text-4xl lg:text-5xl mb-4"
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Rounded", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          color: '#ffffff',
          textShadow: '0 2px 12px rgba(0,0,0,0.4), 0 4px 24px rgba(0,0,0,0.2)'
        }}
      >
        {scene.title}
      </motion.h2>

      {/* Subtitle - Bold rounded font with subtle shadows */}
      <motion.p
        className="text-lg sm:text-xl"
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Rounded", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          fontWeight: 600,
          letterSpacing: '0em',
          color: '#ffffff',
          textShadow: '0 1px 8px rgba(0,0,0,0.3), 0 2px 16px rgba(0,0,0,0.15)'
        }}
      >
        {scene.subtitle}
      </motion.p>
    </motion.div>
  )
}

// Phone content component
function PhoneContent({ scene1Progress, scene2Progress, scene3Progress, scene4Progress, scene5Progress, lang }: any) {
  // Use progress directly for longer visibility
  const opacity1 = scene1Progress
  const opacity2 = scene2Progress
  const opacity3 = scene3Progress
  const opacity4 = scene4Progress
  const opacity5 = scene5Progress

  return (
    <div className="h-full flex items-center justify-center p-6 sm:p-8">
      {/* Scene 1: WhatsApp message */}
      <motion.div style={{ opacity: opacity1 }} className="absolute text-center w-full px-6">
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

      {/* Scene 2: Thinking */}
      <motion.div style={{ opacity: opacity2 }} className="absolute text-center w-full px-6">
        <div className="space-y-3">
          <div className="text-4xl">🧠</div>
          <div className="space-y-2">
            {[
              lang === 'bg' ? 'Анализира...' : 'Analyzing...',
              lang === 'bg' ? 'Проверява наличност' : 'Checking availability',
              lang === 'bg' ? 'Изчислява цена' : 'Calculating price'
            ].map((text, i) => (
              <div key={i} className="flex items-center justify-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scene 3: Response */}
      <motion.div style={{ opacity: opacity3 }} className="absolute text-center w-full px-6">
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

      {/* Scene 4: Automation */}
      <motion.div style={{ opacity: opacity4 }} className="absolute text-center w-full px-6">
        <div className="space-y-3">
          {[
            { icon: '📅', text: lang === 'bg' ? 'Календар' : 'Calendar' },
            { icon: '💼', text: 'CRM' },
            { icon: '📧', text: 'Email' }
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

      {/* Scene 5: Languages */}
      <motion.div style={{ opacity: opacity5 }} className="absolute text-center w-full px-6">
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

// Old scene content component (removed)
function _SceneContent_OLD({ scene, lang }: { scene: number; lang: string }) {
  return (
    <div className="h-full flex items-center justify-center p-6 sm:p-8">
      <motion.div
        key={scene}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center w-full"
      >
        {/* Scene 1: WhatsApp message */}
        {scene === 1 && (
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
        )}

        {/* Scene 2: Thinking */}
        {scene === 2 && (
          <div className="space-y-3">
            <div className="text-4xl">🧠</div>
            <div className="space-y-2">
              {[
                lang === 'bg' ? 'Анализира...' : 'Analyzing...',
                lang === 'bg' ? 'Проверява наличност' : 'Checking availability',
                lang === 'bg' ? 'Изчислява цена' : 'Calculating price'
              ].map((text, i) => (
                <div key={i} className="flex items-center justify-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scene 3: Response */}
        {scene === 3 && (
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
        )}

        {/* Scene 4: Automation */}
        {scene === 4 && (
          <div className="space-y-3">
            {[
              { icon: '📅', text: lang === 'bg' ? 'Календар' : 'Calendar' },
              { icon: '💼', text: 'CRM' },
              { icon: '📧', text: 'Email' }
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
        )}

        {/* Scene 5: Languages */}
        {scene === 5 && (
          <div className="grid grid-cols-3 gap-3">
            {['🇧🇬', '🇬🇧', '🇩🇪', '🇷🇺', '🇫🇷', '🇪🇸'].map((flag, i) => (
              <div key={i} className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-3xl">
                {flag}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
