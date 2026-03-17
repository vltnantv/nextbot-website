"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FAQItem } from "@/components/ui/FAQItem";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const pillStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const pillFade = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Category = "all" | "service" | "technical" | "security" | "pricing" | "human";

interface FAQData {
  id: string;
  category: Category;
  question: string;
  answer: React.ReactNode;
}

interface CategoryConfig {
  id: Category;
  label: string;
  badgeColor: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const CATEGORIES: CategoryConfig[] = [
  { id: "all", label: "Всички", badgeColor: "" },
  { id: "service", label: "За услугата", badgeColor: "bg-blue-100 text-blue-700" },
  { id: "technical", label: "Техническо", badgeColor: "bg-gray-100 text-gray-700" },
  { id: "security", label: "Сигурност", badgeColor: "bg-green-100 text-green-700" },
  { id: "pricing", label: "Цена", badgeColor: "bg-yellow-100 text-yellow-700" },
  { id: "human", label: "Хора", badgeColor: "bg-orange-100 text-orange-700" },
];

const FAQ_DATA: FAQData[] = [
  // КАТЕГОРИЯ 1: За услугата
  {
    id: "q1",
    category: "service",
    question: "Какво точно прави AI асистентът?",
    answer:
      "AI асистентът отговаря на въпросите на вашите гости или клиенти - автоматично, 24 часа в денонощието. Когато гост пише 'Имате ли свободни стаи за 15 юни?', ботът отговаря веднага с наличност, цени и опция за резервация. Всичко което нормално прави рецепционистът за рутинни въпроси.",
  },
  {
    id: "q2",
    category: "service",
    question: "Колко е умен? Ще разбере ли сложни въпроси?",
    answer:
      "Използваме Claude 4.5 - един от най-напредналите AI модели в света. Разбира контекст, nuance и дори сложни въпроси. Ако гост пише 'имаме куче, може ли?' на счупен английски - ботът разбира и отговаря правилно. Единственото което не прави: взима важни решения без вас. При сложни случаи веднага прехвърля към вас.",
  },
  {
    id: "q3",
    category: "service",
    question: "На колко езика говори?",
    answer:
      "По подразбиране: Български и Английски. С добавка от 49 лв/месец: Немски или Руски. Разпознава езика автоматично от първото съобщение и отговаря на същия. Гост пише на немски → получава отговор на немски.",
  },
  {
    id: "q4",
    category: "service",
    question: "Може ли да взема резервации?",
    answer:
      "Да! Ботът може да събира данни за резервация (дати, брой гости, тип стая), да показва цени, и да изпраща информацията директно към вас или вашата booking система. Зависи от нивото на интеграция което изберете.",
  },

  // КАТЕГОРИЯ 2: Техническо
  {
    id: "q5",
    category: "technical",
    question: "Трябва ли да сменям сайта или системите си?",
    answer:
      "Не. Добавяме само един малък код в сайта ви (като Google Analytics - копирате и поставяте). Отнема 5 минути, не изисква програмист. Ако имате програмист или уеб агенция - изпращаме им директно и те го правят за минути.",
  },
  {
    id: "q6",
    category: "technical",
    question: "Какво се случва ако ботът не знае отговора?",
    answer:
      "Имаме 3-степенна система: 1) Ботът опитва да отговори от knowledge base-а. 2) Ако не може → дава стандартен отговор и предлага да се свържат с вас директно. 3) Вие получавате notification и можете да отговорите лично. Гостите никога не остават без отговор.",
  },
  {
    id: "q7",
    category: "technical",
    question: "Работи ли на мобилен?",
    answer:
      "Да, напълно. Работи на всички устройства и браузъри. Включително WhatsApp (с добавка) - което е основният канал за комуникация в България.",
  },
  {
    id: "q8",
    category: "technical",
    question: "Колко време отнема настройката?",
    answer:
      "2-3 работни дни. Ден 1: разговор с вас за да разберем бизнеса. Ден 2-3: конфигурираме и тестваме. Ден 4: live. Вие не правите нищо техническо.",
  },

  // КАТЕГОРИЯ 3: Сигурност и поверителност
  {
    id: "q9",
    category: "security",
    question: "Безопасни ли са данните на гостите ни?",
    answer:
      "Да. GDPR fully compliant - следваме всички европейски изисквания за защита на данни. Данните са криптирани и се съхраняват на европейски сървъри. Не продаваме и не споделяме данни. Имате право на пълен export и изтриване на всичко по всяко време.",
  },
  {
    id: "q10",
    category: "security",
    question: "Може ли да се hack-не или да бъде объркан от злонамерени хора?",
    answer:
      "Имаме защити срещу prompt injection и злоупотреби. Ботът не прави финансови транзакции автономно и не дава поверителна информация. В 2 години работа с AI ботове не сме имали security incident. Но за 100% сигурност - финансовите и лични данни винаги минават през вашите собствени системи.",
  },

  // КАТЕГОРИЯ 4: Цена и договор
  {
    id: "q11",
    category: "pricing",
    question: "Има ли пробен период?",
    answer:
      "Да, предлагаме 30-дневен пилотен период с реален бот и реални гости. Философията ни: ако не докажем стойност за 30 дни, не заслужаваме парите ви.",
  },
  {
    id: "q12",
    category: "pricing",
    question: "Мога ли да спра по всяко време?",
    answer:
      "Да. Без дълги договори, без неустойки. 30-дневно предизвестие и спираме. Всичките ви данни ви се изпращат в Excel/CSV. Предпочитаме да останете защото сме добри, не защото сте заключени.",
  },
  {
    id: "q13",
    category: "pricing",
    question: "Защо да плащам ежемесечно вместо еднократно?",
    answer:
      "Защото AI не е продукт - услуга е. Всеки месец: оптимизираме отговорите, добавяме нови scenarios, обновяваме AI модела, мониторираме качеството. Еднократен payment = статичен бот. Ежемесечен = жив, учещ се асистент.",
  },

  // КАТЕГОРИЯ 5: Човешки фактор
  {
    id: "q14",
    category: "human",
    question: "Гостите няма ли да се дразнят от бот?",
    answer:
      "Данните казват обратното. 94% от хората предпочитат instant отговор от бот срещу чакане 4-8 часа за човек. Ключовото: ботът НИКОГА не се преструва на човек. Ако гостът иска да говори с човек - веднага го свързваме. Много хотели ни казват: 'Гостите питат ботът неща, които не биха питали рецепцията - чувстват се по-свободни.'",
  },
  {
    id: "q15",
    category: "human",
    question: "Ще загубят ли служителите работата си?",
    answer:
      "Не. Ботът поема рутинните въпроси (75% от всички запитвания). Служителите се фокусират върху нещата с реална стойност: лично приветствие, сложни проблеми, VIP гости, продажби. Всички наши клиенти са запазили екипа си - той просто работи по-умно.",
  },
];

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function FAQ() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  // Filter FAQ items based on active category
  const filteredFAQs =
    activeCategory === "all"
      ? FAQ_DATA
      : FAQ_DATA.filter((faq) => faq.category === activeCategory);

  return (
    <section id="faq" className="bg-white py-32 max-md:py-20">
      <div className="container mx-auto max-w-[800px] px-4">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-nextbot-cyan">
            Чести въпроси
          </p>
          <h2 className="text-[clamp(2rem,4vw,2.5rem)] font-bold text-nextbot-midnight">
            Имате въпроси? Имаме отговори.
          </h2>
        </motion.div>

        {/* Category filter pills */}
        <motion.div
          className="mb-10 flex flex-wrap items-center justify-center gap-2"
          variants={pillStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {CATEGORIES.map((category) => (
            <motion.button
              key={category.id}
              variants={pillFade}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                activeCategory === category.id
                  ? "bg-nextbot-midnight text-white shadow-sm"
                  : "border border-nextbot-cloud bg-transparent text-gray-600 hover:border-nextbot-cyan hover:text-nextbot-midnight",
              )}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          className="mb-12"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          key={activeCategory} // Re-trigger animation on category change
        >
          {filteredFAQs.map((faq) => (
            <motion.div key={faq.id} variants={fadeUp}>
              <FAQItem question={faq.question} answer={faq.answer} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="rounded-3xl bg-nextbot-silver p-10 text-center max-md:p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="mb-2 text-xl font-semibold text-nextbot-midnight">
            Не намерихте отговора?
          </h3>
          <p className="mb-6 text-base text-gray-600">
            Пишете ни директно. Отговаряме до 2 часа.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 max-md:flex-col">
            <Button
              variant="default"
              size="lg"
              className="rounded-full"
              onClick={() => {
                // Open Voiceflow chat widget
                if (typeof window !== "undefined" && (window as any).voiceflow) {
                  (window as any).voiceflow.chat.open();
                }
              }}
            >
              💬 Чат с нас
            </Button>
            <a
              href="mailto:info@nextbot.me"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-nextbot-cloud/20 bg-white/5 px-7 text-base font-medium text-nextbot-midnight backdrop-blur-sm transition-all duration-200 hover:border-nextbot-cyan/40 hover:bg-white/10"
            >
              ✉️ info@nextbot.me
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
