'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

const BARE_ROUTES = ['/demo-live']

export function LayoutShell({
  header,
  footer,
  children,
}: {
  header: ReactNode
  footer: ReactNode
  children: ReactNode
}) {
  const pathname = usePathname()
  const isBare = BARE_ROUTES.some(r => pathname.startsWith(r))

  if (isBare) {
    return <>{children}</>
  }

  return (
    <>
      {header}
      <main>{children}</main>
      {footer}
    </>
  )
}
