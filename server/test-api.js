const http = require('http');

// Test register endpoint
const registerData = JSON.stringify({
  name: 'Test User',
  email: 'testuser@example.com',
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

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const jsonData = JSON.parse(data);
      
      if (jsonData.token) {
        console.log('\n JWT Token Successfully Generated!');
        console.log(`Token (first 50 chars): ${jsonData.token.substring(0, 50)}...`);
        
        // Test login endpoint
        console.log('\n\nTesting Login Endpoint...');
        testLogin();
      } else if (jsonData.error) {
        console.log(`\n Error: ${jsonData.error}`);
      }
    } catch (e) {
      console.log(data);
    }
  });
});

req.on('error', (error) => {
  console.error('Request error:', error);
});

req.write(registerData);
req.end();

// Test login endpoint
function testLogin() {
  const loginData = JSON.stringify({
    email: 'testuser@example.com',
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

    console.log(`\nLogin Response Status: ${res.statusCode}`);

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      try {
        const jsonData = JSON.parse(data);
        
        if (jsonData.token) {
          console.log('\n Login Successful! JWT Token Generated!');
        } else if (jsonData.error) {
          console.log(`\n Login Error: ${jsonData.error}`);
        }
      } catch (e) {
        console.log(data);
      }
    });
  });

  loginReq.on('error', (error) => {
    console.error('Login request error:', error);
  });

  loginReq.write(loginData);
  loginReq.end();
}
