const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Test connection
transporter.verify((error, success) => {
  if (error) {
    console.log('Email service error:', error);
  } else {
    console.log('Email service is ready');
  }
});

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.GMAIL_EMAIL,
      to,
      subject,
      html: htmlContent,
    });
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error('Error sending email:', err);
    return { success: false, error: err.message };
  }
};

module.exports = { sendEmail };
