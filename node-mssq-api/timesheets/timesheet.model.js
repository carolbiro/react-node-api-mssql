const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        userId:  { type: DataTypes.INTEGER, allowNull: false },
        date:  { type: DataTypes.DATE, allowNull: false },
        vehicle:  { type: DataTypes.STRING, allowNull: false },
        projectNo:  { type: DataTypes.INTEGER, allowNull: false },
        location:  { type: DataTypes.STRING, allowNull: false },
        arriveTime:  { type: DataTypes.STRING, allowNull: false },
        morningBreak:  { type: DataTypes.INTEGER, allowNull: false },
        lunchBreak:  { type: DataTypes.INTEGER, allowNull: false },
        departureTime:  { type: DataTypes.STRING, allowNull: false },
        route:  { type: DataTypes.INTEGER, allowNull: false },
        compensation:  { type: DataTypes.INTEGER, allowNull: false },
        sleepAtHotel:  { type: DataTypes.BOOLEAN, allowNull: false },
        breakfastAtHotel:  { type: DataTypes.BOOLEAN, allowNull: false },
        sleepAtHome:  { type: DataTypes.BOOLEAN, allowNull: false },
        returnToAtelier:  { type: DataTypes.BOOLEAN, allowNull: false },
        repMidOption:  { type: DataTypes.BOOLEAN, allowNull: false },
        repMidValue:  { type: DataTypes.INTEGER, allowNull: false },
        repSoirOption:  { type: DataTypes.BOOLEAN, allowNull: false },
        repSoirValue:  { type: DataTypes.INTEGER, allowNull: false },
        description:  { type: DataTypes.STRING, allowNull: true },
        montant:  { type: DataTypes.STRING, allowNull: true },
    };

    const options = {
        defaultScope: {
            // exclude password hash by default
            attributes: { }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('Timesheet', attributes, options);
}


