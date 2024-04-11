const db = require('../models');
const Spot = db.Spot;

async function seed() {
    const spots = [
        { name: 'cool', roomId: 1 },
        { name: '2', roomId: 1 },
        { name: 'test', roomId: 1 },
        // Ajoutez d'autres spots au besoin
    ];

    for (let spot of spots) {
        const s = await Spot.create(spot);
        s.addReservation(1)
    }

    console.log('Database spot seeded!');
}

module.exports = seed;