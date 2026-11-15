const { readCache, writeCache } = require("./cacheService");

const BASE_URL = "https://api.jolpi.ca/ergast/f1";
const HEADERS = {
    "User-Agent": "Pitwall/1.0"
};
const SEASONS_CACHE_TTL = 24 * 60 * 60 * 1000;

const getSeasons = async () => {
    const cachedData = await readCache("seasons.json", SEASONS_CACHE_TTL);
    if (cachedData) {
        console.log("Seasons: Cache hit");
        return cachedData;
    }
    console.log("Cache miss - fetching from Jolpica");
    try {
        const response = await fetch(`${BASE_URL}/seasons.json?limit=100`, {
            headers: HEADERS,
            signal: AbortSignal.timeout(10000)
        });
        if (!response.ok) {
            throw new Error("Jolpica API unavailable");
        }
        const data = await response.json();
        await writeCache("seasons.json", data);
        return data;
    } catch (error) {
        if (error.name === "TimeoutError") {
            throw new Error("Jolpica API took too long");
        } else {
            throw error;
        }
    }
};

const getRacesBySeason = async (year) => {
    try {
        const response = await fetch(`${BASE_URL}/${year}/races.json`, {
            headers: HEADERS,
            signal: AbortSignal.timeout(10000)
        });
        if (!response.ok) {
            throw new Error("Jolpica API unavailable");
        }
        const data = await response.json();
        return data
    } catch (error) {
        if (error.name === "TimeoutError") {
            throw new Error("Jolpica API took too long");
        } else {
            throw error;
        }
    }
};

const getDriverStandings = async (year, round) => {
    try {
        let response;
        if (round) {
            response = await fetch(`${BASE_URL}/${year}/${round}/driverstandings.json`, {
            headers: HEADERS
        });
        } else {
            response = await fetch(`${BASE_URL}/${year}/driverstandings.json`, {
            headers: HEADERS
        });
        }
        if (!response.ok) {
            throw new Error("Jolpica API unavailable");
        }
        const data = await response.json()
        return data
    } catch (error) {
        if (error.name === "TimeoutError") {
            throw new Error("Jolpica API took too long");
        } else {
            throw error;
        }
    }
};

const getConstructorStandings = async (year, round) => {
    try {
        let response;
        if (round) {
            response = await fetch(`${BASE_URL}/${year}/${round}/constructorstandings.json`, {
            headers: HEADERS
        });
        } else {
            response = await fetch(`${BASE_URL}/${year}/constructorstandings.json`, {
            headers: HEADERS
        });
        }
        if (!response.ok) {
            throw new Error("Jolpica API unavailable");
        }
        const data = await response.json()
        return data
    } catch (error) {
        if (error.name === "TimeoutError") {
            throw new Error("Jolpica API took too long");
        } else {
            throw error;
        }
    }
};

const getRaceResults = async (year, round) => {
    try {
        const response = await fetch(`${BASE_URL}/${year}/${round}/results.json`, {
            headers: HEADERS
        });
        if (!response.ok) {
            throw new Error("Jolpica API unavailable");
        }
        const data = await response.json();
        return data
    } catch (error) {
        if (error.name === "TimeoutError") {
            throw new Error("Jolpica API took too long");
        } else {
            throw error;
        }
    }
};

const getRaceLaps = async (year, round, driver_id) => {
    try {
        const response = await fetch(`${BASE_URL}/${year}/${round}/drivers/${driver_id}/laps.json?limit=100`, {
            headers: HEADERS
        });
        if (!response.ok) {
            throw new Error("Jolpica API unavailable");
        }
        const data = await response.json();
        return data
    } catch (error) {
        if (error.name === "TimeoutError") {
            throw new Error("Jolpica API took too long");
        } else {
            throw error;
        }
    }
};

module.exports = { 
    getSeasons, 
    getRacesBySeason, 
    getDriverStandings, 
    getRaceResults, 
    getConstructorStandings,
    getRaceLaps, 
};