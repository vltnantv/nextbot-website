import { DEVELOPMENT_OFFERS } from './offers'
import { OfferCards, SectionHead } from './parts'
import { SECTION, WRAP } from './refresh'

// REBUILD-PLAN.md §4.5: the second line of the company - sites, systems and apps, priced after a call.

export function Development() {
  return (
    <section id="razrabotka" className={SECTION}>
      <div className={`${WRAP} flex flex-col gap-10`}>
        <SectionHead
          tag="Разработка по поръчка"
          title="Когато нищо готово не пасва,"
          muted="го изграждаме за вас."
          text="Същият екип, който прави продуктите, прави и системи по мярка. Започваме от вашия процес, не от технологията."
        />
        <OfferCards items={DEVELOPMENT_OFFERS} />
      </div>
    </section>
  )
}
