const express = require("express");
const router = express.Router();
const  isAdmin  = require('../controllers/isAdminController');

const { Room } = require("../models");
const roomController = require('../controllers/roomController');
console.log(roomController.getRooms)

/* GET */
router.get("/", roomController.getRooms);

/* Post Room */
router.post("/", async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Room name is required." });
  }

  const room = await Room.create({ name });
  res.json({ room });
});

/* Put Room. */
router.put("/:roomId", async (req, res, next) => {
  const { roomId } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Room name is required." });
  }

  const room = await Room.findByPk(roomId);

  if (!room) {
    return res.status(404).json({ error: "Room not found." });
  }

  room.name = name;
  await room.save();
  res.json({ room });
});

/* Delete Room */
router.delete("/:roomId", async (req, res, next) => {
  const { roomId } = req.params;
  const room = await Room.findByPk(roomId);

  if (!room) {
    return res.status(404).json({ error: "Room not found." });
  }

  await room.destroy();
  res.json({ message: "Room deleted." });
});
module.exports = router;