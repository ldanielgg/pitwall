const { getSeasons, getRacesBySeason, getDriverStandings } = require("../services/jolpicaService");

const getAllSeasons = async (req, res) => {
    try {
        const data = await getSeasons();
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

const getSeasonRaces = async (req, res) => {
    try {
        const data = await getRacesBySeason(req.params.year);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            error: "Failed to retrieve races"
        });
    }
};

const getSeasonStandings = async (req, res) => {
    try {
        const data = await getDriverStandings(req.params.year, req.params.round);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            error: "Failed to retrieve standings"
        });
    }
};

module.exports = { getAllSeasons, getSeasonRaces, getSeasonStandings };