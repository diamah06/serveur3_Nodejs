const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const { isAdmin } = require('../controllers/isAdminController');

const resC = new reservationController();

router.post('/', async (req, res) => {
    try {
        const newReservation = await resC.createReservation(req, res);
        res.status(201).json(newReservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        await resC.updateReservation(req, res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:reservationId', async (req, res) => {
    try {
        await resC.deleteReservation(req, res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
