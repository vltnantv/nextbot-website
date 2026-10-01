'use client'

import Link from 'next/link'

const chatMessages = [
  { role: 'customer' as const, text: 'Здравейте, искам да запиша час.' },
  { role: 'neo' as const, text: 'Здравейте! За кой ден ви е удобно?' },
  { role: 'customer' as const, text: 'Сряда след 17:00.' },
  { role: 'neo' as const, text: '\u2713 Запазен час в сряда в 17:30.' },
]

function ChatMockup() {
  return (
    <div className="hero-chat-wrapper">
      <div className="hero-chat">
        {/* Header */}
        <div className="hero-chat-header">
          <div className="hero-chat-header-left">
            <span className="hero-chat-dot" />
            <span className="hero-chat-name">NEO</span>
            <span className="hero-chat-role">AI Assistant</span>
          </div>
          <span className="hero-chat-dots">&bull;&bull;&bull;</span>
        </div>

        {/* Messages */}
        <div className="hero-chat-messages">
          {chatMessages.map((msg, i) => (
            <div
              key={i}
              className={`hero-msg hero-msg-${msg.role}`}
              style={{ animationDelay: `${0.3 + i * 0.6}s` }}
            >
              {msg.role === 'customer' && <div className="hero-msg-avatar" />}
              <div className={`hero-msg-bubble hero-msg-bubble-${msg.role}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Footer input */}
        <div className="hero-chat-footer">
          <div className="hero-chat-input">
            <span className="hero-chat-placeholder">Напишете съобщение...</span>
          </div>
          <button className="hero-chat-send" aria-label="Send">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        .hero-chat-wrapper {
          animation: float 4s ease-in-out infinite;
          will-change: transform;
        }
        .hero-chat {
          width: 340px;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.5);
        }
        .hero-chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--color-border);
        }
        .hero-chat-header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .hero-chat-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          animation: pulseGlow 2s ease-in-out infinite;
        }
        .hero-chat-name {
          font-size: 14px;
          font-weight: 600;
          color: white;
        }
        .hero-chat-role {
          font-size: 12px;
          color: var(--color-text-muted);
        }
        .hero-chat-dots {
          color: var(--color-text-muted);
          font-size: 16px;
          letter-spacing: 2px;
        }
        .hero-chat-messages {
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-height: 220px;
          margin-bottom: 20px;
        }
        .hero-msg {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          opacity: 0;
          animation: messagePop 0.4s ease forwards;
        }
        .hero-msg-customer {
          justify-content: flex-start;
        }
        .hero-msg-neo {
          justify-content: flex-end;
        }
        .hero-msg-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--color-surface-2);
          border: 1px solid var(--color-border);
          flex-shrink: 0;
        }
        .hero-msg-bubble {
          padding: 10px 14px;
          font-size: 14px;
          line-height: 1.45;
          max-width: 220px;
        }
        .hero-msg-bubble-customer {
          background: var(--color-surface-2);
          color: var(--color-text-secondary);
          border-radius: 12px 12px 12px 4px;
        }
        .hero-msg-bubble-neo {
          background: var(--color-accent);
          color: white;
          border-radius: 12px 12px 4px 12px;
        }
        .hero-chat-footer {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .hero-chat-input {
          flex: 1;
          padding: 10px 14px;
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: 10px;
        }
        .hero-chat-placeholder {
          font-size: 13px;
          color: var(--color-text-muted);
        }
        .hero-chat-send {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--color-accent);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
          transition: background 0.2s;
        }
        .hero-chat-send:hover {
          background: var(--color-accent-hover);
        }
      `}</style>
    </div>
  )
}

export function Hero() {
  return (
    <section className="hero-section">
      {/* Glow orb */}
      <div
        className="glow-orb"
        style={{ width: 600, height: 600, top: -100, left: -200, opacity: 0.12 }}
      />

      <div className="hero-grid">
        {/* Left: text */}
        <div className="hero-text">
          <p className="animate-on-scroll hero-eyebrow">AI COMPANY</p>

          <h1 className="animate-on-scroll delay-1 hero-headline">
            We build AI products that replace repetitive work.
          </h1>

          <p className="animate-on-scroll delay-2 hero-sub">
            NEO is our first product — an AI assistant that handles your customer communication 24/7, so your team doesn't have to.
          </p>

          <div className="animate-on-scroll delay-3 hero-buttons">
            <Link href="/neo" className="btn-primary">
              See NEO
              <span style={{ marginLeft: 2 }}>&rarr;</span>
            </Link>
            <Link href="/book-demo" className="btn-secondary">
              Book a Call
            </Link>
          </div>
        </div>

        {/* Right: chat mockup (hidden on mobile) */}
        <div className="hero-mockup">
          <ChatMockup />
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          position: relative;
          min-height: 100svh;
          overflow: hidden;
          background: var(--color-bg);
        }
        .hero-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 55% 45%;
          align-items: center;
          max-width: 1280px;
          margin: 0 auto;
          padding: 120px 80px 80px 80px;
          min-height: 100svh;
        }
        .hero-text {
          display: flex;
          flex-direction: column;
        }
        .hero-eyebrow {
          font-size: 11px;
          letter-spacing: 0.15em;
          color: var(--color-accent);
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .hero-headline {
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: white;
          max-width: 560px;
        }
        .hero-sub {
          font-size: 18px;
          font-weight: 400;
          color: var(--color-text-secondary);
          line-height: 1.6;
          max-width: 460px;
          margin-top: 24px;
        }
        .hero-buttons {
          display: flex;
          gap: 12px;
          margin-top: 40px;
          flex-wrap: wrap;
        }
        .hero-mockup {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            padding: 120px 40px 60px 40px;
          }
          .hero-mockup {
            display: none;
          }
        }
        @media (max-width: 640px) {
          .hero-grid {
            padding: 100px 20px 48px 20px;
          }
          .hero-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  )
}
