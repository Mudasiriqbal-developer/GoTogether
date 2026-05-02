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
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 8px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; }
        .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
        .ride-details { background: #f0f4ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; font-size: 16px; }
        .detail-label { font-weight: bold; color: #667eea; }
        .detail-value { color: #333; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666; }
        .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Booking Confirmed!</h1>
        </div>
        
        <div class="content">
          <p>Hi <strong>${passengerName}</strong>,</p>
          
          <p>Great news! Your ride booking has been approved by the driver. Here are your ride details:</p>
          
          <div class="ride-details">
            <div class="detail-row">
              <span class="detail-label">📍 From:</span>
              <span class="detail-value">${origin}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">📍 To:</span>
              <span class="detail-value">${destination}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">📅 Date:</span>
              <span class="detail-value">${rideDate}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">⏰ Time:</span>
              <span class="detail-value">${time}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">👤 Driver:</span>
              <span class="detail-value">${driverName}</span>
            </div>
          </div>
          
          <p>Please make sure you're at the pickup location on time. Safe travels!</p>
          
          <div class="footer">
            <p>&copy; 2026 RideShare PK. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = { bookingConfirmationEmail };
