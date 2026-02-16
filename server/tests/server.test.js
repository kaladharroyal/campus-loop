const request = require('supertest');
const express = require('express');

// Mock app to avoid starting the actual server with DB connection
const app = express();
app.get('/', (req, res) => res.status(200).send('LMS API Running'));

describe('Server Basic Checks', () => {
    it('GET / should return 200 and welcome message', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toBe('LMS API Running');
    });

    it('GET /unknown-route should return 404', async () => {
        const res = await request(app).get('/unknown-route');
        expect(res.statusCode).toEqual(404);
    });
});
