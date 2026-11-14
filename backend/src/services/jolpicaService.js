const BASE_URL = "https://api.jolpi.ca/ergast/f1";
const HEADERS = {
    "User-Agent": "Pitwall/1.0"
};

const getSeasons = async () => {
    try {
        const response = await fetch(`${BASE_URL}/seasons.json?limit=100`, {
            headers: HEADERS,
            signal: AbortSignal.timeout(10000)
        });
        if (!response.ok) {
            throw new Error("Jolpica API unavailable");
        }
        const data = await response.json();
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
    const response = await fetch(`${BASE_URL}/${year}/races.json`, {
        headers: HEADERS
    });
    const data = await response.json();
    return data
};

const getDriverStandings = async (year, round) => {
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
    const data = await response.json()
    return data
};

const getConstructorStandings = async (year, round) => {
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
    const data = await response.json()
    return data
};

const getRaceResults = async (year, round) => {
    const response = await fetch(`${BASE_URL}/${year}/${round}/results.json`, {
        headers: HEADERS
    });
    const data = await response.json();
    return data
}

const getRaceLaps = async (year, round, driver_id) => {
    const response = await fetch(`${BASE_URL}/${year}/${round}/drivers/${driver_id}/laps.json?limit=100`, {
        headers: HEADERS
    });
    const data = await response.json();
    return data
}

module.exports = { 
    getSeasons, 
    getRacesBySeason, 
    getDriverStandings, 
    getRaceResults, 
    getConstructorStandings,
    getRaceLaps, 
};