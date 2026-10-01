import type { Metadata } from 'next'
import { LegalStub } from '@/components/page/LegalStub'

// Written by a lawyer, not here. No legal text until then.
export const metadata: Metadata = {
  title: 'Политика за поверителност',
  robots: { index: false },
}

export default function PrivacyPage() {
  return <LegalStub title="Политика за поверителност" />
}
