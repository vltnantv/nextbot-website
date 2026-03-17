import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
}

/** Strip HTML to plain text, keeping some structure */
function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi, '\n## $1\n')
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n')
    .replace(/<td[^>]*>([\s\S]*?)<\/td>/gi, ' | $1')
    .replace(/<tr[^>]*>/gi, '\n')
    .replace(/<\/?(p|div|br|section|article|header|footer|main|aside)[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–')
    .replace(/&euro;/g, '€').replace(/&pound;/g, '£').replace(/&#\d+;/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n/g, '\n\n')
    .trim()
}

/** Extract internal links from HTML */
function extractInternalLinks(html: string, baseUrl: string): string[] {
  const base = new URL(baseUrl)
  const linkRegex = /href=["']([^"'#]+)["']/gi
  const links = new Set<string>()
  let match
  while ((match = linkRegex.exec(html)) !== null) {
    try {
      const href = match[1]
      if (!href || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) continue
      const resolved = new URL(href, baseUrl)
      // Only same-domain links
      if (resolved.hostname !== base.hostname) continue
      // Skip files
      if (/\.(pdf|jpg|jpeg|png|gif|svg|css|js|ico|woff|mp4|mp3|zip)$/i.test(resolved.pathname)) continue
      resolved.hash = ''
      resolved.search = ''
      links.add(resolved.toString())
    } catch { /* skip invalid URLs */ }
  }
  return Array.from(links)
}

/** Keywords that indicate pages with useful business content */
const PRIORITY_KEYWORDS = [
  'menu', 'carta', 'speisekarte', 'меню',
  'room', 'rooms', 'accommodation', 'стаи', 'zimmer', 'suite',
  'price', 'pricing', 'tarif', 'цени', 'preise', 'rates',
  'service', 'services', 'услуги', 'leistungen',
  'about', 'за нас', 'über uns', 'about-us',
  'contact', 'контакти', 'kontakt',
  'faq', 'frequently', 'въпроси',
  'gallery', 'галерия',
  'spa', 'wellness', 'pool', 'fitness',
  'restaurant', 'dining', 'ресторант',
  'booking', 'reserv', 'резервац', 'buchung',
  'treatment', 'procedure', 'процедур', 'behandlung',
  'team', 'doctor', 'dentist', 'лекар', 'ekip',
  'offer', 'special', 'промоци', 'angebot',
  'location', 'directions', 'местоположение',
  'parking', 'паркинг',
  'event', 'conference', 'meeting', 'събитие',
  'delivery', 'доставк',
  'insurance', 'застрахов',
  'property', 'listing', 'имот',
  'course', 'program', 'курс',
  'shop', 'product', 'catalog', 'продукт',
]

/** Score a URL by how likely it is to contain useful business info */
function scoreLink(url: string): number {
  const lower = url.toLowerCase()
  let score = 0
  for (const kw of PRIORITY_KEYWORDS) {
    if (lower.includes(kw)) score += 2
  }
  // Penalize deep paths
  const pathDepth = (new URL(url).pathname.match(/\//g) || []).length
  if (pathDepth > 3) score -= 1
  return score
}

/** Fetch a page with timeout */
async function fetchPage(url: string, timeoutMs = 8000): Promise<string> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NextBot/1.0; +https://nextbot.me)',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9,bg;q=0.8,de;q=0.7',
      },
    })
    clearTimeout(timeout)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.text()
  } catch {
    clearTimeout(timeout)
    throw new Error('Fetch failed')
  }
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    let normalizedUrl = url.trim()
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = 'https://' + normalizedUrl
    }

    let allContent = ''
    let fetchFailed = false
    const crawledPages: string[] = []

    try {
      // 1. Fetch homepage
      const homeHtml = await fetchPage(normalizedUrl)
      const homeText = htmlToText(homeHtml)
      allContent += `\n=== HOMEPAGE (${normalizedUrl}) ===\n${homeText}\n`
      crawledPages.push(normalizedUrl)

      // 2. Find internal links and prioritize useful ones
      const links = extractInternalLinks(homeHtml, normalizedUrl)
      const scored = links
        .filter(l => !crawledPages.includes(l))
        .map(l => ({ url: l, score: scoreLink(l) }))
        .sort((a, b) => b.score - a.score)

      // 3. Crawl top priority pages (up to 8 subpages)
      const toCrawl = scored.filter(l => l.score > 0).slice(0, 8)

      const subResults = await Promise.allSettled(
        toCrawl.map(async (link) => {
          const html = await fetchPage(link.url, 6000)
          return { url: link.url, text: htmlToText(html) }
        })
      )

      for (const result of subResults) {
        if (result.status === 'fulfilled' && result.value.text.length > 100) {
          const pageName = new URL(result.value.url).pathname.replace(/\//g, ' ').trim() || 'page'
          allContent += `\n=== ${pageName.toUpperCase()} (${result.value.url}) ===\n${result.value.text}\n`
          crawledPages.push(result.value.url)
        }
      }

      // Truncate combined content to fit in context (~30k chars for gpt-4o-mini)
      if (allContent.length > 30000) {
        allContent = allContent.substring(0, 30000) + '\n\n[Content truncated — more pages available on site]'
      }

      if (allContent.length < 100) throw new Error('Too little content')

    } catch {
      fetchFailed = true
    }

    const openai = getOpenAI()

    const prompt = fetchFailed
      ? `The user wants to create an AI chatbot for a business with website: ${normalizedUrl}

Based on the URL/domain, generate REALISTIC detailed business data.

Return JSON:
{
  "companyName": "inferred name",
  "industry": "one of: hotel, restaurant, dental, realestate, education, ecommerce, services, custom",
  "services": "detailed comma-separated list of all services",
  "phone": "realistic phone with country code",
  "workingHours": "short format ONLY, e.g. Mon-Fri 09:00-18:00, Sat 10:00-14:00",
  "description": "2-3 sentence description",
  "detailedInfo": [
    { "category": "string", "title": "string", "content": "string - VERY detailed info" }
  ],
  "faqs": [
    { "question": "string", "answer": "string - detailed answer" }
  ],
  "pricing": "detailed pricing with all items and prices",
  "contactInfo": "full address and all contact details"
}

For detailedInfo generate 6-10 entries covering ALL aspects of the business:
- For hotels: each room type with exact prices, sizes, amenities, floor, view; spa services with prices; restaurant menu; parking; check-in rules; facilities
- For restaurants: FULL menu with every dish and price; drinks; allergen info; delivery; events
- For dental: every procedure with price; doctors; insurance; emergency; equipment
- For real estate: listings; neighborhoods; mortgage; fees; process
Generate 8-12 detailed FAQs.
Return ONLY valid JSON.`
      : `You are extracting COMPREHENSIVE business data from a website. I crawled ${crawledPages.length} pages.

COMPLETE WEBSITE CONTENT:
${allContent}

Extract EVERYTHING into this JSON structure:
{
  "companyName": "exact business name",
  "industry": "one of: hotel, restaurant, dental, realestate, education, ecommerce, services, custom",
  "services": "ALL services/products offered, comma-separated, be thorough",
  "phone": "main phone with country code if found",
  "workingHours": "short format ONLY: days + hours, e.g. Mon-Fri 09:00-18:00, Sat 10:00-14:00. No extra words, just schedule",
  "description": "2-3 sentence company description",
  "detailedInfo": [
    { "category": "string", "title": "string", "content": "string" }
  ],
  "faqs": [
    { "question": "string", "answer": "string" }
  ],
  "pricing": "ALL pricing info found",
  "contactInfo": "full address, emails, all phone numbers, social media"
}

CRITICAL RULES FOR detailedInfo — extract MAXIMUM detail:
- Create a separate entry for each distinct topic/category found on the site
- For HOTELS: separate entry for EACH room type (name, size m², price, floor, view, bed type, amenities), spa/wellness (every treatment + price), restaurant (menu, hours, cuisine), facilities (pool size, gym, parking spots, EV charging), policies (check-in/out times, cancellation, pets, children, extra bed prices), location (distances to airport/center/attractions)
- For RESTAURANTS: COMPLETE menu — every dish name with description and price grouped by category (starters, mains, desserts, drinks, wine list), allergen info for each dish, dietary options (vegan, GF, keto), daily specials, delivery area and fees, private events capacity and pricing, chef info
- For DENTAL: every procedure with EXACT price, duration, and description; doctor profiles (name, specialty, experience); insurance partners; emergency protocol; equipment/technology; patient preparation instructions
- For REAL ESTATE: current listings with full details, neighborhoods guide, buying process steps, mortgage info, fees breakdown, commission structure
- For ANY business: extract pricing tables, team members, certifications, testimonials, unique selling points
- Include ALL numbers, prices, measurements, and specifics found in the content
- If something is on the website, it MUST be in the output
- Do NOT summarize — include the actual details, prices, names, descriptions
- 8-15 detailedInfo entries minimum

For FAQs: generate 8-12 based on the REAL content. Answers must use ACTUAL data from the site (real prices, real room names, real menu items, real procedures).

For pricing: compile ALL prices found across the entire site into one comprehensive string.

Return ONLY valid JSON, no markdown fences.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a business data extraction specialist. You extract EVERY detail from websites — prices, room types, menu items, procedures, schedules, team members, policies. Never summarize when you can include the actual data. Return valid JSON only, no markdown code fences.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 4000,
      temperature: 0.2,
    })

    const raw = completion.choices[0]?.message?.content?.trim() || '{}'
    const cleaned = raw.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '')

    let data
    try {
      data = JSON.parse(cleaned)
    } catch {
      return NextResponse.json({ error: 'Failed to parse AI response', raw: cleaned }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      generated: fetchFailed,
      pagesCrawled: crawledPages.length,
      data,
    })
  } catch (error) {
    console.error('Extract website error:', error)
    return NextResponse.json({ error: 'Failed to extract website data' }, { status: 500 })
  }
}
