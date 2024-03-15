const express = require("express");
const router = express.Router();
const  isAdmin  = require('../controllers/isAdminController');

const { Room } = require("../models");
const roomController = require('../controllers/roomController');
console.log(roomController.getRooms)

/* GET */
router.get("/", roomController.getRooms);

/* Post Room */
router.post("/", roomController.createRoom);

/* Put Room. */
router.put("/:roomId", roomController.updateRoom);

/* Delete Room */
router.delete("/:roomId", roomController.deleteRoom);

module.exports = router;