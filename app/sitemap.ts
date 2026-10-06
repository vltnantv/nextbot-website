import type { MetadataRoute } from 'next'
import { PUBLIC_PAGES, SITE_URL } from '@/lib/seo'

// sitemap.xml: every public page on https://www.nextbot.me. Never /vatreshno (internal) or /api; the legal
// pages join when they have real text (now „В подготовка“ and noindex).
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return PUBLIC_PAGES.map((path) => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : path === '/razgovor' || path === '/ceni' ? 0.8 : 0.7,
  }))
}
