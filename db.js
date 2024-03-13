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

const reservationsRouter = require('./reservationsRoute');
const usersRouter = require('./usersRoute');
const spotsRouter = require('./spotsRoute');
const roomsRouter = require('./roomsRoute');


module.exports = {
  Reservation,
  Room,
  Spot,
  User,
};
