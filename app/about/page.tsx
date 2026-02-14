'use client'

import { useLanguage } from '@/lib/i18n'
import { motion } from 'framer-motion'
import { CalendlyButton } from '@/components/CalendlyButton'

export default function AboutPage() {
  const { lang } = useLanguage()

  const content = {
    bg: {
      title: 'За Nextbot',
      subtitle: 'Мисията ни е да направим AI комуникацията достъпна за всеки бизнес в България',
      story: {
        title: 'Нашата история',
        text: `През 2024 година видяхме как български бизнеси губят клиенти заради една проста причина: не успяват да отговорят навреме.

Хотел в Банско губи резервация, защото собственикът е видял съобщението на следващата сутрин. Ресторант в София пропуска поръчка, защото е събота вечер. E-commerce магазин губи продажба, защото клиентът пита нещо в 23:00 часа.

Всички тези проблеми имат едно решение: AI асистент който никога не спи.

Затова създадохме Nextbot Neo - AI който отговаря на българските клиенти 24/7, на техния език, навсякъде където те са.`
      },
      mission: {
        title: 'Нашата мисия',
        text: 'Да направим AI комуникацията достъпна, разбираема и ефективна за всеки български бизнес - от малкия семеен хотел до големия e-commerce магазин.'
      },
      values: [
        { icon: '🎯', title: 'Простота', description: 'AI технологията трябва да е проста за използване. Без сложни настройки, без техническа ангажираност. Просто работи.' },
        { icon: '🤝', title: 'Доверие', description: 'Вашите данни са ваши. Вашите клиенти са ваши. Ние сме само инструментът който ви помага да им служите по-добре.' },
        { icon: '📈', title: 'Растеж', description: 'Успехът ви е нашият успех. Когато вие растете, ние растем. Затова правим всичко да ви помогнем да растете.' }
      ],
      team: {
        title: 'Екипът',
        text: 'Малък екип от предприемачи, разработчици и AI специалисти базирани в София, България. Обединени от една цел: да направим AI достъпен за българския бизнес.'
      },
      stats: [
        { value: '2024', label: 'Основана' },
        { value: '100+', label: 'Клиенти' },
        { value: '1M+', label: 'Съобщения' },
        { value: '99.9%', label: 'Uptime' }
      ],
      cta: {
        title: 'Готов да започнеш?',
        subtitle: 'Запази 20-минутен разговор и виж как Neo може да помогне на твоя бизнес'
      }
    },
    en: {
      title: 'About Nextbot',
      subtitle: 'Our mission is to make AI communication accessible to every business in Bulgaria',
      story: {
        title: 'Our Story',
        text: `In 2024, we saw how Bulgarian businesses were losing customers for one simple reason: they couldn't respond in time.

A hotel in Bansko loses a booking because the owner saw the message the next morning. A restaurant in Sofia misses an order because it's Saturday evening. An e-commerce store loses a sale because a customer asked something at 11 PM.

All these problems have one solution: an AI assistant that never sleeps.

That's why we created Nextbot Neo - AI that answers Bulgarian customers 24/7, in their language, wherever they are.`
      },
      mission: {
        title: 'Our Mission',
        text: 'To make AI communication accessible, understandable, and effective for every Bulgarian business - from small family hotels to large e-commerce stores.'
      },
      values: [
        { icon: '🎯', title: 'Simplicity', description: 'AI technology should be simple to use. No complex setup, no technical commitment. It just works.' },
        { icon: '🤝', title: 'Trust', description: 'Your data is yours. Your customers are yours. We\'re just the tool that helps you serve them better.' },
        { icon: '📈', title: 'Growth', description: 'Your success is our success. When you grow, we grow. That\'s why we do everything to help you grow.' }
      ],
      team: {
        title: 'The Team',
        text: 'A small team of entrepreneurs, developers, and AI specialists based in Sofia, Bulgaria. United by one goal: to make AI accessible to Bulgarian business.'
      },
      stats: [
        { value: '2024', label: 'Founded' },
        { value: '100+', label: 'Customers' },
        { value: '1M+', label: 'Messages' },
        { value: '99.9%', label: 'Uptime' }
      ],
      cta: {
        title: 'Ready to start?',
        subtitle: 'Book a 20-minute call and see how Neo can help your business'
      }
    }
  }

  const t = content[lang as keyof typeof content]

  return (
    <main className="min-h-screen bg-white dark:bg-black pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              {t.title}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {t.stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900 dark:text-white">{t.story.title}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">{t.story.text}</p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-white">{t.mission.title}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">{t.mission.text}</p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {t.values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-white">{t.team.title}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">{t.team.text}</p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.cta.title}</h2>
            <p className="text-xl mb-8 text-white/90">{t.cta.subtitle}</p>
            <CalendlyButton variant="outline" size="lg" />
          </motion.div>
        </div>
      </section>
    </main>
  )
}
