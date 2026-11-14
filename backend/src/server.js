const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8000;
app.use(cors());

const healthRoutes = require("./routes/health");

app.use("/api/health", healthRoutes);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});