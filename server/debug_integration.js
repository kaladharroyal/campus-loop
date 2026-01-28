const { spawn } = require('child_process');
const http = require('http');

console.log("Starting debug integration test...");

// specific port for testing
const TEST_PORT = 5005;
const env = { ...process.env, PORT: TEST_PORT };

// Start the server
const serverProcess = spawn('node', ['index.js'], {
    cwd: process.cwd(),
    env: env,
    stdio: 'pipe' // Capture stdout/stderr
});

let serverOutput = '';

serverProcess.stdout.on('data', (data) => {
    const chunk = data.toString();
    process.stdout.write(`[SERVER]: ${chunk}`);
    serverOutput += chunk;
    if (chunk.includes('Server running on port')) {
        // Server ready, trigger test
        setTimeout(runTest, 1000);
    }
});

serverProcess.stderr.on('data', (data) => {
    process.stderr.write(`[SERVER ERROR]: ${data.toString()}`);
});

function runTest() {
    console.log("Sending POST request to /api/auth/register...");

    const postData = JSON.stringify({
        name: "Integration Test User",
        email: `test${Date.now()}@example.com`,
        password: "password123",
        role: "student"
    });

    const req = http.request({
        hostname: 'localhost',
        port: TEST_PORT,
        path: '/api/auth/register',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    }, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

        let body = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(`BODY CHUNK: ${chunk}`);
            body += chunk;
        });
        res.on('end', () => {
            console.log("No more data in response.");
            console.log("FULL BODY:", body);

            // Cleanup
            serverProcess.kill();
            process.exit(0);
        });
    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
        serverProcess.kill();
        process.exit(1);
    });

    req.write(postData);
    req.end();
}

// Timeout
setTimeout(() => {
    console.log("Timeout reached. Killing server.");
    serverProcess.kill();
}, 10000);
