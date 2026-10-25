import Link from 'next/link'
import { Aura } from '@/components/motion/Aura'
import { Reveal } from '@/components/motion/Reveal'
import { CTA } from '@/lib/site-nav'
import { COMPANY, telHref } from '@/lib/company'
import { BTN, H2, LINK, SECTION, TAG, WRAP } from './refresh'

// REBUILD-PLAN.md §4.11: a white card with the aura in the top right corner, one button, phone and e-mail.
export function FinalCta() {
  return (
    <section id="razgovor" className={`${SECTION} overflow-hidden pb-20 min-[900px]:pb-28`}>
      <div className={WRAP}>
        <Reveal soft className="relative flex flex-col items-start gap-[22px] overflow-hidden rounded-[26px] border border-line bg-white p-[clamp(28px,6vw,68px)]">
          <Aura className="-right-[160px] -top-[200px] h-[520px] w-[520px]" opacity={0.4} />
          <span className={`${TAG} relative`}>Следваща стъпка</span>
          <h2 className={`${H2} relative max-w-[18ch] text-[clamp(30px,4vw,50px)]`}>15 минути са достатъчни, за да разберем дали можем да ви помогнем.</h2>
          <p className="relative m-0 max-w-[52ch] text-[18px] text-stone">Обадете се или ни пишете. Отговаряме лично, в рамките на деня.</p>
          <div className="relative flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link href={CTA.href} className={BTN}>
              {CTA.label}
            </Link>
            <a href={telHref(COMPANY.phone)} className={`${LINK} text-[17px] tabular-nums`}>
              {COMPANY.phone}
            </a>
            <a href={`mailto:${COMPANY.email}`} className={`${LINK} text-[17px]`}>
              {COMPANY.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
