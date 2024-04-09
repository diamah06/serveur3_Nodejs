"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    static associate(models) {
        Reservation.belongsToMany(models.Spot, { through: 'ReservationSpots', foreignKey: 'ReservationId'});
    }
  }
  
  Reservation.init(
    {
      date: DataTypes.DATE,
      name: DataTypes.STRING,
      note: DataTypes.STRING,
      status: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      spotId: DataTypes.INTEGER,
      roomId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Reservation",
    },
  );
  return Reservation;
};
