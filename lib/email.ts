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
          <!-- Word mark: nextbot (text, no image: email clients often block images) -->
          <tr>
            <td align="left" style="padding: 0 4px 24px;">
              <a href="https://www.nextbot.me" style="text-decoration: none; font-family: ${font}; font-size: 21px; font-weight: 600; color: #1F1D1A; letter-spacing: -0.02em;">nextbot</a>
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
      <p style="margin: 0 0 18px; font-family: ${font}; font-size: 13px; color: #1F9D63; font-weight: 600;">Получихме заявката ви</p>
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

/**
 * Sends the request to the team and, if the visitor left an email, a confirmation to them.
 * Throws if the email to the team did not go out (the Resend SDK returns errors instead of throwing).
 * The confirmation to the visitor is best-effort.
 */
export async function sendDemoNotification(data: DemoBooking) {
  if (!process.env.RESEND_API_KEY) throw new Error('RESEND_API_KEY is not set')
  // Notification to team
  const team = await getResend().emails.send({
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

  if (team.error) throw new Error(`Resend: ${team.error.name}`)

  // Confirmation to the customer - only when they left an email (it is optional)
  if (!data.email) return
  // the team already has the request: a failed confirmation must not make the visitor send it again
  try {
    const confirmation = await getResend().emails.send({
      from: 'NextBot <noreply@nextbot.me>',
      to: data.email,
      replyTo: 'info@nextbot.me',
      subject: 'Получихме заявката ви за разговор',
      html: emailWrapper(demoConfirmationContent(data))
    })
    if (confirmation.error) console.error('Confirmation email failed:', confirmation.error.name)
  } catch (e) {
    console.error('Confirmation email failed:', e instanceof Error ? e.message : 'unknown')
  }
}
