import type { Metadata } from 'next'
import { CoreImport } from '@/components/core/CoreImport'

// CORE: import from a Google Maps CSV (gosom/google-maps-scraper) and the „Не ми звънете“ list.
// Local only (see ../layout.tsx and middleware.ts). Not linked from any site menu.

export const metadata: Metadata = { title: 'Внос от CSV' }

export default function CoreImportPage() {
  return (
    <>
      <div className="top">
        <div className="grow">
          <h1>Внос от CSV</h1>
          <div className="sub">
            Файл от gosom/google-maps-scraper. Телефоните стават +359…, дубликатите по телефон се махат, а всички нови влизат като „Нов“.
            Номерата от „Не ми звънете“ не се внасят.
          </div>
        </div>
      </div>
      <CoreImport />
    </>
  )
}
