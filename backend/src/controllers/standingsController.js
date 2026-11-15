const { getDriverStandings, getConstructorStandings } = require("../services/jolpicaService");

const getDriver = async (req, res) => {
    try {
        const data = await getDriverStandings(req.params.year, req.params.round);
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

const getConstructor = async (req, res) => {
    try {
        const data = await getConstructorStandings(req.params.year, req.params.round);
        if (!data || data.MRData.total === "0") {
            return res.status(404).json({
                error: "Season not found"
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

module.exports = { getDriver, getConstructor };