import { NeoHero } from '@/components/sections/neo/NeoHero'
import { FeaturesCarousel } from '@/components/sections/neo/FeaturesCarousel'
import { HowItWorks } from '@/components/sections/neo/HowItWorks'
import { SimplePricing } from '@/components/sections/SimplePricing'

export const metadata = {
  title: 'Neo - AI Chatbot за Съобщения | Nextbot',
  description: 'Neo AI chatbot отговаря на клиенти по WhatsApp, Messenger и Instagram автоматично. 24/7 текстова поддръжка. От €59/месец.',
  keywords: 'AI chatbot, WhatsApp bot, автоматични отговори, чатбот България'
}

export default function NeoPage() {
  return (
    <main>
      <NeoHero />
      <FeaturesCarousel />
      <HowItWorks />
      <SimplePricing />

    </main>
  )
}
