import type { Metadata } from 'next'
import { LeadView } from '@/components/crm/LeadView'

export const metadata: Metadata = { title: 'Лийд' }

export default function LeadPage({ params }: { params: { id: string } }) {
  return <LeadView id={params.id} />
}
