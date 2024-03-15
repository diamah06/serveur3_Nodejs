const express = require("express");
const router = express.Router();

const { Spot } = require("../models");

const  isAdmin  = require('../controllers/isAdminController');
const spotController = require('../controllers/spotController');

/* GET */
router.get("/",spotController.getSpots);

/* POST Spot */
router.post("/", spotController.createSpot);


/* PUT Spot */
router.put("/:spotId", spotController.updateSpot);


/* DELETE Spot */
router.delete("/:spotId", spotController.deleteSpot);

module.exports = router;
