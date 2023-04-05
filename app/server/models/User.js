const { Model, DataTypes } = require('sequelize')
const sequelize = require('../database')

class User extends Model {}

User.init({
    username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },

    email: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    salt: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'user'
})

module.exports = User