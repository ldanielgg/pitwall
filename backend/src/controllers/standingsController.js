const { getDriverStandings, getConstructorStandings } = require("../services/jolpicaService");

const getDriver = async (req, res) => {
    try {
        const data = await getDriverStandings(req.params.year, req.params.round);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            error: "Failed to retrieve standings"
        });
    }
};

const getConstructor = async (req, res) => {
    try {
        const data = await getConstructorStandings(req.params.year, req.params.round);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            error: "Failed to retrieve standings"
        });
    }
};

module.exports = { getDriver, getConstructor };