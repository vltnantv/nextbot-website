export const PRICING = {
  starter: {
    name: 'Starter',
    price: 59,
    currency: '€',
    period: 'month',
    messages: 500,
    channels: 1,
    languages: 2,
    features: {
      faq: '15-20 questions',
      calendar: false,
      email: false,
      crm: false,
      analytics: 'basic',
      support: '48h email',
      branding: false,
      whitelabel: false
    },
    overage: 0.08,
    annual: 590,
    annualSavings: 118
  },

  pro: {
    name: 'Pro',
    price: 119,
    currency: '€',
    period: 'month',
    messages: 2000,
    channels: 3,
    languages: 5,
    features: {
      faq: 'unlimited',
      calendar: true,
      email: true,
      crm: 'basic',
      analytics: 'advanced',
      support: '24h priority',
      branding: true,
      whitelabel: false
    },
    overage: 0.05,
    annual: 1190,
    annualSavings: 238,
    popular: true
  },

  enterprise: {
    name: 'Enterprise',
    price: 299,
    currency: '€',
    period: 'month',
    messages: 10000,
    channels: 'all' as const,
    languages: '12+',
    features: {
      faq: 'unlimited',
      calendar: true,
      email: true,
      crm: 'premium',
      analytics: 'advanced',
      support: 'phone',
      branding: true,
      whitelabel: true
    },
    overage: 0.02,
    annual: 2990,
    annualSavings: 598
  }
}

export const ADDONS = {
  extraMessages500: { name: '500 съобщения', price: 20 },
  extraMessages1000: { name: '1,000 съобщения', price: 35 },
  extraChannel: { name: 'Допълнителен канал', price: 25 },
  dedicatedSupport: { name: 'Dedicated support', price: 99 },
  customIntegration: { name: 'Custom интеграция', price: 199 }
}
