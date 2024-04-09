const db = require('../models');
const Room = db.Room;

async function seed() {

    const rooms = [
        { name: 'cool' },
        { name: '2' },
        // Add more users as needed
    ];

    for (let room of rooms) {
        await Room.create(room);
    }

    console.log('Database room seeded!');
}

module.exports = seed;
