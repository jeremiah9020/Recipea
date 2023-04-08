const { Model, DataTypes } = require('sequelize')
const sequelize = require('../database')

class UserProfile extends Model {}

UserProfile.init({
    userid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },

    username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },

    profilepicture: {
        type: DataTypes.BLOB,
        allowNull: true,
    },

    profilebanner: {
        type: DataTypes.BLOB,
        allowNull: true,
    },
    
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
    sequelize
})

module.exports = UserProfile;