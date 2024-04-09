const db = require('../models');
const {sequelize} = require("../utils/db");
const Reservation = db.Reservation;
const Spot = db.Spot;

async function seed() {

    const reservations = [
      {
        date: new Date(),
        name: "client1  ",
        note: "",
        status: 1,
        userId: 1,
        spotId: 2,
        roomId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
        // Add more users as needed
    ];

    for (let reservation of reservations) {
        const r = await Reservation.create(reservation);
    }

    console.log('Database room reservation!');
}

module.exports = seed;