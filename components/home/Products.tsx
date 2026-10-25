import { ECHO_ADDON, PLANS } from '@/lib/prices'
import { OfferCards, SectionHead } from './parts'
import { SECTION, WRAP } from './refresh'

// REBUILD-PLAN.md §4.2: the three ready products as cards, each with its price and a link into the playground.

const from = (id: 'core' | 'neo') => PLANS.find((p) => p.id === id)!.monthly

export function Products() {
  return (
    <section id="produkti" className={`${SECTION} bg-cream-deep`}>
      <div className={`${WRAP} flex flex-col gap-10`}>
        <SectionHead
          tag="Продукти"
          title="Готови за работа."
          muted="Стартират за дни, не за месеци."
          text="Три продукта, които решават най-честите проблеми на един растящ бизнес: кой е клиентът, какво е питал и кой трябва да му се обади."
        />
        <OfferCards
          items={[
            {
              name: 'CORE',
              category: 'Клиенти и продажби',
              title: 'Всеки клиент, всяка сделка, всяко обаждане на едно място.',
              text: 'Замества тетрадките и таблиците. Екипът вижда своите клиенти, собственикът вижда целия екип.',
              points: ['Списък „обади се днес“ за всеки продавач', 'История на всеки клиент', 'Табло на собственика', 'Отделен достъп за всяка фирма и всеки човек'],
              price: <Price>от {from('core')} €</Price>,
              link: { label: 'Пробвайте', href: '#probvaite', tab: 'core' },
            },
            {
              name: 'NEO',
              category: 'Асистент за запитвания',
              title: 'Отговаря на клиентите ви в сайта, Viber и Messenger. Денем и нощем.',
              text: 'Учи се от сайта и документите ви. Отговаря на въпроси за цени и часове, записва клиента и го подава на вас.',
              points: ['Отговор до 30 секунди, по всяко време', 'Записва име, телефон и въпрос', 'Пита човек, когато не е сигурен', 'Работи заедно с CORE или самостоятелно'],
              price: <Price>от {from('neo')} €</Price>,
              link: { label: 'Пробвайте', href: '#probvaite', tab: 'neo' },
            },
            {
              name: 'ECHO',
              category: 'Напомняния и отзиви',
              title: 'Напомня на клиента за часа и го моли за отзив след това.',
              text: 'Добавка към CORE и NEO. По-малко пропуснати часове, повече отзиви в Google, без някой от екипа да го прави на ръка.',
              points: ['Напомняне ден преди час или оглед', 'Молба за отзив след покупка', 'Съобщения на български, с вашето име'],
              price: <Price>+{ECHO_ADDON} €</Price>,
              link: { label: 'Пробвайте', href: '#probvaite', tab: 'echo' },
            },
          ]}
        />
      </div>
    </section>
  )
}

function Price({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children} <small className="text-[14px] font-medium text-stone">/ месец</small>
    </>
  )
}
