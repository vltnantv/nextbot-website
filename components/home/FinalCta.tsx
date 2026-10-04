import Link from 'next/link'
import { Reveal } from '@/components/motion/Reveal'
import { CTA } from '@/lib/site-nav'
import { COMPANY, telHref, viberHref } from '@/lib/company'
import { BTN, H2, LINK, SECTION, WRAP } from './refresh'

// DESIGN-REFRESH.md §4.10: one big sentence and one button, with phone and Viber next to it. No dark block.
export function FinalCta() {
  return (
    <section id="razgovor" className={`${SECTION} pb-20 min-[900px]:pb-28`}>
      <Reveal soft className={`${WRAP} flex flex-col items-start gap-8 border-t border-line pt-14`}>
        <h2 className={`${H2} max-w-[18ch] text-[clamp(34px,4.6vw,56px)]`}>15 минути са достатъчни, за да видите къде губите клиенти.</h2>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
          <Link href={CTA.href} className={BTN}>
            {CTA.label}
          </Link>
          <a href={telHref(COMPANY.phone)} className={`${LINK} text-[16px] tabular-nums`}>
            {COMPANY.phone}
          </a>
          {COMPANY.viber && (
            <a href={viberHref(COMPANY.viber)} className={`${LINK} text-[16px]`}>
              Viber
            </a>
          )}
        </div>
      </Reveal>
    </section>
  )
}
