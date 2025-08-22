import nodemailer from 'nodemailer'

// Create email transporter
function createTransporter() {
  // For development, we'll use a test account
  // In production, you'd use your actual email service (Gmail, SendGrid, etc.)
  
  if (process.env.EMAIL_SERVICE && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    // Production email configuration
    return nodemailer.createTransporter({
      service: process.env.EMAIL_SERVICE, // e.g., 'gmail'
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })
  } else {
    // Development - use Ethereal Email for testing
    console.log('📧 Using test email configuration (Ethereal)')
    return nodemailer.createTransporter({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'ethereal.user@ethereal.email',
        pass: 'ethereal.pass'
      }
    })
  }
}

// Send contact form email
export async function sendContactEmail({ name, email, message, submissionId }) {
  try {
    const transporter = createTransporter()

    // Email to the photographer (you)
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@anindawildscapes.com',
      to: process.env.EMAIL_TO || 'contact@anindawildscapes.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">New Contact Form Submission</h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2c3e50; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Submission ID:</strong> ${submissionId}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="background: #ffffff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="color: #2c3e50; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #e8f4f8; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #666;">
              This email was sent from your photography portfolio contact form.
              Reply directly to this email to respond to ${name}.
            </p>
          </div>
        </div>
      `,
      replyTo: email
    }

    const info = await transporter.sendMail(mailOptions)
    
    if (process.env.NODE_ENV !== 'production') {
      console.log('📧 Test email sent:', nodemailer.getTestMessageUrl(info))
    }
    
    console.log('✅ Contact email sent successfully')
    return info

  } catch (error) {
    console.error('❌ Error sending contact email:', error)
    throw error
  }
}

// Send auto-reply email to the person who submitted the form
export async function sendAutoReply({ name, email }) {
  try {
    const transporter = createTransporter()

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@anindawildscapes.com',
      to: email,
      subject: 'Thank you for contacting Aninda Wildscapes',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">Thank you for your message!</h2>
          
          <p>Hi ${name},</p>
          
          <p>Thank you for reaching out through my photography portfolio. I've received your message and will get back to you within 24-48 hours.</p>
          
          <p>In the meantime, feel free to explore more of my work on the website or follow me on social media for the latest updates.</p>
          
          <p>Best regards,<br>
          <strong>Aninda</strong><br>
          Wildlife & Nature Photographer</p>
          
          <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #666;">
              This is an automated response. Please do not reply to this email.
            </p>
          </div>
        </div>
      `
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Auto-reply email sent successfully')
    return info

  } catch (error) {
    console.error('❌ Error sending auto-reply email:', error)
    // Don't throw error for auto-reply failures
  }
}