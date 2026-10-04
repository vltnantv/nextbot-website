import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CrmShell } from '@/components/crm/CrmShell'
import { coreEnabled } from '@/lib/local-only'
import './crm.css'

// Internal CORE app (/vatreshno/dnes, /vatreshno/tablo, /vatreshno/lead/…, /vatreshno/vnos) with real lead
// data. Only where CORE_LOCAL=1 (.env.local, never Vercel): middleware.ts answers 404 before anything is sent;
// this check is the second lock. Not in any menu. Fonts: Geologica + Onest from the root layout.

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { default: 'CORE', template: '%s · CORE' },
  robots: { index: false, follow: false },
}

export default function CoreAppLayout({ children }: { children: React.ReactNode }) {
  if (!coreEnabled()) notFound()
  return (
    <div className="crm">
      <CrmShell>{children}</CrmShell>
    </div>
  )
}
