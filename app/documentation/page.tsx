'use client'

import { useLanguage } from '@/lib/i18n'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

export default function DocumentationPage() {
  const { lang } = useLanguage()
  const [activeSection, setActiveSection] = useState('getting-started')

  const content = {
    bg: {
      title: 'Документация',
      subtitle: 'Всичко което трябва да знаеш за Nextbot Neo',
      sections: [
        {
          id: 'getting-started',
          title: 'Начало',
          icon: '🚀',
          items: [
            {
              title: 'Какво е Nextbot Neo?',
              content: `Nextbot Neo е AI асистент който отговаря на клиентите ти 24/7 на всеки език и платформа.

Работи на WhatsApp, Facebook Messenger, Instagram, Viber, Telegram и твоя уебсайт.

Можеш да го настроиш за минути, без техническа експертиза.`
            },
            {
              title: 'Как работи?',
              content: `1. Свържеш каналите - WhatsApp, Facebook, Instagram, и др.
2. Обучаваш Neo - Качваш FAQ, продукти, правила
3. Тестваш - Проверяваш отговорите в sandbox среда
4. Пускаш live - Neo започва да отговаря на клиенти

Целият процес отнема 15-30 минути.`
            },
            {
              title: 'Първи стъпки',
              content: `Стъпка 1: Регистрирай се
Създай акаунт на nextbot.me

Стъпка 2: Свържи WhatsApp
Свържи своя WhatsApp Business номер

Стъпка 3: Обучи Neo
Качи FAQ и информация за бизнеса си

Стъпка 4: Тествай
Изпрати тестови съобщения

Стъпка 5: Go Live
Активирай Neo за реални клиенти`
            }
          ]
        },
        {
          id: 'channels',
          title: 'Канали',
          icon: '📱',
          items: [
            {
              title: 'WhatsApp Business',
              content: `Neo работи с WhatsApp Business API.

Изисквания:
- WhatsApp Business акаунт
- Верифициран телефонен номер
- Meta Business Manager

Настройка:
1. Свържи Meta Business Manager
2. Избери WhatsApp номер
3. Активирай webhook
4. Готово - Neo получава съобщения`
            },
            {
              title: 'Facebook Messenger',
              content: `Интеграция с Facebook страница.

Стъпки:
1. Свържи Facebook страница
2. Дай разрешения на Neo
3. Настрой автоматични отговори
4. Neo отговаря на Messenger съобщения`
            },
            {
              title: 'Instagram Direct',
              content: `Отговаряй на Instagram съобщения автоматично.

Настройка:
1. Професионален Instagram акаунт
2. Свързан с Facebook страница
3. Активиран Messenger API
4. Neo обработва DM-ве`
            },
            {
              title: 'Web Chat Widget',
              content: `Добави Neo на твоя уебсайт.

Интеграция:

<script src="https://cdn.nextbot.me/widget.js"></script>
<script>
  NextbotWidget.init({
    botId: 'YOUR_BOT_ID',
    position: 'bottom-right',
    language: 'bg'
  });
</script>

Widget-ът е responsive и работи на всички устройства.`
            }
          ]
        },
        {
          id: 'features',
          title: 'Функции',
          icon: '⚡',
          items: [
            {
              title: 'Многоезичност',
              content: `Neo автоматично разпознава и отговаря на 12+ езика:

🇧🇬 Български
🇬🇧 Английски
🇩🇪 Немски
🇷🇺 Руски
🇫🇷 Френски
🇪🇸 Испански
🇮🇹 Италиански
🇹🇷 Турски
🇬🇷 Гръцки
🇷🇴 Румънски

Не е нужна настройка - работи автоматично.`
            },
            {
              title: 'Автоматизации',
              content: `Neo се интегрира с твоите системи:

Календар - Google Calendar, Outlook
- Проверява свободни часове
- Запазва срещи
- Изпраща напомняния

CRM - HubSpot, Salesforce
- Създава lead-ове
- Обновява контакти
- Проследява комуникация

Email - Gmail, Outlook
- Изпраща потвърждения
- Follow-up съобщения
- Newsletters`
            },
            {
              title: 'Аналитика',
              content: `Виж точно какво се случва:

Real-time Dashboard
- Активни разговори
- Време за отговор
- Satisfaction rate

Детайлни Reports
- Най-често задавани въпроси
- Peak hours
- Conversion rate

Експорт на данни
- CSV, Excel
- API достъп
- Custom reports`
            }
          ]
        },
        {
          id: 'pricing',
          title: 'Цени',
          icon: '💰',
          items: [
            {
              title: 'Ценообразуване',
              content: `База: €120/месец
Включва:
- 1000 съобщения
- 1 канал (WhatsApp, Messenger, или Web)
- Basic аналитика
- Email поддръжка

Add-ons:
- Допълнителен канал: +€30/месец
- Календар интеграция: +€40/месец
- CRM интеграция: +€50/месец
- Email автоматизация: +€35/месец
- Базова аналитика: +€25/месец
- AI модел upgrade: +€60/месец

Годишна отстъпка: Платете за 10 месеца, получавате 12.`
            },
            {
              title: 'Billing',
              content: `Плащане:
- Месечно или годишно
- Кредитна карта (Stripe)
- Банков превод
- Автоматично фактуриране

Годишна отстъпка:
Плащаш за 10 месеца, получаваш 12.

Отказ:
Можеш да откажеш по всяко време.
Данните ти се пазят 30 дни.`
            }
          ]
        },
        {
          id: 'support',
          title: 'Поддръжка',
          icon: '🛟',
          items: [
            {
              title: 'Как да получиш помощ',
              content: `Email Support:
support@nextbot.me
Отговаряме до 24 часа

Live Chat:
Налично в dashboard-а
Пон-Пет: 9:00-18:00 EET

Телефон:
+359 894 288 119
За спешни случаи`
            },
            {
              title: 'Често задавани въпроси',
              content: `Колко време отнема setup-а?
15-30 минути за basic настройка.

Мога ли да сменя плана?
Да, по всяко време.

Какво става ако надвиша съобщенията?
Плащаш €0.05 за допълнително съобщение.

Мога ли да отказа?
Да, без договорки.

Поддържате ли GDPR?
Да, напълно GDPR compliant.`
            }
          ]
        }
      ]
    },
    en: {
      title: 'Documentation',
      subtitle: 'Everything you need to know about Nextbot Neo',
      sections: [
        {
          id: 'getting-started',
          title: 'Getting Started',
          icon: '🚀',
          items: [
            {
              title: 'What is Nextbot Neo?',
              content: `Nextbot Neo is an AI assistant that answers your customers 24/7 in any language and platform.

Works on WhatsApp, Facebook Messenger, Instagram, Viber, Telegram and your website.

You can set it up in minutes, no technical expertise required.`
            },
            {
              title: 'How does it work?',
              content: `1. Connect channels - WhatsApp, Facebook, Instagram, etc.
2. Train Neo - Upload FAQ, products, rules
3. Test - Check responses in sandbox
4. Go live - Neo starts answering customers

The entire process takes 15-30 minutes.`
            },
            {
              title: 'First Steps',
              content: `Step 1: Sign up
Create account at nextbot.me

Step 2: Connect WhatsApp
Link your WhatsApp Business number

Step 3: Train Neo
Upload FAQ and business info

Step 4: Test
Send test messages

Step 5: Go Live
Activate Neo for real customers`
            }
          ]
        },
        {
          id: 'channels',
          title: 'Channels',
          icon: '📱',
          items: [
            {
              title: 'WhatsApp Business',
              content: `Neo works with WhatsApp Business API.

Requirements:
- WhatsApp Business account
- Verified phone number
- Meta Business Manager

Setup:
1. Connect Meta Business Manager
2. Select WhatsApp number
3. Activate webhook
4. Done - Neo receives messages`
            },
            {
              title: 'Facebook Messenger',
              content: `Integration with Facebook page.

Steps:
1. Connect Facebook page
2. Grant permissions to Neo
3. Configure auto-replies
4. Neo responds to Messenger messages`
            },
            {
              title: 'Instagram Direct',
              content: `Answer Instagram messages automatically.

Setup:
1. Professional Instagram account
2. Connected to Facebook page
3. Messenger API activated
4. Neo handles DMs`
            },
            {
              title: 'Web Chat Widget',
              content: `Add Neo to your website.

Integration:

<script src="https://cdn.nextbot.me/widget.js"></script>
<script>
  NextbotWidget.init({
    botId: 'YOUR_BOT_ID',
    position: 'bottom-right',
    language: 'en'
  });
</script>

Widget is responsive and works on all devices.`
            }
          ]
        },
        {
          id: 'features',
          title: 'Features',
          icon: '⚡',
          items: [
            {
              title: 'Multilingual',
              content: `Neo automatically detects and responds in 12+ languages:

🇧🇬 Bulgarian
🇬🇧 English
🇩🇪 German
🇷🇺 Russian
🇫🇷 French
🇪🇸 Spanish
🇮🇹 Italian
🇹🇷 Turkish
🇬🇷 Greek
🇷🇴 Romanian

No configuration needed - works automatically.`
            },
            {
              title: 'Automations',
              content: `Neo integrates with your systems:

Calendar - Google Calendar, Outlook
- Checks availability
- Books appointments
- Sends reminders

CRM - HubSpot, Salesforce
- Creates leads
- Updates contacts
- Tracks communication

Email - Gmail, Outlook
- Sends confirmations
- Follow-up messages
- Newsletters`
            },
            {
              title: 'Analytics',
              content: `See exactly what's happening:

Real-time Dashboard
- Active conversations
- Response time
- Satisfaction rate

Detailed Reports
- Most asked questions
- Peak hours
- Conversion rate

Data Export
- CSV, Excel
- API access
- Custom reports`
            }
          ]
        },
        {
          id: 'pricing',
          title: 'Pricing',
          icon: '💰',
          items: [
            {
              title: 'Pricing',
              content: `Base: €120/month
Includes:
- 1000 messages
- 1 channel (WhatsApp, Messenger, or Web)
- Basic analytics
- Email support

Add-ons:
- Additional channel: +€30/month
- Calendar integration: +€40/month
- CRM integration: +€50/month
- Email automation: +€35/month
- Basic analytics: +€25/month
- AI model upgrade: +€60/month

Annual discount: Pay for 10 months, get 12.`
            },
            {
              title: 'Billing',
              content: `Payment:
- Monthly or annually
- Credit card (Stripe)
- Bank transfer
- Automatic invoicing

Annual discount:
Pay for 10 months, get 12.

Cancellation:
Cancel anytime.
Data retained for 30 days.`
            }
          ]
        },
        {
          id: 'support',
          title: 'Support',
          icon: '🛟',
          items: [
            {
              title: 'How to get help',
              content: `Email Support:
support@nextbot.me
Response within 24h

Live Chat:
Available in dashboard
Mon-Fri: 9:00-18:00 EET

Phone:
+359 894 288 119
For urgent cases`
            },
            {
              title: 'FAQ',
              content: `How long does setup take?
15-30 minutes for basic setup.

Can I change plans?
Yes, anytime.

What if I exceed messages?
Pay €0.05 per additional message.

Can I cancel?
Yes, no commitments.

Do you support GDPR?
Yes, fully GDPR compliant.`
            }
          ]
        }
      ]
    }
  }

  const t = content[lang as keyof typeof content]

  return (
    <main className="min-h-screen bg-white dark:bg-black pt-20">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white dark:from-gray-950 dark:to-black border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              {t.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <nav className="sticky top-24 space-y-1">
              {t.sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                    activeSection === section.id
                      ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900'
                  }`}
                >
                  <span className="text-2xl">{section.icon}</span>
                  <span>{section.title}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3">
            {t.sections
              .filter(s => s.id === activeSection)
              .map((section) => (
                <div key={section.id} className="space-y-8">
                  {section.items.map((item, i) => (
                    <motion.article
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800"
                    >
                      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                        {item.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line leading-relaxed">
                        {item.content}
                      </p>
                    </motion.article>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {lang === 'bg' ? 'Готов да започнеш?' : 'Ready to start?'}
          </h2>
          <p className="text-xl mb-8 text-white/90">
            {lang === 'bg'
              ? 'Запази demo call и виж Neo в действие'
              : 'Book a demo call and see Neo in action'}
          </p>
          <Link
            href="/demo"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-blue-600 font-semibold hover:scale-105 transition-transform"
          >
            {lang === 'bg' ? 'Запази demo' : 'Book demo'}
          </Link>
        </div>
      </section>
    </main>
  )
}
