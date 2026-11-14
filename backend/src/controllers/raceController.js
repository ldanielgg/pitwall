const { getRaceResults, getRaceLaps } = require("../services/jolpicaService");

const getSeasonRaceResults = async (req, res) => {
    try {
        const data = await getRaceResults(req.params.year, req.params.round);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            error: "Failed to retrieve race results"
        })
    }
};

const getSeasonRaceLaps = async (req, res) => {
    try {
        const data = await getRaceLaps(req.params.year, req.params.round, req.params.driver_id);
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({
            error: "Failed to retrieve race lap times"
        });
    }
};

module.exports = { getSeasonRaceResults, getSeasonRaceLaps };