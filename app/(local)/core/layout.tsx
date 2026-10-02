import type { Metadata } from 'next'
import { Golos_Text } from 'next/font/google'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { CrmShell } from '@/components/crm/CrmShell'
import { isLocalRequest } from '@/lib/local-only'
import './crm.css'

// Local CORE app (/core/dnes, /core/tablo, /core/lead/…, /core/vnos). Only `npm run dev` on localhost:
// middleware.ts answers 404 before anything is sent; this check is the second lock. Not in any menu.
// /core (the public product page) is a different route and is not affected.

const golos = Golos_Text({ subsets: ['latin', 'cyrillic'], weight: ['400', '500', '600'], variable: '--f-crm', display: 'swap' })

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { default: 'CORE', template: '%s · CORE' },
  robots: { index: false, follow: false },
}

export default function CoreAppLayout({ children }: { children: React.ReactNode }) {
  if (!isLocalRequest(headers().get('host'))) notFound()
  return (
    <div className={`crm ${golos.variable}`}>
      <CrmShell>{children}</CrmShell>
    </div>
  )
}
