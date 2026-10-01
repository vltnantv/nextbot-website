import type { Metadata } from 'next'
import { LegalStub } from '@/components/page/LegalStub'

// Written by a lawyer, not here. No legal text until then.
export const metadata: Metadata = {
  title: 'Общи условия',
  robots: { index: false },
}

export default function TermsPage() {
  return <LegalStub title="Общи условия" />
}
