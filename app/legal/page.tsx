'use client'

import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

type Tab = 'terms' | 'privacy' | 'cookies' | 'gdpr'
const validTabs: Tab[] = ['terms', 'privacy', 'cookies', 'gdpr']

const copy = {
  en: {
    tabs: { terms: 'Terms', privacy: 'Privacy', cookies: 'Cookies', gdpr: 'GDPR' },
    terms: {
      title: 'Terms of Service',
      lastUpdated: 'Last updated: February 14, 2025',
      sections: [
        { title: '1. Acceptance of Terms', content: 'By using the services of Nextbot EOOD ("Nextbot", "we", "our"), you accept these Terms of Service. If you do not accept these terms, please do not use our services.' },
        { title: '2. Service Description', content: 'Nextbot provides AI-based solutions for automating customer communication, including chatbots, automated responses, and integrations with various platforms.' },
        { title: '3. Registration and Account', content: 'To use the service, you must create an account. You are responsible for maintaining the security of your account and passwords. Nextbot is not liable for losses resulting from unauthorized access to your account.' },
        { title: '4. Pricing and Payments', content: 'Service prices are published on our website. All prices are in euros (EUR) and exclude VAT. Payments are monthly or annually, depending on the selected plan. Annual payments include a 2-month discount.' },
        { title: '5. Termination', content: 'You may terminate your use of the service at any time from your account. Upon termination, your data will be deleted after 30 days, unless otherwise required by law.' },
        { title: '6. Intellectual Property', content: 'All rights to Nextbot software, design, content, and trademarks are owned by Nextbot EOOD. You may not copy, modify, or distribute our intellectual property without written permission.' },
        { title: '7. Liability and Warranties', content: 'The service is provided "as is". Nextbot is not liable for damages arising from the use or inability to use the service. We guarantee 99.9% uptime, excluding scheduled maintenance.' },
        { title: '8. Data Protection', content: 'We process your data in accordance with GDPR and Bulgarian legislation. Details about personal data processing can be found in the "Privacy" section.' },
        { title: '9. Changes to Terms', content: 'We reserve the right to modify these terms. For material changes, we will notify you by email 30 days in advance.' },
        { title: '10. Applicable Law', content: 'These terms are governed by the laws of the Republic of Bulgaria. All disputes will be resolved in the competent courts in Sofia, Bulgaria.' },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: February 14, 2025',
      intro: 'Nextbot EOOD respects your privacy and is committed to protecting your personal data.',
      sections: [
        { title: '1. Data Controller', content: 'Data controller: Nextbot EOOD, Sofia, Bulgaria, UIC: 207218192. Contact: privacy@nextbot.me' },
        { title: '2. Data We Collect', content: 'Account data: name, email, phone, company\nUsage data: IP address, browser information\nCommunication data: chat history\nPayments: billing data (Stripe)\nCookies and analytics data' },
        { title: '3. Legal Basis', content: 'Contract performance\nLegal obligation\nLegitimate interest\nConsent for marketing' },
        { title: '4. Your Rights (GDPR)', content: 'Access to data\nCorrection of data\nDeletion ("right to be forgotten")\nRestriction of processing\nData portability\nObjection to processing\nWithdrawal of consent' },
        { title: '5. Data Protection', content: 'SSL/TLS encryption\nEncrypted databases\nAWS EU servers\nRegular security audits\nAutomatic backups' },
        { title: '6. Retention', content: 'Active account: while you use the service\nAfter termination: 30 days\nInvoices: 5 years (tax law)' },
      ],
    },
    cookies: {
      title: 'Cookie Policy',
      lastUpdated: 'Last updated: February 14, 2025',
      intro: 'This website uses cookies to improve your browsing experience.',
      sections: [
        { title: '1. What Are Cookies', content: 'Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and improve functionality.' },
        { title: '2. Types of Cookies', content: 'Essential cookies: Required for site functionality (session, security)\nAnalytics cookies: Help us understand usage (Google Analytics)\nFunctional cookies: Remember your preferences (language, theme)\nMarketing cookies: Used for personalized advertising' },
        { title: '3. Managing Cookies', content: 'You can control and delete cookies through your browser settings. Disabling certain cookies may affect site functionality.' },
        { title: '4. Third-Party Cookies', content: 'Google Analytics: Traffic analysis\nStripe: Payment processing\nCalendly: Meeting bookings\nVoiceflow: Chat functionality' },
        { title: '5. Retention Period', content: 'Session cookies: Deleted when you close the browser\nPersistent cookies: Up to 12 months\nAnalytics cookies: Up to 26 months' },
        { title: '6. Your Rights', content: 'Under GDPR, you have the right to withdraw cookie consent at any time. Contact: privacy@nextbot.me' },
      ],
    },
    gdpr: {
      title: 'GDPR Compliance',
      lastUpdated: 'Last updated: February 14, 2025',
      intro: 'Nextbot EOOD is fully compliant with the EU General Data Protection Regulation (GDPR).',
      sections: [
        { title: '1. Our Commitment', content: 'Nextbot EOOD processes personal data in accordance with GDPR (Regulation (EU) 2016/679) and the Bulgarian Personal Data Protection Act.' },
        { title: '2. Legal Basis for Processing', content: 'Contract performance (Art. 6(1)(b)): Providing the service\nLegal obligation (Art. 6(1)(c)): Tax and accounting\nLegitimate interest (Art. 6(1)(f)): Service improvement, security\nConsent (Art. 6(1)(a)): Marketing, cookies' },
        { title: '3. Your GDPR Rights', content: 'Right of access (Art. 15)\nRight to rectification (Art. 16)\nRight to erasure (Art. 17)\nRight to restriction (Art. 18)\nRight to portability (Art. 20)\nRight to object (Art. 21)\nRight to withdraw consent (Art. 7(3))' },
        { title: '4. Security Measures', content: 'SSL/TLS encryption for all communications\nData encryption at rest (AES-256)\nAWS EU servers (Frankfurt, eu-central-1)\nRegular penetration testing\nRole-based access control (RBAC)\nEncrypted automatic backups' },
        { title: '5. Data Processors', content: 'Amazon Web Services (AWS): Hosting (EU)\nStripe: Payment processing (EU)\nGoogle Analytics: Web analytics (with IP anonymization)\nCalendly: Meeting scheduling' },
        { title: '6. Data Transfers Outside EU', content: 'We do not transfer personal data outside the European Economic Area (EEA). All our servers and data processors are based in the EU.' },
        { title: '7. Data Protection Officer', content: 'For GDPR inquiries:\nEmail: privacy@nextbot.me\nNextbot EOOD, Sofia, Bulgaria\nUIC: 207218192' },
        { title: '8. Supervisory Authority', content: 'Commission for Personal Data Protection (CPDP)\n2 Prof. Tsvetan Lazarov Blvd., Sofia 1592, Bulgaria\nPhone: +359 2 915 3518\nWebsite: www.cpdp.bg' },
      ],
    },
  },
  bg: {
    tabs: { terms: 'Общи условия', privacy: 'Поверителност', cookies: 'Бисквитки', gdpr: 'GDPR' },
    terms: {
      title: 'Общи условия за ползване',
      lastUpdated: 'Последна актуализация: 14 февруари 2025',
      sections: [
        { title: '1. Приемане на условията', content: 'Използвайки услугите на Nextbot EOOD ("Nextbot", "ние", "нашите"), вие приемате настоящите Общи условия. Ако не приемате тези условия, моля не използвайте нашите услуги.' },
        { title: '2. Описание на услугата', content: 'Nextbot предоставя AI-базирани решения за автоматизация на комуникацията с клиенти, включително чат ботове, автоматизирани отговори и интеграции с различни платформи.' },
        { title: '3. Регистрация и акаунт', content: 'За да използвате услугата, трябва да създадете акаунт. Вие сте отговорни за поддържането на сигурността на вашия акаунт и пароли. Nextbot не носи отговорност за загуби, произтичащи от неоторизиран достъп до вашия акаунт.' },
        { title: '4. Ценообразуване и плащания', content: 'Цените на услугите са публикувани на нашия уебсайт. Всички цени са в евро (EUR) и не включват ДДС. Плащанията се извършват месечно или годишно, в зависимост от избрания план. При годишно плащане се предоставя отстъпка от 2 месеца.' },
        { title: '5. Прекратяване на услугата', content: 'Можете да прекратите използването на услугата по всяко време от вашия акаунт. При прекратяване, вашите данни ще бъдат изтрити след 30 дни, освен ако не е предвидено друго от закона.' },
        { title: '6. Интелектуална собственост', content: 'Всички права върху софтуера, дизайна, съдържанието и търговските марки на Nextbot са собственост на Nextbot EOOD. Не можете да копирате, модифицирате или разпространявате нашата интелектуална собственост без писмено разрешение.' },
        { title: '7. Отговорност и гаранции', content: 'Услугата се предоставя "както е". Nextbot не носи отговорност за щети, произтичащи от използването или невъзможността за използване на услугата. Гарантираме 99.9% uptime, с изключение на планирани поддръжки.' },
        { title: '8. Защита на данните', content: 'Обработваме вашите данни съгласно GDPR и българското законодателство. Подробности за обработката на лични данни можете да намерите в секцията "Поверителност".' },
        { title: '9. Изменения в условията', content: 'Запазваме правото да променяме тези условия. При съществени промени ще ви уведомим по имейл 30 дни предварително.' },
        { title: '10. Приложимо право', content: 'Тези условия се регулират от законодателството на Република България. Всички спорове ще бъдат решавани в компетентните съдилища в София, България.' },
      ],
    },
    privacy: {
      title: 'Политика за поверителност',
      lastUpdated: 'Последна актуализация: 14 февруари 2025',
      intro: 'Nextbot EOOD зачита вашата поверителност и се ангажира да защитава вашите лични данни.',
      sections: [
        { title: '1. Администратор на лични данни', content: 'Администратор на вашите лични данни е Nextbot EOOD, със седалище София, България, ЕИК: 207218192. Контакт: privacy@nextbot.me' },
        { title: '2. Какви данни събираме', content: 'Данни за акаунт: име, имейл, телефон, фирма\nДанни за използване: IP адрес, browser информация\nКомуникационни данни: чат история\nПлащания: данни за фактуриране (Stripe)\nБисквитки и аналитични данни' },
        { title: '3. Защо събираме данни', content: 'Изпълнение на договор\nЗаконово задължение\nЛегитимен интерес\nСъгласие за маркетинг' },
        { title: '4. Вашите права (GDPR)', content: 'Достъп до данните\nКорекция на данни\nИзтриване ("право да бъдеш забравен")\nОграничаване на обработката\nПреносимост на данни\nВъзражение срещу обработка\nОттегляне на съгласие' },
        { title: '5. Защита на данните', content: 'SSL/TLS encryption\nКриптирани бази данни\nAWS EU сървъри\nРегулярни security audits\nАвтоматични backups' },
        { title: '6. Съхранение', content: 'Активен акаунт: докато използвате услугата\nСлед прекратяване: 30 дни\nФактури: 5 години (данъчно законодателство)' },
      ],
    },
    cookies: {
      title: 'Политика за бисквитки',
      lastUpdated: 'Последна актуализация: 14 февруари 2025',
      intro: 'Този сайт използва бисквитки за подобряване на вашето потребителско изживяване.',
      sections: [
        { title: '1. Какво са бисквитките', content: 'Бисквитките са малки текстови файлове, които се съхраняват на вашето устройство при посещение на уебсайт. Те помагат на сайта да запомни вашите предпочитания и да подобри функционалността.' },
        { title: '2. Видове бисквитки', content: 'Необходими бисквитки: Задължителни за функционирането на сайта\nАналитични бисквитки: Помагат ни да разберем как използвате сайта\nФункционални бисквитки: Запомнят вашите предпочитания\nМаркетингови бисквитки: Използват се за персонализирана реклама' },
        { title: '3. Управление на бисквитките', content: 'Можете да контролирате и изтривате бисквитки чрез настройките на вашия браузър. Деактивирането на някои бисквитки може да повлияе на функционалността на сайта.' },
        { title: '4. Бисквитки от трети страни', content: 'Google Analytics: Анализ на трафика\nStripe: Обработка на плащания\nCalendly: Резервации на срещи\nVoiceflow: Чат функционалност' },
        { title: '5. Срок на съхранение', content: 'Сесийни бисквитки: Изтриват се при затваряне на браузъра\nПостоянни бисквитки: До 12 месеца\nАналитични бисквитки: До 26 месеца' },
        { title: '6. Вашите права', content: 'Съгласно GDPR имате право да оттеглите съгласието си за бисквитки по всяко време. Контакт: privacy@nextbot.me' },
      ],
    },
    gdpr: {
      title: 'GDPR Съответствие',
      lastUpdated: 'Последна актуализация: 14 февруари 2025',
      intro: 'Nextbot EOOD е напълно съобразен с Общия регламент за защита на данните (GDPR) на Европейския съюз.',
      sections: [
        { title: '1. Нашият ангажимент', content: 'Nextbot EOOD обработва лични данни в съответствие с GDPR (Регламент (ЕС) 2016/679) и Закона за защита на личните данни на Република България.' },
        { title: '2. Правно основание за обработка', content: 'Изпълнение на договор (чл. 6(1)(b)): Предоставяне на услугата\nЗаконово задължение (чл. 6(1)(c)): Данъчно и счетоводно законодателство\nЛегитимен интерес (чл. 6(1)(f)): Подобряване на услугата, сигурност\nСъгласие (чл. 6(1)(a)): Маркетинг, бисквитки' },
        { title: '3. Вашите права по GDPR', content: 'Право на достъп (чл. 15)\nПраво на корекция (чл. 16)\nПраво на изтриване (чл. 17)\nПраво на ограничаване (чл. 18)\nПраво на преносимост (чл. 20)\nПраво на възражение (чл. 21)\nПраво за оттегляне на съгласие (чл. 7(3))' },
        { title: '4. Мерки за сигурност', content: 'SSL/TLS криптиране на всички комуникации\nКриптиране на данни в покой (AES-256)\nAWS EU сървъри (Frankfurt, eu-central-1)\nРегулярни penetration тестове\nКонтрол на достъпа (RBAC)\nАвтоматични backups с криптиране' },
        { title: '5. Обработващи лични данни', content: 'Amazon Web Services (AWS): Хостинг (EU)\nStripe: Обработка на плащания (EU)\nGoogle Analytics: Уеб аналитика (с IP анонимизация)\nCalendly: Планиране на срещи' },
        { title: '6. Трансфер на данни извън ЕС', content: 'Не прехвърляме лични данни извън Европейското икономическо пространство (ЕИП). Всички наши сървъри и обработващи лични данни са базирани в ЕС.' },
        { title: '7. Длъжностно лице по защита на данните', content: 'За GDPR запитвания:\nEmail: privacy@nextbot.me\nNextbot EOOD, София, България\nЕИК: 207218192' },
        { title: '8. Надзорен орган', content: 'Комисия за защита на личните данни (КЗЛД)\nбул. „Проф. Цветан Лазаров" 2, София 1592\nТелефон: +359 2 915 3518\nУебсайт: www.cpdp.bg' },
      ],
    },
  },
}

export default function LegalPage() {
  const { lang } = useLanguage()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab') as Tab | null
  const [activeTab, setActiveTab] = useState<Tab>(
    tabParam && validTabs.includes(tabParam) ? tabParam : 'terms'
  )

  useEffect(() => {
    if (tabParam && validTabs.includes(tabParam)) setActiveTab(tabParam)
  }, [tabParam])

  const t = copy[lang]
  const tabData = t[activeTab]

  return (
    <>
      <section className="pt-36 pb-0 sm:pt-44">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          {/* Tabs */}
          <div className="flex gap-1 mb-12 border-b border-white/[0.04] overflow-x-auto">
            {validTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-4 px-4 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'
                }`}
              >
                {t.tabs[tab]}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-white" />
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <AnimateIn key={activeTab}>
            <div className="max-w-3xl">
              <h1 className="text-[1.75rem] sm:text-[2.5rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white mb-3">{tabData.title}</h1>
              <p className="text-sm text-zinc-600 mb-4">{tabData.lastUpdated}</p>
              {'intro' in tabData && tabData.intro && (
                <p className="text-[1rem] text-zinc-500 leading-[1.7] mb-12">{tabData.intro}</p>
              )}

              <div className="space-y-10 mt-12">
                {tabData.sections.map((section, i) => (
                  <div key={i}>
                    <h2 className="text-[1.05rem] font-medium text-white mb-3">{section.title}</h2>
                    <p className="text-sm text-zinc-500 leading-[1.8] whitespace-pre-line">{section.content}</p>
                  </div>
                ))}
              </div>

              {(activeTab === 'privacy' || activeTab === 'gdpr') && (
                <div className="mt-16 p-6 rounded-2xl border border-white/[0.04] bg-white/[0.015]">
                  <h3 className="text-sm font-medium text-white mb-2">
                    {lang === 'bg' ? 'Свържете се с нас' : 'Contact Us'}
                  </h3>
                  <p className="text-sm text-zinc-500">
                    {lang === 'bg' ? 'За GDPR запитвания: ' : 'For GDPR inquiries: '}
                    <a href="mailto:privacy@nextbot.me" className="text-zinc-400 hover:text-white transition-colors">privacy@nextbot.me</a>
                  </p>
                </div>
              )}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Company info */}
      <div className="py-20">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <p className="text-xs text-zinc-700">
            Nextbot EOOD / {lang === 'bg' ? 'ЕИК' : 'UIC'}: 207218192 / {lang === 'bg' ? 'ДДС' : 'VAT'}: BG207218192 / Sofia, Bulgaria
          </p>
        </div>
      </div>
    </>
  )
}
