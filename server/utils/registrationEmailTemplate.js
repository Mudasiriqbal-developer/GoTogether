const registrationWelcomeEmail = (userName) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
        .wrapper { background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 32px; font-weight: bold; }
        .content { padding: 40px; }
        .content h2 { color: #333; margin-top: 0; }
        .feature-list { list-style: none; padding: 0; margin: 20px 0; }
        .feature-list li { padding: 10px 0; border-bottom: 1px solid #eee; display: flex; align-items: center; }
        .feature-list li:last-child { border-bottom: none; }
        .feature-icon { font-size: 20px; margin-right: 15px; }
        .button-container { text-align: center; margin: 30px 0; }
        .button { display: inline-block; padding: 12px 35px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; transition: background 0.3s; }
        .button:hover { background: #764ba2; }
        .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #eee; }
        .social { margin-top: 20px; }
        .social-link { display: inline-block; margin: 0 10px; color: #667eea; text-decoration: none; font-weight: bold; }
        .alert { background: #fffbea; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px; }
        .alert-title { font-weight: bold; color: #cc8800; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="wrapper">
          <div class="header">
            <h1>🎉 Welcome to RideShare PK!</h1>
          </div>
          
          <div class="content">
            <h2>Hello ${userName},</h2>
            
            <p>Thank you for joining RideShare PK! We're excited to have you on board.</p>
            
            <p>Whether you're looking to <strong>share a ride, earn money</strong>, or <strong>save on transportation costs</strong>, you're in the right place.</p>
            
            <h3>What you can do now:</h3>
            <ul class="feature-list">
              <li>
                <span class="feature-icon">🚗</span>
                <strong>Post Rides</strong> - Share your commute and earn money
              </li>
              <li>
                <span class="feature-icon">🔍</span>
                <strong>Search Rides</strong> - Find affordable rides near you
              </li>
              <li>
                <span class="feature-icon">⭐</span>
                <strong>Build Your Profile</strong> - Add a photo and get verified
              </li>
              <li>
                <span class="feature-icon">💬</span>
                <strong>Connect with Users</strong> - Message drivers or passengers via WhatsApp
              </li>
              <li>
                <span class="feature-icon">📊</span>
                <strong>Track Your Stats</strong> - View earnings, ratings, and ride history
              </li>
            </ul>
            
            <div class="alert">
              <div class="alert-title">⚡ Quick Tip:</div>
              <p>Complete your profile with a photo and phone number to build trust with other users and get more ride requests!</p>
            </div>
            
            <div class="button-container">
              <a href="https://gotogether.pk/dashboard" class="button">Go to Dashboard</a>
            </div>
            
            <h3>Safety & Trust:</h3>
            <p>At RideShare PK, safety is our priority. All users go through a verification process, and you can rate your experience with every ride. If you ever feel unsafe, you can report the user or ride.</p>
            
            <h3>Have Questions?</h3>
            <p>Check out our <a href="https://gotogether.pk/help" style="color: #667eea; text-decoration: none;">Help Center</a> or reply to this email. Our support team is here to help!</p>
            
            <p>Happy riding! 🚗💨</p>
            
            <p><strong>The RideShare PK Team</strong></p>
          </div>
          
          <div class="footer">
            <p>&copy; 2026 RideShare PK. All rights reserved.</p>
            <p>Made with ❤️ in Pakistan</p>
            <div class="social">
              <a href="https://facebook.com/gotogether" class="social-link">Facebook</a>
              <a href="https://instagram.com/gotogether" class="social-link">Instagram</a>
              <a href="https://twitter.com/gotogether" class="social-link">Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = { registrationWelcomeEmail };
