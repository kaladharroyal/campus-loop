// Test script to verify report endpoints are working
const axios = require('axios');

// You'll need to replace this with a valid admin token
// You can get this by logging in as admin through the frontend or creating a test token
const ADMIN_TOKEN = 'YOUR_ADMIN_TOKEN_HERE';

const BASE_URL = 'http://localhost:5000';

const reportEndpoints = [
    '/api/reports/student-performance',
    '/api/reports/course-analytics',
    '/api/reports/attendance-analytics',
    '/api/reports/assignment-analytics',
    '/api/reports/teacher-workload',
    '/api/reports/monthly-summary'
];

async function testReportEndpoints() {
    console.log('🧪 Testing Report Endpoints...\n');

    for (const endpoint of reportEndpoints) {
        try {
            console.log(`Testing: ${endpoint}`);

            const response = await axios.get(`${BASE_URL}${endpoint}`, {
                headers: {
                    'Authorization': `Bearer ${ADMIN_TOKEN}`
                }
            });

            if (response.status === 200) {
                console.log(`✅ SUCCESS - ${endpoint}`);
                console.log(`   Report Type: ${response.data.reportType}`);
                console.log(`   Data records: ${response.data.data?.length || 'N/A'}`);
            } else {
                console.log(`⚠️  UNEXPECTED STATUS - ${endpoint}: ${response.status}`);
            }
        } catch (error) {
            if (error.response) {
                console.log(`❌ ERROR - ${endpoint}: ${error.response.status} ${error.response.statusText}`);
                if (error.response.status === 401) {
                    console.log('   → Authentication required. Please update ADMIN_TOKEN in this script.');
                } else if (error.response.status === 403) {
                    console.log('   → Forbidden. Admin access required.');
                }
            } else {
                console.log(`❌ ERROR - ${endpoint}: ${error.message}`);
            }
        }
        console.log('');
    }
}

// Run tests
testReportEndpoints().then(() => {
    console.log('✅ Report endpoint testing complete!');
}).catch(error => {
    console.error('❌ Test script error:', error);
});
