import { NeoHero } from '@/components/sections/neo/NeoHero'
import { NeoCapabilities } from '@/components/sections/neo/NeoCapabilities'
import { NeoChannels } from '@/components/sections/neo/NeoChannels'
import { NeoDemo } from '@/components/sections/neo/NeoDemo'
import { NeoHowItWorks } from '@/components/sections/neo/HowItWorks'
import { NeoPricing } from '@/components/sections/neo/NeoPricing'
import { NeoCTA } from '@/components/sections/neo/NeoCTA'

export const metadata = {
  title: 'Neo — AI Sales & Support Assistant | NextBot',
  description: 'Neo is an AI-powered sales and support assistant that responds to leads instantly across chat, WhatsApp, and messaging. Qualifies leads, books meetings, and syncs with your CRM. 24/7.',
  keywords: 'AI chatbot, AI sales assistant, WhatsApp automation, lead qualification, customer support AI',
}

export default function NeoPage() {
  return (
    <>
      <NeoHero />
      <NeoCapabilities />
      <NeoChannels />
      <NeoDemo />
      <NeoHowItWorks />
      <NeoPricing />
      <NeoCTA />
    </>
  )
}
