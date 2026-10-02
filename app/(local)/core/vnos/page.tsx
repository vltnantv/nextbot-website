import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { CoreImport } from '@/components/core/CoreImport'
import { isLocalRequest } from '@/lib/local-only'

// CORE: import from a Google Maps CSV (gosom/google-maps-scraper) and the „Не ми звънете“ list.
// Local only - `npm run dev` on localhost. On the public site this page is a 404. Not linked from any menu.

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'CORE · Внос от CSV',
  robots: { index: false, follow: false },
}

export default function CoreImportPage() {
  if (!isLocalRequest(headers().get('host'))) notFound()
  return (
    <main className="min-h-screen bg-cream px-6 py-12 text-ink">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10">
        <header className="flex flex-col gap-2">
          <span className="text-[14px] text-stone">CORE · само на този компютър</span>
          <h1 className="m-0 font-display text-[40px] font-semibold tracking-[-0.02em]">Внос от CSV</h1>
          <p className="m-0 max-w-[720px] text-[17px] text-stone">
            Файл от gosom/google-maps-scraper. Телефоните стават +359…, дубликатите по телефон се махат, а всички нови влизат като
            „Нов“. Номерата от „Не ми звънете“ не се внасят.
          </p>
        </header>
        <CoreImport />
      </div>
    </main>
  )
}
