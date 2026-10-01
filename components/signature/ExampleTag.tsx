/** Small tag on every signature: its conversations, times, names and numbers are illustrations (copy/UNIQUE.md). */
export function ExampleTag({ children = 'Пример', dark = false }: { children?: string; dark?: boolean }) {
  return (
    <span
      className={`inline-flex self-start rounded-full border px-3 py-1 text-[13px] ${
        dark ? 'border-[#5A5248] text-[#D9D0C2]' : 'border-line bg-white text-stone'
      }`}
    >
      {children}
    </span>
  )
}
