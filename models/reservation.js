"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    static associate(models) {
      // Association avec la table Users pour représenter l'utilisateur associé à la réservation
       Reservation.belongsTo(models.User, { foreignKey: 'userId' });
       //relation many-to-many: entre les modèles Reservation et Spot via la table de jontion'ReservationSpots'
       //une réservation peut être associée à plusieurs emplacements, 
       //et un emplacement peut être associé à plusieurs réservations, 
       // Association avec la table Spots via la table de liaison ReservationSpots
        //Reservation.belongsToMany(models.Spot, { through: 'ReservationSpots', foreignKey: 'ReservationId'});

        // Association avec la table Rooms via la clé étrangère roomId
      Reservation.belongsTo(models.Room, { foreignKey: 'roomId' });
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
      roomId: DataTypes.INTEGER,// Clé étrangère vers la table Rooms
    },
    {
      sequelize,
      modelName: "Reservation",
    },
  );
  return Reservation;
};
