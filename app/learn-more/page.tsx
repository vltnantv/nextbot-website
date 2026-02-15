'use client'

import { useLanguage } from '@/lib/i18n'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

interface TabItem {
  id: string
  label: string
  icon: string
}

interface SectionContent {
  title: string
  content: string
  cta: string
}

interface PageContent {
  title: string
  subtitle: string
  tabs: TabItem[]
  sections: Record<string, SectionContent>
  cta: {
    title: string
    subtitle: string
    button: string
  }
}

const bgContent: PageContent = {
  title: 'Всичко за Nextbot Neo',
  subtitle: 'Пълно ръководство за AI асистента който никога не спи',

  tabs: [
    { id: 'overview', label: 'Общ преглед', icon: '📖' },
    { id: 'how-it-works', label: 'Как работи', icon: '⚙️' },
    { id: 'features', label: 'Функции', icon: '✨' },
    { id: 'use-cases', label: 'Приложения', icon: '🎯' },
    { id: 'technical', label: 'Технически детайли', icon: '🔧' }
  ],

  sections: {
    overview: {
      title: 'Какво е Nextbot Neo?',
      content: `Nextbot Neo е AI-базиран виртуален асистент, който автоматизира комуникацията между бизнеси и техните клиенти. Работи 24 часа в денонощието, 7 дни в седмицата, без почивки и празници.

## Основна идея

Представи си служител който:
- **Никога не спи** - отговаря на съобщения в 3 часа сутринта също толкова добре колкото в 3 следобед
- **Говори всички езици** - автоматично разпознава и отговаря на 12+ езика
- **Не прави грешки** - винаги дава точна информация според обучението си
- **Не взема отпуск** - работи всеки ден, включително празници и уикенди
- **Обработва множество разговори едновременно** - може да говори с 100 клиента наведнъж

Това е Neo.

## Защо Neo?

Традиционните решения за customer service имат проблеми:

**Проблем 1: Човешки служители**
- Работят 8 часа на ден
- Нуждаят се от почивки
- Могат да обработват 1-2 разговора наведнъж
- Струват \u20AC1,500-2,500/месец
- Правят грешки когато са уморени

**Проблем 2: Прости chatbot решения**
- Ограничени до предварително зададени отговори
- Не разбират контекст
- Не могат да водят естествени разговори
- Изискват сложно програмиране за всяка промяна

**Решение: Neo**
- Работи 24/7/365
- Разбира контекст и води естествени разговори
- Обработва неограничен брой разговори едновременно
- Започва от \u20AC120/месец
- Постоянна качествена комуникация

## За кого е Neo?

Neo е създаден за бизнеси които:
- Получават много запитвания от клиенти
- Губят клиенти заради бавни отговори
- Искат да предложат 24/7 поддръжка
- Работят с международни клиенти
- Искат да автоматизират рутинни задачи

**Идеален за:**
- 🏨 Хотели и настаняване
- 🍽️ Ресторанти и заведения
- 🛒 E-commerce магазини
- 🏠 Real estate агенции
- 💼 B2B услуги
- 🏥 Медицински практики
- 💪 Фитнес центрове
- 🎓 Образователни институции`,

      cta: 'Виж как работи'
    },

    'how-it-works': {
      title: 'Как работи Neo?',
      content: `Neo използва комбинация от естествена езикова обработка (NLP), машинно обучение (ML) и контекстуално разбиране за да води интелигентни разговори с клиенти.

## Технологичен стек

**1. Разбиране на езика (NLP Engine)**

Neo използва advanced NLP модел базиран на transformer архитектура за да:
- Разпознава намерението на клиента (booking, question, complaint, etc.)
- Извлича ключова информация (дати, имена, номера)
- Разбира контекста на разговора
- Поддържа памет през целия диалог

**2. Многоезична поддръжка**

Автоматично detection и превод на 12+ езика:
- Български 🇧🇬
- Английски 🇬🇧
- Немски 🇩🇪
- Руски 🇷🇺
- Френски 🇫🇷
- Испански 🇪🇸
- Италиански 🇮🇹
- Турски 🇹🇷
- Гръцки 🇬🇷
- Румънски 🇷🇴
- Полски 🇵🇱
- Сръбски 🇷🇸

**3. Обучение на Neo**

Neo се обучава на база на:

**A) Knowledge Base**
- FAQ документи
- Продуктови каталози
- Ценови листи
- Правила и политики
- Често задавани въпроси

**B) Conversation History**
- Анализира минали разговори
- Учи се от feedback
- Подобрява отговорите си с времето

**C) Business Rules**
- Работно време
- Налични услуги
- Специални промоции
- Ескалация правила

**4. Real-time Response Flow**

Когато клиент изпрати съобщение:

\`\`\`
1. Получаване (< 100ms)
   \u2193 Neo получава съобщението от WhatsApp/Messenger/etc

2. Анализ (< 200ms)
   \u2193 Разпознава език, извлича намерение

3. Context Retrieval (< 300ms)
   \u2193 Търси релевантна информация в knowledge base

4. Response Generation (< 400ms)
   \u2193 Генерира персонализиран отговор

5. Action Execution (< 100ms)
   \u2193 Изпълнява action (booking, notification, etc.)

6. Изпращане (< 100ms)
   \u2193 Изпраща отговора на клиента

TOTAL: < 1 секунда
\`\`\`

**5. Интеграции**

Neo се свързва с вашите системи чрез:

**REST API** - За custom интеграции
**Webhooks** - За real-time нотификации
**OAuth 2.0** - За сигурна автентикация
**Native Connectors** - За популярни платформи

**6. Качествен контрол**

**A) Confidence Scoring**
Neo дава confidence score на всеки отговор (0-100%)
- < 50%: Ескалира към човешки служител
- 50-70%: Отговаря с disclaimer
- > 70%: Отговаря с увереност

**B) Human-in-the-loop**
- Важни въпроси \u2192 notification до team
- Сложни случаи \u2192 ръчно преглеждане
- Complaints \u2192 автоматична ескалация

**C) Continuous Learning**
- A/B testing на отговори
- Feedback loop от клиенти
- Regular model updates`,

      cta: 'Виж технически детайли'
    },

    features: {
      title: 'Функции и възможности',
      content: `## Core Features

### 1. Multilingual Conversations
**Автоматично detection и превод**

Neo автоматично разпознава на кой език пише клиентът и отговаря на същия език. Без конфигурация, без настройки - просто работи.

Пример:
\`\`\`
Клиент (BG): "Имате ли свободни стаи за уикенда?"
Neo (BG): "Да! Имаме налични стаи. За колко човека?"

Client (EN): "Do you have rooms for the weekend?"
Neo (EN): "Yes! We have rooms available. For how many people?"

Kunde (DE): "Haben Sie Zimmer f\u00FCr das Wochenende?"
Neo (DE): "Ja! Wir haben verf\u00FCgbare Zimmer. F\u00FCr wie viele Personen?"
\`\`\`

### 2. Context-Aware Responses
**Помни целия разговор**

Neo не губи контекста. Ако клиент пита за цена, после за дата, после за плащане - Neo помни всички детайли.

Пример разговор:
\`\`\`
Клиент: "Колко струва стая?"
Neo: "Стандартна стая е 120\u20AC/нощ, делукс е 180\u20AC/нощ."

Клиент: "Делукс за 2 нощи колко излиза?"
Neo: "360\u20AC общо за 2 нощи в делукс стая. Искате ли да резервирам?"

Клиент: "Да, за следващия уикенд"
Neo: "Отлично! За 23-24 март, делукс стая, 360\u20AC. Как предпочитате да платите?"
\`\`\`

Забележи: Neo помни че става въпрос за "делукс стая" и "2 нощи" без клиентът да повтаря.

### 3. Automated Workflows
**Action triggers**

Neo може да изпълнява actions автоматично:

**Booking Flow:**
1. Клиент пита за стая
2. Neo проверява availability (Google Calendar API)
3. Предлага налични дати
4. Клиент избира
5. Neo записва reservation
6. Изпраща confirmation email
7. Добавя event в Calendar
8. Изпраща reminder 24h преди

**Lead Capture Flow:**
1. Клиент пита за услуга
2. Neo събира информация (име, телефон, нужди)
3. Създава lead в CRM (HubSpot/Salesforce)
4. Нотифицира sales team (Slack/Email)
5. Schedule follow-up task

### 4. Business Hours Awareness
**Работи винаги, но знае кога**

Neo може да:
- Отговаря винаги (24/7)
- Казва "Свържем се утре сутрин" след работно време
- Ескалира спешни случаи дори нощем
- Адаптира tone според времето

Пример:
\`\`\`
[23:00 вечерта]
Клиент: "Спешно! Има проблем с ключа!"
Neo: "Разбирам, това е спешно. Уведомявам дежурния staff веднага.
      Очаквайте обаждане до 5 минути."
      [\u2192 Calls on-duty manager]

[23:00 вечерта]
Клиент: "Имате ли басейн?"
Neo: "Да, имаме отопляем басейн. Работи 7:00-22:00.
      Имате други въпроси?"
      [\u2192 No escalation needed]
\`\`\`

### 5. Sentiment Analysis
**Разпознава емоции**

Neo анализира sentiment и адаптира:

**Positive sentiment:**
\`\`\`
Клиент: "Страхотно! Много сте бързи!"
Neo: "Благодаря! Радвам се че мога да помогна."
\`\`\`

**Negative sentiment:**
\`\`\`
Клиент: "Това е неприемливо! Чакам от вчера!"
Neo: "Извинявам се за забавянето. Прехвърлям веднага на мениджър."
      [\u2192 Immediate escalation + priority flag]
\`\`\`

### 6. Rich Media Support
**Не само текст**

Neo може да:
- Изпраща изображения (product photos, maps)
- Споделя PDF документи (меню, brochure)
- Изпраща location (Google Maps)
- Изпраща product links
- Share календар events
- Изпраща payment links (Stripe)

### 7. Analytics & Insights
**Dashboard с данни**

Виж точно какво се случва:
- Брой разговори (real-time)
- Average response time
- Customer satisfaction score
- Топ въпроси
- Peak hours
- Conversion rate
- Escalation rate

Export като:
- CSV/Excel
- PDF reports
- API access for BI tools`,

      cta: 'Виж всички функции'
    },

    'use-cases': {
      title: 'Реални приложения',
      content: `## Industry Use Cases

### 🏨 Хотели и настаняване

**Проблем:**
Хотел в Банско губи 30% от запитванията защото ги вижда на следващата сутрин.

**Решение с Neo:**
- 24/7 автоматични отговори
- Проверка на availability в real-time
- Booking без човешка намеса
- Изпращане на confirmations
- Reminders 24h преди check-in

**Резултат:**
- +40% повече резервации
- -60% изпуснати запитвания
- 15 спестени часа/седмица

**Примерен разговор:**
\`\`\`
Клиент [23:30]: Имате ли свободна стая за 2-ма, 15-17 март?
Neo: Да! Имаме налична double стая с mountain view за тези дати.
     Цена: 140\u20AC/нощ (280\u20AC общо за 2 нощи).

Клиент: Супер! Резервирам.
Neo: Отлично! Моля попълнете:
     - Име и фамилия
     - Телефон за контакт
     - Email

Клиент: Иван Петров, 0888123456, ivan@email.com
Neo: Благодаря! Резервацията е потвърдена.
     \u2705 Double room, 15-17 март
     \u2705 280\u20AC (плащане при check-in)
     \u2705 Check-in: 14:00, Check-out: 12:00

     Confirmation е изпратен на ivan@email.com
     Ще ви напомним 24h преди пристигане.
\`\`\`

### 🍽️ Ресторанти

**Проблем:**
Ресторант в София губи телефонни поръчки когато кухнята е busy.

**Решение с Neo:**
- WhatsApp / Messenger поръчки
- Автоматично confirmation
- Estimated delivery time
- Menu изпращане
- Special requests handling

**Резултат:**
- +25% повече поръчки
- Zero missed orders
- По-доволни клиенти

**Примерен разговор:**
\`\`\`
Клиент: Искам да поръчам за доставка
Neo: С удоволствие! За кой адрес?

Клиент: ул. Витоша 15
Neo: Зона Витоша - доставка 30-40 мин.
     Ето менюто: [PDF link]
     Или кажете какво искате.

Клиент: 2 маргарита пици, 1 капрезе салата
Neo: \u2705 2x Пица Маргарита (14лв)
     \u2705 1x Салата Капрезе (8лв)

     Общо: 36лв
     Доставка: включена (над 20лв)

     Потвърждавате?

Клиент: Да
Neo: Отлично! Поръчката е приета.
     \uD83D\uDCCD ул. Витоша 15
     \u23F0 Доставка: 30-40 мин
     \uD83D\uDCB0 36лв (карта или кеш?)

Клиент: Карта
Neo: Супер! Ще имате POS terminal.
     Confirmation #1247
\`\`\`

### 🛒 E-commerce

**Проблем:**
Online магазин губи клиенти които имат въпрос в 22:00 вечерта.

**Решение с Neo:**
- 24/7 product support
- Order tracking
- Returns handling
- Size/compatibility помощ

**Резултат:**
- +18% conversion rate
- -50% cart abandonment
- 95% customer satisfaction

### 🏠 Real Estate

**Проблем:**
Агенция получава 50 запитвания дневно, може да отговори на 20.

**Решение с Neo:**
- Автоматичен първи отговор
- Property details изпращане
- Viewing scheduling
- Qualification на leads

**Резултат:**
- 100% response rate
- +300% qualified leads
- Agent focus на затваряне

### 💼 B2B SaaS

**Проблем:**
Support team overwhelmed с repetitive въпроси.

**Решение с Neo:**
- Tier 1 support automation
- FAQ автоматични отговори
- Ticket creation
- Escalation когато трябва

**Резултат:**
- -70% support tickets
- Faster response time
- По-щастливи клиенти`,

      cta: 'Виж ценообразуване'
    },

    technical: {
      title: 'Технически спецификации',
      content: `## System Architecture

### Infrastructure

**Cloud Provider:** AWS
**Region:** EU-Central-1 (Frankfurt)
**Compliance:** GDPR, SOC 2, ISO 27001

**Core Services:**
- **Compute:** AWS Lambda + ECS
- **Database:** PostgreSQL (RDS), Redis (ElastiCache)
- **Storage:** S3 (encrypted)
- **CDN:** CloudFront
- **Message Queue:** SQS/SNS

### Performance Metrics

**Response Time:**
- P50: < 500ms
- P95: < 800ms
- P99: < 1200ms

**Availability:**
- SLA: 99.9% uptime
- Actual: 99.95% (last 12 months)
- Monitoring: 24/7 automated

**Scalability:**
- Concurrent conversations: Unlimited
- Messages/second: 10,000+
- Auto-scaling: Yes

### Security

**Data Encryption:**
- In transit: TLS 1.3
- At rest: AES-256
- Keys: AWS KMS

**Authentication:**
- OAuth 2.0
- API Keys with rotation
- IP whitelist (optional)
- 2FA for dashboard

**Data Retention:**
- Active conversations: Real-time
- Archived: 90 days default
- Custom retention: Available
- GDPR delete: < 30 days

### API Specifications

**REST API:**
\`\`\`
Base URL: https://api.nextbot.me/v1

Authentication:
  Header: Authorization: Bearer {API_KEY}

Rate Limits:
  - 100 requests/minute
  - 10,000 requests/day
  - Burst: 200 requests

Endpoints:
  POST   /messages/send
  GET    /messages
  GET    /messages/{id}
  POST   /webhooks
  GET    /analytics
  POST   /knowledge/upload
\`\`\`

**Webhooks:**
\`\`\`
{
  "event": "message.received",
  "timestamp": "2025-02-14T15:30:00Z",
  "data": {
    "id": "msg_abc123",
    "channel": "whatsapp",
    "sender": "+359888123456",
    "message": "Hello",
    "context": {...}
  }
}
\`\`\`

### Supported Platforms

**Messaging:**
- WhatsApp Business API
- Facebook Messenger
- Instagram Direct
- Telegram
- Viber Business
- Web Chat Widget

**Integrations:**
- Google Calendar / Outlook
- HubSpot / Salesforce CRM
- Gmail / Outlook Email
- Stripe / PayPal
- Zapier (5000+ apps)
- Custom via API

### Model Specifications

**Language Model:**
- Architecture: Transformer-based
- Parameters: 175B+
- Training: Continuous
- Fine-tuning: Per-customer

**Supported Languages:**
- Bulgarian (native)
- English (native)
- German, Russian, French
- Spanish, Italian, Turkish
- Greek, Romanian, Polish
- Serbian, Croatian

**Context Window:**
- Tokens: 8,192
- Conversation memory: Full history
- Knowledge base: Unlimited

### Compliance & Certifications

**GDPR:**
\u2705 Data Processing Agreement
\u2705 Right to deletion
\u2705 Data portability
\u2705 Privacy by design

**Security:**
\u2705 SOC 2 Type II
\u2705 ISO 27001
\u2705 Penetration tested (quarterly)
\u2705 Bug bounty program

**Backups:**
- Frequency: Every 6 hours
- Retention: 30 days
- Geographic: Multi-region
- Recovery time: < 1 hour`,

      cta: 'Виж API документация'
    }
  },

  cta: {
    title: 'Готов да започнеш?',
    subtitle: 'Запази 20-минутен demo call и виж Neo в действие',
    button: 'Запази demo'
  }
}

const enContent: PageContent = {
  title: 'Everything about Nextbot Neo',
  subtitle: 'Complete guide to the AI assistant that never sleeps',

  tabs: [
    { id: 'overview', label: 'Overview', icon: '📖' },
    { id: 'how-it-works', label: 'How it Works', icon: '⚙️' },
    { id: 'features', label: 'Features', icon: '✨' },
    { id: 'use-cases', label: 'Use Cases', icon: '🎯' },
    { id: 'technical', label: 'Technical Details', icon: '🔧' }
  ],

  sections: {
    overview: {
      title: 'What is Nextbot Neo?',
      content: `Nextbot Neo is an AI-powered virtual assistant that automates communication between businesses and their customers. It works 24 hours a day, 7 days a week, without breaks or holidays.

## The Core Idea

Imagine an employee who:
- **Never sleeps** - responds to messages at 3 AM just as well as at 3 PM
- **Speaks every language** - automatically detects and responds in 12+ languages
- **Never makes mistakes** - always provides accurate information based on training
- **Never takes time off** - works every day, including holidays and weekends
- **Handles multiple conversations simultaneously** - can talk to 100 customers at once

That's Neo.

## Why Neo?

Traditional customer service solutions have problems:

**Problem 1: Human employees**
- Work 8 hours a day
- Need breaks
- Can handle 1-2 conversations at a time
- Cost \u20AC1,500-2,500/month
- Make mistakes when tired

**Problem 2: Simple chatbot solutions**
- Limited to pre-set responses
- Don't understand context
- Can't hold natural conversations
- Require complex programming for every change

**Solution: Neo**
- Works 24/7/365
- Understands context and holds natural conversations
- Handles unlimited concurrent conversations
- Starts from \u20AC120/month
- Consistent quality communication

## Who is Neo for?

Neo is built for businesses that:
- Receive many customer inquiries
- Lose customers due to slow responses
- Want to offer 24/7 support
- Work with international clients
- Want to automate routine tasks

**Ideal for:**
- 🏨 Hotels and accommodation
- 🍽️ Restaurants and dining
- 🛒 E-commerce stores
- 🏠 Real estate agencies
- 💼 B2B services
- 🏥 Medical practices
- 💪 Fitness centers
- 🎓 Educational institutions`,

      cta: 'See how it works'
    },

    'how-it-works': {
      title: 'How does Neo work?',
      content: `Neo uses a combination of Natural Language Processing (NLP), Machine Learning (ML), and contextual understanding to hold intelligent conversations with customers.

## Technology Stack

**1. Language Understanding (NLP Engine)**

Neo uses an advanced NLP model based on transformer architecture to:
- Recognize customer intent (booking, question, complaint, etc.)
- Extract key information (dates, names, numbers)
- Understand conversation context
- Maintain memory throughout the dialogue

**2. Multilingual Support**

Automatic detection and translation of 12+ languages:
- Bulgarian 🇧🇬
- English 🇬🇧
- German 🇩🇪
- Russian 🇷🇺
- French 🇫🇷
- Spanish 🇪🇸
- Italian 🇮🇹
- Turkish 🇹🇷
- Greek 🇬🇷
- Romanian 🇷🇴
- Polish 🇵🇱
- Serbian 🇷🇸

**3. Training Neo**

Neo is trained based on:

**A) Knowledge Base**
- FAQ documents
- Product catalogs
- Price lists
- Rules and policies
- Frequently asked questions

**B) Conversation History**
- Analyzes past conversations
- Learns from feedback
- Improves responses over time

**C) Business Rules**
- Working hours
- Available services
- Special promotions
- Escalation rules

**4. Real-time Response Flow**

When a customer sends a message:

\`\`\`
1. Receive (< 100ms)
   \u2193 Neo receives the message from WhatsApp/Messenger/etc

2. Analysis (< 200ms)
   \u2193 Detects language, extracts intent

3. Context Retrieval (< 300ms)
   \u2193 Searches relevant info in knowledge base

4. Response Generation (< 400ms)
   \u2193 Generates personalized response

5. Action Execution (< 100ms)
   \u2193 Executes action (booking, notification, etc.)

6. Send (< 100ms)
   \u2193 Sends the response to the customer

TOTAL: < 1 second
\`\`\`

**5. Integrations**

Neo connects to your systems via:

**REST API** - For custom integrations
**Webhooks** - For real-time notifications
**OAuth 2.0** - For secure authentication
**Native Connectors** - For popular platforms

**6. Quality Control**

**A) Confidence Scoring**
Neo assigns a confidence score to every response (0-100%)
- < 50%: Escalates to human agent
- 50-70%: Responds with disclaimer
- > 70%: Responds confidently

**B) Human-in-the-loop**
- Important questions \u2192 notification to team
- Complex cases \u2192 manual review
- Complaints \u2192 automatic escalation

**C) Continuous Learning**
- A/B testing of responses
- Feedback loop from customers
- Regular model updates`,

      cta: 'See technical details'
    },

    features: {
      title: 'Features and Capabilities',
      content: `## Core Features

### 1. Multilingual Conversations
**Automatic detection and translation**

Neo automatically recognizes which language the customer is writing in and responds in the same language. No configuration, no setup - it just works.

Example:
\`\`\`
Client (BG): "Имате ли свободни стаи за уикенда?"
Neo (BG): "Да! Имаме налични стаи. За колко човека?"

Client (EN): "Do you have rooms for the weekend?"
Neo (EN): "Yes! We have rooms available. For how many people?"

Kunde (DE): "Haben Sie Zimmer f\u00FCr das Wochenende?"
Neo (DE): "Ja! Wir haben verf\u00FCgbare Zimmer. F\u00FCr wie viele Personen?"
\`\`\`

### 2. Context-Aware Responses
**Remembers the entire conversation**

Neo never loses context. If a customer asks about price, then dates, then payment - Neo remembers all details.

Example conversation:
\`\`\`
Client: "How much is a room?"
Neo: "Standard room is 120\u20AC/night, deluxe is 180\u20AC/night."

Client: "Deluxe for 2 nights, how much?"
Neo: "360\u20AC total for 2 nights in a deluxe room. Would you like to book?"

Client: "Yes, for next weekend"
Neo: "Excellent! March 23-24, deluxe room, 360\u20AC. How would you like to pay?"
\`\`\`

Note: Neo remembers it's about "deluxe room" and "2 nights" without the client repeating.

### 3. Automated Workflows
**Action triggers**

Neo can execute actions automatically:

**Booking Flow:**
1. Client asks about a room
2. Neo checks availability (Google Calendar API)
3. Offers available dates
4. Client selects
5. Neo records reservation
6. Sends confirmation email
7. Adds event to Calendar
8. Sends reminder 24h before

**Lead Capture Flow:**
1. Client asks about a service
2. Neo collects info (name, phone, needs)
3. Creates lead in CRM (HubSpot/Salesforce)
4. Notifies sales team (Slack/Email)
5. Schedules follow-up task

### 4. Business Hours Awareness
**Always on, but context-aware**

Neo can:
- Respond at all times (24/7)
- Say "Let's connect tomorrow morning" after hours
- Escalate urgent cases even at night
- Adapt tone based on time

Example:
\`\`\`
[11:00 PM]
Client: "Urgent! There's a problem with the key!"
Neo: "I understand, this is urgent. Notifying on-duty staff immediately.
      Expect a call within 5 minutes."
      [\u2192 Calls on-duty manager]

[11:00 PM]
Client: "Do you have a pool?"
Neo: "Yes, we have a heated pool. Open 7:00-22:00.
      Any other questions?"
      [\u2192 No escalation needed]
\`\`\`

### 5. Sentiment Analysis
**Recognizes emotions**

Neo analyzes sentiment and adapts:

**Positive sentiment:**
\`\`\`
Client: "Awesome! You're so fast!"
Neo: "Thank you! Happy to help."
\`\`\`

**Negative sentiment:**
\`\`\`
Client: "This is unacceptable! I've been waiting since yesterday!"
Neo: "I apologize for the delay. Transferring to a manager immediately."
      [\u2192 Immediate escalation + priority flag]
\`\`\`

### 6. Rich Media Support
**Not just text**

Neo can:
- Send images (product photos, maps)
- Share PDF documents (menu, brochure)
- Send location (Google Maps)
- Send product links
- Share calendar events
- Send payment links (Stripe)

### 7. Analytics & Insights
**Dashboard with data**

See exactly what's happening:
- Number of conversations (real-time)
- Average response time
- Customer satisfaction score
- Top questions
- Peak hours
- Conversion rate
- Escalation rate

Export as:
- CSV/Excel
- PDF reports
- API access for BI tools`,

      cta: 'See all features'
    },

    'use-cases': {
      title: 'Real-World Applications',
      content: `## Industry Use Cases

### 🏨 Hotels and Accommodation

**Problem:**
A hotel in Bansko loses 30% of inquiries because they see them the next morning.

**Solution with Neo:**
- 24/7 automatic responses
- Real-time availability checking
- Booking without human intervention
- Sending confirmations
- Reminders 24h before check-in

**Result:**
- +40% more reservations
- -60% missed inquiries
- 15 hours saved/week

**Sample conversation:**
\`\`\`
Client [11:30 PM]: Do you have a room for 2, March 15-17?
Neo: Yes! We have a double room with mountain view available.
     Price: 140\u20AC/night (280\u20AC total for 2 nights).

Client: Great! I'll book.
Neo: Excellent! Please provide:
     - Full name
     - Phone number
     - Email

Client: Ivan Petrov, +359888123456, ivan@email.com
Neo: Thank you! Reservation confirmed.
     \u2705 Double room, March 15-17
     \u2705 280\u20AC (payment at check-in)
     \u2705 Check-in: 14:00, Check-out: 12:00

     Confirmation sent to ivan@email.com
     We'll remind you 24h before arrival.
\`\`\`

### 🍽️ Restaurants

**Problem:**
A restaurant in Sofia misses phone orders when the kitchen is busy.

**Solution with Neo:**
- WhatsApp / Messenger orders
- Automatic confirmation
- Estimated delivery time
- Menu sharing
- Special requests handling

**Result:**
- +25% more orders
- Zero missed orders
- Happier customers

**Sample conversation:**
\`\`\`
Client: I'd like to order for delivery
Neo: Happy to help! What's the delivery address?

Client: 15 Vitosha St
Neo: Vitosha zone - delivery 30-40 min.
     Here's the menu: [PDF link]
     Or tell me what you'd like.

Client: 2 margherita pizzas, 1 caprese salad
Neo: \u2705 2x Pizza Margherita (14 BGN)
     \u2705 1x Caprese Salad (8 BGN)

     Total: 36 BGN
     Delivery: included (orders over 20 BGN)

     Confirm?

Client: Yes
Neo: Great! Order accepted.
     \uD83D\uDCCD 15 Vitosha St
     \u23F0 Delivery: 30-40 min
     \uD83D\uDCB0 36 BGN (card or cash?)

Client: Card
Neo: You'll have a POS terminal.
     Confirmation #1247
\`\`\`

### 🛒 E-commerce

**Problem:**
Online store loses customers who have questions at 10 PM.

**Solution with Neo:**
- 24/7 product support
- Order tracking
- Returns handling
- Size/compatibility help

**Result:**
- +18% conversion rate
- -50% cart abandonment
- 95% customer satisfaction

### 🏠 Real Estate

**Problem:**
Agency receives 50 inquiries daily, can respond to 20.

**Solution with Neo:**
- Automatic first response
- Property details sharing
- Viewing scheduling
- Lead qualification

**Result:**
- 100% response rate
- +300% qualified leads
- Agents focus on closing

### 💼 B2B SaaS

**Problem:**
Support team overwhelmed with repetitive questions.

**Solution with Neo:**
- Tier 1 support automation
- FAQ automatic responses
- Ticket creation
- Escalation when needed

**Result:**
- -70% support tickets
- Faster response time
- Happier customers`,

      cta: 'See pricing'
    },

    technical: {
      title: 'Technical Specifications',
      content: `## System Architecture

### Infrastructure

**Cloud Provider:** AWS
**Region:** EU-Central-1 (Frankfurt)
**Compliance:** GDPR, SOC 2, ISO 27001

**Core Services:**
- **Compute:** AWS Lambda + ECS
- **Database:** PostgreSQL (RDS), Redis (ElastiCache)
- **Storage:** S3 (encrypted)
- **CDN:** CloudFront
- **Message Queue:** SQS/SNS

### Performance Metrics

**Response Time:**
- P50: < 500ms
- P95: < 800ms
- P99: < 1200ms

**Availability:**
- SLA: 99.9% uptime
- Actual: 99.95% (last 12 months)
- Monitoring: 24/7 automated

**Scalability:**
- Concurrent conversations: Unlimited
- Messages/second: 10,000+
- Auto-scaling: Yes

### Security

**Data Encryption:**
- In transit: TLS 1.3
- At rest: AES-256
- Keys: AWS KMS

**Authentication:**
- OAuth 2.0
- API Keys with rotation
- IP whitelist (optional)
- 2FA for dashboard

**Data Retention:**
- Active conversations: Real-time
- Archived: 90 days default
- Custom retention: Available
- GDPR delete: < 30 days

### API Specifications

**REST API:**
\`\`\`
Base URL: https://api.nextbot.me/v1

Authentication:
  Header: Authorization: Bearer {API_KEY}

Rate Limits:
  - 100 requests/minute
  - 10,000 requests/day
  - Burst: 200 requests

Endpoints:
  POST   /messages/send
  GET    /messages
  GET    /messages/{id}
  POST   /webhooks
  GET    /analytics
  POST   /knowledge/upload
\`\`\`

**Webhooks:**
\`\`\`
{
  "event": "message.received",
  "timestamp": "2025-02-14T15:30:00Z",
  "data": {
    "id": "msg_abc123",
    "channel": "whatsapp",
    "sender": "+359888123456",
    "message": "Hello",
    "context": {...}
  }
}
\`\`\`

### Supported Platforms

**Messaging:**
- WhatsApp Business API
- Facebook Messenger
- Instagram Direct
- Telegram
- Viber Business
- Web Chat Widget

**Integrations:**
- Google Calendar / Outlook
- HubSpot / Salesforce CRM
- Gmail / Outlook Email
- Stripe / PayPal
- Zapier (5000+ apps)
- Custom via API

### Model Specifications

**Language Model:**
- Architecture: Transformer-based
- Parameters: 175B+
- Training: Continuous
- Fine-tuning: Per-customer

**Supported Languages:**
- Bulgarian (native)
- English (native)
- German, Russian, French
- Spanish, Italian, Turkish
- Greek, Romanian, Polish
- Serbian, Croatian

**Context Window:**
- Tokens: 8,192
- Conversation memory: Full history
- Knowledge base: Unlimited

### Compliance & Certifications

**GDPR:**
\u2705 Data Processing Agreement
\u2705 Right to deletion
\u2705 Data portability
\u2705 Privacy by design

**Security:**
\u2705 SOC 2 Type II
\u2705 ISO 27001
\u2705 Penetration tested (quarterly)
\u2705 Bug bounty program

**Backups:**
- Frequency: Every 6 hours
- Retention: 30 days
- Geographic: Multi-region
- Recovery time: < 1 hour`,

      cta: 'See API documentation'
    }
  },

  cta: {
    title: 'Ready to get started?',
    subtitle: 'Book a 20-minute demo call and see Neo in action',
    button: 'Book demo'
  }
}

const content = { bg: bgContent, en: enContent }

// Simple markdown-like renderer for the content
function ContentRenderer({ text }: { text: string }) {
  const lines = text.split('\n')
  const elements: React.ReactNode[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // H2
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-2xl sm:text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
          {line.slice(3)}
        </h2>
      )
      continue
    }

    // H3
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-xl sm:text-2xl font-bold mt-10 mb-4 text-gray-900 dark:text-white">
          {line.slice(4)}
        </h3>
      )
      continue
    }

    // Code block
    if (line.startsWith('```')) {
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      elements.push(
        <pre key={i} className="my-4 p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-800 dark:text-gray-200">{codeLines.join('\n')}</code>
        </pre>
      )
      continue
    }

    // Bold line (starts with **)
    if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(
        <p key={i} className="font-bold text-gray-900 dark:text-white mt-6 mb-2">
          {line.slice(2, -2)}
        </p>
      )
      continue
    }

    // Bold with content after colon
    if (line.startsWith('**') && line.includes(':**')) {
      const boldEnd = line.indexOf(':**') + 3
      const boldPart = line.slice(2, boldEnd - 3)
      const rest = line.slice(boldEnd)
      elements.push(
        <p key={i} className="mt-2 text-gray-600 dark:text-gray-400">
          <strong className="text-gray-900 dark:text-white">{boldPart}:</strong>{rest}
        </p>
      )
      continue
    }

    // List item with bold
    if (line.startsWith('- **')) {
      const boldEnd = line.indexOf('**', 4)
      const boldPart = line.slice(4, boldEnd)
      const rest = line.slice(boldEnd + 2)
      elements.push(
        <li key={i} className="flex items-start gap-2 ml-4 text-gray-600 dark:text-gray-400">
          <span className="text-blue-500 mt-1.5 flex-shrink-0">&bull;</span>
          <span><strong className="text-gray-900 dark:text-white">{boldPart}</strong>{rest}</span>
        </li>
      )
      continue
    }

    // Regular list item
    if (line.startsWith('- ')) {
      elements.push(
        <li key={i} className="flex items-start gap-2 ml-4 text-gray-600 dark:text-gray-400">
          <span className="text-blue-500 mt-1.5 flex-shrink-0">&bull;</span>
          <span>{line.slice(2)}</span>
        </li>
      )
      continue
    }

    // Numbered list
    if (/^\d+\.\s/.test(line)) {
      const match = line.match(/^(\d+)\.\s(.*)$/)
      if (match) {
        elements.push(
          <li key={i} className="flex items-start gap-3 ml-4 text-gray-600 dark:text-gray-400">
            <span className="text-blue-500 font-bold flex-shrink-0">{match[1]}.</span>
            <span>{match[2]}</span>
          </li>
        )
        continue
      }
    }

    // Empty line
    if (line.trim() === '') {
      elements.push(<div key={i} className="h-2" />)
      continue
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="text-gray-600 dark:text-gray-400 leading-relaxed">
        {line}
      </p>
    )
  }

  return <div className="space-y-1">{elements}</div>
}

export default function LearnMorePage() {
  const { lang } = useLanguage()
  const [activeTab, setActiveTab] = useState('overview')

  const t = content[lang as keyof typeof content]
  const activeContent = t.sections[activeTab]

  return (
    <main className="min-h-screen bg-white dark:bg-black pt-20">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white dark:from-gray-950 dark:to-black border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
              {t.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="sticky top-16 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex overflow-x-auto gap-2 py-4 scrollbar-hide">
            {t.tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all
                  ${activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }
                `}
              >
                <span className="text-xl">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
              {activeContent.title}
            </h2>

            <ContentRenderer text={activeContent.content} />

            {activeContent.cta && (
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                <Link
                  href={activeTab === 'technical' ? '/documentation' : activeTab === 'use-cases' ? '/neo#pricing' : '/neo'}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
                >
                  <span>{activeContent.cta}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t.cta.title}
          </h2>
          <p className="text-xl mb-8 text-white/90">
            {t.cta.subtitle}
          </p>
          <Link
            href="/demo"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-blue-600 font-semibold hover:scale-105 transition-transform text-lg"
          >
            {t.cta.button}
          </Link>
        </div>
      </section>
    </main>
  )
}
