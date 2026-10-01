import { Resend } from 'resend'

let _resend: Resend | null = null
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY)
  return _resend
}
const notificationEmail = process.env.NOTIFICATION_EMAIL || 'info@nextbot.me'

interface DemoBooking {
  name: string
  /** optional on /razgovor */
  email: string
  phone: string
  company: string
  preferredDate: string
  preferredTime: string
  message: string
}

interface SignupData {
  businessType: string
  businessName: string
  fullName: string
  email: string
  phone: string
  channels: string[]
  monthlyMessages: string
}

// ─── Shared template wrappers ───────────────────────────────────────────────

const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"


// Brand template (BRAND.md): cream background, white card, ink text, Bulgarian.
// Email clients do not load web fonts reliably, so system fonts are used.
function emailWrapper(content: string) {
  return `
<!DOCTYPE html>
<html lang="bg">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background-color: #FAF7F2; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAF7F2; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width: 560px; width: 100%;">
          <!-- Word mark: nextbot + green "online" dot -->
          <tr>
            <td align="left" style="padding: 0 4px 24px;">
              <a href="https://www.nextbot.me" style="text-decoration: none; font-family: ${font}; font-size: 21px; font-weight: 600; color: #1F1D1A; letter-spacing: -0.02em;">nextbot<span style="color: #1F9D63;">&nbsp;&#9679;</span></a>
            </td>
          </tr>
          <!-- Card -->
          <tr>
            <td style="background-color: #FFFFFF; border: 1px solid #E8E1D6; border-radius: 16px; overflow: hidden;">
              <!-- content is one or more table cells (<td>…</td></tr><tr><td>…</td>), so it gets its own row -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>${content}</tr></table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 4px 0;">
              <p style="margin: 0; font-family: ${font}; font-size: 13px; color: #6F6A62; line-height: 1.6;">
                NextBot · Всеки клиент получава отговор. Веднага.<br />
                <a href="https://www.nextbot.me" style="color: #6F6A62;">nextbot.me</a> · <a href="mailto:info@nextbot.me" style="color: #6F6A62;">info@nextbot.me</a> · +359 894 288 119
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function darkEmailWrapper(content: string) {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background-color: #09090b; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #09090b; padding: 48px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width: 560px; width: 100%;">
          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom: 40px;">
              <a href="https://www.nextbot.me" style="text-decoration: none;">
                <img src="https://www.nextbot.me/logo-icon.png" alt="Nextbot" width="36" height="36" style="display: inline-block; vertical-align: middle; border-radius: 8px; filter: invert(1) brightness(0);" />
                <span style="font-family: ${font}; font-size: 16px; font-weight: 600; color: #ffffff; vertical-align: middle; margin-left: 8px; letter-spacing: -0.02em;">NextBot</span>
              </a>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td>
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding-top: 48px; border-top: 1px solid rgba(255,255,255,0.06);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom: 16px;">
                    <a href="https://www.nextbot.me" style="font-family: ${font}; font-size: 13px; color: #52525b; text-decoration: none;">nextbot.me</a>
                    <span style="color: #27272a; margin: 0 8px;">&middot;</span>
                    <a href="mailto:info@nextbot.me" style="font-family: ${font}; font-size: 13px; color: #52525b; text-decoration: none;">info@nextbot.me</a>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <p style="margin: 0; font-family: ${font}; font-size: 11px; color: #3f3f46; line-height: 1.6;">
                      NextBot &middot; AI Communication Platform<br />
                      Sofia, Bulgaria
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function infoRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding: 12px 0; font-family: ${font}; font-size: 13px; color: #6F6A62; width: 130px; vertical-align: top;">${label}</td>
      <td style="padding: 12px 0; font-family: ${font}; font-size: 14px; color: #1F1D1A; font-weight: 500;">${value}</td>
    </tr>`
}

function divider() {
  return '<tr><td colspan="2" style="border-bottom: 1px solid #F0EAE0;"></td></tr>'
}

// ─── Confirmation to the customer ───────────────────────────────────────────

function nextStep(num: string, title: string, desc: string) {
  return `
    <tr>
      <td style="padding-bottom: 18px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr>
          <td style="width: 40px; vertical-align: top;">
            <div style="width: 28px; height: 28px; background-color: #F3EEE6; border-radius: 50%; text-align: center; line-height: 28px; font-family: ${font}; font-size: 13px; font-weight: 600; color: #1F1D1A;">${num}</div>
          </td>
          <td style="vertical-align: top;">
            <p style="margin: 0; font-family: ${font}; font-size: 15px; font-weight: 600; color: #1F1D1A;">${title}</p>
            <p style="margin: 4px 0 0; font-family: ${font}; font-size: 14px; color: #6F6A62; line-height: 1.55;">${desc}</p>
          </td>
        </tr></table>
      </td>
    </tr>`
}

function demoConfirmationContent(data: DemoBooking) {
  const firstName = data.name.split(' ')[0]
  const when = data.preferredDate
    ? `${data.preferredDate}${data.preferredTime ? `, ${data.preferredTime}` : ''}`
    : 'ще го уточним заедно'
  return `
    <td style="padding: 36px;">
      <p style="margin: 0 0 18px; font-family: ${font}; font-size: 13px; color: #1F9D63; font-weight: 600;">&#9679;&nbsp; Получихме заявката ви</p>
      <h1 style="margin: 0 0 10px; font-family: ${font}; font-size: 24px; font-weight: 600; color: #1F1D1A; letter-spacing: -0.02em; line-height: 1.25;">Благодарим, ${firstName}!</h1>
      <p style="margin: 0 0 28px; font-family: ${font}; font-size: 16px; color: #6F6A62; line-height: 1.6;">
        Ще ви се обадим, за да потвърдим часа за 15-минутния разговор.
      </p>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAF7F2; border-radius: 12px; margin-bottom: 28px;">
        <tr><td style="padding: 18px 20px;">
          <p style="margin: 0 0 4px; font-family: ${font}; font-size: 13px; color: #6F6A62;">Предпочитан час</p>
          <p style="margin: 0; font-family: ${font}; font-size: 17px; color: #1F1D1A; font-weight: 600;">${when}</p>
          ${data.company ? `<p style="margin: 12px 0 0; font-family: ${font}; font-size: 14px; color: #6F6A62;">${data.company}</p>` : ''}
        </td></tr>
      </table>

      <p style="margin: 0 0 16px; font-family: ${font}; font-size: 14px; font-weight: 600; color: #1F1D1A;">Какво следва</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
        ${nextStep('1', 'Разговор, 15 минути', 'Разказвате как работите и къде се губят клиенти.')}
        ${nextStep('2', 'Настройка до 7 дни', 'Учим асистента от сайта и документите ви и го свързваме с каналите ви.')}
        ${nextStep('3', 'Работи и отчита', 'Всяка седмица получавате отчет: колко запитвания и колко записани часове.')}
      </table>

      <a href="https://www.nextbot.me/demo" style="display: inline-block; padding: 13px 26px; background-color: #1F1D1A; color: #FAF7F2; font-family: ${font}; font-size: 15px; font-weight: 500; text-decoration: none; border-radius: 999px;">Пробвайте NEO междувременно</a>

      <p style="margin: 28px 0 0; font-family: ${font}; font-size: 14px; color: #6F6A62; line-height: 1.6;">
        Въпроси? Отговорете на този имейл или се обадете на +359 894 288 119 (и във Viber).
      </p>
    </td>
  `
}

// ─── Demo Booking ───────────────────────────────────────────────────────────

export async function sendDemoNotification(data: DemoBooking) {
  // Notification to team
  await getResend().emails.send({
    from: 'Nextbot <noreply@nextbot.me>',
    to: notificationEmail,
    subject: `Нова заявка за разговор — ${data.name}${data.company ? ` / ${data.company}` : ''}`,
    html: emailWrapper(`
      <!-- Header -->
      <td style="padding: 36px 36px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <span style="display: inline-block; padding: 4px 12px; background-color: #F3EEE6; color: #1F1D1A; font-family: ${font}; font-size: 12px; font-weight: 600; border-radius: 999px;">Нова заявка</span>
              <h1 style="margin: 16px 0 4px; font-family: ${font}; font-size: 22px; font-weight: 600; color: #1F1D1A; letter-spacing: -0.02em;">Заявка за разговор</h1>
              <p style="margin: 0; font-family: ${font}; font-size: 14px; color: #6F6A62;">Току-що от сайта</p>
            </td>
          </tr>
        </table>
      </td></tr><tr>
      <!-- Details -->
      <td style="padding: 28px 36px 36px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #E8E1D6; border-radius: 12px; overflow: hidden;">
          <tr><td style="padding: 4px 20px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              ${infoRow('Име', data.name)}
              ${divider()}
              ${infoRow('Имейл', data.email ? `<a href="mailto:${data.email}" style="color: #1F1D1A;">${data.email}</a>` : '—')}
              ${divider()}
              ${infoRow('Телефон', data.phone || '—')}
              ${divider()}
              ${infoRow('Бизнес и бранш', data.company || '—')}
              ${divider()}
              ${infoRow('Дата', data.preferredDate || '—')}
              ${divider()}
              ${infoRow('Час', data.preferredTime || '—')}
              ${data.message ? `${divider()}${infoRow('Бележка', data.message)}` : ''}
            </table>
          </td></tr>
        </table>

        <!-- Quick actions -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top: 24px;">
          <tr>
            <td align="center">
              <a href="${data.phone ? `tel:${data.phone.replace(/\s/g, '')}` : `mailto:${data.email}`}" style="display: inline-block; padding: 12px 26px; background-color: #1F1D1A; color: #FAF7F2; font-family: ${font}; font-size: 14px; font-weight: 500; text-decoration: none; border-radius: 999px;">Обадете се на ${data.name.split(' ')[0]}</a>
            </td>
          </tr>
        </table>
      </td>
    `)
  })

  // Confirmation to the customer - only when they left an email (it is optional)
  if (!data.email) return
  await getResend().emails.send({
    from: 'NextBot <noreply@nextbot.me>',
    to: data.email,
    replyTo: 'info@nextbot.me',
    subject: 'Получихме заявката ви за разговор',
    html: emailWrapper(demoConfirmationContent(data))
  })
}

// ─── Signup ─────────────────────────────────────────────────────────────────

export async function sendSignupNotification(data: SignupData) {
  // Notification to team
  await getResend().emails.send({
    from: 'Nextbot <noreply@nextbot.me>',
    to: notificationEmail,
    subject: `New Signup — ${data.fullName} / ${data.businessName}`,
    html: emailWrapper(`
      <!-- Header -->
      <td style="padding: 36px 36px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <span style="display: inline-block; padding: 4px 12px; background-color: #dcfce7; color: #15803d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; font-weight: 600; border-radius: 20px; letter-spacing: 0.04em;">NEW SIGNUP</span>
              <h1 style="margin: 16px 0 4px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 22px; font-weight: 700; color: #18181b; letter-spacing: -0.02em;">${data.businessName}</h1>
              <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; color: #71717a;">Signed up just now</p>
            </td>
          </tr>
        </table>
      </td></tr><tr>
      <!-- Details -->
      <td style="padding: 28px 36px 36px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #f4f4f5; border-radius: 12px; overflow: hidden;">
          <tr><td style="padding: 4px 20px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              ${infoRow('Name', data.fullName)}
              ${divider()}
              ${infoRow('Email', `<a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a>`)}
              ${divider()}
              ${infoRow('Phone', data.phone || '—')}
              ${divider()}
              ${infoRow('Business', `${data.businessName} <span style="color: #a1a1aa;">(${data.businessType})</span>`)}
              ${divider()}
              ${infoRow('Channels', data.channels.join(', ') || '—')}
              ${divider()}
              ${infoRow('Volume', data.monthlyMessages || '—')}
            </table>
          </td></tr>
        </table>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top: 24px;">
          <tr>
            <td align="center">
              <a href="mailto:${data.email}" style="display: inline-block; padding: 12px 28px; background-color: #18181b; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 10px;">Reply to ${data.fullName.split(' ')[0]}</a>
            </td>
          </tr>
        </table>
      </td>
    `)
  })

  // Welcome email to customer
  await getResend().emails.send({
    from: 'Nextbot <noreply@nextbot.me>',
    to: data.email,
    subject: 'Welcome to Nextbot — your pilot starts now',
    html: emailWrapper(`
      <!-- Header -->
      <td style="padding: 36px 36px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #2563eb, #7c3aed); border-radius: 50%; margin: 0 auto 20px; line-height: 56px; text-align: center;">
                <span style="font-size: 22px; color: white;">&#9889;</span>
              </div>
              <h1 style="margin: 0 0 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 24px; font-weight: 700; color: #18181b; letter-spacing: -0.02em;">Welcome to Nextbot!</h1>
              <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; color: #71717a; line-height: 1.5;">Hi ${data.fullName.split(' ')[0]}, your 30-day pilot for <strong style="color: #18181b;">${data.businessName}</strong> has started.</p>
            </td>
          </tr>
        </table>
      </td></tr><tr>
      <!-- Timeline -->
      <td style="padding: 32px 36px 36px;">
        <h3 style="margin: 0 0 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: 600; color: #18181b;">Your onboarding roadmap</h3>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding-bottom: 20px;">
              <table role="presentation" cellpadding="0" cellspacing="0"><tr>
                <td style="width: 36px; vertical-align: top;">
                  <div style="width: 28px; height: 28px; background-color: #2563eb; border-radius: 50%; text-align: center; line-height: 28px; font-family: -apple-system, sans-serif; font-size: 13px; font-weight: 700; color: white;">1</div>
                </td>
                <td style="vertical-align: top;">
                  <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: 600; color: #18181b;">Team contacts you within 24h</p>
                  <p style="margin: 4px 0 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; color: #71717a;">We'll discuss your needs and plan the setup</p>
                </td>
              </tr></table>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom: 20px;">
              <table role="presentation" cellpadding="0" cellspacing="0"><tr>
                <td style="width: 36px; vertical-align: top;">
                  <div style="width: 28px; height: 28px; background-color: #2563eb; border-radius: 50%; text-align: center; line-height: 28px; font-family: -apple-system, sans-serif; font-size: 13px; font-weight: 700; color: white;">2</div>
                </td>
                <td style="vertical-align: top;">
                  <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: 600; color: #18181b;">Neo gets configured for your business</p>
                  <p style="margin: 4px 0 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; color: #71717a;">Custom training, channels, and integrations</p>
                </td>
              </tr></table>
            </td>
          </tr>
          <tr>
            <td>
              <table role="presentation" cellpadding="0" cellspacing="0"><tr>
                <td style="width: 36px; vertical-align: top;">
                  <div style="width: 28px; height: 28px; background-color: #2563eb; border-radius: 50%; text-align: center; line-height: 28px; font-family: -apple-system, sans-serif; font-size: 13px; font-weight: 700; color: white;">3</div>
                </td>
                <td style="vertical-align: top;">
                  <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: 600; color: #18181b;">Go live with real customers</p>
                  <p style="margin: 4px 0 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; color: #71717a;">Test, iterate, and see results in days</p>
                </td>
              </tr></table>
            </td>
          </tr>
        </table>

        <!-- CTA -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top: 32px;">
          <tr>
            <td align="center">
              <a href="https://www.nextbot.me/neo" style="display: inline-block; padding: 14px 32px; background-color: #2563eb; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 10px;">Explore Neo Platform</a>
            </td>
          </tr>
        </table>

        <p style="margin: 24px 0 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; color: #a1a1aa; text-align: center; line-height: 1.5;">
          Questions? Reply to this email or call <strong style="color: #71717a;">+359 894 288 119</strong>
        </p>
      </td>
    `)
  })
}

// ─── Outreach helpers (hotel outreach) ─────────────────────────────────────

function outreachStat(value: string, label: string) {
  return `
    <td align="center" style="padding: 16px 8px;">
      <p style="margin: 0; font-family: ${font}; font-size: 24px; font-weight: 600; color: #ffffff; letter-spacing: -0.02em;">${value}</p>
      <p style="margin: 4px 0 0; font-family: ${font}; font-size: 11px; color: #52525b; text-transform: uppercase; letter-spacing: 0.08em;">${label}</p>
    </td>`
}

// ─── Lead Capture Notification ──────────────────────────────────────────────

interface LeadCaptureData {
  name: string
  email?: string | null
  phone?: string | null
  source?: string
  notes?: string | null
  companyName?: string
}

export async function sendLeadNotification(data: LeadCaptureData) {
  const contact: string[] = []
  if (data.email) contact.push(`<a href="mailto:${data.email}" style="color: #1F1D1A;">${data.email}</a>`)
  if (data.phone) contact.push(`<a href="tel:${data.phone}" style="color: #1F1D1A;">${data.phone}</a>`)

  await getResend().emails.send({
    from: 'NextBot <noreply@nextbot.me>',
    to: notificationEmail,
    subject: `Нов клиент от чата — ${data.name}${data.companyName ? ` (${data.companyName})` : ''}`,
    html: emailWrapper(`
      <td style="padding: 36px;">
        <p style="margin: 0 0 14px; font-family: ${font}; font-size: 13px; color: #1F9D63; font-weight: 600;">&#9679;&nbsp; Нов клиент</p>
        <h1 style="margin: 0 0 22px; font-family: ${font}; font-size: 22px; font-weight: 600; color: #1F1D1A; letter-spacing: -0.02em;">${data.name}</h1>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #E8E1D6; border-radius: 12px;">
          <tr><td style="padding: 4px 20px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              ${infoRow('Контакт', contact.length ? contact.join(' · ') : '—')}
              ${data.notes ? `${divider()}${infoRow('Интерес', data.notes)}` : ''}
              ${divider()}
              ${infoRow('Източник', data.source || 'Чат в сайта')}
              ${data.companyName ? `${divider()}${infoRow('Бизнес', data.companyName)}` : ''}
            </table>
          </td></tr>
        </table>
        ${data.email ? `
        <p style="margin: 24px 0 0;">
          <a href="mailto:${data.email}" style="display: inline-block; padding: 12px 26px; background-color: #1F1D1A; color: #FAF7F2; font-family: ${font}; font-size: 14px; font-weight: 500; text-decoration: none; border-radius: 999px;">Отговорете на ${data.name.split(' ')[0]}</a>
        </p>` : ''}
      </td>
    `)
  })
}

// ─── Bulgarian Hotel Outreach ───────────────────────────────────────────────

interface HotelOutreachData {
  recipientEmail: string
}

function hotelFeatureBg(title: string, desc: string) {
  return `
    <tr>
      <td style="padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.04);">
        <p style="margin: 0; font-family: ${font}; font-size: 14px; font-weight: 500; color: #e4e4e7;">${title}</p>
        <p style="margin: 4px 0 0; font-family: ${font}; font-size: 13px; color: #52525b; line-height: 1.5;">${desc}</p>
      </td>
    </tr>`
}

export async function sendHotelOutreachBg(data: HotelOutreachData) {
  await getResend().emails.send({
    from: 'Valentin from NextBot <valentin@nextbot.me>',
    to: data.recipientEmail,
    subject: 'AI асистент за Вашия хотел — повече резервации, по-малко пропуснати запитвания',
    html: darkEmailWrapper(`
      <!-- Greeting -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding: 0 0 28px;">
            <p style="margin: 0 0 20px; font-family: ${font}; font-size: 15px; color: #a1a1aa; line-height: 1.8;">
              Здравейте,
            </p>
            <p style="margin: 0; font-family: ${font}; font-size: 15px; color: #a1a1aa; line-height: 1.8;">
              Попаднах на Вашия хотел и реших да се свържа с Вас с една идея, която може да бъде полезна.
            </p>
          </td>
        </tr>
      </table>

      <!-- Main pitch -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 28px;">
        <tr>
          <td>
            <p style="margin: 0; font-family: ${font}; font-size: 15px; color: #a1a1aa; line-height: 1.8;">Разработихме <strong style="color: #e4e4e7;">AI асистент за хотели</strong>, който:</p>
          </td>
        </tr>
      </table>

      <!-- Features -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; margin-bottom: 28px;">
        <tr>
          <td style="padding: 20px 24px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              ${hotelFeatureBg('Отговаря вместо Вас — мигновено, 24/7', 'Гост пита за свободна стая в 23:00? AI-ът отговаря веднага с точна информация — от сайта, Messenger, Instagram или имейл. Без изчакване, без пропуснати запитвания.')}
              ${hotelFeatureBg('Познава хотела Ви в детайли', 'Стаи, цени, удобства, spa, ресторант, паркинг — AI-ът знае всичко и отговаря точно, на езика на госта. Поддържа 12+ езика автоматично.')}
              ${hotelFeatureBg('Превръща запитвания в резервации', 'Когато гостът е готов да резервира, AI-ът събира данните му и Ви изпраща готова заявка. Вие само потвърждавате.')}
            </table>
          </td>
        </tr>
      </table>

      <!-- Value prop -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
        <tr>
          <td>
            <p style="margin: 0; font-family: ${font}; font-size: 15px; color: #a1a1aa; line-height: 1.8;">Така хотелите реагират по-бързо на потенциалните гости и <strong style="color: #e4e4e7;">не губят резервации</strong>, когато няма кой да отговори веднага.</p>
          </td>
        </tr>
      </table>

      <!-- Stats row -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; margin-bottom: 32px;">
        <tr>
          ${outreachStat('&lt;5сек', 'Отговор')}
          ${outreachStat('24/7', 'Наличност')}
          ${outreachStat('12+', 'Езика')}
        </tr>
      </table>

      <!-- CTA -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
        <tr>
          <td>
            <p style="margin: 0 0 20px; font-family: ${font}; font-size: 15px; color: #a1a1aa; line-height: 1.8;">Ако имате интерес, ще се радвам да Ви покажа <strong style="color: #e4e4e7;">кратко 15-минутно демо</strong> как би работило конкретно за Вашия хотел.</p>
          </td>
        </tr>
        <tr>
          <td align="center">
            <a href="https://www.nextbot.me/book-demo" style="display: inline-block; padding: 14px 36px; background-color: #ffffff; color: #09090b; font-family: ${font}; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px;">Запазете 15-мин демо</a>
          </td>
        </tr>
      </table>

      <!-- Sign-off -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid rgba(255,255,255,0.06);">
        <tr>
          <td style="padding-top: 24px;">
            <p style="margin: 0; font-family: ${font}; font-size: 14px; color: #a1a1aa; line-height: 1.7;">
              Поздрави,<br />
              <strong style="color: #e4e4e7;">Валентин</strong>
            </p>
            <p style="margin: 8px 0 0; font-family: ${font}; font-size: 12px; color: #52525b; line-height: 1.5;">
              NextBot<br />
              <a href="https://www.nextbot.me" style="color: #6366f1; text-decoration: none;">nextbot.me</a> &middot; +359 894 288 119
            </p>
          </td>
        </tr>
      </table>
    `)
  })
}
