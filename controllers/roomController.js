"use strict";
const { Room } = require('../models');

// Fonction pour créer une room
exports.createRoom = async (req, res) => {
    try {
        const { name } = req.body;
        
        // Création de la room
        const newRoom = await Room.create({
            name,
        });

        res.status(201).json(newRoom);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Contrôleur pour obtenir la liste des rooms
exports.getRooms = async (req, res) => {
    try {
        const rooms = await Room.findAll();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Méthode pour mettre à jour une room
exports.updateRoom = async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;

    try {
        const room = await Room.findByPk(id);
        if (!room) {
            return res.status(404).json({ error: "Room not found." });
        }

        room.name = name;
        await room.save();
        res.json(room);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Méthode pour supprimer une room
exports.deleteRoom = async (req, res) => {
    const roomId = req.params.roomId;

    try {
        const rowsDeleted = await Room.destroy({
            where: { id: roomId },
        });
        if (rowsDeleted === 0) {
            return res.status(404).json({ message: "Room not found." });
        }
        res.status(200).json({ message: "Room deleted." });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
