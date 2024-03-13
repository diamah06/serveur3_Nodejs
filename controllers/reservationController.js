
// Importation des modèles Sequelize basé sur le fichier index.js
const { Reservation } = require('../models');

// Fonction pour créer une réservation
exports.createReservation = async (req, res) => {
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

        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Contrôleur pour obtenir la liste des réservations
exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findAll();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Méthode pour mettre à jour une réservation
exports.updateReservation = async (req, res) => {
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
        res.status(400).json({ error: error.message });
    }
};

// Méthode pour supprimer une réservation
exports.deleteReservation = async (req, res) => {
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
        res.status(400).json({ error: error.message });
    }
};
