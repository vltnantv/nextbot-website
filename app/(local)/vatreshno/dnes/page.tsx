import type { Metadata } from 'next'
import { Today } from '@/components/crm/Today'

export const metadata: Metadata = { title: 'Днес' }

export default function TodayPage() {
  return <Today />
}
