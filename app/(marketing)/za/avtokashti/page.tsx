import type { Metadata } from 'next'
import { IndustryPage } from '@/components/page/IndustryPage'
import { CarStory } from '@/components/signature/CarStory'

// Text: copy/branshove.md (/za/avtokashti) - word for word; h1 and subtitle from copy/UNIQUE.md („Петък, 21:14“).
// The conversations are illustrations and are marked so. No made-up numbers or reviews.
// „Как помагаме“ is replaced by the signature (copy/UNIQUE.md). Its copy, for reference:
//   1. NEO отговаря в сайта: модели, цени, лизинг, наличност. 2. Записва тест драйв или оглед за свободен час.
//   3. CORE пази всеки интерес с етап и дата на обаждане. 4. ECHO напомня за сервиз и пита за отзив.

export const metadata: Metadata = {
  title: { absolute: 'NextBot за автокъщи и сервизи' },
  description: 'Отговаряйте на запитванията за коли и сервиз веднага, записвайте огледи и не губете клиент, който е казал „ще помисля“.',
}

export default function CarDealersPage() {
  return (
    <IndustryPage
      eyebrow="Автокъщи и сервизи"
      // (copy/branshove.md h1 was: Клиентът пита за колата в 21:00. Вие отговаряте още тогава.)
      title="Петък, 21:14. Някой избира следващата си кола."
      lead="Вие вече не работите. Той още пита."
      text="NextBot отговаря на въпроси за наличности, лизинг и тест драйв, записва клиента и ви напомня кога да му се обадите."
      problems={[
        'Запитване за кола вечер остава до сутринта, а клиентът вече е писал на друга автокъща.',
        'Клиент е казал „ще помисля“ и никой не му се обажда повторно.',
        'Лийдовете са в тетрадка, в Viber и в главата на търговеца.',
      ]}
      signatureTitle="Петък, 21:14"
      signature={<CarStory />}
      example={[
        { who: 'u', text: 'Има ли лизинг за този Golf?' },
        { who: 'b', text: 'Да, предлагаме лизинг. Искате ли да запазя час за оглед и разговор с търговец?' },
      ]}
      faq={[
        { q: 'Свързва ли се със сайта ни за обяви?', a: 'При настройката уточняваме откъде да взима наличностите.' },
        { q: 'Могат ли търговците да работят в системата?', a: 'Да, всеки има своя изглед.' },
      ]}
      today="avtokashti"
      endTitle="Колко запитвания за коли оставате без отговор вечер?"
    />
  )
}
