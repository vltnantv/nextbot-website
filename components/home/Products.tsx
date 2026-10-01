import { Tilt } from '@/components/motion/Tilt'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger } from '@/components/motion/Stagger'
import { Arrow } from './Arrow'
import { CARD, EYEBROW, H, H2, WRAP } from './ui'

type Product = { name: string; kind: string; text: string; href: string; soon?: boolean }

// BRAND.md: Приема (WEB, NEO, ARIA) → Записва (CORE) → Връща (ECHO); STUDIO for everything else.
const RECEIVE: Product[] = [
  { name: 'WEB', kind: 'Изработка на уебсайт', text: 'Бърз сайт на български, с чат асистент от първия ден.', href: '/izrabotka-na-sait' },
  { name: 'NEO', kind: 'Чат асистент', text: 'Отговаря в сайта, Viber и Messenger и записва часове.', href: '/neo' },
  { name: 'ARIA', kind: 'Гласов асистент', text: 'Вдига телефона, когато вие не можете.', href: '/aria', soon: true },
]
const CORE: Product = {
  name: 'CORE',
  kind: 'Система за клиенти',
  text: 'Всички клиенти на едно място, с напомняния кога да се обадите и отчет за собственика.',
  href: '/core',
}
const ECHO: Product = {
  name: 'ECHO',
  kind: 'Повторни клиенти и отзиви',
  text: 'Напомня за следващия час и моли за отзив в Google след всяка покупка.',
  href: '/echo',
}

function Step({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-2.5 text-[14px] font-semibold">
      <span className="text-online-text">{n}</span> {label}
    </div>
  )
}

function ProductCard({ p, grow }: { p: Product; grow?: boolean }) {
  return (
    <Tilt href={p.href} className={`${CARD} flex flex-col gap-2 p-[26px] text-ink no-underline ${grow ? 'flex-grow' : ''}`}>
      <span className="flex items-center justify-between gap-2">
        <span className={`${H} text-[20px]`}>{p.name}</span>
        {p.soon && <span className="rounded-full bg-cream-deep px-2.5 py-[3px] text-[12px] text-stone">Скоро</span>}
      </span>
      <span className="text-[14px] text-stone">{p.kind}</span>
      <span className="text-[16px]">{p.text}</span>
    </Tilt>
  )
}

export function Products() {
  return (
    <section id="produkti" className="relative z-[1] py-[104px]">
      <div className={`${WRAP} flex flex-col gap-11`}>
        <Reveal className="flex max-w-[760px] flex-col gap-3">
          <span className={EYEBROW}>Какво прави NextBot</span>
          <h2 className={H2}>Една система от първото съобщение до следващата покупка.</h2>
        </Reveal>

        <Reveal className="flex flex-col gap-3.5">
          <Step n="01" label="Приема клиента" />
          <Stagger className="grid gap-5 min-[900px]:grid-cols-3">
            {RECEIVE.map((p) => (
              <ProductCard key={p.name} p={p} />
            ))}
          </Stagger>
        </Reveal>

        <Stagger className="grid gap-5 min-[900px]:grid-cols-2">
          <div className="flex flex-col gap-3.5">
            <Step n="02" label="Записва и напомня" />
            <ProductCard p={CORE} grow />
          </div>
          <div className="flex flex-col gap-3.5">
            <Step n="03" label="Връща го отново" />
            <ProductCard p={ECHO} grow />
          </div>
        </Stagger>

        <Reveal>
          <Tilt
            href="/studio"
            className="flex flex-wrap items-center justify-between gap-4 bg-ink px-8 py-7 text-cream no-underline hover:text-cream"
          >
            <span className="flex flex-col gap-1">
              <span className={`${H} text-[20px]`}>STUDIO</span>
              <span className="text-[16px] text-[#D9D0C2]">Имате нещо специфично? Автоматизации и софтуер по поръчка.</span>
            </span>
            <span className="text-[15px] font-medium">
              Разкажете ни <Arrow />
            </span>
          </Tilt>
        </Reveal>
      </div>
    </section>
  )
}
