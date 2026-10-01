import Link from 'next/link'
import { Magnetic } from '@/components/motion/Magnetic'
import { Reveal } from '@/components/motion/Reveal'
import { FINAL_SCALE } from '@/lib/motion'
import { COMPANY, telHref, viberHref } from '@/lib/company'
import { CTA } from '@/lib/site-nav'
import { Arrow } from './Arrow'
import { H, WRAP } from './ui'

export function FinalCta() {
  return (
    <section id="razgovor" className="relative z-[1] pb-24">
      <div className={WRAP}>
        <Reveal scale={FINAL_SCALE} className="relative flex flex-col items-center gap-[22px] overflow-hidden bg-ink px-6 py-16 text-center text-cream sm:px-12">
          <div
            aria-hidden="true"
            className="blob-drift-2 pointer-events-none absolute -right-[60px] -top-[140px] h-80 w-80 rounded-full bg-[#3A352E] opacity-80 blur-[90px]"
          />
          <h2 className={`${H} relative max-w-[760px] text-[clamp(30px,4vw,50px)] leading-[1.1]`}>
            15 минути са достатъчни, за да видите къде губите клиенти.
          </h2>
          <div className="relative flex flex-wrap justify-center gap-3">
            <Magnetic>
              <Link
                href={CTA.href}
                className="group inline-flex items-center gap-1.5 btn-shine rounded-full bg-cream px-7 py-[15px] font-medium text-ink no-underline transition-transform duration-200 hover:-translate-y-px hover:text-ink motion-reduce:transition-none"
              >
                {CTA.label} <Arrow />
              </Link>
            </Magnetic>
            {COMPANY.viber && (
              <a
                href={viberHref(COMPANY.viber)}
                className="inline-flex items-center rounded-full border border-[#4A443C] px-6 py-3.5 font-medium text-cream no-underline transition-transform duration-200 hover:-translate-y-px hover:text-cream motion-reduce:transition-none"
              >
                Пишете ни във Viber
              </a>
            )}
          </div>
          <a href={telHref(COMPANY.phone)} className="relative text-[15px] text-[#D9D0C2] no-underline hover:text-cream">
            или се обадете: {COMPANY.phone}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
