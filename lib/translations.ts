import { Language } from './i18n'

export const translations = {
  bg: {
    // Navigation
    nav: {
      products: 'Продукти',
      neo: 'Neo',
      demo: 'Демо',
      earlyAccess: 'Ранен достъп',
      about: 'За нас',
      store: 'Магазин',
      mac: 'Mac',
      ipad: 'iPad',
      iphone: 'iPhone',
      watch: 'Watch',
      support: 'Поддръжка'
    },

    // Homepage Hero
    hero: {
      headline1: 'Колко клиенти си загубил',
      headline2: 'защото не си отговорил',
      headline3: 'достатъчно бързо?',
      cta: 'Разгледай Neo',
      learnMore: 'Научи повече'
    },

    // Product Menu
    productMenu: {
      title: 'Продукти',
      neo: {
        name: 'Neo',
        tagline: 'AI Chatbot за съобщения',
        new: 'Live'
      },
      aria: {
        name: 'Aria',
        tagline: 'Гласов AI асистент за обаждания',
        comingSoon: 'В Бета'
      },
      nova: {
        name: 'Nova',
        tagline: 'Housekeeping AI',
        comingSoon: 'Очаквайте'
      }
    },

    // Early Access (замества Pilot)
    earlyAccess: {
      title: 'Ранен достъп',
      subtitle: 'Първите 10 компании в България',
      description: 'Получи ранен достъп до Neo. Ограничени места.',
      spotsLeft: 'останали места',
      spotsTotal: 'от 10',
      form: {
        name: 'Име',
        email: 'Email',
        phone: 'Телефон',
        company: 'Компания',
        businessType: 'Тип бизнес',
        submit: 'Кандидатствай',
        submitting: 'Изпращане...',
        success: 'Благодаря! Ще се свържем до 24 часа.'
      }
    },

    // Common
    common: {
      learnMore: 'Научи повече',
      buyNow: 'Купи сега',
      tryFree: 'Започни сега',
      from: 'от',
      perMonth: '/месец',
      new: 'Ново',
      comingSoon: 'Очаквайте'
    },

    // Pricing (site-wide)
    pricing: {
      currency: '€',
      base: {
        name: 'Neo Starter',
        price: 297,
        period: '/месец',
        description: 'За малки бизнеси, започващи с AI автоматизация',
        features: [
          'AI чат на сайта ви',
          'WhatsApp + Messenger',
          'Неограничени разговори',
          'Български + английски',
          'Записване на часове',
          'FAQ автоматизация',
          'Email поддръжка (48ч)'
        ]
      },
      addons: {
        title: 'Добавки',
        subtitle: 'Разшири Neo с точно това което ти трябва',
        categories: [
          {
            id: 'channels',
            name: 'Канали',
            items: [
              { id: 'whatsapp', name: 'WhatsApp Business', price: 40, popular: true },
              { id: 'facebook', name: 'Facebook Messenger', price: 25 },
              { id: 'instagram', name: 'Instagram DM', price: 25 },
              { id: 'telegram', name: 'Telegram', price: 20 }
            ]
          },
          {
            id: 'volume',
            name: 'Обем',
            items: [
              { id: 'conv1000', name: '1,000 разговора', price: 30, note: 'Вместо 500' },
              { id: 'conv2500', name: '2,500 разговора', price: 60 },
              { id: 'unlimited', name: 'Неограничено', price: 120, popular: true }
            ]
          },
          {
            id: 'languages',
            name: 'Езици',
            items: [
              { id: 'lang_de', name: 'Немски', price: 25 },
              { id: 'lang_ru', name: 'Руски', price: 25 },
              { id: 'lang_fr', name: 'Френски', price: 25 },
              { id: 'lang_all', name: 'Всички езици (12+)', price: 80, popular: true }
            ]
          },
          {
            id: 'integrations',
            name: 'Интеграции',
            items: [
              { id: 'crm', name: 'CRM (HubSpot/Pipedrive)', price: 50, popular: true },
              { id: 'calendar', name: 'Календар (Calendly/Cal)', price: 30 },
              { id: 'email', name: 'Email автоматизация', price: 40 },
              { id: 'custom', name: 'Custom API', price: 80 }
            ]
          },
          {
            id: 'premium',
            name: 'Premium',
            items: [
              { id: 'voice', name: 'Voice AI (говорящ бот)', price: 100 },
              { id: 'priority', name: 'Priority поддръжка (<2h)', price: 60 },
              { id: 'training', name: 'Custom AI обучение', price: 150 },
              { id: 'whitelabel', name: 'White-label (без брандинг)', price: 200 }
            ]
          }
        ]
      },
      packages: {
        title: 'Пакети',
        subtitle: 'Изберете плана, който подхожда на бизнеса ви',
        items: [
          {
            id: 'starter',
            name: 'Starter',
            description: 'За малки бизнеси, 1 локация',
            price: 297,
            savings: 0,
            features: [
              'AI чат на сайта',
              'WhatsApp интеграция',
              'Записване на часове',
              'FAQ автоматизация',
              'Неограничени разговори',
              'Базова аналитика'
            ],
            badge: null
          },
          {
            id: 'growth',
            name: 'Growth',
            description: 'Растящи бизнеси, до 3 локации',
            price: 497,
            savings: 0,
            features: [
              'Всичко от Starter',
              'Гласов AI (Aria Бета)',
              'CRM интеграция',
              'Автоматични follow-ups',
              'Приоритетна поддръжка',
              'Месечен преглед на резултатите'
            ],
            badge: 'НАЙ-ПОПУЛЯРЕН',
            highlighted: true
          },
          {
            id: 'enterprise',
            name: 'Enterprise',
            description: 'Вериги, франчайзи, големи операции',
            price: 0,
            savings: 0,
            features: [
              'Всичко от Growth',
              'Custom AI обучение',
              'Персонален акаунт мениджър',
              'Custom интеграции',
              'SLA гаранция',
              'White-label опция'
            ],
            badge: null
          }
        ]
      },
      calculator: {
        title: 'Изчисли твоята цена',
        subtitle: 'Построй перфектния Neo за твоя бизнес',
        baseLabel: 'База',
        totalLabel: 'Обща цена',
        perMonth: '/месец',
        perYear: '/година',
        annualToggle: 'Годишно (2 месеца отстъпка)',
        cta: 'Започни с тази конфигурация'
      }
    },

    // Neo Product Page
    neo: {
      hero: {
        eyebrow: '💬 AI Chatbot за съобщения',
        headline: 'Neo: AI Chatbot',
        headlineAccent: 'за съобщения',
        subheadline: 'Автоматични отговори по WhatsApp, Messenger, Instagram. Без човешка намеса. 24/7.',
        cta: 'Започни сега',
        watchDemo: 'Пробвай demo'
      },

      stats: [
        { value: '<1s', label: 'Време за отговор' },
        { value: '24/7', label: 'Винаги наличен' },
        { value: '12+', label: 'Езика' },
        { value: '0лв', label: 'Setup такса' }
      ],

      scenarios: {
        booking: {
          title: 'Резервация в реално време',
          description: 'Neo разбира контекста, проверява наличността и резервира веднага.',
          messages: [
            { from: 'customer', text: 'Имате ли свободна двойна стая за 12-14 юни?', delay: 0 },
            { from: 'neo', text: 'Да, имаме налична делукс двойна стая с изглед към планината.', delay: 1500 },
            { from: 'neo', text: '180 лв на нощувка. Да запиша ли резервацията?', delay: 2500 },
            { from: 'customer', text: 'Да, моля', delay: 4000 },
            { from: 'neo', text: '✓ Резервацията е записана! Изпратих потвърждение на вашия email.', delay: 5000 }
          ]
        },

        multilingual: {
          title: 'Говори на всеки език',
          description: 'Един и същ въпрос, четири различни езика. Neo разбира всички.',
          conversations: [
            { lang: 'BG', flag: '🇧🇬', question: 'Колко струва една нощувка?', answer: '180 лв на нощувка' },
            { lang: 'EN', flag: '🇬🇧', question: 'How much is one night?', answer: '€90 per night' },
            { lang: 'DE', flag: '🇩🇪', question: 'Was kostet eine Übernachtung?', answer: '€90 pro Nacht' },
            { lang: 'RU', flag: '🇷🇺', question: 'Сколько стоит одна ночь?', answer: '180 лв за ночь' }
          ]
        },

        integration: {
          title: 'Интегрира се с всичко',
          description: 'Един разговор → множество действия автоматично.',
          flow: [
            { step: 1, action: 'Клиент пита', icon: '💬' },
            { step: 2, action: 'Neo отговаря', icon: '🤖' },
            { step: 3, action: 'Запис в CRM', icon: '📊' },
            { step: 4, action: 'Email потвърждение', icon: '📧' },
            { step: 5, action: 'Календар updated', icon: '📅' }
          ]
        }
      },

      features: {
        title: 'Всичко което Neo прави',
        items: [
          {
            icon: '🧠',
            title: 'Разбира контекст',
            description: 'Помни предишни въпроси и води естествен разговор'
          },
          {
            icon: '⚡',
            title: 'Отговаря мигновено',
            description: 'Средно време за отговор: под 1 секунда'
          },
          {
            icon: '🌍',
            title: 'Многоезичен',
            description: 'Автоматично разпознава езика и отговаря на същия'
          },
          {
            icon: '🔗',
            title: 'Навсякъде',
            description: 'WhatsApp, сайт, Facebook, Instagram, Email'
          },
          {
            icon: '🤝',
            title: 'Handoff на човек',
            description: 'При сложни случаи предава с пълен контекст'
          },
          {
            icon: '📈',
            title: 'Учи се непрекъснато',
            description: 'Всеки разговор го прави по-добър'
          }
        ]
      },

      pricing: {
        title: 'Прозрачно ценообразуване',
        base: {
          name: 'Neo Starter',
          price: 297,
          period: '/месец',
          currency: '€',
          features: [
            'AI чат на сайта ви',
            'WhatsApp + Messenger',
            'Неограничени разговори',
            'Български + английски',
            'Записване на часове',
            'FAQ автоматизация',
            'Email поддръжка (48ч)'
          ]
        },
        addons: 'Добави функции по нужда',
        cta: 'Виж всички опции'
      },

      cta: {
        title: 'Готов ли си да опиташ Neo?',
        subtitle: 'Setup за 2-3 дни. Поддръжка на български.',
        button: 'Започни сега',
        note: 'Setup за 2-3 дни. Поддръжка на български.'
      }
    },

    footer: {
      tagline: 'AI инструменти за по-умен бизнес',

      cta: {
        title: 'Готов ли си да опиташ Neo?',
        subtitle: 'Запази 20-минутен demo call',
        button: 'Запази demo',
        calendlyUrl: 'https://calendly.com/valentinantov/neo-demo-call'
      },

      contact: {
        title: 'Контакти',
        email: 'info@nextbot.me',
        phone: '+359 894 288 119',
        address: 'София, България',
        businessHours: 'Пон-Пет: 9:00-18:00',
        responseTime: 'Отговаряме до 24 часа'
      },

      products: {
        title: 'Продукти',
        items: [
          { name: 'Neo', href: '/neo', description: 'AI Chatbot за съобщения' },
          { name: 'Aria', href: '/aria', description: 'Гласов AI асистент (скоро)' },
          { name: 'Демо', href: '/demo', description: 'Виж в действие' },
          { name: 'Ценообразуване', href: '/neo#pricing', description: 'От €297/месец' }
        ]
      },

      company: {
        title: 'Компания',
        items: [
          { name: 'За нас', href: '/about' },
          { name: 'Блог', href: '#', disabled: true, badge: 'Скоро' },
          { name: 'Кариери', href: '#', disabled: true, badge: 'Скоро' }
        ]
      },

      resources: {
        title: 'Ресурси',
        items: [
          { name: 'Научи повече', href: '/learn-more' },
          { name: 'Документация', href: '/documentation' },
          { name: 'API', href: '/api-docs' },
          { name: 'Помощен център', href: '#', disabled: true, badge: 'Скоро' },
          { name: 'Статус на системата', href: '#', disabled: true, badge: 'Скоро' }
        ]
      },

      legal: {
        title: 'Правна информация',
        items: [
          { name: 'Условия и поверителност', href: '/legal' },
          { name: 'Бисквитки', href: '/legal?tab=cookies' },
          { name: 'GDPR', href: '/legal?tab=gdpr' }
        ]
      },

      social: {
        title: 'Последвай ни',
        items: [
          {
            name: 'LinkedIn',
            href: 'https://linkedin.com/company/nextbot',
            icon: 'linkedin',
            followers: '500+ последователи'
          },
          {
            name: 'Twitter',
            href: 'https://twitter.com/nextbot',
            icon: 'twitter',
            followers: '@nextbot_ai'
          }
        ]
      },

      newsletter: {
        title: 'Абонирай се за новини',
        description: 'Месечни insights за AI в българския бизнес',
        placeholder: 'Твоят email',
        button: 'Абонирай се',
        privacy: 'Няма да споделяме твоя email. Можеш да се отпишеш по всяко време.',
        success: 'Благодаря! Проверете email за потвърждение.'
      },

      certifications: {
        title: 'Сертификати & Съответствия',
        items: [
          { name: 'GDPR Compliant', icon: '🔒' },
          { name: 'ISO 27001', icon: '✓' },
          { name: 'SOC 2 Type II', icon: '✓' }
        ]
      },

      stats: {
        customers: '100+',
        customersLabel: 'доволни клиента',
        messages: '1M+',
        messagesLabel: 'обработени съобщения',
        uptime: '99.9%',
        uptimeLabel: 'uptime'
      },

      copyright: '© 2026 Nextbot EOOD. Всички права запазени.',
      bulstat: 'ЕИК: 207218192',
      vat: 'ДДС: BG207218192',
      madeWith: 'Направено с',
      madeIn: 'в България'
    }
  },

}

export function t(lang: Language, key: string): string {
  const keys = key.split('.')
  let value: any = translations[lang]

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}
