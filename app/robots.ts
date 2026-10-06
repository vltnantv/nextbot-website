import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

// robots.txt: everything public may be crawled; the internal CORE app and the API may not.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/vatreshno', '/api/'] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
