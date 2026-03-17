import { Metadata } from 'next'
import { AriaComingSoon } from '@/components/sections/aria/AriaComingSoon'

export const metadata: Metadata = {
  title: 'Aria - Гласов AI Асистент (Coming Soon) | Nextbot',
  description: 'Aria отговаря на телефонни обаждания автоматично с естествен глас. Разбира български. Скоро.',
  keywords: 'voice AI, гласов асистент, телефонен бот, AI обаждания'
}

export default function AriaPage() {
  return <AriaComingSoon />
}
