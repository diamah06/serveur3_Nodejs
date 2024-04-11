const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

// Configurer la base de données
const sequelize = new Sequelize(config.database, config.username,
  config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: false,
  });

// Importer le modèle User
const User = require("../models/user")(sequelize, Sequelize);

// Importer les autres modèles (membership, room, spot, reservation)
const Membership = require("../models/membership")(sequelize, Sequelize);
const Room = require("../models/room")(sequelize, Sequelize);
const Spot = require("../models/spot")(sequelize, Sequelize);
const Reservation = require("../models/reservation")(sequelize, Sequelize);

// Définir les associations entre les modèles
Reservation.belongsToMany(Spot, { through: 'ReservationSpots' });
Spot.belongsToMany(Reservation, { through: 'ReservationSpots' });

// Exporter sequelize, Sequelize et les modèles
module.exports = {
  sequelize,
  Sequelize,
  Membership,
  Reservation,
  Room,
  Spot,
  User,
};
