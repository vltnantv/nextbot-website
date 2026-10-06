import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { LegalStub } from '@/components/page/LegalStub'

// Written by a lawyer, not here. No legal text until then.
export const metadata: Metadata = pageMeta({ title: 'Политика за поверителност | NextBot', path: '/poveritelnost', noindex: true })

export default function PrivacyPage() {
  return <LegalStub title="Политика за поверителност" />
}
