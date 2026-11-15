const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8000;
app.use(cors());

const healthRoutes = require("./routes/health");
const seasonRoutes = require("./routes/seasons");
const raceRoutes = require("./routes/races");
const standingsRoutes = require("./routes/standings");

app.use("/api/health", healthRoutes);
app.use("/api/seasons", seasonRoutes);
app.use("/api/race", raceRoutes);
app.use("/api/standings", standingsRoutes);

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
}

module.exports = { app };