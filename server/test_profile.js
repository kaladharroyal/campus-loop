const http = require('http');

// Helper to make requests
function makeRequest(options, data) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        resolve(JSON.parse(body));
                    } catch (e) {
                        resolve(body);
                    }
                } else {
                    reject({ statusCode: res.statusCode, body });
                }
            });
        });
        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
}

async function runTest() {
    const timestamp = Date.now();
    const email = `profile_test_${timestamp}@example.com`;
    const password = 'password123';

    console.log(`1. Registering user: ${email}`);
    const registerData = {
        firstName: 'Profile',
        lastName: 'Tester',
        email,
        password,
        role: 'student'
    };

    try {
        const registerRes = await makeRequest({
            hostname: 'localhost',
            port: 5000,
            path: '/api/auth/register',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, registerData);
        console.log('Registration successful:', registerRes.email);

        // Login to get token (although register returns token usually, let's login explicitly or use register response)
        // Check register response for token
        let token = registerRes.token;
        if (!token) {
            console.log('Token not in register response, logging in...');
            const loginRes = await makeRequest({
                hostname: 'localhost',
                port: 5000,
                path: '/api/auth/login',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            }, { email, password });
            token = loginRes.token;
        }

        if (!token) throw new Error('No token received');
        console.log('Token received.');

        console.log('2. Updating Profile (FirstName -> UpdatedProp)');
        const updateData = {
            firstName: 'UpdatedProp',
            lastName: 'Tester',
            email, // confirm email doesn't change or is valid
            phone: '9876543210'
        };

        const updateRes = await makeRequest({
            hostname: 'localhost',
            port: 5000,
            path: '/api/auth/profile',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }, updateData);

        console.log('Update response:', updateRes);

        if (updateRes.firstName === 'UpdatedProp' && updateRes.phone === '9876543210') {
            console.log('SUCCESS: Profile updated correctly.');
        } else {
            console.error('FAILURE: Profile did not update correctly.');
            process.exit(1);
        }

    } catch (err) {
        console.error('Test Failed:', err);
        process.exit(1);
    }
}

runTest();
