'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Membership extends Model {
        static associate(models) {
            Membership.belongsTo(models.User, { foreignKey: 'userId', unique: true });
        }
    }
    Membership.init({
        name: DataTypes.STRING,
        number_of_reservations: DataTypes.INTEGER,
        expiration_date: DataTypes.DATE,
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: sequelize.models.User,
                key: 'id',
            },
        },
    }, {
        sequelize,
        modelName: 'Membership',
    });

    return Membership;
};


// membership.belongsTo(db.user, { foreignKey: 'userId', unique: true});