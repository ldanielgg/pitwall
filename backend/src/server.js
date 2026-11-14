const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8000;
app.use(cors());

const healthRoutes = require("./routes/health");
const seasonRoutes = require("./routes/seasons");

app.use("/api/health", healthRoutes);
app.use("/api/seasons", seasonRoutes);

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
}

module.exports = { app };