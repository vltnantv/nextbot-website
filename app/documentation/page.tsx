'use client'

import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'
import { useState } from 'react'

const copy = {
  en: {
    label: 'Documentation',
    headline: 'Everything you need to deploy and operate Neo.',
    sections: [
      {
        id: 'getting-started',
        title: 'Getting Started',
        items: [
          { title: 'What is Neo?', content: 'Neo is an AI assistant that answers your customers 24/7 in any language and platform. Works on WhatsApp, Facebook Messenger, Instagram, Telegram, and your website. Setup takes 15-30 minutes.' },
          { title: 'How it works', content: '1. Connect channels — WhatsApp, Facebook, Instagram, etc.\n2. Train Neo — Upload FAQ, products, rules\n3. Test — Check responses in sandbox\n4. Go live — Neo starts answering customers' },
          { title: 'First steps', content: 'Step 1: Create account at nextbot.me\nStep 2: Connect WhatsApp Business number\nStep 3: Upload FAQ and business info\nStep 4: Send test messages\nStep 5: Activate Neo for real customers' },
        ],
      },
      {
        id: 'channels',
        title: 'Channels',
        items: [
          { title: 'WhatsApp Business', content: 'Requirements: WhatsApp Business account, verified phone number, Meta Business Manager.\n\nSetup:\n1. Connect Meta Business Manager\n2. Select WhatsApp number\n3. Activate webhook\n4. Done — Neo receives messages' },
          { title: 'Facebook Messenger', content: 'Steps:\n1. Connect Facebook page\n2. Grant permissions to Neo\n3. Configure auto-replies\n4. Neo responds to Messenger messages' },
          { title: 'Instagram Direct', content: 'Setup:\n1. Professional Instagram account\n2. Connected to Facebook page\n3. Messenger API activated\n4. Neo handles DMs' },
          { title: 'Web Chat Widget', content: 'Add Neo to your website:\n\n<script src="https://cdn.nextbot.me/widget.js"></script>\n<script>\n  NextbotWidget.init({\n    botId: \'YOUR_BOT_ID\',\n    position: \'bottom-right\',\n    language: \'en\'\n  });\n</script>\n\nWidget is responsive and works on all devices.' },
        ],
      },
      {
        id: 'features',
        title: 'Features',
        items: [
          { title: 'Multilingual', content: 'Neo automatically detects and responds in 12+ languages: Bulgarian, English, German, Russian, French, Spanish, Italian, Turkish, Greek, Romanian, Polish, and more. No configuration needed.' },
          { title: 'Automations', content: 'Calendar — Google Calendar, Outlook. Checks availability, books appointments, sends reminders.\n\nCRM — HubSpot, Salesforce. Creates leads, updates contacts, tracks communication.\n\nEmail — Gmail, Outlook. Sends confirmations, follow-ups, newsletters.' },
          { title: 'Analytics', content: 'Real-time dashboard: active conversations, response time, satisfaction rate.\n\nDetailed reports: top questions, peak hours, conversion rate.\n\nExport: CSV, Excel, API access, custom reports.' },
        ],
      },
      {
        id: 'pricing',
        title: 'Pricing',
        items: [
          { title: 'Plans', content: 'Starter: €59/month — 500 conversations, 1 channel, 2 languages, basic analytics\n\nProfessional: €149/month — 2,500 conversations, all channels, 5 languages, CRM, calendar\n\nEnterprise: Custom — unlimited conversations, all channels, 12+ languages, dedicated support' },
          { title: 'Billing', content: 'Monthly or annual billing. Credit card (Stripe) or bank transfer. Annual discount: 2 months free. Cancel anytime. Data retained for 30 days after cancellation.' },
        ],
      },
      {
        id: 'support',
        title: 'Support',
        items: [
          { title: 'Contact', content: 'Email: support@nextbot.me (response within 24h)\nLive Chat: Available in dashboard, Mon-Fri 9:00-18:00 EET\nPhone: +359 894 288 119 (urgent cases)' },
          { title: 'FAQ', content: 'How long does setup take? 15-30 minutes.\nCan I change plans? Yes, anytime.\nWhat if I exceed conversations? €0.05 per additional conversation.\nCan I cancel? Yes, no commitments.\nGDPR compliant? Yes, fully.' },
        ],
      },
    ],
  },
  bg: {
    label: 'Документация',
    headline: 'Всичко необходимо за внедряване и работа с Neo.',
    sections: [
      {
        id: 'getting-started',
        title: 'Начало',
        items: [
          { title: 'Какво е Neo?', content: 'Neo е AI асистент, който отговаря на клиентите ви 24/7 на всеки език и платформа. Работи на WhatsApp, Facebook Messenger, Instagram, Telegram и вашия уебсайт. Настройката отнема 15-30 минути.' },
          { title: 'Как работи?', content: '1. Свържете канали — WhatsApp, Facebook, Instagram и др.\n2. Обучете Neo — Качете FAQ, продукти, правила\n3. Тествайте — Проверете отговорите в sandbox\n4. Пуснете live — Neo започва да отговаря на клиенти' },
          { title: 'Първи стъпки', content: 'Стъпка 1: Създайте акаунт на nextbot.me\nСтъпка 2: Свържете WhatsApp Business номер\nСтъпка 3: Качете FAQ и информация за бизнеса\nСтъпка 4: Изпратете тестови съобщения\nСтъпка 5: Активирайте Neo за реални клиенти' },
        ],
      },
      {
        id: 'channels',
        title: 'Канали',
        items: [
          { title: 'WhatsApp Business', content: 'Изисквания: WhatsApp Business акаунт, верифициран телефонен номер, Meta Business Manager.\n\nНастройка:\n1. Свържете Meta Business Manager\n2. Изберете WhatsApp номер\n3. Активирайте webhook\n4. Готово — Neo получава съобщения' },
          { title: 'Facebook Messenger', content: 'Стъпки:\n1. Свържете Facebook страница\n2. Дайте разрешения на Neo\n3. Настройте автоматични отговори\n4. Neo отговаря на Messenger съобщения' },
          { title: 'Instagram Direct', content: 'Настройка:\n1. Професионален Instagram акаунт\n2. Свързан с Facebook страница\n3. Активиран Messenger API\n4. Neo обработва DM-ве' },
          { title: 'Web Chat Widget', content: 'Добавете Neo на вашия уебсайт:\n\n<script src="https://cdn.nextbot.me/widget.js"></script>\n<script>\n  NextbotWidget.init({\n    botId: \'YOUR_BOT_ID\',\n    position: \'bottom-right\',\n    language: \'bg\'\n  });\n</script>\n\nWidget-ът е responsive и работи на всички устройства.' },
        ],
      },
      {
        id: 'features',
        title: 'Функции',
        items: [
          { title: 'Многоезичност', content: 'Neo автоматично разпознава и отговаря на 12+ езика: български, английски, немски, руски, френски, испански, италиански, турски, гръцки, румънски, полски и още. Не е нужна настройка.' },
          { title: 'Автоматизации', content: 'Календар — Google Calendar, Outlook. Проверява свободни часове, запазва срещи, изпраща напомняния.\n\nCRM — HubSpot, Salesforce. Създава lead-ове, обновява контакти, проследява комуникация.\n\nEmail — Gmail, Outlook. Изпраща потвърждения, follow-up съобщения, newsletters.' },
          { title: 'Аналитика', content: 'Real-time dashboard: активни разговори, време за отговор, satisfaction rate.\n\nДетайлни reports: топ въпроси, peak hours, conversion rate.\n\nЕкспорт: CSV, Excel, API достъп, custom reports.' },
        ],
      },
      {
        id: 'pricing',
        title: 'Цени',
        items: [
          { title: 'Планове', content: 'Starter: €59/месец — 500 разговора, 1 канал, 2 езика, базова аналитика\n\nProfessional: €149/месец — 2,500 разговора, всички канали, 5 езика, CRM, календар\n\nEnterprise: Custom — неограничени разговори, всички канали, 12+ езика, персонална поддръжка' },
          { title: 'Фактуриране', content: 'Месечно или годишно фактуриране. Кредитна карта (Stripe) или банков превод. Годишна отстъпка: 2 месеца безплатно. Откажете по всяко време. Данните се пазят 30 дни след отказ.' },
        ],
      },
      {
        id: 'support',
        title: 'Поддръжка',
        items: [
          { title: 'Контакт', content: 'Email: support@nextbot.me (отговор до 24ч)\nLive Chat: Наличен в dashboard-а, Пон-Пет 9:00-18:00 EET\nТелефон: +359 894 288 119 (спешни случаи)' },
          { title: 'Често задавани въпроси', content: 'Колко време отнема setup-ът? 15-30 минути.\nМога ли да сменя плана? Да, по всяко време.\nКакво става ако надвиша разговорите? €0.05 за допълнителен разговор.\nМога ли да откажа? Да, без договорки.\nGDPR compliant? Да, напълно.' },
        ],
      },
    ],
  },
}

export default function DocumentationPage() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const [activeSection, setActiveSection] = useState(t.sections[0].id)

  return (
    <>
      <section className="pt-36 pb-0 sm:pt-44">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <AnimateIn>
            <p className="text-[0.7rem] text-indigo-400/60 uppercase tracking-[0.2em] font-medium mb-5">{t.label}</p>
            <h1 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white max-w-2xl">{t.headline}</h1>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12 lg:gap-16">
            {/* Sidebar */}
            <AnimateIn>
              <nav className="sticky top-24 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible">
                {t.sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                      activeSection === section.id
                        ? 'text-white bg-white/[0.04]'
                        : 'text-zinc-600 hover:text-zinc-400'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </AnimateIn>

            {/* Content */}
            <div>
              {t.sections
                .filter(s => s.id === activeSection)
                .map((section) => (
                  <div key={section.id} className="space-y-10">
                    {section.items.map((item, i) => (
                      <AnimateIn key={i} delay={i * 60}>
                        <div className="rounded-2xl border border-white/[0.05] p-6 sm:p-8">
                          <h2 className="text-[1.05rem] font-medium text-white mb-4">{item.title}</h2>
                          <p className="text-sm text-zinc-500 leading-[1.8] whitespace-pre-line">{item.content}</p>
                        </div>
                      </AnimateIn>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
