const axios = require('axios');

async function testAdminRoute() {
    const baseURL = 'http://localhost:5000';
    const email = `admin_test_${Date.now()}@example.com`;
    const password = 'password123';

    try {
        console.log(`1. Registering admin: ${email}`);
        const regRes = await axios.post(`${baseURL}/api/auth/register`, {
            firstName: 'Admin',
            lastName: 'Test',
            email,
            password,
            role: 'admin',
            status: 'active'
        });

        const token = regRes.data.token;
        console.log('Admin registered. Token obtained.');

        console.log('2. Testing GET /api/admin/teachers');
        try {
            const res = await axios.get(`${baseURL}/api/admin/teachers`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('SUCCESS: Route found. Status:', res.status);
            console.log('Data:', res.data ? 'Received data' : 'No data');
        } catch (err) {
            console.error('FAILED to access route:', err.message);
            if (err.response) {
                console.error('Status:', err.response.status);
                console.error('Data:', err.response.data);
            }
        }

    } catch (err) {
        console.error('Setup Failed:', err.message);
        if (err.response) {
            console.error('Status:', err.response.status);
            console.error('Data:', err.response.data);
        }
    }
}

testAdminRoute();
