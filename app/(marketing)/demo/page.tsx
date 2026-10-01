import type { Metadata } from 'next'
import { TryIt } from '@/components/home/TryIt'

// copy/UNIQUE.md „Демо“: the live chat with tabs by industry. The h1 is the one from UNIQUE.md.

export const metadata: Metadata = {
  title: 'Демо',
  description: 'Изберете бранш и пишете. Отговаря истинският NEO.',
}

export default function DemoPage() {
  return <TryIt page />
}
