const { getSeasons, getRacesBySeason } = require("../services/jolpicaService");

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
        if (!data || data.MRData.total === "0") {
            return res.status(404).json({
                error: "Season not found"
            });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            error: "Failed to retrieve races"
        });
    }
};

module.exports = { getAllSeasons, getSeasonRaces };