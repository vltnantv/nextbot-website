import { Resend } from 'resend'

let _resend: Resend | null = null
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY)
  return _resend
}
const notificationEmail = process.env.NOTIFICATION_EMAIL || 'info@nextbot.me'

interface DemoBooking {
  name: string
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

function emailWrapper(content: string) {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width: 560px; width: 100%;">
          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom: 32px;">
              <img src="https://www.nextbot.me/logo-icon.png" alt="Nextbot" width="48" height="48" style="display: block; border-radius: 12px;" />
            </td>
          </tr>
          <!-- Card -->
          <tr>
            <td style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 4px 24px rgba(0,0,0,0.04);">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 32px;">
              <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; color: #a1a1aa; line-height: 1.5;">
                Nextbot &middot; AI Communication Platform
              </p>
              <p style="margin: 4px 0 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; color: #d4d4d8;">
                <a href="https://www.nextbot.me" style="color: #a1a1aa; text-decoration: none;">nextbot.me</a>
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

const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"

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
      <td style="padding: 12px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; color: #71717a; letter-spacing: 0.02em; width: 130px; vertical-align: top;">${label}</td>
      <td style="padding: 12px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; color: #18181b; font-weight: 500;">${value}</td>
    </tr>`
}

function divider() {
  return '<tr><td colspan="2" style="border-bottom: 1px solid #f4f4f5;"></td></tr>'
}

// ─── Demo Confirmation (dark) ────────────────────────────────────────────────

function demoStep(num: string, title: string, desc: string) {
  return `
    <tr>
      <td style="padding-bottom: 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr>
          <td style="width: 40px; vertical-align: top;">
            <div style="width: 28px; height: 28px; border: 1px solid rgba(99,102,241,0.3); border-radius: 50%; text-align: center; line-height: 28px; font-family: ${font}; font-size: 12px; font-weight: 600; color: #6366f1;">${num}</div>
          </td>
          <td style="vertical-align: top;">
            <p style="margin: 0; font-family: ${font}; font-size: 14px; font-weight: 500; color: #e4e4e7;">${title}</p>
            <p style="margin: 4px 0 0; font-family: ${font}; font-size: 13px; color: #52525b; line-height: 1.5;">${desc}</p>
          </td>
        </tr></table>
      </td>
    </tr>`
}

function demoConfirmationContent(data: DemoBooking) {
  const firstName = data.name.split(' ')[0]
  return `
    <!-- Confirmed badge -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding: 0 0 32px;">
          <div style="display: inline-block; padding: 6px 16px; border: 1px solid rgba(34,197,94,0.2); background-color: rgba(34,197,94,0.06); border-radius: 20px;">
            <span style="font-family: ${font}; font-size: 12px; font-weight: 600; color: #4ade80; letter-spacing: 0.06em;">CONFIRMED</span>
          </div>
        </td>
      </tr>
    </table>

    <!-- Headline -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding: 0 0 36px;">
          <h1 style="margin: 0 0 12px; font-family: ${font}; font-size: 26px; font-weight: 600; color: #ffffff; letter-spacing: -0.03em;">Your demo is booked.</h1>
          <p style="margin: 0; font-family: ${font}; font-size: 15px; color: #71717a; line-height: 1.6;">
            Hi ${firstName}, we've received your request and will be in touch shortly.
          </p>
        </td>
      </tr>
    </table>

    <!-- Booking details card -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; margin-bottom: 36px;">
      <tr>
        <td style="padding: 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.04);">
                <p style="margin: 0 0 4px; font-family: ${font}; font-size: 11px; color: #52525b; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">Preferred Date</p>
                <p style="margin: 0; font-family: ${font}; font-size: 18px; color: #ffffff; font-weight: 600; letter-spacing: -0.02em;">${data.preferredDate || 'To be confirmed'}${data.preferredTime ? ` &middot; ${data.preferredTime}` : ''}</p>
              </td>
            </tr>
            ${data.company ? `
            <tr>
              <td style="padding-top: 16px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="width: 50%;">
                      <p style="margin: 0 0 4px; font-family: ${font}; font-size: 11px; color: #52525b; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">Name</p>
                      <p style="margin: 0; font-family: ${font}; font-size: 14px; color: #a1a1aa;">${data.name}</p>
                    </td>
                    <td>
                      <p style="margin: 0 0 4px; font-family: ${font}; font-size: 11px; color: #52525b; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">Company</p>
                      <p style="margin: 0; font-family: ${font}; font-size: 14px; color: #a1a1aa;">${data.company}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>` : ''}
          </table>
        </td>
      </tr>
    </table>

    <!-- What happens next -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 36px;">
      <tr>
        <td>
          <p style="margin: 0 0 20px; font-family: ${font}; font-size: 12px; color: #6366f1; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600;">What happens next</p>
        </td>
      </tr>
      ${demoStep('1', 'We confirm the exact time', 'Our team will reach out within 24 hours to finalize the schedule.')}
      ${demoStep('2', '20-min personalized demo', 'We\'ll show you how Neo works for your specific business and channels.')}
      ${demoStep('3', 'Custom implementation plan', 'You\'ll receive a tailored roadmap with timeline and projected ROI.')}
    </table>

    <!-- CTA -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 36px;">
      <tr>
        <td align="center">
          <a href="https://www.nextbot.me/neo" style="display: inline-block; padding: 14px 36px; background-color: #ffffff; color: #09090b; font-family: ${font}; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px;">Explore Neo While You Wait</a>
        </td>
      </tr>
    </table>

    <!-- Contact -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid rgba(255,255,255,0.06);">
      <tr>
        <td align="center" style="padding-top: 24px;">
          <p style="margin: 0; font-family: ${font}; font-size: 13px; color: #52525b; line-height: 1.6;">
            Questions? Reply to this email or call <span style="color: #a1a1aa;">+359 894 288 119</span>
          </p>
        </td>
      </tr>
    </table>
  `
}

// ─── Demo Booking ───────────────────────────────────────────────────────────

export async function sendDemoNotification(data: DemoBooking) {
  // Notification to team
  await getResend().emails.send({
    from: 'Nextbot <noreply@nextbot.me>',
    to: notificationEmail,
    subject: `Demo Request — ${data.name}${data.company ? ` / ${data.company}` : ''}`,
    html: emailWrapper(`
      <!-- Header -->
      <td style="padding: 36px 36px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <span style="display: inline-block; padding: 4px 12px; background-color: #dbeafe; color: #1d4ed8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; font-weight: 600; border-radius: 20px; letter-spacing: 0.04em;">NEW REQUEST</span>
              <h1 style="margin: 16px 0 4px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 22px; font-weight: 700; color: #18181b; letter-spacing: -0.02em;">Demo Request</h1>
              <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; color: #71717a;">Received just now</p>
            </td>
          </tr>
        </table>
      </td></tr><tr>
      <!-- Details -->
      <td style="padding: 28px 36px 36px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #f4f4f5; border-radius: 12px; overflow: hidden;">
          <tr><td style="padding: 4px 20px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              ${infoRow('Name', data.name)}
              ${divider()}
              ${infoRow('Email', `<a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a>`)}
              ${divider()}
              ${infoRow('Phone', data.phone || '—')}
              ${divider()}
              ${infoRow('Company', data.company || '—')}
              ${divider()}
              ${infoRow('Date', data.preferredDate || '—')}
              ${divider()}
              ${infoRow('Time', data.preferredTime || '—')}
              ${data.message ? `${divider()}${infoRow('Message', data.message)}` : ''}
            </table>
          </td></tr>
        </table>

        <!-- Quick actions -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top: 24px;">
          <tr>
            <td align="center">
              <a href="mailto:${data.email}" style="display: inline-block; padding: 12px 28px; background-color: #18181b; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 10px;">Reply to ${data.name.split(' ')[0]}</a>
            </td>
          </tr>
        </table>
      </td>
    `)
  })

  // Confirmation to customer (dark template)
  await getResend().emails.send({
    from: 'Nextbot <noreply@nextbot.me>',
    to: data.email,
    subject: 'Your demo is confirmed',
    html: darkEmailWrapper(demoConfirmationContent(data))
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

// ─── Sales Outreach ─────────────────────────────────────────────────────────

interface SalesOutreachData {
  recipientEmail: string
  recipientName: string
  companyName: string
  painPoint?: 'missed-leads' | 'slow-response' | 'scaling' | 'multilingual' | 'general'
}

function outreachStat(value: string, label: string) {
  return `
    <td align="center" style="padding: 16px 8px;">
      <p style="margin: 0; font-family: ${font}; font-size: 24px; font-weight: 600; color: #ffffff; letter-spacing: -0.02em;">${value}</p>
      <p style="margin: 4px 0 0; font-family: ${font}; font-size: 11px; color: #52525b; text-transform: uppercase; letter-spacing: 0.08em;">${label}</p>
    </td>`
}

function outreachFeature(title: string, desc: string) {
  return `
    <tr>
      <td style="padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.04);">
        <p style="margin: 0; font-family: ${font}; font-size: 14px; font-weight: 500; color: #e4e4e7;">${title}</p>
        <p style="margin: 4px 0 0; font-family: ${font}; font-size: 13px; color: #52525b; line-height: 1.5;">${desc}</p>
      </td>
    </tr>`
}

const painPointContent: Record<string, { hook: string; stat: string }> = {
  'missed-leads': {
    hook: 'Most businesses lose 60% of inbound leads because they reply too late. What if every inquiry got an instant, qualified response?',
    stat: 'Companies using AI for lead response see 3x higher conversion rates.',
  },
  'slow-response': {
    hook: 'Your customers expect a reply in minutes, not hours. We help businesses respond instantly across every channel — 24/7.',
    stat: 'Average response time drops from 4 hours to under 5 seconds.',
  },
  'scaling': {
    hook: 'Growing your support team is expensive. Growing your AI is not. Handle 10x the conversations without hiring.',
    stat: 'Businesses scale from 500 to 5,000 conversations/month without adding headcount.',
  },
  'multilingual': {
    hook: 'Your customers speak different languages. Your AI should too. Instant support in 12+ languages, no translation delays.',
    stat: 'Multilingual AI increases international conversion by 40%.',
  },
  'general': {
    hook: 'Your competitors are automating their sales and support with AI. The question is not if, but when — and the advantage goes to those who move first.',
    stat: 'Businesses deploying AI communication see 35% more qualified leads in the first month.',
  },
}

export async function sendSalesOutreach(data: SalesOutreachData) {
  const firstName = data.recipientName.split(' ')[0]
  const pain = painPointContent[data.painPoint || 'general']

  await getResend().emails.send({
    from: 'Valentin from NextBot <valentin@nextbot.me>',
    to: data.recipientEmail,
    subject: `${firstName}, a quick idea for ${data.companyName}`,
    html: darkEmailWrapper(`
      <!-- Greeting -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding: 0 0 32px;">
            <p style="margin: 0 0 24px; font-family: ${font}; font-size: 15px; color: #a1a1aa; line-height: 1.7;">
              Hi ${firstName},
            </p>
            <p style="margin: 0; font-family: ${font}; font-size: 15px; color: #a1a1aa; line-height: 1.7;">
              ${pain.hook}
            </p>
          </td>
        </tr>
      </table>

      <!-- Stat highlight -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; margin-bottom: 32px;">
        <tr>
          <td style="padding: 20px 24px;">
            <p style="margin: 0; font-family: ${font}; font-size: 13px; color: #71717a; line-height: 1.6; font-style: italic;">
              &ldquo;${pain.stat}&rdquo;
            </p>
          </td>
        </tr>
      </table>

      <!-- What we do -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
        <tr>
          <td>
            <p style="margin: 0 0 16px; font-family: ${font}; font-size: 12px; color: #6366f1; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600;">What NextBot does</p>
          </td>
        </tr>
        ${outreachFeature('AI Chat & Messaging', 'Instant responses on your website, WhatsApp, Messenger, and Instagram. Qualifies leads and books meetings automatically.')}
        ${outreachFeature('Voice AI (Coming Q3)', 'Answers inbound phone calls with natural conversation. No hold times, no missed calls.')}
        ${outreachFeature('CRM & Calendar Sync', 'Every conversation, lead, and booking flows directly into your existing systems.')}
      </table>

      <!-- Stats row -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; margin-bottom: 40px;">
        <tr>
          ${outreachStat('&lt;5s', 'Response')}
          ${outreachStat('24/7', 'Availability')}
          ${outreachStat('12+', 'Languages')}
        </tr>
      </table>

      <!-- CTA -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
        <tr>
          <td>
            <p style="margin: 0 0 20px; font-family: ${font}; font-size: 15px; color: #a1a1aa; line-height: 1.7;">
              I'd love to show you what this could look like for ${data.companyName}. Would a 15-minute call this week work?
            </p>
          </td>
        </tr>
        <tr>
          <td align="center">
            <a href="https://www.nextbot.me/book-demo" style="display: inline-block; padding: 14px 36px; background-color: #ffffff; color: #09090b; font-family: ${font}; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px;">Book a 15-min Call</a>
          </td>
        </tr>
      </table>

      <!-- Sign-off -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid rgba(255,255,255,0.06);">
        <tr>
          <td style="padding-top: 24px;">
            <p style="margin: 0; font-family: ${font}; font-size: 14px; color: #a1a1aa; line-height: 1.7;">
              Best,<br />
              <strong style="color: #e4e4e7;">Valentin</strong>
            </p>
            <p style="margin: 8px 0 0; font-family: ${font}; font-size: 12px; color: #52525b; line-height: 1.5;">
              Co-founder, NextBot<br />
              <a href="https://www.nextbot.me" style="color: #6366f1; text-decoration: none;">nextbot.me</a> &middot; +359 894 288 119
            </p>
          </td>
        </tr>
      </table>
    `)
  })
}
