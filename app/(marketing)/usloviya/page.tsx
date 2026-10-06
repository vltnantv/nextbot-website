import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { LegalStub } from '@/components/page/LegalStub'

// Written by a lawyer, not here. No legal text until then.
export const metadata: Metadata = pageMeta({ title: 'Общи условия | NextBot', path: '/usloviya', noindex: true })

export default function TermsPage() {
  return <LegalStub title="Общи условия" />
}
