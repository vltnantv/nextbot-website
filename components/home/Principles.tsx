import { Stagger } from '@/components/motion/Stagger'
import { SectionHead } from './parts'
import { SECTION, WRAP } from './refresh'

// REBUILD-PLAN.md §4.7 „За нас“: who we are in one paragraph and four principles under an ink rule.

const PRINCIPLES = [
  { title: 'Говорим на български', text: 'Интерфейсът, съобщенията към клиентите ви и поддръжката са на български. Без преводен софтуер.' },
  { title: 'Първо процесът, после кодът', text: 'Идваме на място и гледаме как работите, преди да предложим каквото и да е.' },
  { title: 'Данните са ваши', text: 'Всяка фирма вижда само своите данни. Ако спрете, получавате всичко като файл.' },
  { title: 'Едно лице за всичко', text: 'Продукт, сайт, система, поддръжка. Един договор, един телефон, един отговорен човек.' },
]

export function Principles() {
  return (
    <section id="za-nas" className={SECTION}>
      <div className={`${WRAP} flex flex-col gap-10`}>
        <SectionHead
          tag="За нас"
          title="Софтуер за фирми,"
          muted="направен от хора, които са работили във фирми."
          text="NextBot е софтуерна компания от София. Знаем как изглежда работният ден в автокъща, клиника или магазин, защото сме го живели. Затова правим софтуер, който се ползва, а не софтуер, който се инсталира и забравя."
        />
        <Stagger className="grid gap-x-6 gap-y-7 min-[560px]:grid-cols-2 min-[960px]:grid-cols-4">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="flex flex-col gap-2 border-t-[1.5px] border-ink pt-4">
              <h3 className="m-0 font-display text-[17px] font-semibold tracking-[-0.01em]">{p.title}</h3>
              <p className="m-0 text-[15px] leading-[1.55] text-stone">{p.text}</p>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
