const { Sequelize, DataTypes } = require("sequelize");

const config = require("./config/config.json")["development"];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  },
);

const Reservation = require("./models/reservation")(sequelize, DataTypes);
const Room = require("./models/room")(sequelize, DataTypes);
const Spot = require("./models/spot")(sequelize, DataTypes);
const User = require("./models/user")(sequelize, DataTypes);

const reservationsRouter = require('./routes/reservationRoute');
const usersRouter = require('./routes/userRoute');
const spotsRouter = require('./routes/spotRoute');
const roomsRouter = require('./routes/roomRoute');


module.exports = {
  Reservation,
  Room,
  Spot,
  User,
};
