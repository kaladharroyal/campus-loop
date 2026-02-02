const http = require('http');

const email = `testflow_${Date.now()}@example.com`;
const password = 'password123';

const registerData = JSON.stringify({
    firstName: 'Test',
    lastName: 'Flow',
    email: email,
    password: password,
    role: 'student',
    branch: 'CSE',
    year: '3',
    phone: '1234567890'
});

const loginData = JSON.stringify({
    email: email,
    password: password
});

function makeRequest(path, data, label) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                console.log(`[${label}] Status: ${res.statusCode}`);
                console.log(`[${label}] Body: ${body}`);
                resolve({ statusCode: res.statusCode, body: body });
            });
        });

        req.on('error', (e) => {
            console.error(`[${label}] Error: ${e.message}`);
            reject(e);
        });

        req.write(data);
        req.end();
    });
}

async function run() {
    try {
        console.log('--- Starting Auth Flow Test ---');
        await makeRequest('/api/auth/register', registerData, 'REGISTER');
        await makeRequest('/api/auth/login', loginData, 'LOGIN');
        console.log('--- Finished Auth Flow Test ---');
    } catch (err) {
        console.error('Test failed:', err);
    }
}

run();
