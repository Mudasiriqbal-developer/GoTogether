const http = require('http');

// Use unique email based on timestamp
const timestamp = Date.now();
const testEmail = `user${timestamp}@test.com`;

// Test register endpoint
const registerData = JSON.stringify({
  name: 'New Test User',
  email: testEmail,
  password: 'password123',
  phone: '0300123456',
  role: 'Passenger'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(registerData)
  }
};

console.log(`Testing Registration with email: ${testEmail}\n`);

const req = http.request(options, (res) => {
  let data = '';

  console.log(`Register Response Status: ${res.statusCode}`);

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Response Body:');
    try {
      const jsonData = JSON.parse(data);
      console.log(JSON.stringify(jsonData, null, 2));
      
      if (jsonData.token) {
        console.log('\n✅ SUCCESS! JWT Token Generated!');
        console.log(`User ID: ${jsonData.user._id}`);
        console.log(`User Name: ${jsonData.user.name}`);
        console.log(`User Email: ${jsonData.user.email}`);
        console.log(`Token (first 50 chars): ${jsonData.token.substring(0, 50)}...`);
        
        // Test login endpoint
        console.log('\n\n========================================');
        console.log('Testing Login Endpoint...');
        console.log('========================================\n');
        testLogin(testEmail);
      } else if (jsonData.error) {
        console.log(`\n❌ Error: ${jsonData.error}`);
      }
    } catch (e) {
      console.log('Error parsing response:', e.message);
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('Request error:', error);
});

req.write(registerData);
req.end();

// Test login endpoint
function testLogin(email) {
  const loginData = JSON.stringify({
    email: email,
    password: 'password123'
  });

  const loginOptions = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(loginData)
    }
  };

  const loginReq = http.request(loginOptions, (res) => {
    let data = '';

    console.log(`Login Response Status: ${res.statusCode}`);

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log('Response Body:');
      try {
        const jsonData = JSON.parse(data);
        console.log(JSON.stringify(jsonData, null, 2));
        
        if (jsonData.token) {
          console.log('\n✅ SUCCESS! Login Successful!');
          console.log(`User Email: ${jsonData.user.email}`);
          console.log(`Token (first 50 chars): ${jsonData.token.substring(0, 50)}...`);
          console.log('\n\n========================================');
          console.log('✅ ALL TESTS PASSED!');
          console.log('========================================');
          console.log('✓ Register API working - JWT token generated');
          console.log('✓ Login API working - JWT token generated');
          console.log('✓ Email configuration is optional and not blocking API');
        } else if (jsonData.error) {
          console.log(`\n❌ Login Error: ${jsonData.error}`);
        }
      } catch (e) {
        console.log('Error parsing response:', e.message);
        console.log('Raw response:', data);
      }
    });
  });

  loginReq.on('error', (error) => {
    console.error('Login request error:', error);
  });

  loginReq.write(loginData);
  loginReq.end();
}
