"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      // define association here
      Room.hasMany(models.Spot, { foreignKey: 'roomId' });
    }
  }
  Room.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Room",
    },
  );
  return Room;
};
