const db = require('../models');
const Membership = db.Membership;

async function seed() {

    let currentDate = new Date();

    // Ajoutez un an à la date actuelle
    let oneYearLater = new Date(currentDate);
    oneYearLater.setFullYear(currentDate.getFullYear() + 1);

    const memberships = [
        { name: 100, number_of_reservations: 1, expiration_date: oneYearLater, userId: 1 },
        { name: 200, number_of_reservations: 1, expiration_date: oneYearLater, userId: 2 },
    ];

    for (let membership of memberships) {
        await Membership.create(membership);
    }

    console.log('Database membership reservation!');
}

module.exports = seed;