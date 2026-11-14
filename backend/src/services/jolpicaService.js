const BASE_URL = "https://api.jolpi.ca/ergast/f1";

const getSeasons = async () => {
    const response = await fetch(`${BASE_URL}/seasons.json`);
    if (!response.ok) {
        throw new Error("Jolpica API unavailable");
    }
    const data = await response.json();
    return data;
};

const getRacesBySeason = async (year) => {
    const response = await fetch(`${BASE_URL}/${year}/races.json`);
    const data = await response.json();
    return data
};

const getDriverStandings = async (year, round) => {
    let response;
    if (round) {
        response = await fetch(`${BASE_URL}/${year}/${round}/driverstandings.json`);
    } else {
        response = await fetch(`${BASE_URL}/${year}/driverstandings.json`);
    }
    const data = await response.json()
    return data
};

module.exports = { getSeasons, getRacesBySeason, getDriverStandings };