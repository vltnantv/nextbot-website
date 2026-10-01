'use client'

// Replaces the whole page (including the root layout) when the layout itself fails,
// so it carries its own <html> and inline styles in the brand colours.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="bg">
      <body style={{ margin: 0, background: '#FAF7F2', color: '#1F1D1A', fontFamily: 'system-ui, sans-serif' }}>
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 24, textAlign: 'center' }}>
          <h1 style={{ fontSize: 32, fontWeight: 600, margin: 0 }}>Нещо се обърка.</h1>
          <p style={{ margin: 0, color: '#6F6A62', fontSize: 17 }}>Опитайте отново. Ако проблемът остане, пишете ни на info@nextbot.me.</p>
          <button
            type="button"
            onClick={() => reset()}
            style={{ padding: '14px 24px', background: '#1F1D1A', color: '#FAF7F2', borderRadius: 999, border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: 16 }}
          >
            Опитайте отново
          </button>
        </main>
      </body>
    </html>
  )
}
