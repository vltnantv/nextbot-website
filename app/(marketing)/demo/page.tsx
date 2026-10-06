import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { TryIt } from '@/components/home/TryIt'

// copy/UNIQUE.md „Демо“: the live chat with tabs by industry. The h1 is the one from UNIQUE.md.

export const metadata: Metadata = pageMeta({ title: 'Демо | NextBot', description: 'Изберете бранш и пишете. Отговаря истинският NEO.', path: '/demo' })

export default function DemoPage() {
  return <TryIt page />
}
