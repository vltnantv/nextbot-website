import type { Metadata } from 'next'
import { Board } from '@/components/crm/Board'

export const metadata: Metadata = { title: 'Табло' }

export default function BoardPage() {
  return <Board />
}
