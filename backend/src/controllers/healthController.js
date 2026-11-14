const getHealth = (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Pitwall API is running"
    });
};

module.exports = { getHealth };