const newBookingRequestEmail = (driverName, passengerName, rideDetails, seatsBooked) => {
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
        .booking-details { background: #fff3e0; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff9800; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; font-size: 16px; }
        .detail-label { font-weight: bold; color: #ff9800; }
        .detail-value { color: #333; }
        .action-buttons { text-align: center; margin: 30px 0; }
        .button { display: inline-block; padding: 12px 30px; margin: 0 10px; border-radius: 6px; text-decoration: none; font-weight: bold; }
        .approve-btn { background: #4caf50; color: white; }
        .reject-btn { background: #f44336; color: white; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📋 New Booking Request</h1>
        </div>
        
        <div class="content">
          <p>Hi <strong>${driverName}</strong>,</p>
          
          <p>You have a new booking request for your ride. Here are the details:</p>
          
          <div class="booking-details">
            <div class="detail-row">
              <span class="detail-label">👤 Passenger:</span>
              <span class="detail-value">${passengerName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">🪑 Seats:</span>
              <span class="detail-value">${seatsBooked}</span>
            </div>
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
          </div>
          
          <p>Please log in to your account to approve or reject this booking request.</p>
          
          <div class="footer">
            <p>&copy; 2026 RideShare PK. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

const bookingRejectionEmail = (passengerName, driverName, rideDetails, rejectionReason = 'No reason provided') => {
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
        .header { background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; }
        .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
        .ride-details { background: #fce4ec; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f44336; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; font-size: 16px; }
        .detail-label { font-weight: bold; color: #f44336; }
        .detail-value { color: #333; }
        .reason-box { background: #fff3e0; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff9800; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666; }
        .action-link { display: inline-block; padding: 12px 30px; background: #2196F3; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>❌ Booking Request Rejected</h1>
        </div>
        
        <div class="content">
          <p>Hi <strong>${passengerName}</strong>,</p>
          
          <p>Unfortunately, your booking request for the following ride has been rejected by the driver.</p>
          
          <div class="ride-details">
            <div class="detail-row">
              <span class="detail-label">👤 Driver:</span>
              <span class="detail-value">${driverName}</span>
            </div>
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
          </div>
          
          <div class="reason-box">
            <strong>Rejection Reason:</strong>
            <p>${rejectionReason}</p>
          </div>
          
          <p>Don't worry! There are many other rides available. Check our search rides page to find similar rides.</p>
          
          <div class="footer">
            <p>&copy; 2026 RideShare PK. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

const bookingCancellationEmail = (driverName, passengerName, rideDetails, seatsBooked) => {
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
        .header { background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; }
        .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
        .ride-details { background: #fff3e0; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff9800; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; font-size: 16px; }
        .detail-label { font-weight: bold; color: #ff9800; }
        .detail-value { color: #333; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📋 Booking Cancelled</h1>
        </div>
        
        <div class="content">
          <p>Hi <strong>${driverName}</strong>,</p>
          
          <p><strong>${passengerName}</strong> has cancelled their booking for your ride. A seat is now available.</p>
          
          <div class="ride-details">
            <div class="detail-row">
              <span class="detail-label">👤 Passenger:</span>
              <span class="detail-value">${passengerName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">🪑 Seats Freed:</span>
              <span class="detail-value">${seatsBooked}</span>
            </div>
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
          </div>
          
          <p>You can now accept new booking requests for this ride!</p>
          
          <div class="footer">
            <p>&copy; 2026 RideShare PK. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = { newBookingRequestEmail, bookingRejectionEmail, bookingCancellationEmail };
