const bookingConfirmationEmail = (passengerName, driverName, rideDetails) => {
  const { origin, destination, date, time } = rideDetails;
  const rideDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1f2937; margin: 0; padding: 0; background-color: #f3f4f6; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #f3f4f6; padding-bottom: 40px; }
        .main { background-color: #ffffff; margin: 0 auto; width: 100%; max-width: 600px; border-spacing: 0; color: #1f2937; }
        .header { background-color: #000000; padding: 40px 20px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; }
        .content { padding: 40px 30px; }
        .celebration { text-align: center; margin-bottom: 30px; }
        .celebration h2 { font-size: 24px; font-weight: 800; color: #10b981; margin: 0; }
        .info-card { background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; margin-bottom: 30px; }
        .ride-path { position: relative; padding-left: 30px; margin: 20px 0; }
        .ride-path::before { content: ''; position: absolute; left: 7px; top: 10px; bottom: 10px; width: 2px; background: #e5e7eb; }
        .dot { position: absolute; left: 0; width: 16px; height: 16px; border-radius: 50%; background: #ffffff; border: 3px solid #000; z-index: 1; }
        .dot.start { top: 0; }
        .dot.end { bottom: 0; border-color: #10b981; }
        .location { margin-bottom: 24px; }
        .loc-label { font-size: 12px; text-transform: uppercase; color: #6b7280; font-weight: 600; margin-bottom: 4px; }
        .loc-name { font-size: 16px; font-weight: 500; }
        .stats { border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 20px; }
        .stat-item { margin-bottom: 12px; }
        .stat-label { font-size: 12px; color: #6b7280; }
        .stat-value { font-size: 15px; font-weight: 600; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <table class="main">
          <tr>
            <td class="header">
              <h1>GoTogether</h1>
            </td>
          </tr>
          <tr>
            <td class="content">
              <div class="celebration">
                <h2>Your ride is confirmed!</h2>
                <p>Pack your bags, ${passengerName}. Your booking was approved.</p>
              </div>
              
              <div class="info-card">
                <div class="ride-path">
                  <div class="dot start"></div>
                  <div class="location">
                    <div class="loc-label">Pickup</div>
                    <div class="loc-name">${origin}</div>
                  </div>
                  <div class="dot end"></div>
                  <div class="location">
                    <div class="loc-label">Drop-off</div>
                    <div class="loc-name">${destination}</div>
                  </div>
                </div>
                
                <div class="stats">
                  <div class="stat-item">
                    <span class="stat-label">Driver:</span>
                    <span class="stat-value">${driverName}</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Date:</span>
                    <span class="stat-value">${rideDate}</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Time:</span>
                    <span class="stat-value">${time}</span>
                  </div>
                </div>
              </div>

              <p style="text-align: center; color: #6b7280; font-size: 14px;">
                Please be at the pickup location 5 minutes early. Have a safe journey!
              </p>
            </td>
          </tr>
          <tr>
            <td class="footer">
              <p>&copy; 2026 GoTogether. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </div>
    </body>
    </html>
  `;
};

module.exports = { bookingConfirmationEmail };
