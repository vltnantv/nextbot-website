'use client'

import { useLanguage } from '@/lib/i18n'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const integrations = [
  {
    name: 'WhatsApp Business',
    icon: '\uD83D\uDCAC',
    color: 'from-green-500 to-emerald-600',
    descBg: 'WhatsApp Business API \u2014 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u043D\u0438 \u043E\u0442\u0433\u043E\u0432\u043E\u0440\u0438',
    descEn: 'WhatsApp Business API \u2014 automated responses',
    featuresBg: ['\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u043D\u0438 \u043E\u0442\u0433\u043E\u0432\u043E\u0440\u0438', 'Multi-device', 'Rich media'],
    featuresEn: ['Auto-replies', 'Multi-device', 'Rich media'],
  },
  {
    name: 'Facebook Messenger',
    icon: '\uD83D\uDCF1',
    color: 'from-blue-500 to-blue-600',
    descBg: '\u0418\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044F \u0441 Facebook \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0437\u0430 Messenger',
    descEn: 'Facebook page integration for Messenger messages',
    featuresBg: ['Instant replies', 'Templates', 'Buttons & CTAs'],
    featuresEn: ['Instant replies', 'Templates', 'Buttons & CTAs'],
  },
  {
    name: 'Instagram DM',
    icon: '\uD83D\uDCF7',
    color: 'from-pink-500 to-purple-600',
    descBg: '\u041E\u0442\u0433\u043E\u0432\u0430\u0440\u044F\u0439 \u043D\u0430 Instagram DMs \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u043D\u043E',
    descEn: 'Respond to Instagram Direct Messages automatically',
    featuresBg: ['DM automation', 'Story replies', 'Quick replies'],
    featuresEn: ['DM automation', 'Story replies', 'Quick replies'],
  },
  {
    name: 'Google Calendar',
    icon: '\uD83D\uDCC5',
    color: 'from-blue-400 to-cyan-500',
    descBg: '\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u043D\u043E \u0437\u0430\u043F\u0438\u0441\u0432\u0430\u043D\u0435 \u043D\u0430 \u0441\u0440\u0435\u0449\u0438 \u0438 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0437\u0430 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u0438 \u0447\u0430\u0441\u043E\u0432\u0435',
    descEn: 'Automatic appointment booking and availability check',
    featuresBg: ['Auto-booking', '\u041D\u0430\u043B\u0438\u0447\u043D\u043E\u0441\u0442', 'Reminders'],
    featuresEn: ['Auto-booking', 'Availability', 'Reminders'],
  },
  {
    name: 'HubSpot CRM',
    icon: '\uD83D\uDCBC',
    color: 'from-orange-500 to-red-600',
    descBg: '\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u0430\u0439 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0438 \u0438 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u043D\u043E \u0441\u044A\u0437\u0434\u0430\u0432\u0430\u0439 leads',
    descEn: 'Sync contacts and automatically create leads',
    featuresBg: ['Lead creation', 'Contact sync', 'Deal tracking'],
    featuresEn: ['Lead creation', 'Contact sync', 'Deal tracking'],
  },
  {
    name: 'Gmail',
    icon: '\u2709\uFE0F',
    color: 'from-red-500 to-pink-600',
    descBg: '\u0418\u0437\u043F\u0440\u0430\u0449\u0430\u0439 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u043D\u0438 email \u043F\u043E\u0442\u0432\u044A\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u0438 follow-ups',
    descEn: 'Send automatic email confirmations and follow-ups',
    featuresBg: ['Auto-emails', 'Templates', 'Follow-ups'],
    featuresEn: ['Auto-emails', 'Templates', 'Follow-ups'],
  },
  {
    name: 'Stripe',
    icon: '\uD83D\uDCB3',
    color: 'from-indigo-500 to-purple-600',
    descBg: '\u041F\u0440\u0438\u0435\u043C\u0430\u0439 \u043F\u043B\u0430\u0449\u0430\u043D\u0438\u044F \u0438 \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u0432\u0430\u0439 subscriptions',
    descEn: 'Accept payments and manage subscriptions',
    featuresBg: ['Payment links', 'Subscriptions', '\u0424\u0430\u043A\u0442\u0443\u0440\u0438'],
    featuresEn: ['Payment links', 'Subscriptions', 'Invoices'],
  },
  {
    name: 'Slack',
    icon: '\uD83D\uDD14',
    color: 'from-purple-500 to-pink-500',
    descBg: '\u041F\u043E\u043B\u0443\u0447\u0430\u0432\u0430\u0439 \u043D\u043E\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438 \u0437\u0430 \u0432\u0430\u0436\u043D\u0438 \u0441\u044A\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u0432 Slack',
    descEn: 'Get notifications for important messages in Slack',
    featuresBg: ['\u041D\u043E\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438', 'Alerts', 'Team updates'],
    featuresEn: ['Notifications', 'Alerts', 'Team updates'],
  },
  {
    name: 'Zapier',
    icon: '\u26A1',
    color: 'from-orange-400 to-yellow-500',
    descBg: '\u0421\u0432\u044A\u0440\u0436\u0438 Neo \u0441 5000+ \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0447\u0440\u0435\u0437 Zapier',
    descEn: 'Connect Neo with 5000+ apps via Zapier',
    featuresBg: ['5000+ apps', 'Custom workflows', 'No-code'],
    featuresEn: ['5000+ apps', 'Custom workflows', 'No-code'],
  },
]

export function IntegrationShowcase() {
  const { lang } = useLanguage()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024)
  }, [])

  return (
    <section className="py-20 sm:py-32 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {lang === 'bg' ? 'Интеграции' : 'Integrations'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {lang === 'bg'
              ? 'Neo се интегрира с инструментите които вече използваш'
              : 'Neo integrates with the tools you already use'}
          </p>
        </div>

        {/* Integration Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration, i) => {
            const description = lang === 'bg' ? integration.descBg : integration.descEn
            const features = lang === 'bg' ? integration.featuresBg : integration.featuresEn
            const isHovered = hoveredIndex === i

            return isMobile ? (
              <div key={i} className="relative h-full p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${integration.color} flex items-center justify-center text-3xl mb-4`}>
                  {integration.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {integration.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {features.map((feature, j) => (
                    <span key={j} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onHoverStart={() => setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="group relative"
              >
                <div className={`
                  relative h-full p-6 rounded-2xl border-2 transition-all duration-300
                  ${isHovered
                    ? 'border-transparent shadow-2xl scale-105'
                    : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                  }
                  bg-white dark:bg-gray-900
                `}>
                  {/* Gradient Background on Hover */}
                  {isHovered && (
                    <motion.div
                      layoutId="integrationGradient"
                      className={`absolute inset-0 bg-gradient-to-br ${integration.color} opacity-5 rounded-2xl`}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  {/* Icon */}
                  <div className={`
                    w-16 h-16 rounded-2xl bg-gradient-to-br ${integration.color}
                    flex items-center justify-center text-3xl mb-4
                    ${isHovered ? 'scale-110' : 'scale-100'}
                    transition-transform duration-300
                  `}>
                    {integration.icon}
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {integration.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {features.map((feature, j) => (
                      <span key={j} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Connect Button (appears on hover) */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      y: isHovered ? 0 : 10,
                    }}
                    className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800"
                  >
                    <button className={`w-full px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r ${integration.color} hover:opacity-90 transition-opacity`}>
                      {lang === 'bg' ? 'Свържи' : 'Connect'}
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {lang === 'bg'
              ? 'Не виждаш интеграцията която ти трябва?'
              : "Don't see the integration you need?"}
          </p>
          <a
            href="mailto:integrations@nextbot.me"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold transition-colors"
          >
            <span>{lang === 'bg' ? 'Заявка за интеграция' : 'Request integration'}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
