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

test("GET /api/seasons should return all seasons", async (t) => {
    t.mock.method(globalThis, "fetch", mockFetch({
        MRData: {
            SeasonTable: {
                Season: [
                    {season: "1950"},
                    {season: "1951"},
                    {season: "1952"}
                ]
            }
        }
    }));
    const response = await request(app).get('/api/seasons');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.MRData.SeasonTable.Season.length, 3);
    assert.strictEqual(response.body.MRData.SeasonTable.Season[0].season, "1950");
    assert.strictEqual(response.body.MRData.SeasonTable.Season[2].season, "1952");
});

test("GET /api/seasons should return error for being unavailable", async (t) => {
    t.mock.method(globalThis, "fetch", async () => {
        throw new Error("Jolpica API unavailable");
    });
    const response = await request(app).get('/api/seasons');
    assert.strictEqual(response.status, 503);
    assert.strictEqual(response.body.error, "Jolpica API unavailable");
});

test("GET /api/seasons should return error for taking too long", async (t) => {
    t.mock.method(globalThis, "fetch", async () => {
        const error = new Error("The operation timed out");
        error.name = "TimeoutError";
        throw error;
    });
    const response = await request(app).get('/api/seasons');
    assert.strictEqual(response.status, 504);
    assert.strictEqual(response.body.error, "Jolpica API took too long");
});

test("GET /api/seasons/:year should return error for nonexistent year", async (t) => {
    t.mock.method(globalThis, "fetch", mockFetch({
        MRData: {
            total: "0",
            SeasonTable: {
                Seasons: []
            }
        }
    }));
    const response = await request(app).get('/api/seasons/9999');
    assert.strictEqual(response.status, 404);
    assert.strictEqual(response.body.error, "Season not found")
})

test("GET /api/seasons/:year should return the specified year's season", async (t) => {
    t.mock.method(globalThis, "fetch", mockFetch({
        MRData: {
            url: "https://api.jolpi.ca/ergast/f1/2025/races/",
            RaceTable: {
                season: "2025"
            }
        }
    }));
    const response = await request(app).get('/api/seasons/2025');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.MRData.RaceTable.season, "2025");
    assert.strictEqual(response.body.MRData.url.includes("2025"), true)
})