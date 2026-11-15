const express = require("express");
const router = express.Router();

const { getDriver, getConstructor } = require("../controllers/standingsController");


router.get("/driver/:year", getDriver);
router.get("/driver/:year/:round", getDriver);
router.get("/constructors/:year", getConstructor);
router.get("/constructors/:year/:round", getConstructor);

module.exports = router;