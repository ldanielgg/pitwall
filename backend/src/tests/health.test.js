const test = require('node:test');
const assert = require('node:assert');
const request = require('supertest')

const { app } = require('../server');

test("GET /api/health should return ok status", async () => {
    const response = await request(app).get('/api/health');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.status, "ok");
    assert.strictEqual(response.body.message, "Pitwall API is running");
});