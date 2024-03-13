const express = require('express');
const router = express.Router();
const {Reservation} = require('../models');
const reservationController = require('../controllers/reservationController');

/* /reservations */ 
router.get('/reservations', function(req, res, next) {
  res.json(
    { message: {
      "reservations": [
        {
          "spotId": 1,
          "date": "2023-12-01 14:00:00",
          "name": "Sarah",
          "note": "No smoking room",
          "status": 1,
          "userId": 8,
          "roomId": 1
        }
      ]
    }}
  )
});

router.post('/reservations', reservationController.createReservation);

router.put('/reservations', function(req, res, next) {
  res.json({message: 'Votre reservation a bien été modifiée'});
});

router.delete('/reservations', function(req, res, next) {
  res.json({message: 'Votre reservation a bien été supprimée'});
});

module.exports = router;