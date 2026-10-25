import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { Playground } from '@/components/home/Playground'

// The playground from the homepage as its own page (REBUILD-PLAN.md §5.4): NEO, CORE and ECHO, with an h1.

export const metadata: Metadata = pageMeta({ title: 'Демо | NextBot', description: 'Изберете бранш и пишете. Отговаря истинският NEO.', path: '/demo' })

export default function DemoPage() {
  return <Playground page />
}
