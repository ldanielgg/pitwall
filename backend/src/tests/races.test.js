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

test("GET /api/race/results/:year/:round should return error for being unavailable", async (t) => {
    t.mock.method(globalThis, "fetch", async () => {
        throw new Error("Jolpica API unavailable");
    });
    const response = await request(app).get('/api/race/results/2026/5');
    assert.strictEqual(response.status, 503);
    assert.strictEqual(response.body.error, "Jolpica API unavailable");
});

test("GET /api/race/results/:year/:round should return error for taking too long", async (t) => {
    t.mock.method(globalThis, "fetch", async () => {
        const error = new Error("The operation timed out");
        error.name = "TimeoutError";
        throw error;
    });
    const response = await request(app).get('/api/race/results/2026/5');
    assert.strictEqual(response.status, 504);
    assert.strictEqual(response.body.error, "Jolpica API took too long");
});

test("GET /api/race/results/:year/:round should return race results", async (t) => {
    t.mock.method(globalThis, "fetch", mockFetch({
        MRData: {
            RaceTable: {
                season: "2026",
                round: "10"
            }
        }
    }));
    const response = await request(app).get('/api/race/results/2026/10');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.MRData.RaceTable.season, "2026");
    assert.strictEqual(response.body.MRData.RaceTable.round, "10");
});

test("GET /api/race/laps/:year/:round/:driver_id should return lap times for specified driver_id", async (t) => {
    t.mock.method(globalThis, "fetch", mockFetch({
        MRData: {
            RaceTable: {
                season: "2026",
                round: "7",
                driverId: "antonelli"
            }
        }
    }));
    const response = await request(app).get('/api/race/laps/2026/7/antonelli');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.MRData.RaceTable.season, "2026");
    assert.strictEqual(response.body.MRData.RaceTable.round, "7");
    assert.strictEqual(response.body.MRData.RaceTable.driverId, "antonelli");
});

test("GET /api/race/results/:year/:round should return error for nonexistent year", async (t) => {
    t.mock.method(globalThis, "fetch", mockFetch({
        MRData: {
            total: "0",
            RaceTable: {
                season: "9999",
                round: "7",
                Races: []
            }
        }
    }));
    const response = await request(app).get('/api/race/results/9999/7');
    assert.strictEqual(response.status, 404);
    assert.strictEqual(response.body.error, "Season or round not found");
});

test("GET /api/race/results/:year/:round should return error for nonexistent round", async (t) => {
    t.mock.method(globalThis, "fetch", mockFetch({
        MRData: {
            total: "0",
            RaceTable: {
                season: "2025",
                round: "40",
                Races: []
            }
        }
    }));
    const response = await request(app).get('/api/race/results/2025/40');
    assert.strictEqual(response.status, 404);
    assert.strictEqual(response.body.error, "Season or round not found");
});

test("GET /api/race/laps/:year/:round/:driver_id should return error for nonexistent driver_id", async (t) => {
    t.mock.method(globalThis, "fetch", mockFetch({
        MRData: {
            total: "0",
            RaceTable: {
                season: "2021",
                round: "12",
                driverId: "test_driver",
                Races: []
            }
        }
    }));
    const response = await request(app).get('/api/race/laps/2021/12/test_driver');
    assert.strictEqual(response.status, 404);
    assert.strictEqual(response.body.error, "Season, round, or driver id not found");
});