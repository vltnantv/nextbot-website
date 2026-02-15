import { Resend } from 'resend'

let _resend: Resend | null = null
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY)
  return _resend
}
const notificationEmail = process.env.NOTIFICATION_EMAIL || 'valentinantov@icloud.com'

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

export async function sendDemoNotification(data: DemoBooking) {
  // Email to team
  await getResend().emails.send({
    from: 'Nextbot <noreply@nextbot.me>',
    to: notificationEmail,
    subject: `New Demo Request: ${data.name} - ${data.company || 'N/A'}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #2563eb, #9333ea); padding: 32px; border-radius: 16px 16px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Demo Request</h1>
        </div>
        <div style="background: #f9fafb; padding: 32px; border-radius: 0 0 16px 16px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #374151; width: 140px;">Name:</td>
              <td style="padding: 8px 0; color: #111827;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #374151;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #2563eb;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #374151;">Phone:</td>
              <td style="padding: 8px 0; color: #111827;">${data.phone || '-'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #374151;">Company:</td>
              <td style="padding: 8px 0; color: #111827;">${data.company || '-'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #374151;">Preferred Date:</td>
              <td style="padding: 8px 0; color: #111827;">${data.preferredDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #374151;">Preferred Time:</td>
              <td style="padding: 8px 0; color: #111827;">${data.preferredTime}</td>
            </tr>
            ${data.message ? `
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #374151; vertical-align: top;">Message:</td>
              <td style="padding: 8px 0; color: #111827;">${data.message}</td>
            </tr>
            ` : ''}
          </table>
        </div>
      </div>
    `
  })

  // Confirmation to customer
  await getResend().emails.send({
    from: 'Nextbot <noreply@nextbot.me>',
    to: data.email,
    subject: 'Demo Request Confirmed - Nextbot',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #2563eb, #9333ea); padding: 32px; border-radius: 16px 16px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Demo Request Received</h1>
        </div>
        <div style="background: white; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 16px 16px;">
          <p style="font-size: 16px; color: #374151; line-height: 1.6;">
            Hi ${data.name},
          </p>
          <p style="font-size: 16px; color: #374151; line-height: 1.6;">
            Thank you for your interest in Nextbot Neo! We received your demo request for:
          </p>
          <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <p style="margin: 4px 0; color: #111827;"><strong>Date:</strong> ${data.preferredDate}</p>
            <p style="margin: 4px 0; color: #111827;"><strong>Time:</strong> ${data.preferredTime}</p>
          </div>
          <p style="font-size: 16px; color: #374151; line-height: 1.6;">
            Our team will contact you within 24 hours to confirm the exact time.
          </p>
          <p style="font-size: 16px; color: #374151; line-height: 1.6;">
            Best regards,<br/>
            <strong>Nextbot Team</strong>
          </p>
        </div>
      </div>
    `
  })
}

export async function sendSignupNotification(data: SignupData) {
  // Email to team
  await getResend().emails.send({
    from: 'Nextbot <noreply@nextbot.me>',
    to: notificationEmail,
    subject: `New Signup: ${data.fullName} - ${data.businessName}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #059669, #10b981); padding: 32px; border-radius: 16px 16px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Signup</h1>
        </div>
        <div style="background: #f9fafb; padding: 32px; border-radius: 0 0 16px 16px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #374151; width: 140px;">Name:</td>
              <td style="padding: 8px 0; color: #111827;">${data.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #374151;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #2563eb;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #374151;">Phone:</td>
              <td style="padding: 8px 0; color: #111827;">${data.phone || '-'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #374151;">Business:</td>
              <td style="padding: 8px 0; color: #111827;">${data.businessName} (${data.businessType})</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #374151;">Channels:</td>
              <td style="padding: 8px 0; color: #111827;">${data.channels.join(', ') || '-'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #374151;">Volume:</td>
              <td style="padding: 8px 0; color: #111827;">${data.monthlyMessages || '-'}</td>
            </tr>
          </table>
        </div>
      </div>
    `
  })

  // Welcome email to customer
  await getResend().emails.send({
    from: 'Nextbot <noreply@nextbot.me>',
    to: data.email,
    subject: 'Welcome to Nextbot!',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #2563eb, #9333ea); padding: 32px; border-radius: 16px 16px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Welcome to Nextbot!</h1>
        </div>
        <div style="background: white; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 16px 16px;">
          <p style="font-size: 16px; color: #374151; line-height: 1.6;">
            Hi ${data.fullName},
          </p>
          <p style="font-size: 16px; color: #374151; line-height: 1.6;">
            Welcome to Nextbot! Your 30-day pilot has started. Our team will reach out shortly to help you set up Neo for <strong>${data.businessName}</strong>.
          </p>
          <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 12px 0; color: #1e40af;">What happens next:</h3>
            <p style="margin: 4px 0; color: #1e40af;">1. Our team contacts you within 24h</p>
            <p style="margin: 4px 0; color: #1e40af;">2. We set up Neo for your business</p>
            <p style="margin: 4px 0; color: #1e40af;">3. You test with real customers</p>
          </div>
          <p style="font-size: 16px; color: #374151; line-height: 1.6;">
            Questions? Reply to this email or call us at <strong>+359 894 288 119</strong>.
          </p>
          <p style="font-size: 16px; color: #374151; line-height: 1.6;">
            Best regards,<br/>
            <strong>Nextbot Team</strong>
          </p>
        </div>
      </div>
    `
  })
}
