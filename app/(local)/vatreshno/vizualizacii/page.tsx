import type { Metadata } from 'next'
import { EchoPhone } from '@/components/visuals/EchoPhone'
import { NeoInbox } from '@/components/visuals/NeoInbox'

// Local preview of the product visuals (copy/VISUALS.md) for approval before they go on the pages.
// Behind CORE_LOCAL like everything under /vatreshno.

export const metadata: Metadata = { title: 'Визуализации' }

export default function VisualsPreview() {
  return (
    <div style={{ display: 'grid', gap: 48 }}>
      <section data-visual="neo" style={{ maxWidth: 760, display: 'grid', gap: 8 }}>
        <span style={{ fontSize: 14, color: '#6F6A62' }}>Пример с измислени данни</span>
        <NeoInbox />
      </section>
      <section data-visual="echo" style={{ maxWidth: 380, display: 'grid', gap: 8 }}>
        <span style={{ fontSize: 14, color: '#6F6A62' }}>Пример за съобщения</span>
        <EchoPhone />
      </section>
    </div>
  )
}
