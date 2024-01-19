const express = require("express");
const router = express.Router();
const { Reservation } = require("../db.js");
const { isAdmin } = require("./isAdmin.js");

/* GET */
router.get("/", isAdmin, async (req, res, next) => {
  try {
    const reservations = await Reservation.findAll();
    res.json({ reservations });
  } catch (error) {
    next(error);
  }
});

/* POST */
//router.post('/', async (req, res, next) => {
//  const reservation = await Reservation.create({
//    date: Date.now(),
//    name: 'mahdia',
//    note: 'isnote',
//    status: 1,
//    userId: 1,
//    spotId: 1,
//    roomId: 1
//  });
//  res.json({reservation });
//});

/* POST Create Reservation */
router.post("/", async (req, res, next) => {
  try {
    const { spotId, date, name, note, status, userId, roomId } = req.body;

    // Check if there is an existing reservation for the same spot and date
    const existingReservation = await Reservation.findOne({
      where: {
        spotId,
        date,
      },
    });

    if (existingReservation) {
      // Spot is already reserved for the specified date
      return res
        .status(400)
        .json({ error: "Spot is already reserved for this date and time." });
    }

    // If no existing reservation, create the new reservation
    const reservation = await Reservation.create({
      spotId,
      date,
      name,
      note,
      status,
      userId,
      roomId,
    });

    res.json({ reservation });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ error: "An error occurred while creating the reservation." });
    next(error);
  }
});

/* PUT */
router.put("/:id", async function (req, res, next) {
  const id = req.params.id;
  const { note } = req.body;

  try {
    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found." });
    }

    reservation.note = note;
    await reservation.save();
    res.json({ reservation });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the reservation." });
    next(error);
  }
});

/* DELETE Reservation */
router.delete("/:reservationId", (req, res) => {
  const reservationId = req.params.reservationId;

  Reservation.destroy({
    where: { id: reservationId },
  })
    .then((rowsDeleted) => {
      if (rowsDeleted === 0) {
        return res.status(404).json({ message: "Reservation not found." });
      }
      res.status(200).json({ message: "Reservation deleted." });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the reservation." });
    });
});

module.exports = router;
