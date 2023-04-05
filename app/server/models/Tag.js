const { Model, DataTypes } = require('sequelize')
const sequelize = require('../database')

class Tag extends Model {}

Tag.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    
    tagcolor: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize
})

module.exports = Tag;