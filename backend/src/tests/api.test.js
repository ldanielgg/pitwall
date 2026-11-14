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

test("GET /api/seasons should return all seasons", async (t) => {
    t.mock.method(globalThis, "fetch", async () => {
        return {
            ok: true,
            json: async () => ({
                seasons: [
                    { season: "2024" },
                    { season: "2023" }
                ]
            })
        };
    });
    const response = await request(app).get('/api/seasons');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.seasons.length, 2);
    assert.strictEqual(response.body.seasons[0].season, "2024");
});

test("GET /api/seasons should return error", async (t) => {
    t.mock.method(globalThis, "fetch", async () => {
        throw new Error("Jolpica API unavailable");
    });
    const response = await request(app).get('/api/seasons');
    assert.strictEqual(response.status, 503);
    assert.strictEqual(response.body.error, "Jolpica API unavailable");
});