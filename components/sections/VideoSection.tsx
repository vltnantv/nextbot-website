'use client'

import { useLanguage } from '@/lib/i18n'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export function VideoSection() {
  const { lang } = useLanguage()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024)
  }, [])

  const content = {
    bg: {
      title: 'Виж Neo в действие',
      subtitle: 'Разбери как работи за 2 минути',
      duration: '2:30 мин'
    },
    en: {
      title: 'See Neo in action',
      subtitle: 'Understand how it works in 2 minutes',
      duration: '2:30 min'
    }
  }

  const t = content[lang as keyof typeof content]

  const Wrapper = isMobile ? 'div' : motion.div

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <Wrapper
          {...(!isMobile && {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
          })}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t.subtitle}
          </p>
        </Wrapper>

        {/* Video Container */}
        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 max-w-5xl mx-auto">
          {!isPlaying ? (
            <div
              className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center cursor-pointer group"
              onClick={() => setIsPlaying(true)}
            >
              {/* Play Button */}
              <button className="relative z-10 w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-200">
                <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>

              {/* Duration Badge */}
              <div className="absolute bottom-6 right-6 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-semibold">
                {t.duration}
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-black">
              {/* Replace YOUR_VIDEO_ID with actual YouTube/Vimeo ID */}
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Nextbot Neo Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>

        {/* Video Features */}
        <div className="grid sm:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          {[
            { icon: '\u26A1', text: lang === 'bg' ? 'Setup за 15 минути' : '15-minute setup' },
            { icon: '\uD83C\uDFAF', text: lang === 'bg' ? 'Реални примери' : 'Real examples' },
            { icon: '\uD83D\uDCCA', text: lang === 'bg' ? 'ROI калкулация' : 'ROI calculation' }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-center gap-3 text-gray-600 dark:text-gray-400">
              <span className="text-3xl">{item.icon}</span>
              <span className="font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
