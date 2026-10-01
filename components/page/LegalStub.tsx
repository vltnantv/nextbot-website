import { H, WRAP } from '@/components/home/ui'

// Legal pages are written by a lawyer from a template, not here (copy/ceni-zanas-razgovor.md „Правни страници“).
// Until then: only the title and „В подготовка“ - no made-up legal text.
export function LegalStub({ title }: { title: string }) {
  return (
    <section className="relative z-[1] pb-32 pt-14">
      <div className={`${WRAP} flex flex-col gap-6`}>
        <h1 className={`${H} text-[clamp(36px,4.6vw,56px)] leading-[1.06]`}>{title}</h1>
        <p className="m-0 text-[19px]">В подготовка</p>
      </div>
    </section>
  )
}
