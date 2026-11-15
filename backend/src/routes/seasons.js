const express = require("express");
const router = express.Router();

const { getAllSeasons, getSeasonRaces } = require("../controllers/seasonController");

router.get("/", getAllSeasons);
router.get("/:year", getSeasonRaces);

module.exports = router;