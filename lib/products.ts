export const PRODUCTS = {
  neo: {
    name: 'Neo',
    tagline: {
      bg: 'AI Chatbot за съобщения',
      en: 'AI Chatbot for messages'
    },
    description: {
      bg: 'Отговаря на клиенти по WhatsApp, Messenger, Instagram автоматично. 24/7 текстова поддръжка.',
      en: 'Responds to customers on WhatsApp, Messenger, Instagram automatically. 24/7 text support.'
    },
    channels: ['WhatsApp', 'Messenger', 'Instagram', 'Web Chat'],
    icon: '💬',
    color: 'blue',
    status: 'live' as const
  },

  aria: {
    name: 'Aria',
    tagline: {
      bg: 'Гласов AI асистент',
      en: 'Voice AI Assistant'
    },
    description: {
      bg: 'Отговаря на телефонни обаждания автоматично. Естествен глас, разбира български, записва разговори.',
      en: 'Answers phone calls automatically. Natural voice, understands Bulgarian, records conversations.'
    },
    channels: ['Phone Calls', 'IVR', 'Call Center'],
    icon: '📞',
    color: 'purple',
    status: 'coming-soon' as const
  }
}
