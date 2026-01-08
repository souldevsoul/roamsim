import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

interface SendEmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: SendEmailOptions) {
  if (!resend) {
    console.log('Email not sent (Resend not configured):', { to, subject })
    return { success: false, error: 'Email service not configured' }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'RoamSIM <noreply@roamsim.com>',
      to,
      subject,
      html,
      text,
    })

    if (error) {
      console.error('Email send error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, id: data?.id }
  } catch (error) {
    console.error('Email error:', error)
    return { success: false, error: 'Failed to send email' }
  }
}

// Email templates
export function getUsageAlertEmail(params: {
  userName: string
  esimName: string
  usagePercent: number
  usedData: string
  totalData: string
}) {
  const { userName, esimName, usagePercent, usedData, totalData } = params

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; margin-bottom: 40px; }
    .logo { font-size: 24px; font-weight: bold; color: #000; }
    .logo span { color: #00f0ff; }
    .alert-box { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: white; padding: 30px; border-radius: 16px; margin-bottom: 30px; }
    .alert-title { font-size: 20px; font-weight: 600; margin-bottom: 16px; }
    .progress-container { background: rgba(255,255,255,0.1); border-radius: 8px; height: 12px; margin: 20px 0; overflow: hidden; }
    .progress-bar { height: 100%; background: linear-gradient(90deg, #00f0ff, #a855f7); border-radius: 8px; }
    .stats { display: flex; justify-content: space-between; margin-top: 20px; }
    .stat { text-align: center; }
    .stat-value { font-size: 24px; font-weight: bold; }
    .stat-label { font-size: 12px; opacity: 0.7; }
    .button { display: inline-block; background: linear-gradient(135deg, #00f0ff 0%, #a855f7 100%); color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 20px; }
    .footer { text-align: center; color: #666; font-size: 12px; margin-top: 40px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Roam<span>SIM</span></div>
    </div>

    <div class="alert-box">
      <div class="alert-title">⚠️ Data Usage Alert</div>
      <p>Hi ${userName},</p>
      <p>Your eSIM <strong>${esimName}</strong> has reached <strong>${usagePercent}%</strong> of your data allowance.</p>

      <div class="progress-container">
        <div class="progress-bar" style="width: ${Math.min(usagePercent, 100)}%"></div>
      </div>

      <div class="stats">
        <div class="stat">
          <div class="stat-value">${usedData}</div>
          <div class="stat-label">Used</div>
        </div>
        <div class="stat">
          <div class="stat-value">${totalData}</div>
          <div class="stat-label">Total</div>
        </div>
      </div>

      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="button">View Dashboard</a>
    </div>

    <p>Consider topping up your data or purchasing a new plan to stay connected.</p>

    <div class="footer">
      <p>You received this email because you set up usage alerts on RoamSIM.</p>
      <p>© ${new Date().getFullYear()} RoamSIM. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`

  const text = `
Data Usage Alert - RoamSIM

Hi ${userName},

Your eSIM "${esimName}" has reached ${usagePercent}% of your data allowance.

Used: ${usedData}
Total: ${totalData}

View your dashboard at: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard

Consider topping up your data or purchasing a new plan to stay connected.

You received this email because you set up usage alerts on RoamSIM.
`

  return { html, text }
}

export function getOrderConfirmationEmail(params: {
  userName: string
  orderNo: string
  items: Array<{ name: string; location: string; quantity: number }>
  total: string
}) {
  const { userName, orderNo, items, total } = params

  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
        <strong>${item.name}</strong><br>
        <span style="color: #666; font-size: 14px;">${item.location}</span>
      </td>
      <td style="padding: 12px 0; border-bottom: 1px solid #eee; text-align: right;">x${item.quantity}</td>
    </tr>
  `).join('')

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; margin-bottom: 40px; }
    .logo { font-size: 24px; font-weight: bold; color: #000; }
    .logo span { color: #00f0ff; }
    .success-box { background: #ecfdf5; border: 1px solid #10b981; color: #065f46; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 30px; }
    .order-details { background: #f9fafb; padding: 24px; border-radius: 12px; }
    .order-number { font-size: 14px; color: #666; margin-bottom: 20px; }
    table { width: 100%; border-collapse: collapse; }
    .total { font-size: 18px; font-weight: bold; padding-top: 16px; border-top: 2px solid #e5e7eb; margin-top: 16px; }
    .button { display: inline-block; background: linear-gradient(135deg, #00f0ff 0%, #a855f7 100%); color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 24px; }
    .footer { text-align: center; color: #666; font-size: 12px; margin-top: 40px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Roam<span>SIM</span></div>
    </div>

    <div class="success-box">
      <h2 style="margin: 0 0 8px 0;">✅ Order Confirmed!</h2>
      <p style="margin: 0;">Your eSIM is being prepared</p>
    </div>

    <p>Hi ${userName},</p>
    <p>Thank you for your order! Your eSIM will be ready shortly and you'll receive another email with your activation QR code.</p>

    <div class="order-details">
      <div class="order-number">Order #${orderNo}</div>
      <table>
        ${itemsHtml}
        <tr>
          <td class="total">Total</td>
          <td class="total" style="text-align: right;">${total}</td>
        </tr>
      </table>
    </div>

    <div style="text-align: center;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="button">View Order</a>
    </div>

    <div class="footer">
      <p>Questions? Contact us at support@roamsim.com</p>
      <p>© ${new Date().getFullYear()} RoamSIM. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`

  const text = `
Order Confirmed - RoamSIM

Hi ${userName},

Thank you for your order! Your eSIM will be ready shortly.

Order #${orderNo}

${items.map(item => `- ${item.name} (${item.location}) x${item.quantity}`).join('\n')}

Total: ${total}

View your order at: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard

Questions? Contact us at support@roamsim.com
`

  return { html, text }
}
