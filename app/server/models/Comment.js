const { Model, DataTypes } = require('sequelize')
const sequelize = require('../database')

class Comment extends Model {}

Comment.init({
    comment: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    username: {
        type: DataTypes.TEXT,
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

module.exports = Comment;