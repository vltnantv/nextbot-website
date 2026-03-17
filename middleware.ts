import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Only run Supabase auth for dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return await updateSession(request)
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all routes except static files and API routes that don't need auth
    '/((?!_next/static|_next/image|favicon.png|logo.png|og-image.png|icon.png|images/.*|api/chat).*)',
  ],
}
