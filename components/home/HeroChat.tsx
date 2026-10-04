'use client'

import { ChatWidget } from '@/components/demo/ChatWidget'

// The real NEO chat in the hero (DESIGN-REFRESH.md §1): the same widget and /api/chat as /demo.
// In a plain window frame: 1 px line, 12 px corners, almost no shadow.

const BUSINESS = 'Дентален кабинет „Усмивка“'

export function HeroChat() {
  return (
    <figure className="m-0 overflow-hidden rounded-[12px] border border-line bg-white" aria-label="Пробвайте NEO">
      <ChatWidget
        variant="inline"
        industry="dental"
        tone="friendly"
        language="bg"
        botName="NEO"
        businessName={BUSINESS}
        welcomeMessage={`Здравейте! Аз съм NEO от ${BUSINESS}. С какво мога да помогна?`}
        quickActions={['Здравейте, има ли свободен час утре?', 'Колко струва почистване на зъби?']}
        accentColor="#1F1D1A"
      />
    </figure>
  )
}
