import { NextRequest, NextResponse } from 'next/server'
import { isLocalRequest } from '@/lib/local-only'

// Local-only tools: the CORE app under /core/… (board, „Днес“, lead pages, import) and its API.
// /core itself is the public product page and is not matched. Checked here, before the page starts streaming, so the public
// site answers a real 404 (status and page) and nothing about the tool - not even its title - is sent.
export function middleware(req: NextRequest) {
  if (isLocalRequest(req.headers.get('host'))) return NextResponse.next()
  return NextResponse.rewrite(new URL('/_not-found', req.url), { status: 404 })
}

export const config = {
  matcher: ['/core/:path+', '/api/core/:path*'],
}
