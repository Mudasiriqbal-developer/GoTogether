const nodemailer = require('nodemailer');

// Check if email credentials are configured
const hasEmailConfig = process.env.GMAIL_EMAIL && process.env.GMAIL_APP_PASSWORD;

// Create transporter with proper Gmail SMTP configuration
const transporter = hasEmailConfig
  ? nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use STARTTLS (TLS, not SSL)
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      // Connection timeout
      connectionTimeout: 5000,
      socketTimeout: 5000,
    })
  : null;

// Verify connection only if configured
if (transporter) {
  transporter.verify((error, success) => {
    if (error) {
      console.error('⚠️  Email service error:', error.message);
      console.log('💡 Tip: Check GMAIL_EMAIL and GMAIL_APP_PASSWORD in .env');
    } else {
      console.log('✅ Email service is ready');
    }
  });
} else {
  console.log('⚠️  Email service disabled: GMAIL_EMAIL or GMAIL_APP_PASSWORD not configured');
  console.log('   Emails will not be sent, but API will continue to work.');
}

/**
 * Send email asynchronously (non-blocking)
 * If email fails, it will be logged but will NOT crash the API
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} htmlContent - Email HTML content
 * @returns {Promise} - Always resolves (never rejects)
 */
const sendEmail = async (to, subject, htmlContent) => {
  // If email is not configured, return success without sending
  if (!transporter) {
    console.log(`📧 Email disabled: Would send to ${to}`);
    return { success: true, skipped: true };
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.GMAIL_EMAIL,
      to,
      subject,
      html: htmlContent,
    });
    console.log(`✅ Email sent to ${to}:`, info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    // Log error but don't throw - API should not crash
    console.error(`❌ Email failed for ${to}:`, err.message);
    console.log('   API will continue - user registration/booking still succeeded');
    return { success: false, error: err.message };
  }
};

/**
 * Send email in background (fire and forget)
 * Does not wait for email to complete
 * Perfect for registration/booking confirmations
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} htmlContent - Email HTML content
 */
const sendEmailAsync = (to, subject, htmlContent) => {
  // Fire and forget - don't await, don't block
  sendEmail(to, subject, htmlContent)
    .then((result) => {
      if (result.success) {
        console.log(`✅ Async email sent to ${to}: ${result.messageId}`);
      } else {
        console.warn(`⚠️  Async email failed for ${to}: ${result.error}`);
      }
    })
    .catch((err) => {
      // This will almost never happen since sendEmail never rejects
      console.error(`❌ Unexpected async email error for ${to}:`, err.message);
    });
};

module.exports = { sendEmail, sendEmailAsync };
