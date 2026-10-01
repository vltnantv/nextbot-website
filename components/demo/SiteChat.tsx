'use client'

import { usePathname } from 'next/navigation'
import { ChatWidget } from '@/components/demo/ChatWidget'

/**
 * The floating NEO chat on marketing pages. Not on the homepage: there the real chat is built
 * into the „Пробвайте сами“ section (design/homepage-mockup.html has no floating launcher).
 */
export function SiteChat() {
  const pathname = usePathname()
  // pages that already show the chat inline
  if (pathname === '/' || pathname === '/demo') return null
  return (
    <ChatWidget
      industry="hotel"
      tone="professional"
      language="bg"
      botName="NEO"
      welcomeMessage="Здравейте! Аз съм NEO, асистентът на NextBot. Питайте ме как работим или ме пробвайте така, както би ви писал клиент."
      quickActions={['Как работи NextBot?', 'Пробвай като хотел', 'Запазете разговор']}
      accentColor="#1F1D1A"
    />
  )
}
