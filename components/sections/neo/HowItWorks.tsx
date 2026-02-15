'use client'
import { useLanguage } from '@/lib/i18n'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function HowItWorks() {
  const { lang } = useLanguage()
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const lineScaleY = useTransform(scrollYProgress, [0.2, 0.8], [0, 1])

  const steps = [
    {
      number: '1',
      title: lang === 'bg' ? 'Клиент пише' : 'Customer messages',
      description: lang === 'bg'
        ? 'Клиент изпраща съобщение по WhatsApp, Messenger или друг канал'
        : 'Customer sends message on WhatsApp, Messenger or other channel',
      icon: '💬',
      color: 'blue'
    },
    {
      number: '2',
      title: lang === 'bg' ? 'Neo разбира' : 'Neo understands',
      description: lang === 'bg'
        ? 'AI анализира въпроса, разбира контекста и намерението'
        : 'AI analyzes question, understands context and intent',
      icon: '🧠',
      color: 'purple'
    },
    {
      number: '3',
      title: lang === 'bg' ? 'Проверява данни' : 'Checks data',
      description: lang === 'bg'
        ? 'Търси в knowledge base, проверява налични стаи, цени, часове'
        : 'Searches knowledge base, checks available rooms, prices, hours',
      icon: '🔍',
      color: 'pink'
    },
    {
      number: '4',
      title: lang === 'bg' ? 'Отговаря моментално' : 'Responds instantly',
      description: lang === 'bg'
        ? 'Изпраща точен отговор под 1 секунда, на правилния език'
        : 'Sends accurate answer in under 1 second, in the right language',
      icon: '⚡',
      color: 'orange'
    },
    {
      number: '5',
      title: lang === 'bg' ? 'Записва в системите' : 'Logs in systems',
      description: lang === 'bg'
        ? 'Автоматично записва резервация, среща или поръчка в календар/CRM'
        : 'Automatically logs reservation, appointment or order in calendar/CRM',
      icon: '📝',
      color: 'green'
    }
  ]

  const colorMap: Record<string, string> = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    pink: 'from-pink-500 to-pink-600',
    orange: 'from-orange-500 to-orange-600',
    green: 'from-green-500 to-green-600'
  }

  return (
    <section ref={containerRef} className="py-20 sm:py-32 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {lang === 'bg' ? 'Как работи Neo' : 'How Neo works'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {lang === 'bg' ? 'От въпрос до отговор за под 1 секунда' : 'From question to answer in under 1 second'}
          </p>
        </motion.div>

        <div className="relative">
          {/* Progress line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800" />
          <motion.div
            className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600 origin-top"
            style={{ scaleY: lineScaleY }}
          />

          {/* Steps */}
          <div className="space-y-16">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative flex gap-8 items-start"
              >
                {/* Number badge */}
                <motion.div
                  className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br ${colorMap[step.color]} flex items-center justify-center text-white font-bold text-2xl shadow-lg z-10`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {step.number}
                </motion.div>

                {/* Content */}
                <motion.div
                  className="flex-1 pt-2"
                  whileHover={{ x: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-4xl">{step.icon}</span>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-block p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold mb-2">
              {lang === 'bg' ? 'Готов за старт?' : 'Ready to launch?'}
            </h3>
            <p className="mb-6 opacity-90">
              {lang === 'bg' ? 'Setup отнема само 1 час' : 'Setup takes only 1 hour'}
            </p>
            <a
              href="#pricing"
              className="inline-block px-8 py-4 rounded-full bg-white text-blue-600 font-semibold hover:scale-105 transition-transform"
            >
              {lang === 'bg' ? 'Виж цени' : 'See pricing'}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
