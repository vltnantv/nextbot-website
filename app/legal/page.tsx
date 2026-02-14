'use client'

import { useLanguage } from '@/lib/i18n'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

type Tab = 'terms' | 'privacy' | 'cookies' | 'gdpr'

const validTabs: Tab[] = ['terms', 'privacy', 'cookies', 'gdpr']

export default function LegalPage() {
  const { lang } = useLanguage()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab') as Tab | null
  const [activeTab, setActiveTab] = useState<Tab>(
    tabParam && validTabs.includes(tabParam) ? tabParam : 'terms'
  )

  useEffect(() => {
    if (tabParam && validTabs.includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [tabParam])

  const content = {
    bg: {
      tabs: {
        terms: 'Общи условия',
        privacy: 'Поверителност',
        cookies: 'Бисквитки',
        gdpr: 'GDPR'
      },
      terms: {
        title: 'Общи условия за ползване',
        lastUpdated: 'Последна актуализация: 14 февруари 2025',
        sections: [
          {
            title: '1. Приемане на условията',
            content: 'Използвайки услугите на Nextbot EOOD ("Nextbot", "ние", "нашите"), вие приемате настоящите Общи условия. Ако не приемате тези условия, моля не използвайте нашите услуги.'
          },
          {
            title: '2. Описание на услугата',
            content: 'Nextbot предоставя AI-базирани решения за автоматизация на комуникацията с клиенти, включително чат ботове, автоматизирани отговори и интеграции с различни платформи.'
          },
          {
            title: '3. Регистрация и акаунт',
            content: 'За да използвате услугата, трябва да създадете акаунт. Вие сте отговорни за поддържането на сигурността на вашия акаунт и пароли. Nextbot не носи отговорност за загуби, произтичащи от неоторизиран достъп до вашия акаунт.'
          },
          {
            title: '4. Ценообразуване и плащания',
            content: 'Цените на услугите са публикувани на нашия уебсайт. Всички цени са в евро (EUR) и не включват ДДС. Плащанията се извършват месечно или годишно, в зависимост от избрания план. При годишно плащане се предоставя отстъпка от 2 месеца.'
          },
          {
            title: '5. Безплатен пробен период',
            content: 'Предлагаме 30-дневен безплатен пробен период за нови потребители. През този период можете да тествате всички функции на услугата. Не се изисква кредитна карта за започване на пробния период.'
          },
          {
            title: '6. Прекратяване на услугата',
            content: 'Можете да прекратите използването на услугата по всяко време от вашия акаунт. При прекратяване, вашите данни ще бъдат изтрити след 30 дни, освен ако не е предвидено друго от закона.'
          },
          {
            title: '7. Интелектуална собственост',
            content: 'Всички права върху софтуера, дизайна, съдържанието и търговските марки на Nextbot са собственост на Nextbot EOOD. Не можете да копирате, модифицирате или разпространявате нашата интелектуална собственост без писмено разрешение.'
          },
          {
            title: '8. Отговорност и гаранции',
            content: 'Услугата се предоставя "както е". Nextbot не носи отговорност за щети, произтичащи от използването или невъзможността за използване на услугата. Гарантираме 99.9% uptime, с изключение на планирани поддръжки.'
          },
          {
            title: '9. Защита на данните',
            content: 'Обработваме вашите данни съгласно GDPR и българското законодателство. Подробности за обработката на лични данни можете да намерите в секцията "Поверителност".'
          },
          {
            title: '10. Изменения в условията',
            content: 'Запазваме правото да променяме тези условия. При съществени промени ще ви уведомим по имейл 30 дни предварително.'
          },
          {
            title: '11. Приложимо право',
            content: 'Тези условия се регулират от законодателството на Република България. Всички спорове ще бъдат решавани в компетентните съдилища в София, България.'
          }
        ]
      },
      privacy: {
        title: 'Политика за поверителност',
        lastUpdated: 'Последна актуализация: 14 февруари 2025',
        intro: 'Nextbot EOOD ("Nextbot", "ние") зачита вашата поверителност и се ангажира да защитава вашите лични данни.',
        sections: [
          {
            title: '1. Администратор на лични данни',
            content: 'Администратор на вашите лични данни е Nextbot EOOD, със седалище София, България, ЕИК: 207218192. Контакт: privacy@nextbot.me'
          },
          {
            title: '2. Какви данни събираме',
            content: '• Данни за акаунт: име, имейл, телефон, фирма\n• Данни за използване: IP адрес, browser информация\n• Комуникационни данни: чат история\n• Плащания: данни за фактуриране (Stripe)\n• Бисквитки и аналитични данни'
          },
          {
            title: '3. Защо събираме данни',
            content: '• Изпълнение на договор\n• Законово задължение\n• Легитимен интерес\n• Съгласие за маркетинг'
          },
          {
            title: '4. Вашите права (GDPR)',
            content: '• Достъп до данните\n• Корекция на данни\n• Изтриване ("право да бъдеш забравен")\n• Ограничаване на обработката\n• Преносимост на данни\n• Възражение срещу обработка\n• Оттегляне на съгласие'
          },
          {
            title: '5. Защита на данните',
            content: '• SSL/TLS encryption\n• Криптирани бази данни\n• AWS EU сървъри\n• Регулярни security audits\n• Автоматични backups'
          },
          {
            title: '6. Съхранение',
            content: '• Активен акаунт: докато използвате услугата\n• След прекратяване: 30 дни\n• Фактури: 5 години (данъчно законодателство)'
          }
        ]
      },
      cookies: {
        title: 'Политика за бисквитки',
        lastUpdated: 'Последна актуализация: 14 февруари 2025',
        intro: 'Този сайт използва бисквитки за подобряване на вашето потребителско изживяване.',
        sections: [
          {
            title: '1. Какво са бисквитките',
            content: 'Бисквитките са малки текстови файлове, които се съхраняват на вашето устройство при посещение на уебсайт. Те помагат на сайта да запомни вашите предпочитания и да подобри функционалността.'
          },
          {
            title: '2. Видове бисквитки, които използваме',
            content: '• Необходими бисквитки: Задължителни за функционирането на сайта (сесия, сигурност)\n• Аналитични бисквитки: Помагат ни да разберем как използвате сайта (Google Analytics)\n• Функционални бисквитки: Запомнят вашите предпочитания (език, тема)\n• Маркетингови бисквитки: Използват се за персонализирана реклама'
          },
          {
            title: '3. Управление на бисквитките',
            content: 'Можете да контролирате и изтривате бисквитки чрез настройките на вашия браузър. Имайте предвид, че деактивирането на някои бисквитки може да повлияе на функционалността на сайта.'
          },
          {
            title: '4. Бисквитки от трети страни',
            content: '• Google Analytics: Анализ на трафика\n• Stripe: Обработка на плащания\n• Calendly: Резервации на срещи\n• Voiceflow: Чат функционалност'
          },
          {
            title: '5. Срок на съхранение',
            content: '• Сесийни бисквитки: Изтриват се при затваряне на браузъра\n• Постоянни бисквитки: До 12 месеца\n• Аналитични бисквитки: До 26 месеца'
          },
          {
            title: '6. Вашите права',
            content: 'Съгласно GDPR имате право да оттеглите съгласието си за бисквитки по всяко време. За въпроси свържете се с нас на privacy@nextbot.me'
          }
        ]
      },
      gdpr: {
        title: 'GDPR Съответствие',
        lastUpdated: 'Последна актуализация: 14 февруари 2025',
        intro: 'Nextbot EOOD е напълно съобразен с Общия регламент за защита на данните (GDPR) на Европейския съюз.',
        sections: [
          {
            title: '1. Нашият ангажимент',
            content: 'Nextbot EOOD обработва лични данни в съответствие с GDPR (Регламент (ЕС) 2016/679) и Закона за защита на личните данни на Република България.'
          },
          {
            title: '2. Правно основание за обработка',
            content: '• Изпълнение на договор (чл. 6(1)(b)): Предоставяне на услугата\n• Законово задължение (чл. 6(1)(c)): Данъчно и счетоводно законодателство\n• Легитимен интерес (чл. 6(1)(f)): Подобряване на услугата, сигурност\n• Съгласие (чл. 6(1)(a)): Маркетинг, бисквитки'
          },
          {
            title: '3. Вашите права по GDPR',
            content: '• Право на достъп (чл. 15): Получете копие на вашите данни\n• Право на корекция (чл. 16): Поправете неточни данни\n• Право на изтриване (чл. 17): Поискайте изтриване на данните\n• Право на ограничаване (чл. 18): Ограничете обработката\n• Право на преносимост (чл. 20): Получете данните в машинно четим формат\n• Право на възражение (чл. 21): Възразете срещу обработката\n• Право за оттегляне на съгласие (чл. 7(3)): По всяко време'
          },
          {
            title: '4. Мерки за сигурност',
            content: '• SSL/TLS криптиране на всички комуникации\n• Криптиране на данни в покой (AES-256)\n• AWS EU сървъри (Frankfurt, eu-central-1)\n• Регулярни penetration тестове\n• Контрол на достъпа (RBAC)\n• Автоматични backups с криптиране'
          },
          {
            title: '5. Обработващи лични данни',
            content: '• Amazon Web Services (AWS): Хостинг (EU)\n• Stripe: Обработка на плащания (EU)\n• Google Analytics: Уеб аналитика (с IP анонимизация)\n• Calendly: Планиране на срещи'
          },
          {
            title: '6. Трансфер на данни извън ЕС',
            content: 'Не прехвърляме лични данни извън Европейското икономическо пространство (ЕИП). Всички наши сървъри и обработващи лични данни са базирани в ЕС.'
          },
          {
            title: '7. Длъжностно лице по защита на данните',
            content: 'За GDPR запитвания се свържете с нас:\n\nEmail: privacy@nextbot.me\nNextbot EOOD\nСофия, България\nЕИК: 207218192'
          },
          {
            title: '8. Надзорен орган',
            content: 'Имате право да подадете жалба до Комисия за защита на личните данни (КЗЛД):\n\nАдрес: бул. „Проф. Цветан Лазаров" 2, София 1592\nТелефон: +359 2 915 3518\nУебсайт: www.cpdp.bg'
          }
        ]
      }
    },
    en: {
      tabs: {
        terms: 'Terms',
        privacy: 'Privacy',
        cookies: 'Cookies',
        gdpr: 'GDPR'
      },
      terms: {
        title: 'Terms of Service',
        lastUpdated: 'Last updated: February 14, 2025',
        sections: [
          {
            title: '1. Acceptance of Terms',
            content: 'By using the services of Nextbot EOOD ("Nextbot", "we", "our"), you accept these Terms of Service.'
          },
          {
            title: '2. Service Description',
            content: 'Nextbot provides AI-based solutions for automating customer communication, including chatbots, automated responses, and integrations.'
          },
          {
            title: '3. Registration and Account',
            content: 'You are responsible for maintaining the security of your account and passwords.'
          },
          {
            title: '4. Pricing and Payments',
            content: 'All prices are in euros (EUR) and exclude VAT. Payments are monthly or annually. Annual payments get 2 months free.'
          },
          {
            title: '5. Free Trial',
            content: 'We offer a 30-day free trial. No credit card required.'
          },
          {
            title: '6. Termination',
            content: 'You may terminate at any time. Data will be deleted after 30 days.'
          },
          {
            title: '7. Intellectual Property',
            content: 'All rights to our software, design, and content are owned by Nextbot EOOD.'
          },
          {
            title: '8. Liability',
            content: 'Service provided "as is". We guarantee 99.9% uptime excluding maintenance.'
          },
          {
            title: '9. Data Protection',
            content: 'We process data according to GDPR. See Privacy section for details.'
          },
          {
            title: '10. Changes',
            content: 'We reserve the right to modify terms with 30 days notice.'
          },
          {
            title: '11. Applicable Law',
            content: 'Governed by Bulgarian law. Disputes resolved in Sofia, Bulgaria.'
          }
        ]
      },
      privacy: {
        title: 'Privacy Policy',
        lastUpdated: 'Last updated: February 14, 2025',
        intro: 'Nextbot EOOD respects your privacy and protects your personal data.',
        sections: [
          {
            title: '1. Data Controller',
            content: 'Nextbot EOOD, Sofia, Bulgaria, UIC: 207218192. Contact: privacy@nextbot.me'
          },
          {
            title: '2. Data We Collect',
            content: '• Account: name, email, phone, company\n• Usage: IP, browser, actions\n• Communication: chat history\n• Payments: billing (Stripe)\n• Cookies and analytics'
          },
          {
            title: '3. Legal Basis',
            content: '• Contract performance\n• Legal obligation\n• Legitimate interest\n• Marketing consent'
          },
          {
            title: '4. Your Rights (GDPR)',
            content: '• Access data\n• Correct data\n• Delete data\n• Restrict processing\n• Data portability\n• Object to processing\n• Withdraw consent'
          },
          {
            title: '5. Data Protection',
            content: '• SSL/TLS encryption\n• Encrypted databases\n• AWS EU servers\n• Security audits\n• Auto backups'
          },
          {
            title: '6. Retention',
            content: '• Active account: while using service\n• After termination: 30 days\n• Invoices: 5 years (tax law)'
          }
        ]
      },
      cookies: {
        title: 'Cookie Policy',
        lastUpdated: 'Last updated: February 14, 2025',
        intro: 'This website uses cookies to improve your browsing experience.',
        sections: [
          {
            title: '1. What Are Cookies',
            content: 'Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and improve functionality.'
          },
          {
            title: '2. Types of Cookies We Use',
            content: '• Essential cookies: Required for site functionality (session, security)\n• Analytics cookies: Help us understand how you use the site (Google Analytics)\n• Functional cookies: Remember your preferences (language, theme)\n• Marketing cookies: Used for personalized advertising'
          },
          {
            title: '3. Managing Cookies',
            content: 'You can control and delete cookies through your browser settings. Note that disabling certain cookies may affect site functionality.'
          },
          {
            title: '4. Third-Party Cookies',
            content: '• Google Analytics: Traffic analysis\n• Stripe: Payment processing\n• Calendly: Meeting bookings\n• Voiceflow: Chat functionality'
          },
          {
            title: '5. Retention Period',
            content: '• Session cookies: Deleted when you close the browser\n• Persistent cookies: Up to 12 months\n• Analytics cookies: Up to 26 months'
          },
          {
            title: '6. Your Rights',
            content: 'Under GDPR, you have the right to withdraw your cookie consent at any time. For questions, contact us at privacy@nextbot.me'
          }
        ]
      },
      gdpr: {
        title: 'GDPR Compliance',
        lastUpdated: 'Last updated: February 14, 2025',
        intro: 'Nextbot EOOD is fully compliant with the EU General Data Protection Regulation (GDPR).',
        sections: [
          {
            title: '1. Our Commitment',
            content: 'Nextbot EOOD processes personal data in accordance with GDPR (Regulation (EU) 2016/679) and the Bulgarian Personal Data Protection Act.'
          },
          {
            title: '2. Legal Basis for Processing',
            content: '• Contract performance (Art. 6(1)(b)): Providing the service\n• Legal obligation (Art. 6(1)(c)): Tax and accounting requirements\n• Legitimate interest (Art. 6(1)(f)): Service improvement, security\n• Consent (Art. 6(1)(a)): Marketing, cookies'
          },
          {
            title: '3. Your GDPR Rights',
            content: '• Right of access (Art. 15): Get a copy of your data\n• Right to rectification (Art. 16): Correct inaccurate data\n• Right to erasure (Art. 17): Request data deletion\n• Right to restriction (Art. 18): Restrict processing\n• Right to portability (Art. 20): Get data in machine-readable format\n• Right to object (Art. 21): Object to processing\n• Right to withdraw consent (Art. 7(3)): At any time'
          },
          {
            title: '4. Security Measures',
            content: '• SSL/TLS encryption for all communications\n• Data encryption at rest (AES-256)\n• AWS EU servers (Frankfurt, eu-central-1)\n• Regular penetration testing\n• Role-based access control (RBAC)\n• Encrypted automatic backups'
          },
          {
            title: '5. Data Processors',
            content: '• Amazon Web Services (AWS): Hosting (EU)\n• Stripe: Payment processing (EU)\n• Google Analytics: Web analytics (with IP anonymization)\n• Calendly: Meeting scheduling'
          },
          {
            title: '6. Data Transfers Outside EU',
            content: 'We do not transfer personal data outside the European Economic Area (EEA). All our servers and data processors are based in the EU.'
          },
          {
            title: '7. Data Protection Officer',
            content: 'For GDPR inquiries, contact us:\n\nEmail: privacy@nextbot.me\nNextbot EOOD\nSofia, Bulgaria\nUIC: 207218192'
          },
          {
            title: '8. Supervisory Authority',
            content: 'You have the right to file a complaint with the Commission for Personal Data Protection (CPDP):\n\nAddress: 2 Prof. Tsvetan Lazarov Blvd., Sofia 1592, Bulgaria\nPhone: +359 2 915 3518\nWebsite: www.cpdp.bg'
          }
        ]
      }
    }
  }

  const t = content[lang as keyof typeof content]
  const tabs: Tab[] = ['terms', 'privacy', 'cookies', 'gdpr']

  return (
    <main className="min-h-screen bg-white dark:bg-black pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Tabs */}
        <div className="flex gap-2 sm:gap-4 mb-8 border-b border-gray-200 dark:border-gray-800 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-2 sm:px-3 font-semibold transition-colors relative whitespace-nowrap text-sm sm:text-base ${
                activeTab === tab
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {t.tabs[tab]}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
              )}
            </button>
          ))}
        </div>

        {/* Terms Content */}
        {activeTab === 'terms' && (
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              {t.terms.title}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-12">
              {t.terms.lastUpdated}
            </p>

            <div className="space-y-8">
              {t.terms.sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Privacy Content */}
        {activeTab === 'privacy' && (
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              {t.privacy.title}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {t.privacy.lastUpdated}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
              {t.privacy.intro}
            </p>

            <div className="space-y-8">
              {t.privacy.sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                  <div className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 bg-blue-50 dark:bg-blue-950 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                {lang === 'bg' ? 'Упражнете вашите права' : 'Exercise Your Rights'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {lang === 'bg'
                  ? 'За GDPR запитвания:'
                  : 'For GDPR requests:'}
              </p>
              <p className="text-lg">
                <a href="mailto:privacy@nextbot.me" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                  privacy@nextbot.me
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Cookies Content */}
        {activeTab === 'cookies' && (
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              {t.cookies.title}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {t.cookies.lastUpdated}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
              {t.cookies.intro}
            </p>

            <div className="space-y-8">
              {t.cookies.sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                  <div className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GDPR Content */}
        {activeTab === 'gdpr' && (
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              {t.gdpr.title}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {t.gdpr.lastUpdated}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
              {t.gdpr.intro}
            </p>

            <div className="space-y-8">
              {t.gdpr.sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                  <div className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 bg-blue-50 dark:bg-blue-950 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                {lang === 'bg' ? 'Свържете се с нас' : 'Contact Us'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {lang === 'bg'
                  ? 'За GDPR запитвания:'
                  : 'For GDPR inquiries:'}
              </p>
              <p className="text-lg">
                <a href="mailto:privacy@nextbot.me" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                  privacy@nextbot.me
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Contact */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            {lang === 'bg' ? 'Контакт' : 'Contact'}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Nextbot EOOD<br />
            {lang === 'bg' ? 'ЕИК' : 'UIC'}: 207218192<br />
            {lang === 'bg' ? 'ДДС' : 'VAT'}: BG207218192<br />
            {lang === 'bg' ? 'София, България' : 'Sofia, Bulgaria'}
          </p>
        </div>
      </div>
    </main>
  )
}
