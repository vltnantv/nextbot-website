'use client'
import { useLanguage } from '@/lib/i18n'
import { motion, useMotionValue, animate, PanInfo } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

export function FeaturesCarousel() {
  const { lang } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const x = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const dragConstraints = useRef({ left: 0, right: 0 })

  const features = [
    {
      icon: '💬',
      title: lang === 'bg' ? 'WhatsApp & Messenger' : 'WhatsApp & Messenger',
      description: lang === 'bg'
        ? 'Автоматични отговори на всички популярни платформи'
        : 'Automatic replies on all popular platforms',
      color: 'from-green-500 to-blue-500',
      stats: [
        { label: lang === 'bg' ? 'Канали' : 'Channels', value: '4+' },
        { label: lang === 'bg' ? 'Uptime' : 'Uptime', value: '99.9%' }
      ],
      features: [
        'WhatsApp Business API',
        'Facebook Messenger',
        'Instagram DM',
        'Web Chat'
      ]
    },
    {
      icon: '⚡',
      title: lang === 'bg' ? 'Моментални отговори' : 'Instant responses',
      description: lang === 'bg'
        ? 'Отговаря под 1 секунда, без изчакване'
        : 'Responds in under 1 second, no waiting',
      color: 'from-yellow-500 to-orange-500',
      stats: [
        { label: lang === 'bg' ? 'Скорост' : 'Speed', value: '<1s' },
        { label: lang === 'bg' ? 'Съобщения/ден' : 'Messages/day', value: '10k+' }
      ],
      features: [
        lang === 'bg' ? 'AI обработка в реално време' : 'Real-time AI processing',
        lang === 'bg' ? 'Без опашки за изчакване' : 'No waiting queues',
        lang === 'bg' ? 'Паралелни разговори' : 'Parallel conversations',
        'Smart routing'
      ]
    },
    {
      icon: '🌍',
      title: lang === 'bg' ? 'Многоезичен' : 'Multilingual',
      description: lang === 'bg'
        ? '12+ езика, автоматично разпознаване'
        : '12+ languages, automatic detection',
      color: 'from-blue-500 to-purple-500',
      stats: [
        { label: lang === 'bg' ? 'Езици' : 'Languages', value: '12+' },
        { label: lang === 'bg' ? 'Точност' : 'Accuracy', value: '98%' }
      ],
      features: [
        lang === 'bg' ? 'Български (native)' : 'Bulgarian (native)',
        lang === 'bg' ? 'Английски, Немски, Руски' : 'English, German, Russian',
        lang === 'bg' ? 'Автоматично разпознаване' : 'Auto language detection',
        lang === 'bg' ? 'Контекстови отговори' : 'Context-aware responses'
      ]
    },
    {
      icon: '🔗',
      title: lang === 'bg' ? 'Интеграции' : 'Integrations',
      description: lang === 'bg'
        ? 'Свързва се с календар, CRM, email'
        : 'Connects to calendar, CRM, email',
      color: 'from-purple-500 to-pink-500',
      stats: [
        { label: lang === 'bg' ? 'Интеграции' : 'Integrations', value: '20+' },
        { label: 'API calls', value: '1M/mo' }
      ],
      features: [
        'Google Calendar',
        'HubSpot CRM',
        'Gmail / Outlook',
        'Zapier / Make'
      ]
    },
    {
      icon: '📊',
      title: 'Analytics',
      description: lang === 'bg'
        ? 'Детайлни отчети и insights'
        : 'Detailed reports and insights',
      color: 'from-pink-500 to-red-500',
      stats: [
        { label: lang === 'bg' ? 'Метрики' : 'Metrics', value: '50+' },
        { label: 'Real-time', value: '✓' }
      ],
      features: [
        lang === 'bg' ? 'Брой разговори' : 'Conversation count',
        lang === 'bg' ? 'Response времена' : 'Response times',
        'Customer satisfaction',
        lang === 'bg' ? 'Export в Excel' : 'Export to Excel'
      ]
    }
  ]

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  useEffect(() => {
    dragConstraints.current = {
      left: -(features.length - 1) * containerWidth,
      right: 0
    }
  }, [containerWidth, features.length])

  const snapTo = (index: number) => {
    animate(x, -index * containerWidth, {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      mass: 0.8
    })
  }

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x
    const velocity = info.velocity.x
    let newIndex = activeIndex

    if (Math.abs(velocity) >= 500) {
      if (velocity > 0 && activeIndex > 0) {
        newIndex = activeIndex - 1
      } else if (velocity < 0 && activeIndex < features.length - 1) {
        newIndex = activeIndex + 1
      }
    } else if (Math.abs(offset) > containerWidth / 4) {
      if (offset > 0 && activeIndex > 0) {
        newIndex = activeIndex - 1
      } else if (offset < 0 && activeIndex < features.length - 1) {
        newIndex = activeIndex + 1
      }
    }

    setActiveIndex(newIndex)
    snapTo(newIndex)
  }

  useEffect(() => {
    snapTo(activeIndex)
  }, [activeIndex, containerWidth])

  return (
    <section className="py-20 sm:py-32 bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {lang === 'bg' ? 'Какво може Neo' : 'What Neo can do'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            {lang === 'bg' ? 'Swipe за да разгледаш функциите' : 'Swipe to explore features'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            {lang === 'bg' ? '👈 Плъзни наляво/надясно 👉' : '👈 Swipe left/right 👉'}
          </p>
        </motion.div>
      </div>

      {/* Carousel */}
      <div ref={containerRef} className="relative">
        <motion.div
          className="flex cursor-grab active:cursor-grabbing"
          style={{ x }}
          drag="x"
          dragConstraints={dragConstraints.current}
          dragElastic={0.1}
          dragMomentum={true}
          onDragEnd={handleDragEnd}
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 px-4"
              style={{ width: containerWidth || '100%' }}
            >
              <div className={`
                relative min-h-[550px] sm:min-h-[600px] rounded-3xl overflow-hidden
                bg-gradient-to-br ${feature.color} p-8 sm:p-12
                shadow-2xl
              `}>
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0.5, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', duration: 0.8 }}
                  className="text-8xl sm:text-9xl mb-6"
                >
                  {feature.icon}
                </motion.div>

                {/* Content */}
                <div>
                  <h3 className="text-3xl sm:text-4xl font-bold mb-3 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-lg sm:text-xl text-white/90 mb-8">
                    {feature.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {feature.stats.map((stat, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: j * 0.1 }}
                        className="bg-white/10  rounded-2xl p-4 border border-white/20"
                      >
                        <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm text-white/70">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Features list */}
                  <div className="space-y-2">
                    {feature.features.map((item, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: j * 0.05 }}
                        className="flex items-center gap-3 text-white/90"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        <span className="text-sm sm:text-base">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mt-8">
        {features.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`
              h-2 rounded-full transition-all duration-300
              ${i === activeIndex
                ? 'w-8 bg-blue-600'
                : 'w-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
              }
            `}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Navigation hint for desktop */}
      <div className="hidden lg:flex justify-center gap-12 mt-8 text-sm text-gray-500 dark:text-gray-400">
        <button
          onClick={() => activeIndex > 0 && setActiveIndex(activeIndex - 1)}
          className={`flex items-center gap-2 ${activeIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:text-gray-900 dark:hover:text-white'}`}
          disabled={activeIndex === 0}
        >
          <span>←</span>
          <span>{lang === 'bg' ? 'Предишна' : 'Previous'}</span>
        </button>
        <button
          onClick={() => activeIndex < features.length - 1 && setActiveIndex(activeIndex + 1)}
          className={`flex items-center gap-2 ${activeIndex === features.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:text-gray-900 dark:hover:text-white'}`}
          disabled={activeIndex === features.length - 1}
        >
          <span>{lang === 'bg' ? 'Следваща' : 'Next'}</span>
          <span>→</span>
        </button>
      </div>
    </section>
  )
}
