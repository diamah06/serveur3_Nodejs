const { Spot } = require('../models');

// Fonction pour créer un spot
exports.createSpot = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Spot name is required." });
        }

        const spot = await Spot.create({
            name: name,
        });

        res.status(201).json({ spot });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the spot." });
    }
};

// Contrôleur pour obtenir la liste des spots
exports.getSpots = async (req, res) => {
    try {
        const spots = await Spot.findAll();
        res.status(200).json({ spots });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the spots." });
    }
};

// Méthode pour mettre à jour un spot
exports.updateSpot = async (req, res) => {
    try {
        const { spotId } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Spot name is required." });
        }

        const spot = await Spot.findByPk(spotId);

        if (!spot) {
            return res.status(404).json({ error: "Spot not found." });
        }

        spot.name = name;
        await spot.save();

        res.json({ message: "Spot updated." });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating the spot." });
    }
};

// Méthode pour supprimer un spot
exports.deleteSpot = async (req, res) => {
    try {
        const { spotId } = req.params;
        const spot = await Spot.findByPk(spotId);

        if (!spot) {
            return res.status(404).json({ error: "Spot not found." });
        }

        await spot.destroy();

        res.json({ message: "Spot deleted." });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while deleting the spot." });
    }
};
