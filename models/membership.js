"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Membership extends Model {
        static associate(models) {
            Membership.belongsTo(models.User, {
                foreignKey: "id_user",
                unique: true,
            });
        }
    }

    Membership.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: DataTypes.STRING,
            number_of_reservations: DataTypes.INTEGER,
            expiration_date: DataTypes.DATE,
            id_user: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: {
                        tableName: "Users",
                    },
                    key: "id",
                },
            },
        },
        {
            sequelize,
            modelName: "Membership",
        },
    );

    return Membership;
};