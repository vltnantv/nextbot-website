import type { Metadata } from 'next'
import { IndustryPage } from '@/components/page/IndustryPage'
import { FiveQuestions } from '@/components/signature/FiveQuestions'

// Text: copy/branshove.md (/za/hoteli) - word for word; h1 and subtitle from copy/UNIQUE.md („Едни и същи пет въпроса“).
// Developer note from the copy: the bot does not confirm a booking by itself while no booking system is
// connected - never promise „онлайн резервация“.
// „Как помагаме“ is replaced by the signature (copy/UNIQUE.md). Its copy, for reference:
//   1. NEO отговаря за стаи, цени, паркинг, закуска. 2. Събира данни за дати и брой гости.
//   3. CORE държи запитванията подредени за обратно обаждане.

export const metadata: Metadata = {
  title: { absolute: 'NextBot за хотели и къщи за гости' },
  description: 'Отговаряйте на запитвания за нощувки веднага, на български и на чужд език, и не губете резервации.',
}

export default function HotelsPage() {
  return (
    <IndustryPage
      eyebrow="Хотели и къщи за гости"
      // (copy/branshove.md h1 was: Гостът пита за стая в полунощ. Получава отговор веднага.)
      title="Гостите питат едно и също. Всеки ден."
      lead="Нека NEO им отговаря, а вие посрещате."
      text="NEO отговаря на въпроси за стаи, цени и услуги и събира данните за резервация. Вие потвърждавате."
      problems={[
        'Запитвания идват от сайта, имейл и социалните мрежи и са разпилени.',
        'Гостите пишат вечер, а отговор получават на другия ден.',
        'Едни и същи въпроси се повтарят всеки ден.',
      ]}
      signatureTitle="Едни и същи пет въпроса"
      signature={<FiveQuestions />}
      example={[
        { who: 'u', text: 'Имате ли стая за 2 нощувки?' },
        { who: 'b', text: 'За кои дати? Ще проверя наличността и ще предам заявката на рецепцията.' },
      ]}
      endTitle="Колко резервации се губят, защото не сте отговорили навреме?"
    />
  )
}
