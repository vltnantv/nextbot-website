'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/lib/i18n'

export function ProblemSection() {
  const { lang } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const problems = [
    {
      time: lang === 'bg' ? '23:47' : '11:47 PM',
      scenario:
        lang === 'bg'
          ? 'Гост пише в Instagram. Ти си приготвил вечеря.'
          : "Guest writes on Instagram. You're making dinner.",
      result:
        lang === 'bg'
          ? 'Виждаш съобщението на следващата сутрин. Гостът вече е резервирал другаде.'
          : 'You see the message next morning. Guest already booked elsewhere.',
      icon: '🕐',
      color: 'from-red-500 to-orange-500',
    },
    {
      time: '847',
      scenario:
        lang === 'bg'
          ? '"Имате ли свободни стаи?" Отговорил си на този въпрос 847 пъти.'
          : '"Do you have rooms available?" You\'ve answered this 847 times.',
      result:
        lang === 'bg'
          ? 'Ще отговориш още 847. Или можеш да спреш.'
          : "You'll answer 847 more. Or you can stop.",
      icon: '💬',
      color: 'from-orange-500 to-yellow-500',
    },
    {
      time: lang === 'bg' ? 'Събота, 22:30' : 'Saturday, 10:30 PM',
      scenario:
        lang === 'bg'
          ? 'Телефонът звъни. Не искаш да отговориш.'
          : "Phone rings. You don't want to answer.",
      result:
        lang === 'bg'
          ? 'Но не можеш да не отговориш. Затова работата ти няма граници.'
          : "But you can't not answer. That's why work has no boundaries.",
      icon: '😤',
      color: 'from-yellow-500 to-red-500',
    },
  ]

  return (
    <section ref={ref} className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white">
            {lang === 'bg' ? 'Познато ли ти е?' : 'Sound familiar?'}
          </h2>
        </motion.div>

        {/* Problem cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="h-full bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 transition-all duration-300 group-hover:border-white/20 group-hover:shadow-2xl">
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${problem.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <div className="relative text-6xl mb-6">{problem.icon}</div>

                <div className="relative inline-block mb-4">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-sm font-semibold text-white">
                    {problem.time}
                  </span>
                </div>

                <p className="relative text-lg font-medium text-white mb-4">
                  {problem.scenario}
                </p>

                <p className="relative text-gray-400 leading-relaxed">
                  {problem.result}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-xl text-gray-400">
            {lang === 'bg'
              ? 'Има решение. И не е да наемеш още хора.'
              : "There's a solution. And it's not hiring more people."}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
