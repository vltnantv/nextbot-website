"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  // Light theme only (BRAND.md)
  const theme = "light"

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-ink group-[.toaster]:border-line group-[.toaster]:shadow-soft",
          description: "group-[.toast]:text-stone",
          actionButton:
            "group-[.toast]:bg-ink group-[.toast]:text-cream",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-stone",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
