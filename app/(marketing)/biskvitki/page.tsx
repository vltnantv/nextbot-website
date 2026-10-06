import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { LegalStub } from '@/components/page/LegalStub'

// Written by a lawyer, not here. No legal text until then.
export const metadata: Metadata = pageMeta({ title: 'Бисквитки | NextBot', path: '/biskvitki', noindex: true })

export default function CookiesPage() {
  return <LegalStub title="Бисквитки" />
}
