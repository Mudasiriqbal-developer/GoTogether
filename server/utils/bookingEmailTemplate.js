const newBookingRequestEmail = (driverName, passengerName, rideDetails, seatsBooked, bookingId, baseUrl) => {
  const { origin, destination, date, time } = rideDetails;
  const rideDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const approveUrl = `${baseUrl}/api/bookings/${bookingId}/direct-action?action=approve`;
  const rejectUrl = `${baseUrl}/api/bookings/${bookingId}/direct-action?action=reject`;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1f2937; margin: 0; padding: 0; background-color: #f3f4f6; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #f3f4f6; padding-bottom: 40px; }
        .main { background-color: #ffffff; margin: 0 auto; width: 100%; max-width: 600px; border-spacing: 0; font-family: sans-serif; color: #1f2937; }
        .header { background-color: #000000; padding: 40px 20px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.025em; }
        .content { padding: 40px 30px; }
        .greeting { font-size: 20px; font-weight: 600; margin-bottom: 20px; color: #111827; }
        .info-card { background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; margin-bottom: 30px; }
        .ride-path { position: relative; padding-left: 30px; margin: 20px 0; }
        .ride-path::before { content: ''; position: absolute; left: 7px; top: 10px; bottom: 10px; width: 2px; background: #e5e7eb; }
        .dot { position: absolute; left: 0; width: 16px; height: 16px; border-radius: 50%; background: #ffffff; border: 3px solid #000; z-index: 1; }
        .dot.start { top: 0; }
        .dot.end { bottom: 0; border-color: #3b82f6; }
        .location { margin-bottom: 24px; }
        .location:last-child { margin-bottom: 0; }
        .loc-label { font-size: 12px; text-transform: uppercase; color: #6b7280; font-weight: 600; margin-bottom: 4px; }
        .loc-name { font-size: 16px; font-weight: 500; }
        .stats { display: flex; border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 20px; }
        .stat-item { flex: 1; }
        .stat-label { font-size: 12px; color: #6b7280; margin-bottom: 4px; }
        .stat-value { font-size: 15px; font-weight: 600; }
        .actions { text-align: center; margin-top: 40px; }
        .btn { display: inline-block; padding: 16px 32px; border-radius: 8px; font-size: 16px; font-weight: 700; text-decoration: none; transition: all 0.2s; margin: 0 10px 10px; }
        .btn-approve { background-color: #000000; color: #ffffff !important; }
        .btn-reject { background-color: #ffffff; color: #ef4444 !important; border: 1px solid #ef4444; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
        .divider { height: 1px; background-color: #e5e7eb; margin: 30px 0; }
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
              <p class="greeting">New booking request from ${passengerName}</p>
              <p>Hi ${driverName}, someone wants to join your ride! Review the details below and take action directly.</p>
              
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
                    <div class="stat-label">Date & Time</div>
                    <div class="stat-value">${rideDate} at ${time}</div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-label">Seats</div>
                    <div class="stat-value">${seatsBooked} Seat${seatsBooked > 1 ? 's' : ''}</div>
                  </div>
                </div>
              </div>

              <div class="actions">
                <a href="${approveUrl}" class="btn btn-approve">Approve Request</a>
                <a href="${rejectUrl}" class="btn btn-reject">Reject</a>
              </div>

              <div class="divider"></div>
              
              <p style="font-size: 14px; color: #6b7280; text-align: center;">
                Clicking "Approve" will confirm the booking and notify the passenger immediately.
              </p>
            </td>
          </tr>
          <tr>
            <td class="footer">
              <p>&copy; 2026 GoTogether. All rights reserved.</p>
              <p>You received this because you are a registered driver on GoTogether.</p>
            </td>
          </tr>
        </table>
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
        body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #1f2937; margin: 0; padding: 0; background-color: #f3f4f6; }
        .main { background-color: #ffffff; margin: 20px auto; width: 100%; max-width: 600px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
        .header { background-color: #ef4444; padding: 30px; text-align: center; color: white; }
        .content { padding: 40px; }
        .info-card { background-color: #fef2f2; border: 1px solid #fee2e2; border-radius: 12px; padding: 20px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="main">
        <div class="header">
          <h2 style="margin:0">Ride Update</h2>
        </div>
        <div class="content">
          <p>Hi ${passengerName},</p>
          <p>We're sorry, but your booking request for the ride from <strong>${origin}</strong> to <strong>${destination}</strong> has been declined by the driver.</p>
          
          <div class="info-card">
            <p style="margin:0; font-weight:600; color:#b91c1c;">Message from driver:</p>
            <p style="margin:10px 0 0 0; font-style:italic;">"${rejectionReason}"</p>
          </div>
          
          <p>Don't worry, there are plenty of other rides available! Head back to the app to find your next trip.</p>
          
          <div style="text-align:center; margin-top:30px;">
            <a href="#" style="background:#000; color:#fff; padding:12px 24px; text-decoration:none; border-radius:6px; font-weight:600;">Search More Rides</a>
          </div>
        </div>
        <div class="footer">
          <p>&copy; 2026 GoTogether. All rights reserved.</p>
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
        body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #1f2937; margin: 0; padding: 0; background-color: #f3f4f6; }
        .main { background-color: #ffffff; margin: 20px auto; width: 100%; max-width: 600px; border-radius: 12px; overflow: hidden; }
        .header { background-color: #f59e0b; padding: 30px; text-align: center; color: white; }
        .content { padding: 40px; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="main">
        <div class="header">
          <h2 style="margin:0">Booking Cancelled</h2>
        </div>
        <div class="content">
          <p>Hi ${driverName},</p>
          <p><strong>${passengerName}</strong> has cancelled their booking for your ride from ${origin} to ${destination} on ${rideDate}.</p>
          <p>The ${seatsBooked} seat(s) they booked are now available for other passengers again.</p>
        </div>
        <div class="footer">
          <p>&copy; 2026 GoTogether. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = { newBookingRequestEmail, bookingRejectionEmail, bookingCancellationEmail };
