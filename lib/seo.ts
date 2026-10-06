import type { Metadata } from 'next'

// SEO for every public page: Bulgarian title and description (copy/*.md „Мета“), one address
// (https://www.nextbot.me), a canonical URL and the same data for sharing (Open Graph / Twitter) with the
// shared OG image. Next.js does not merge openGraph from the layout into pages, so every page sets its own.

export const SITE_URL = 'https://www.nextbot.me'
export const SITE_NAME = 'NextBot'
export const OG_IMAGE = { url: '/og.png', width: 1200, height: 630, alt: 'NextBot — Всеки клиент получава отговор. Веднага.' }

/** Public pages that go into sitemap.xml (no /vatreshno, no legal pages while they are „В подготовка“). */
export const PUBLIC_PAGES = [
  '/',
  '/neo',
  '/core',
  '/echo',
  '/aria',
  '/izrabotka-na-sait',
  '/studio',
  '/za/avtokashti',
  '/za/kliniki',
  '/za/imoti',
  '/za/hoteli',
  '/ceni',
  '/demo',
  '/za-nas',
  '/razgovor',
] as const

/**
 * Metadata of one page. `title` is the full title as in the copy („… | NextBot“) - it is used as is
 * (no template), so what Google shows is exactly the copy.
 */
export function pageMeta({ title, description, path, noindex = false }: { title: string; description?: string; path: string; noindex?: boolean }): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: 'bg_BG',
      type: 'website',
      images: [OG_IMAGE],
    },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  }
}
