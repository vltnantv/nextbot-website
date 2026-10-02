import { NextRequest, NextResponse } from 'next/server'
import { isLocalRequest } from '@/lib/local-only'

// Local-only tools (/core/vnos and its API). Checked here, before the page starts streaming, so the public
// site answers a real 404 (status and page) and nothing about the tool - not even its title - is sent.
export function middleware(req: NextRequest) {
  if (isLocalRequest(req.headers.get('host'))) return NextResponse.next()
  return NextResponse.rewrite(new URL('/_not-found', req.url), { status: 404 })
}

export const config = {
  matcher: ['/core/vnos/:path*', '/api/core/:path*'],
}
