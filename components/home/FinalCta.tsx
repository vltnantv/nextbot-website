import Link from 'next/link'
import { Reveal } from '@/components/motion/Reveal'
import { CTA } from '@/lib/site-nav'
import { BTN, H2, SECTION, WRAP } from './refresh'

// DESIGN-REFRESH.md §4.10: one big sentence and one button. No dark block, no blobs.
export function FinalCta() {
  return (
    <section id="razgovor" className={`${SECTION} pb-20 min-[900px]:pb-28`}>
      <Reveal soft className={`${WRAP} flex flex-col items-start gap-8 border-t border-line pt-14`}>
        <h2 className={`${H2} max-w-[18ch] text-[clamp(34px,4.6vw,56px)]`}>15 минути са достатъчни, за да видите къде губите клиенти.</h2>
        <Link href={CTA.href} className={BTN}>
          {CTA.label}
        </Link>
      </Reveal>
    </section>
  )
}
