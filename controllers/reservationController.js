
// Importation des modèles Sequelize
const { Reservation } = require('../models');
const logger = require('../utils/logger');
const Controller = require('./controller');

class ReservationController extends Controller {
    constructor() {
        super();
    }

    async createReservation(req, res) {
        try {
            const { spotId, date, name, note, status, userId, roomId } = req.body;

            const existingReservation = await Reservation.findOne({
                where: {
                    spotId,
                    date,
                },
            });

            if (existingReservation) {
                return res.status(400).json({ error: "Spot is already reserved for this date and time." });
            }

            const reservation = await Reservation.create({
                spotId,
                date,
                name,
                note,
                status,
                userId,
                roomId,
            });

            res.status(201).json(reservation);
        } catch (error) {
            logger.error(`Error creating reservation: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async getReservations(req, res) {
        try {
            const reservations = await Reservation.findAll();
            res.status(200).json(reservations);
        } catch (error) {
            logger.error(`Error getting reservations: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async updateReservation(req, res) {
        const id = req.params.id;
        const { note } = req.body;

        try {
            const reservation = await Reservation.findByPk(id);
            if (!reservation) {
                return res.status(404).json({ error: "Reservation not found." });
            }

            reservation.note = note;
            await reservation.save();
            res.json(reservation);
        } catch (error) {
            logger.error(`Error updating reservation: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async deleteReservation(req, res) {
        const reservationId = req.params.reservationId;

        try {
            const rowsDeleted = await Reservation.destroy({
                where: { id: reservationId },
            });
            if (rowsDeleted === 0) {
                return res.status(404).json({ message: "Reservation not found." });
            }
            res.status(200).json({ message: "Reservation deleted." });
        } catch (error) {
            logger.error(`Error deleting reservation: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = ReservationController;
