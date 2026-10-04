import type { Metadata } from 'next'
import { IndustryPage } from '@/components/page/IndustryPage'
import { BuyerSort } from '@/components/signature/BuyerSort'

// Text: copy/branshove.md (/za/imoti) - word for word; h1 and subtitle from copy/UNIQUE.md („Кого да потърсите първо“).
// „Как помагаме“ is replaced by the signature (copy/UNIQUE.md). Its copy, for reference:
//   1. NEO събира бюджет, район и срок. 2. Записва оглед за свободен час на брокера. 3. CORE подрежда купувачите по етап.

export const metadata: Metadata = {
  title: { absolute: 'NextBot за агенции за имоти' },
  description: 'Отговаряйте веднага на запитвания за имоти, записвайте огледи и не губете купувачи.',
}

export default function RealEstatePage() {
  return (
    <IndustryPage
      eyebrow="Агенции за имоти"
      // (copy/branshove.md h1 was: Купувачът иска оглед в събота. Записан е още тази вечер.)
      title="Не всички купувачи са еднакви. Знаете ли кой е готов?"
      lead="CORE подрежда, NEO събира."
      text="NEO отговаря за имотите ви, записва огледи и събира какво търси клиентът. CORE ви казва кого да потърсите първо."
      problems={[
        'Запитвания идват от обяви, сайт и социални мрежи, и се губят.',
        'Не знаете кой купувач какво търси.',
        'Брокерите не знаят докъде е стигнал колегата.',
      ]}
      signatureTitle="Кого да потърсите първо"
      signature={<BuyerSort />}
      example={[
        { who: 'u', text: 'Може ли оглед в събота?' },
        { who: 'b', text: 'Да. В събота има свободно в 11:00 и 14:00. Кой час ви е удобен?' },
      ]}
      today="imoti"
      endTitle="Колко купувачи се губят между обявата и огледа?"
    />
  )
}
