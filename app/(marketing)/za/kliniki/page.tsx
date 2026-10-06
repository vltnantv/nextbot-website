import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { IndustryPage } from '@/components/page/IndustryPage'
import { WeekCalendar } from '@/components/signature/WeekCalendar'

// Text: copy/branshove.md (/za/kliniki) - word for word; h1 and subtitle from copy/UNIQUE.md („Празният час“).
// „Как помагаме“ is replaced by the signature (copy/UNIQUE.md). Its copy, for reference:
//   1. NEO записва часове денем и нощем. 2. ECHO напомня преди посещението. 3. CORE пази история и дата за следващо посещение.
// [ПРОВЕРИ с юрист за здравни данни] - „Важно“ is not shown until checked (copy/branshove.md):
//   Ботът не дава медицински съвети и не поставя диагнози. Казваме го ясно на клиента.

export const metadata: Metadata = pageMeta({ title: 'NextBot за клиники и салони', description: 'Записвайте часове по всяко време, напомняйте за тях и намалете пропуснатите посещения.', path: '/za/kliniki' })

export default function ClinicsPage() {
  return (
    <IndustryPage
      eyebrow="Клиники и салони"
      // (copy/branshove.md h1 was: Пациентът иска час в неделя вечер. Записва се сам.)
      title="Всеки празен час е изгубена възможност."
      lead="Напомнянето го запълва."
      text="NEO предлага свободни часове, записва избрания и ви праща всичко на едно място. ECHO напомня преди часа."
      problems={['Телефонът не се вдига, докато работите с пациент.', 'Часове се забравят и остават празни.', 'Книгата с часове е на хартия или в таблица.']}
      signatureTitle="Празният час"
      signature={<WeekCalendar />}
      example={[
        { who: 'u', text: 'Искам час за почистване.' },
        { who: 'b', text: 'Има в четвъртък в 15:00 и в петък в 10:30. Кой ви е удобен?' },
      ]}
      today="kliniki"
      endTitle="Колко часа остават празни, защото клиентът забрави?"
    />
  )
}
