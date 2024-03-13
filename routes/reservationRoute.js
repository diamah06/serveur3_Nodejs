const express = require('express');
const router = express.Router();
const {Reservation} = require('../models');
const reservationController = require('../controllers/reservationController');

/* /reservations */ 
router.get('/reservations', reservationController.getReservations);

router.post('/reservations', reservationController.createReservation);

router.put('/reservations', reservationController.updateReservation);

router.delete('/reservations', reservationController.deleteReservation);

module.exports = router;