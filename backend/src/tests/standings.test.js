const test = require('node:test');
const assert = require('node:assert');
const request = require('supertest')

const { app } = require('../server');

const mockFetch = (data) => {
    return async () => ({
        ok: true,
        json: async () => data
    });
};

test("GET /api/standings/driver/:year should return error for being unavailable", async (t) => {
    t.mock.method(globalThis, "fetch", async () => {
        throw new Error("Jolpica API unavailable");
    });
    const response = await request(app).get('/api/standings/driver/2025');
    assert.strictEqual(response.status, 503);
    assert.strictEqual(response.body.error, "Jolpica API unavailable");
});

test("GET /api/standings/driver/:year should return error for taking too long", async (t) => {
    t.mock.method(globalThis, "fetch", async () => {
        const error = new Error("The operation timed out");
        error.name = "TimeoutError";
        throw error;
    });
    const response = await request(app).get('/api/standings/driver/2025');
    assert.strictEqual(response.status, 504);
    assert.strictEqual(response.body.error, "Jolpica API took too long");
});

test("GET /api/standings/driver/:year should return final driver standings of specified year", async (t) => {
    t.mock.method(globalThis, "fetch", mockFetch({
        MRData: {
            StandingsTable: {
                season: "2025"
            }
        }
    }));
    const response = await request(app).get('/api/standings/driver/2025');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.MRData.StandingsTable.season, "2025")
});

test("GET /api/standings/driver/:year/:round should return driver standings after specific round of specified year", async (t) => {
    t.mock.method(globalThis, "fetch", mockFetch({
        MRData: {
            StandingsTable: {
                season: "2024",
                round: "12"
            }
        }
    }));
    const response = await request(app).get('/api/standings/driver/2024/12');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.MRData.StandingsTable.season, "2024");
    assert.strictEqual(response.body.MRData.StandingsTable.round, "12")
});

test("GET /api/standings/constructors/:year/ should return final constructors standings of specified year", async (t) => {
    t.mock.method(globalThis, "fetch", mockFetch({
        MRData: {
            StandingsTable: {
                season: "2023"
            }
        }
    }));
    const response = await request(app).get('/api/standings/constructors/2023');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.MRData.StandingsTable.season, "2023");
});

test("GET /api/standings/constructors/:year/:round should return constructors standings after specific round of specified year", async (t) => {
    t.mock.method(globalThis, "fetch", mockFetch({
        MRData: {
            StandingsTable: {
                season: "2025",
                round: "17"
            }
        }
    }));
    const response = await request(app).get('/api/standings/constructors/2024/12');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.MRData.StandingsTable.season, "2025");
    assert.strictEqual(response.body.MRData.StandingsTable.round, "17")
});

test("GET /api/standings/driver/:year should return error for nonexistent year", async (t) => {
    t.mock.method(globalThis, "fetch", mockFetch({
        MRData: {
            total: "0",
            StandingsTable: {
                season: "9999",
                StandingsList: []
            }
        }
    }));
    const response = await request(app).get('/api/standings/driver/9999');
    assert.strictEqual(response.status, 404);
    assert.strictEqual(response.body.error, "Season or round not found");
});

test("GET /api/standings/driver/:year/:round should return error for nonexistent round", async (t) => {
    t.mock.method(globalThis, "fetch", mockFetch({
        MRData: {
            total: "0",
            StandingsTable: {
                season: "2026",
                round: "50",
                StandingsList: []
            }
        }
    }));
    const response = await request(app).get('/api/standings/driver/2026/50');
    assert.strictEqual(response.status, 404);
    assert.strictEqual(response.body.error, "Season or round not found");
});