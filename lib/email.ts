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

// ─── Shared template wrapper ────────────────────────────────────────────────

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

  // Confirmation to customer
  await getResend().emails.send({
    from: 'Nextbot <noreply@nextbot.me>',
    to: data.email,
    subject: 'Your demo request is confirmed',
    html: emailWrapper(`
      <!-- Header -->
      <td style="padding: 36px 36px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #22c55e, #16a34a); border-radius: 50%; margin: 0 auto 20px; line-height: 56px; text-align: center;">
                <span style="font-size: 24px; color: white;">&#10003;</span>
              </div>
              <h1 style="margin: 0 0 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 24px; font-weight: 700; color: #18181b; letter-spacing: -0.02em;">Request Received</h1>
              <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; color: #71717a; line-height: 1.5;">Hi ${data.name.split(' ')[0]}, we got your demo request!</p>
            </td>
          </tr>
        </table>
      </td></tr><tr>
      <!-- Booking details card -->
      <td style="padding: 28px 36px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #fafafa; border-radius: 12px; overflow: hidden;">
          <tr><td style="padding: 20px 24px;">
            <p style="margin: 0 0 4px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; color: #a1a1aa; font-weight: 600; letter-spacing: 0.06em;">YOUR PREFERRED TIME</p>
            <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 18px; color: #18181b; font-weight: 600;">${data.preferredDate}${data.preferredTime ? ` &middot; ${data.preferredTime}` : ''}</p>
          </td></tr>
        </table>
      </td></tr><tr>
      <!-- Next steps -->
      <td style="padding: 0 36px 36px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr><td>
            <h3 style="margin: 0 0 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: 600; color: #18181b;">What happens next</h3>
          </td></tr>
          <tr><td style="padding-bottom: 12px;">
            <table role="presentation" cellpadding="0" cellspacing="0"><tr>
              <td style="width: 28px; vertical-align: top;">
                <div style="width: 22px; height: 22px; background-color: #dbeafe; border-radius: 50%; text-align: center; line-height: 22px; font-family: -apple-system, sans-serif; font-size: 11px; font-weight: 700; color: #2563eb;">1</div>
              </td>
              <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; color: #52525b; line-height: 1.5;">We'll confirm the exact time within 24 hours</td>
            </tr></table>
          </td></tr>
          <tr><td style="padding-bottom: 12px;">
            <table role="presentation" cellpadding="0" cellspacing="0"><tr>
              <td style="width: 28px; vertical-align: top;">
                <div style="width: 22px; height: 22px; background-color: #dbeafe; border-radius: 50%; text-align: center; line-height: 22px; font-family: -apple-system, sans-serif; font-size: 11px; font-weight: 700; color: #2563eb;">2</div>
              </td>
              <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; color: #52525b; line-height: 1.5;">20-minute personalized demo of Neo</td>
            </tr></table>
          </td></tr>
          <tr><td>
            <table role="presentation" cellpadding="0" cellspacing="0"><tr>
              <td style="width: 28px; vertical-align: top;">
                <div style="width: 22px; height: 22px; background-color: #dbeafe; border-radius: 50%; text-align: center; line-height: 22px; font-family: -apple-system, sans-serif; font-size: 11px; font-weight: 700; color: #2563eb;">3</div>
              </td>
              <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; color: #52525b; line-height: 1.5;">Custom setup plan for your business</td>
            </tr></table>
          </td></tr>
        </table>

        <!-- CTA -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top: 28px;">
          <tr>
            <td align="center">
              <a href="https://www.nextbot.me/neo" style="display: inline-block; padding: 14px 32px; background-color: #2563eb; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 10px;">Explore Neo</a>
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
