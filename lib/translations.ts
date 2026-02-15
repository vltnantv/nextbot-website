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
        comingSoon: 'Скоро'
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
        name: 'Neo Base',
        price: 59,
        period: '/месец',
        description: 'Всичко необходимо за да започнеш',
        features: [
          'AI чат на твоя сайт',
          'До 500 разговора/месец',
          'Български + Английски',
          'Email поддръжка (48h)',
          'Базова аналитика'
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
        title: 'Бизнес пакети',
        subtitle: 'Популярни комбинации за различни бизнеси',
        items: [
          {
            id: 'starter',
            name: 'Starter Pack',
            description: 'За малкия бизнес',
            price: 59,
            savings: 0,
            features: [
              'Neo Base',
              'До 500 разговора',
              'БГ + EN',
              'Email поддръжка'
            ],
            badge: null
          },
          {
            id: 'business',
            name: 'Business Pack',
            description: 'Най-популярен избор',
            price: 119,
            originalPrice: 149,
            savings: 30,
            features: [
              'Neo Base',
              'WhatsApp Business',
              '1,000 разговора',
              'CRM интеграция',
              'БГ + EN + DE',
              'Priority поддръжка'
            ],
            badge: 'Популярен',
            highlighted: true
          },
          {
            id: 'enterprise',
            name: 'Enterprise Pack',
            description: 'За сериозния бизнес',
            price: 299,
            originalPrice: 399,
            savings: 100,
            features: [
              'Neo Base',
              'Всички канали',
              'Неограничени разговора',
              'Всички интеграции',
              'Всички езици',
              'Voice AI',
              'Priority поддръжка',
              'Custom обучение'
            ],
            badge: 'Най-добра стойност'
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
          name: 'Neo Base',
          price: 59,
          period: '/месец',
          currency: '€',
          features: [
            'AI чат на твоя сайт',
            'До 500 разговора/месец',
            'Български + Английски',
            'Email поддръжка (48h)'
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
          { name: 'Ценообразуване', href: '/neo#pricing', description: 'От €59/месец' }
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

  en: {
    nav: {
      products: 'Products',
      neo: 'Neo',
      demo: 'Demo',
      earlyAccess: 'Early Access',
      about: 'About',
      store: 'Store',
      mac: 'Mac',
      ipad: 'iPad',
      iphone: 'iPhone',
      watch: 'Watch',
      support: 'Support'
    },

    hero: {
      headline1: 'How many customers',
      headline2: 'have you lost because',
      headline3: "you didn't reply fast enough?",
      cta: 'Explore Neo',
      learnMore: 'Learn more'
    },

    productMenu: {
      title: 'Products',
      neo: {
        name: 'Neo',
        tagline: 'AI Chatbot for messages',
        new: 'Live'
      },
      aria: {
        name: 'Aria',
        tagline: 'Voice AI assistant for calls',
        comingSoon: 'Soon'
      },
      nova: {
        name: 'Nova',
        tagline: 'Housekeeping AI',
        comingSoon: 'Coming soon'
      }
    },

    earlyAccess: {
      title: 'Early Access',
      subtitle: 'First 10 companies in Bulgaria',
      description: 'Get full access to Neo. Limited spots available.',
      spotsLeft: 'spots left',
      spotsTotal: 'of 10',
      form: {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        company: 'Company',
        businessType: 'Business type',
        submit: 'Apply',
        submitting: 'Submitting...',
        success: "Thank you! We'll contact you within 24 hours."
      }
    },

    common: {
      learnMore: 'Learn more',
      buyNow: 'Buy now',
      tryFree: 'Get started',
      from: 'from',
      perMonth: '/month',
      new: 'New',
      comingSoon: 'Coming soon'
    },

    // Pricing (site-wide)
    pricing: {
      currency: '€',
      base: {
        name: 'Neo Base',
        price: 59,
        period: '/month',
        description: 'Everything you need to get started',
        features: [
          'AI chat on your website',
          'Up to 500 conversations/month',
          'Bulgarian + English',
          'Email support (48h)',
          'Basic analytics'
        ]
      },
      addons: {
        title: 'Add-ons',
        subtitle: 'Extend Neo with exactly what you need',
        categories: [
          {
            id: 'channels',
            name: 'Channels',
            items: [
              { id: 'whatsapp', name: 'WhatsApp Business', price: 40, popular: true },
              { id: 'facebook', name: 'Facebook Messenger', price: 25 },
              { id: 'instagram', name: 'Instagram DM', price: 25 },
              { id: 'telegram', name: 'Telegram', price: 20 }
            ]
          },
          {
            id: 'volume',
            name: 'Volume',
            items: [
              { id: 'conv1000', name: '1,000 conversations', price: 30, note: 'Instead of 500' },
              { id: 'conv2500', name: '2,500 conversations', price: 60 },
              { id: 'unlimited', name: 'Unlimited', price: 120, popular: true }
            ]
          },
          {
            id: 'languages',
            name: 'Languages',
            items: [
              { id: 'lang_de', name: 'German', price: 25 },
              { id: 'lang_ru', name: 'Russian', price: 25 },
              { id: 'lang_fr', name: 'French', price: 25 },
              { id: 'lang_all', name: 'All languages (12+)', price: 80, popular: true }
            ]
          },
          {
            id: 'integrations',
            name: 'Integrations',
            items: [
              { id: 'crm', name: 'CRM (HubSpot/Pipedrive)', price: 50, popular: true },
              { id: 'calendar', name: 'Calendar (Calendly/Cal)', price: 30 },
              { id: 'email', name: 'Email automation', price: 40 },
              { id: 'custom', name: 'Custom API', price: 80 }
            ]
          },
          {
            id: 'premium',
            name: 'Premium',
            items: [
              { id: 'voice', name: 'Voice AI (speaking bot)', price: 100 },
              { id: 'priority', name: 'Priority support (<2h)', price: 60 },
              { id: 'training', name: 'Custom AI training', price: 150 },
              { id: 'whitelabel', name: 'White-label (no branding)', price: 200 }
            ]
          }
        ]
      },
      packages: {
        title: 'Business Packages',
        subtitle: 'Popular combinations for different businesses',
        items: [
          {
            id: 'starter',
            name: 'Starter Pack',
            description: 'For small businesses',
            price: 59,
            savings: 0,
            features: [
              'Neo Base',
              'Up to 500 conversations',
              'BG + EN',
              'Email support'
            ],
            badge: null
          },
          {
            id: 'business',
            name: 'Business Pack',
            description: 'Most popular choice',
            price: 119,
            originalPrice: 149,
            savings: 30,
            features: [
              'Neo Base',
              'WhatsApp Business',
              '1,000 conversations',
              'CRM integration',
              'BG + EN + DE',
              'Priority support'
            ],
            badge: 'Popular',
            highlighted: true
          },
          {
            id: 'enterprise',
            name: 'Enterprise Pack',
            description: 'For serious business',
            price: 299,
            originalPrice: 399,
            savings: 100,
            features: [
              'Neo Base',
              'All channels',
              'Unlimited conversations',
              'All integrations',
              'All languages',
              'Voice AI',
              'Priority support',
              'Custom training'
            ],
            badge: 'Best value'
          }
        ]
      },
      calculator: {
        title: 'Calculate your price',
        subtitle: 'Build the perfect Neo for your business',
        baseLabel: 'Base',
        totalLabel: 'Total price',
        perMonth: '/month',
        perYear: '/year',
        annualToggle: 'Annual (2 months discount)',
        cta: 'Start with this configuration'
      }
    },

    // Neo Product Page
    neo: {
      hero: {
        eyebrow: '💬 AI Chatbot for messages',
        headline: 'Neo: AI Chatbot',
        headlineAccent: 'for messages',
        subheadline: 'Automatic replies on WhatsApp, Messenger, Instagram. No human needed. 24/7.',
        cta: 'Get started',
        watchDemo: 'Try demo'
      },

      stats: [
        { value: '<1s', label: 'Response time' },
        { value: '24/7', label: 'Always available' },
        { value: '12+', label: 'Languages' },
        { value: '$0', label: 'Setup fee' }
      ],

      scenarios: {
        booking: {
          title: 'Real-time booking',
          description: 'Neo understands context, checks availability and books instantly.',
          messages: [
            { from: 'customer', text: 'Do you have a double room available for June 12-14?', delay: 0 },
            { from: 'neo', text: 'Yes, we have a deluxe double room with mountain view available.', delay: 1500 },
            { from: 'neo', text: '$90 per night. Should I book the reservation?', delay: 2500 },
            { from: 'customer', text: 'Yes, please', delay: 4000 },
            { from: 'neo', text: '✓ Reservation confirmed! I sent a confirmation to your email.', delay: 5000 }
          ]
        },

        multilingual: {
          title: 'Speaks every language',
          description: 'Same question, four different languages. Neo understands them all.',
          conversations: [
            { lang: 'BG', flag: '🇧🇬', question: 'Колко струва една нощувка?', answer: '180 лв на нощувка' },
            { lang: 'EN', flag: '🇬🇧', question: 'How much is one night?', answer: '€90 per night' },
            { lang: 'DE', flag: '🇩🇪', question: 'Was kostet eine Übernachtung?', answer: '€90 pro Nacht' },
            { lang: 'RU', flag: '🇷🇺', question: 'Сколько стоит одна ночь?', answer: '180 лв за ночь' }
          ]
        },

        integration: {
          title: 'Integrates with everything',
          description: 'One conversation → multiple actions automatically.',
          flow: [
            { step: 1, action: 'Customer asks', icon: '💬' },
            { step: 2, action: 'Neo responds', icon: '🤖' },
            { step: 3, action: 'CRM updated', icon: '📊' },
            { step: 4, action: 'Email sent', icon: '📧' },
            { step: 5, action: 'Calendar synced', icon: '📅' }
          ]
        }
      },

      features: {
        title: 'Everything Neo does',
        items: [
          {
            icon: '🧠',
            title: 'Understands context',
            description: 'Remembers previous questions and has natural conversations'
          },
          {
            icon: '⚡',
            title: 'Instant responses',
            description: 'Average response time: under 1 second'
          },
          {
            icon: '🌍',
            title: 'Multilingual',
            description: 'Automatically detects language and responds in the same'
          },
          {
            icon: '🔗',
            title: 'Everywhere',
            description: 'WhatsApp, website, Facebook, Instagram, Email'
          },
          {
            icon: '🤝',
            title: 'Human handoff',
            description: 'Transfers complex cases with full context'
          },
          {
            icon: '📈',
            title: 'Learns continuously',
            description: 'Every conversation makes it better'
          }
        ]
      },

      pricing: {
        title: 'Transparent pricing',
        base: {
          name: 'Neo Base',
          price: 59,
          period: '/month',
          currency: '€',
          features: [
            'AI chat on your website',
            'Up to 500 conversations/month',
            'Bulgarian + English',
            'Email support (48h)'
          ]
        },
        addons: 'Add features as needed',
        cta: 'See all options'
      },

      cta: {
        title: 'Ready to try Neo?',
        subtitle: 'Setup in 2-3 days. Support in Bulgarian.',
        button: 'Start now',
        note: 'Setup in 2-3 days. Support in Bulgarian.'
      }
    },

    footer: {
      tagline: 'AI tools for smarter business',

      cta: {
        title: 'Ready to try Neo?',
        subtitle: 'Book a 20-minute demo call',
        button: 'Book demo',
        calendlyUrl: 'https://calendly.com/valentinantov/neo-demo-call'
      },

      contact: {
        title: 'Contact',
        email: 'info@nextbot.me',
        phone: '+359 894 288 119',
        address: 'Sofia, Bulgaria',
        businessHours: 'Mon-Fri: 9:00-18:00',
        responseTime: 'We respond within 24 hours'
      },

      products: {
        title: 'Products',
        items: [
          { name: 'Neo', href: '/neo', description: 'AI Chatbot for messages' },
          { name: 'Aria', href: '/aria', description: 'Voice AI Assistant (coming soon)' },
          { name: 'Demo', href: '/demo', description: 'See it in action' },
          { name: 'Pricing', href: '/neo#pricing', description: 'From €59/mo' }
        ]
      },

      company: {
        title: 'Company',
        items: [
          { name: 'About', href: '/about' },
          { name: 'Blog', href: '#', disabled: true, badge: 'Soon' },
          { name: 'Careers', href: '#', disabled: true, badge: 'Soon' }
        ]
      },

      resources: {
        title: 'Resources',
        items: [
          { name: 'Learn More', href: '/learn-more' },
          { name: 'Documentation', href: '/documentation' },
          { name: 'API', href: '/api-docs' },
          { name: 'Help Center', href: '#', disabled: true, badge: 'Soon' },
          { name: 'System Status', href: '#', disabled: true, badge: 'Soon' }
        ]
      },

      legal: {
        title: 'Legal',
        items: [
          { name: 'Terms & Privacy', href: '/legal' },
          { name: 'Cookies', href: '/legal?tab=cookies' },
          { name: 'GDPR', href: '/legal?tab=gdpr' }
        ]
      },

      social: {
        title: 'Follow us',
        items: [
          {
            name: 'LinkedIn',
            href: 'https://linkedin.com/company/nextbot',
            icon: 'linkedin',
            followers: '500+ followers'
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
        title: 'Subscribe to newsletter',
        description: 'Monthly insights on AI in Bulgarian business',
        placeholder: 'Your email',
        button: 'Subscribe',
        privacy: "We won't share your email. Unsubscribe anytime.",
        success: 'Thanks! Check your email for confirmation.'
      },

      certifications: {
        title: 'Certifications & Compliance',
        items: [
          { name: 'GDPR Compliant', icon: '🔒' },
          { name: 'ISO 27001', icon: '✓' },
          { name: 'SOC 2 Type II', icon: '✓' }
        ]
      },

      stats: {
        customers: '100+',
        customersLabel: 'happy customers',
        messages: '1M+',
        messagesLabel: 'messages processed',
        uptime: '99.9%',
        uptimeLabel: 'uptime'
      },

      copyright: '© 2026 Nextbot EOOD. All rights reserved.',
      bulstat: 'UIC: 207218192',
      vat: 'VAT: BG207218192',
      madeWith: 'Made with',
      madeIn: 'in Bulgaria'
    }
  }
}

export function t(lang: Language, key: string): string {
  const keys = key.split('.')
  let value: any = translations[lang]

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}
