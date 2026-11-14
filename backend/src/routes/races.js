const express = require("express");
const router = express.Router();

const { getSeasonRaceResults, getSeasonRaceLaps } = require("../controllers/raceController");

router.get("/results/:year/:round", getSeasonRaceResults);
router.get("/laps/:year/:round/:driver_id", getSeasonRaceLaps);

module.exports = router;