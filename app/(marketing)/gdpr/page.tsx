import { redirect } from 'next/navigation'

export default function GDPRPage() {
  redirect('/legal?tab=gdpr')
}
