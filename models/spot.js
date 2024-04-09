"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      // define association here
      Spot.belongsTo(models.Room, {foreignKey: 'roomId'});
      Spot.belongsToMany(models.Reservation, {through: 'ReservationSpots', foreignKey: 'SpotId'});
    }
  }
  Spot.init(
    {
      name: DataTypes.STRING,
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: "Rooms", // Nom du modèle référencé
        },
        key: 'id', // Clé dans le modèle référencé
      },
    },
    },
    {
      sequelize,
      modelName: "Spot",
    },
  );
  return Spot;
};
