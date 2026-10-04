import type { Metadata } from 'next'
import { AriaNote } from '@/components/visuals/AriaNote'
import { EchoPhone } from '@/components/visuals/EchoPhone'
import { NeoInbox } from '@/components/visuals/NeoInbox'
import { StudioFlow } from '@/components/visuals/StudioFlow'
import { WebShowcase } from '@/components/visuals/WebShowcase'

// Local preview of the product visuals (copy/VISUALS.md) for approval before they go on the pages.
// Behind CORE_LOCAL like everything under /vatreshno.

export const metadata: Metadata = { title: 'Визуализации' }

const label = { fontSize: 14, color: '#6F6A62' }

export default function VisualsPreview() {
  return (
    <div style={{ display: 'grid', gap: 56 }}>
      <section data-visual="neo" style={{ maxWidth: 760, display: 'grid', gap: 8 }}>
        <span style={label}>Пример с измислени данни</span>
        <NeoInbox />
      </section>
      <section data-visual="echo" style={{ maxWidth: 380, display: 'grid', gap: 8 }}>
        <span style={label}>Пример за съобщения</span>
        <EchoPhone />
      </section>
      <section data-visual="web" style={{ maxWidth: 820, display: 'grid', gap: 8 }}>
        <WebShowcase />
      </section>
      <section data-visual="aria" style={{ maxWidth: 440, display: 'grid', gap: 8 }}>
        <span style={label}>Скоро. Пример как ще изглежда бележката.</span>
        <AriaNote />
      </section>
      <section data-visual="studio" style={{ maxWidth: 820, display: 'grid', gap: 8 }}>
        <span style={label}>Примерна автоматизация.</span>
        <StudioFlow />
      </section>
    </div>
  )
}
