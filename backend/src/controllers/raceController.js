const { getRaceResults, getRaceLaps } = require("../services/jolpicaService");

const getSeasonRaceResults = async (req, res) => {
    try {
        const data = await getRaceResults(req.params.year, req.params.round);
        if (!data || data.MRData.total === "0") {
            return res.status(404).json({
                error: "Season or round not found"
            });
        }
        res.status(200).json(data);
    } catch (error) {
        if (error.message === "Jolpica API took too long") {
            res.status(504).json({
                error: error.message
            });
        } else {
            res.status(503).json({
                error: error.message
            });
        }
    }
};

const getSeasonRaceLaps = async (req, res) => {
    try {
        const data = await getRaceLaps(req.params.year, req.params.round, req.params.driver_id);
        if (!data || data.MRData.total === "0") {
            return res.status(404).json({
                error: "Season, round, or driver id not found"
            });
        }
        res.status(200).json(data)
    } catch (error) {
        if (error.message === "Jolpica API took too long") {
            res.status(504).json({
                error: error.message
            });
        } else {
            res.status(503).json({
                error: error.message
            });
        }
    }
};

module.exports = { getSeasonRaceResults, getSeasonRaceLaps };