const express = require('express');
const router = express.Router();
const {Reservation} = require('../models');
const reservationController = require('../controllers/reservationController');
const  isAdmin  = require('../controllers/isAdminController');

/* /reservations */ 
router.get('/',isAdmin, reservationController.getReservations);

router.post('/', reservationController.createReservation);

router.put('/:id', reservationController.updateReservation);

router.delete('/reservationId', reservationController.deleteReservation);

module.exports = router;