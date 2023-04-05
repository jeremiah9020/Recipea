const { Model, DataTypes } = require('sequelize')
const sequelize = require('../database')

class Rating extends Model {}

Rating.init({
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    recipeid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize
})

module.exports = Rating;