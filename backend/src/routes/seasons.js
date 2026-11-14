const express = require("express");
const router = express.Router();

const { getAllSeasons, getSeasonRaces, getSeasonStandings } = require("../controllers/seasonController");

router.get("/", getAllSeasons);
router.get("/:year/races", getSeasonRaces);
router.get("/:year/standings", getSeasonStandings);
router.get("/:year/standings/:round", getSeasonStandings);

module.exports = router;