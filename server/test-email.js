// Test email functionality
require('dotenv').config(); // Load environment variables
const { sendEmailAsync } = require('./utils/emailService');

console.log('Testing email service...');

// Test email to yourself
sendEmailAsync(
  'mudasiriqbal@gmail.com', // Replace with your email
  'Test Email - GoTogether',
  `
  <h1>🚗 GoTogether Email Test</h1>
  <p>If you received this email, the email service is working correctly!</p>
  <p>Time: ${new Date().toLocaleString()}</p>
  `
);

console.log('Test email sent (check your inbox/spam folder)');