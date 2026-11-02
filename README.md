# Nextbot Website

Premium AI automation company website built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 3.x
- **Animations:** Framer Motion
- **Code Quality:** ESLint + Prettier
- **Deployment:** Vercel

## 📦 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd nextbot-website

# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Edit .env.local and add your configuration

# Start development server
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

## 🔧 Environment Variables

Copy `.env.local.example` to `.env.local`. Every variable is described there
(Resend for the /razgovor form, OpenAI for the site chat, Web3Forms for the ARIA waiting list).

## 📜 Scripts

| Command          | Description                      |
| ---------------- | -------------------------------- |
| `npm run dev`    | Start development server         |
| `npm run build`  | Build for production             |
| `npm run start`  | Start production server          |
| `npm run lint`   | Run ESLint                       |
| `npm run format` | Format code with Prettier        |

## 📂 Project Structure

```
nextbot-website/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── not-found.tsx       # 404 page
│   ├── loading.tsx         # Loading state
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── button.tsx
│   │   ├── FAQItem.tsx
│   │   └── AddOnCard.tsx
│   ├── sections/           # Page sections
│   │   ├── hero.tsx
│   │   ├── features.tsx
│   │   ├── SocialProof.tsx
│   │   ├── Pricing.tsx
│   │   ├── FAQ.tsx
│   │   └── FinalCTA.tsx
│   ├── layout/             # Layout components
│   │   └── footer.tsx
├── lib/
│   ├── utils.ts            # Utility functions
│   └── constants.ts        # Site configuration
├── public/                 # Static assets
├── tailwind.config.ts      # Tailwind configuration
├── next.config.mjs         # Next.js configuration
├── vercel.json             # Vercel deployment config
└── tsconfig.json           # TypeScript config
```

## 🎨 Features

### Homepage Sections

1. **Hero** - Full viewport with gradient background
2. **Features** - 3 product cards (Hotels, E-commerce, Call Centers)
3. **Social Proof** - Stats, Pilot Program, Timeline
4. **Pricing** - Base price + Add-ons + Interactive calculator
5. **FAQ** - 15 questions with category filtering
6. **Final CTA** - Conversion-focused call to action

### Key Components

- **Interactive Pricing Calculator** - Real-time price updates
- **FAQ Accordion** - Smooth animations, category filtering
- **NEO chat** - the site chat (`components/demo/ChatWidget.tsx`, `/api/chat`)
- **Responsive Navigation** - Fixed header with smooth scroll
- **Animated Sections** - Framer Motion scroll triggers

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `RESEND_API_KEY`, `NOTIFICATION_EMAIL` (the /razgovor form)
   - `OPENAI_API_KEY` (the site chat)
   - `WEB3FORMS_ACCESS_KEY` (the ARIA waiting list)
4. Deploy!

### Manual Build & Deploy

```bash
# Build for production
npm run build

# Test production build locally
npm run start

# Deploy to your hosting provider
```

## 🔒 Security Headers

Security headers are configured in `vercel.json`:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## 📱 Responsive Design

- **Desktop:** Full-featured experience
- **Tablet:** Optimized grid layouts
- **Mobile:** Stack layouts, larger touch targets

## ♿ Accessibility

- Semantic HTML
- ARIA labels and roles
- Skip-to-content link
- Focus-visible indicators
- Keyboard navigation
- Reduced motion support

## 🎯 SEO

- Optimized metadata
- Structured data (JSON-LD):
  - Organization schema
  - Product schema
  - FAQPage schema
- Open Graph tags
- Twitter Card tags
- Sitemap-friendly structure

## 📄 License

© 2025 Nextbot EOOD. All rights reserved.

## 📞 Support

For questions or support:
- Email: info@nextbot.me
- Website: [nextbot.me](https://nextbot.me)

---

**Built with ❤️ by the Nextbot team**
