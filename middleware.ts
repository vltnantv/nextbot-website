import { NextRequest, NextResponse } from 'next/server'

// Internal CORE app: everything under /vatreshno and /api/vatreshno is 404 unless CORE_LOCAL=1 is in the
// environment. CORE_LOCAL lives only in .env.local (Valentin's computer), never in Vercel.
// Checked here, before anything is sent, so the public site does not even reveal a page title.
// /core is the public product page and is not matched.
export function middleware(req: NextRequest) {
  if (process.env.CORE_LOCAL === '1') return NextResponse.next()
  return NextResponse.rewrite(new URL('/_not-found', req.url), { status: 404 })
}

export const config = {
  matcher: ['/vatreshno', '/vatreshno/:path*', '/api/vatreshno', '/api/vatreshno/:path*'],
}
