const { Model, DataTypes } = require('sequelize')
const sequelize = require('../database')

class Cookbook extends Model {}

Cookbook.init({
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    cookbookname: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    recipes: {
        type: DataTypes.TEXT,
        allowNull: true,
    }

}, {
    sequelize
})

module.exports = Cookbook